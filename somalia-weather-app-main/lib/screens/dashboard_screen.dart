import 'dart:async';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:animate_do/animate_do.dart';
import '../providers/auth_provider.dart';
import '../providers/settings_provider.dart';
import '../services/api_service.dart';
import '../models/city_model.dart';
import '../models/weather_model.dart';
import 'weather_detail_screen.dart';

class DashboardScreen extends StatefulWidget {
  @override
  _DashboardScreenState createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  final ApiService _apiService = ApiService();
  Timer? _refreshTimer;
  bool _isLoading = false;
  String? _error;
  List<Weather> _weatherList = [];
  List<City> _cities = [];
  City? _selectedCity;

  @override
  void initState() {
    super.initState();
    _fetchInitialData();
    _setupAutoRefresh();
  }

  @override
  void dispose() {
    _refreshTimer?.cancel();
    super.dispose();
  }

  void _setupAutoRefresh() {
    _refreshTimer?.cancel();
    _refreshTimer = Timer.periodic(Duration(seconds: 30), (timer) {
      final settings = Provider.of<SettingsProvider>(context, listen: false);
      if (settings.autoRefresh) {
        _fetchWeather();
      }
    });
  }

  Future<void> _fetchInitialData() async {
    final auth = Provider.of<AuthProvider>(context, listen: false);
    try {
      final cities = await _apiService.getCities(auth.user?.token ?? '');
      setState(() {
        _cities = cities;
        if (_cities.isNotEmpty) {
          _selectedCity = _cities.first;
        }
      });
      _fetchWeather();
    } catch (e) {
      debugPrint('Error fetching cities: $e');
      if (mounted) {
        setState(() {
          _error = 'Failed to load cities: $e';
        });
      }
    }
  }

  Future<void> _fetchWeather() async {
    final auth = Provider.of<AuthProvider>(context, listen: false);
    if (!mounted) return;
    
    setState(() {
      _isLoading = true;
      _error = null;
    });

    try {
      List<Weather> data;
      if (_selectedCity != null) {
        data = await _apiService.getWeather(auth.user?.token ?? ''); 
        // Filter locally or use specific endpoint if city selection is active
        data = data.where((w) => w.cityId == _selectedCity!.id).toList();
      } else {
        data = await _apiService.getWeather(auth.user?.token ?? '');
      }
      
      if (mounted) {
        setState(() {
          _weatherList = data;
          _isLoading = false;
        });
      }
    } catch (e) {
      if (mounted) {
        setState(() {
          _error = e.toString();
          _isLoading = false;
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final auth = Provider.of<AuthProvider>(context);
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Scaffold(
      backgroundColor: theme.scaffoldBackgroundColor,
      body: RefreshIndicator(
        onRefresh: _fetchWeather,
        child: CustomScrollView(
          slivers: [
            SliverAppBar(
              expandedHeight: 200,
              pinned: true,
              stretch: true,
              backgroundColor: theme.scaffoldBackgroundColor,
              title: Text('Somali Weather', 
                style: TextStyle(fontWeight: FontWeight.bold)
              ),
              centerTitle: true,
              actions: [
                if (_cities.isNotEmpty)
                  Padding(
                    padding: const EdgeInsets.only(right: 16),
                    child: DropdownButtonHideUnderline(
                      child: DropdownButton<City>(
                        value: _selectedCity,
                        icon: Icon(Icons.location_on_rounded, color: theme.primaryColor),
                        onChanged: (City? newValue) {
                          setState(() {
                            _selectedCity = newValue;
                          });
                          _fetchWeather();
                        },
                        items: _cities.map((City city) {
                          return DropdownMenuItem<City>(
                            value: city,
                            child: Text(city.name),
                          );
                        }).toList(),
                      ),
                    ),
                  ),
              ],
              flexibleSpace: FlexibleSpaceBar(
                background: Stack(
                  fit: StackFit.expand,
                  children: [
                    Container(
                      decoration: BoxDecoration(
                        gradient: LinearGradient(
                          begin: Alignment.topLeft,
                          end: Alignment.bottomRight,
                          colors: [
                            theme.primaryColor.withOpacity(isDark ? 0.2 : 0.1),
                            theme.scaffoldBackgroundColor,
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
            if (_isLoading)
              SliverFillRemaining(
                child: Center(child: CircularProgressIndicator()),
              )
            else if (_error != null)
              SliverToBoxAdapter(child: _buildErrorView())
            else
              _buildWeatherList(),
          ],
        ),
      ),
      floatingActionButton: auth.user?.role == 'Admin'
          ? Container(
              margin: EdgeInsets.only(bottom: 90),
              child: FloatingActionButton(
                onPressed: () => Navigator.pushNamed(context, '/admin/weather').then((_) => _fetchWeather()),
                backgroundColor: theme.primaryColor,
                child: Icon(Icons.add, color: Colors.white),
              ),
            )
          : null,
    );
  }

  Widget _buildErrorView() {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(32.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.error_outline_rounded, size: 60, color: Colors.redAccent),
            SizedBox(height: 16),
            Text(_error ?? 'Unknown error', textAlign: TextAlign.center),
            SizedBox(height: 24),
            ElevatedButton(onPressed: _fetchWeather, child: Text('Try Again')),
          ],
        ),
      ),
    );
  }

  Widget _buildWeatherList() {
    if (_weatherList.isEmpty) {
      return SliverFillRemaining(
        child: Center(child: Text('No weather data available')),
      );
    }

    return SliverPadding(
      padding: EdgeInsets.fromLTRB(20, 10, 20, 110),
      sliver: SliverList(
        delegate: SliverChildBuilderDelegate(
          (context, index) {
            final weather = _weatherList[index];
            return FadeInUp(
              delay: Duration(milliseconds: index * 50),
              child: Padding(
                padding: const EdgeInsets.only(bottom: 16),
                child: _WeatherCard(weather: weather),
              ),
            );
          },
          childCount: _weatherList.length,
        ),
      ),
    );
  }
}

class _WeatherCard extends StatelessWidget {
  final Weather weather;

  const _WeatherCard({required this.weather});

  @override
  Widget build(BuildContext context) {
    final settings = Provider.of<SettingsProvider>(context);
    final displayTemp = settings.convertTemp(weather.temperature);
    final theme = Theme.of(context);

    return GestureDetector(
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => WeatherDetailScreen(weather: weather),
          ),
        );
      },
      child: Container(
        padding: EdgeInsets.all(20),
        decoration: BoxDecoration(
          color: theme.cardTheme.color,
          borderRadius: BorderRadius.circular(24),
          border: Border.all(color: theme.dividerColor.withOpacity(0.05)),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.02),
              blurRadius: 10,
              offset: Offset(0, 4),
            ),
          ],
        ),
        child: Row(
          children: [
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    weather.city?.name ?? 'Unknown',
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  SizedBox(height: 4),
                  Text(
                    weather.condition,
                    style: TextStyle(
                      color: theme.textTheme.bodySmall?.color?.withOpacity(0.7),
                    ),
                  ),
                ],
              ),
            ),
            Column(
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                Text(
                  '${displayTemp.round()}${settings.unitString}',
                  style: TextStyle(
                    fontSize: 32,
                    fontWeight: FontWeight.bold,
                    color: theme.primaryColor,
                  ),
                ),
                Text(
                  'H: ${weather.humidity}%',
                  style: TextStyle(
                    fontSize: 12,
                    color: theme.textTheme.bodySmall?.color?.withOpacity(0.5),
                  ),
                ),
              ],
            ),
            SizedBox(width: 16),
            Icon(
              weather.condition.toLowerCase().contains('sun') 
                ? Icons.wb_sunny_rounded 
                : Icons.cloud_rounded,
              size: 40,
              color: weather.condition.toLowerCase().contains('sun') 
                ? Colors.orangeAccent 
                : Colors.blueAccent,
            ),
          ],
        ),
      ),
    );
  }
}
