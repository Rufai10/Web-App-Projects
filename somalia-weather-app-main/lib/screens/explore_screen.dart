import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:animate_do/animate_do.dart';
import '../providers/auth_provider.dart';
import '../services/api_service.dart';
import '../models/weather_model.dart';
import 'weather_detail_screen.dart';
import '../providers/settings_provider.dart';

class ExploreScreen extends StatefulWidget {
  @override
  _ExploreScreenState createState() => _ExploreScreenState();
}

class _ExploreScreenState extends State<ExploreScreen> {
  final ApiService _apiService = ApiService();
  String _searchQuery = '';
  List<Weather> _cachedWeather = [];

  @override
  Widget build(BuildContext context) {
    final auth = Provider.of<AuthProvider>(context);
    final theme = Theme.of(context);

    return Scaffold(
      backgroundColor: theme.scaffoldBackgroundColor,
      body: FutureBuilder<List<Weather>>(
        future: _apiService.getWeather(auth.user?.token ?? ''),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting && _cachedWeather.isEmpty) {
            return Center(child: CircularProgressIndicator());
          }
          
          if (snapshot.hasError) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.cloud_off_rounded, size: 60, color: Colors.orangeAccent),
                  SizedBox(height: 16),
                  Text('Failed to load weather data', style: TextStyle(fontSize: 16)),
                  Text(snapshot.error.toString(), style: TextStyle(color: Colors.grey, fontSize: 12)),
                  TextButton(onPressed: () => setState(() {}), child: Text('Retry')),
                ],
              ),
            );
          }

          if (snapshot.hasData) {
            _cachedWeather = snapshot.data!;
          }

          final filteredList = _cachedWeather
              .where((w) => (w.city?.name ?? '').toLowerCase().contains(_searchQuery.toLowerCase()))
              .toList();

          return CustomScrollView(
            slivers: [
              SliverAppBar(
                expandedHeight: 180,
                pinned: true,
                stretch: true,
                backgroundColor: theme.scaffoldBackgroundColor,
                title: Text('Explore Cities', style: TextStyle(fontWeight: FontWeight.bold)),
                centerTitle: true,
                flexibleSpace: FlexibleSpaceBar(
                  background: Container(
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        colors: [theme.primaryColor.withOpacity(0.1), theme.scaffoldBackgroundColor],
                        begin: Alignment.topCenter,
                        end: Alignment.bottomCenter,
                      ),
                    ),
                    child: Center(
                      child: Padding(
                        padding: const EdgeInsets.only(top: 60.0),
                        child: Icon(Icons.explore_rounded, size: 60, color: theme.primaryColor.withOpacity(0.1)),
                      ),
                    ),
                  ),
                ),
                bottom: PreferredSize(
                  preferredSize: Size.fromHeight(80),
                  child: Padding(
                    padding: const EdgeInsets.fromLTRB(20, 0, 20, 16),
                    child: Container(
                      decoration: BoxDecoration(
                        color: theme.cardTheme.color,
                        borderRadius: BorderRadius.circular(20),
                        boxShadow: [
                          BoxShadow(
                            color: Colors.black.withOpacity(0.05),
                            blurRadius: 10,
                            offset: Offset(0, 4),
                          ),
                        ],
                        border: Border.all(color: theme.dividerColor.withOpacity(0.05)),
                      ),
                      child: TextField(
                        onChanged: (value) => setState(() => _searchQuery = value),
                        style: TextStyle(fontSize: 16),
                        decoration: InputDecoration(
                          hintText: 'Search city name...',
                          hintStyle: TextStyle(color: theme.textTheme.bodySmall?.color?.withOpacity(0.4)),
                          prefixIcon: Icon(Icons.search_rounded, color: theme.primaryColor),
                          contentPadding: EdgeInsets.symmetric(vertical: 15),
                          border: InputBorder.none,
                        ),
                      ),
                    ),
                  ),
                ),
              ),
              if (filteredList.isEmpty)
                SliverFillRemaining(
                  child: Center(
                    child: FadeIn(
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Icon(Icons.location_off_rounded, size: 80, color: theme.dividerColor.withOpacity(0.1)),
                          SizedBox(height: 16),
                          Text('No cities found', 
                            style: TextStyle(color: theme.textTheme.bodySmall?.color?.withOpacity(0.5), fontSize: 18)
                          ),
                        ],
                      ),
                    ),
                  ),
                )
              else
                SliverPadding(
                  padding: EdgeInsets.fromLTRB(20, 10, 20, 110),
                  sliver: SliverList(
                    delegate: SliverChildBuilderDelegate(
                      (context, index) {
                        final weather = filteredList[index];
                        return FadeInUp(
                          delay: Duration(milliseconds: index * 30),
                          child: Padding(
                            padding: const EdgeInsets.only(bottom: 12),
                            child: _CityListTile(weather: weather),
                          ),
                        );
                      },
                      childCount: filteredList.length,
                    ),
                  ),
                ),
            ],
          );
        },
      ),
    );
  }
}

class _CityListTile extends StatelessWidget {
  final Weather weather;

  const _CityListTile({required this.weather});

  @override
  Widget build(BuildContext context) {
    final settings = Provider.of<SettingsProvider>(context);
    final displayTemp = settings.convertTemp(weather.temperature);

    return Card(
      child: ListTile(
        onTap: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => WeatherDetailScreen(weather: weather),
            ),
          );
        },
        contentPadding: EdgeInsets.symmetric(horizontal: 20, vertical: 8),
        leading: Container(
          padding: EdgeInsets.all(10),
          decoration: BoxDecoration(
            color: Theme.of(context).primaryColor.withOpacity(0.1),
            shape: BoxShape.circle,
          ),
          child: Icon(Icons.location_on_rounded, color: Theme.of(context).primaryColor),
        ),
        title: Text(
          weather.city?.name ?? 'Unknown',
          style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
        ),
        subtitle: Text(weather.condition),
        trailing: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.end,
          children: [
            Text(
              '${displayTemp.round()}${settings.unitString}',
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
                color: Theme.of(context).primaryColor,
              ),
            ),
            Text(
              'Wind: ${weather.windSpeed}km/h',
              style: TextStyle(fontSize: 10, color: Colors.grey),
            ),
          ],
        ),
      ),
    );
  }
}
