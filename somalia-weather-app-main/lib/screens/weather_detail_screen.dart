import 'package:flutter/material.dart';
import 'package:animate_do/animate_do.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';
import '../models/weather_model.dart';
import '../providers/settings_provider.dart';

class WeatherDetailScreen extends StatelessWidget {
  final Weather weather;

  WeatherDetailScreen({required this.weather});

  @override
  Widget build(BuildContext context) {
    final settings = Provider.of<SettingsProvider>(context);
    final theme = Theme.of(context);
    final displayTemp = settings.convertTemp(weather.temperature);
    final feelsLike = settings.convertTemp(weather.temperature + 2);

    return Scaffold(
      backgroundColor: theme.scaffoldBackgroundColor,
      body: CustomScrollView(
        slivers: [
          SliverAppBar(
            expandedHeight: 300,
            pinned: true,
            stretch: true,
            backgroundColor: theme.scaffoldBackgroundColor,
            leading: Padding(
              padding: const EdgeInsets.all(8.0),
              child: CircleAvatar(
                backgroundColor: Colors.black26,
                child: IconButton(
                  icon: Icon(Icons.arrow_back_ios_new_rounded, color: Colors.white, size: 18),
                  onPressed: () => Navigator.pop(context),
                ),
              ),
            ),
            flexibleSpace: FlexibleSpaceBar(
              title: Text(weather.city?.name ?? 'Unknown', 
                style: TextStyle(
                  color: Colors.white, 
                  fontWeight: FontWeight.bold,
                  shadows: [Shadow(color: Colors.black45, blurRadius: 10)],
                )
              ),
              centerTitle: true,
              background: Stack(
                fit: StackFit.expand,
                children: [
                   Image.asset(
                    'assets/images/coastal.jpg', // Use local asset instead of network placeholder
                    fit: BoxFit.cover,
                  ),
                  Container(
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        begin: Alignment.topCenter,
                        end: Alignment.bottomCenter,
                        colors: [
                          Colors.black.withOpacity(0.3),
                          theme.scaffoldBackgroundColor,
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.all(24.0),
              child: Column(
                children: [
                  FadeInDown(
                    child: Column(
                      children: [
                        Text(
                          '${displayTemp.round()}${settings.unitString}',
                          style: TextStyle(
                            fontSize: 100, 
                            fontWeight: FontWeight.w200, 
                            color: theme.textTheme.titleLarge?.color
                          ),
                        ),
                        Text(
                          weather.condition,
                          style: TextStyle(
                            fontSize: 24, 
                            color: theme.textTheme.titleMedium?.color?.withOpacity(0.7), 
                            fontWeight: FontWeight.w500
                          ),
                        ),
                        SizedBox(height: 10),
                        Text(
                          DateFormat('EEEE, MMM d, yyyy').format(weather.date),
                          style: TextStyle(color: theme.textTheme.bodySmall?.color?.withOpacity(0.5)),
                        ),
                      ],
                    ),
                  ),
                  SizedBox(height: 40),
                  FadeInUp(
                    delay: Duration(milliseconds: 200),
                    child: Container(
                      padding: EdgeInsets.all(24),
                      decoration: BoxDecoration(
                        color: theme.cardTheme.color,
                        borderRadius: BorderRadius.circular(30),
                        border: Border.all(color: theme.dividerColor.withOpacity(0.05)),
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceAround,
                        children: [
                          _buildDetailItem(context, Icons.water_drop_rounded, '${weather.humidity}%', 'Humidity'),
                          _buildDetailItem(context, Icons.air_rounded, '${weather.windSpeed} km/h', 'Wind Speed'),
                        ],
                      ),
                    ),
                  ),
                  SizedBox(height: 40),
                  // --- 5-DAY FORECAST SECTION ---
                  FadeInUp(
                    delay: Duration(milliseconds: 300),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('5-DAY FORECAST', 
                          style: TextStyle(
                            fontSize: 12, 
                            fontWeight: FontWeight.bold, 
                            letterSpacing: 1.2,
                            color: theme.primaryColor
                          )
                        ),
                        SizedBox(height: 16),
                        Container(
                          height: 140,
                          child: ListView.builder(
                            scrollDirection: Axis.horizontal,
                            itemCount: 5,
                            itemBuilder: (context, index) {
                              final date = weather.date.add(Duration(days: index + 1));
                              return Container(
                                width: 90,
                                margin: EdgeInsets.only(right: 12),
                                padding: EdgeInsets.all(12),
                                decoration: BoxDecoration(
                                  color: theme.cardTheme.color,
                                  borderRadius: BorderRadius.circular(20),
                                  border: Border.all(color: theme.dividerColor.withOpacity(0.05)),
                                ),
                                child: Column(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    Text(DateFormat('EEE').format(date), style: TextStyle(fontWeight: FontWeight.bold)),
                                    SizedBox(height: 8),
                                    Icon(index % 2 == 0 ? Icons.wb_cloudy_rounded : Icons.wb_sunny_rounded, color: theme.primaryColor, size: 28),
                                    SizedBox(height: 8),
                                    Text('${(weather.temperature + (index * 2)).round()}°', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),
                                  ],
                                ),
                              );
                            },
                          ),
                        ),
                      ],
                    ),
                  ),
                  SizedBox(height: 30),
                  FadeInUp(
                    delay: Duration(milliseconds: 400),
                    child: Row(
                      children: [
                        Expanded(child: _buildMetricCard(context, 'UV Index', 'Moderate', Icons.wb_sunny_outlined)),
                        SizedBox(width: 15),
                        Expanded(child: _buildMetricCard(context, 'Visibility', '10 km', Icons.visibility_outlined)),
                      ],
                    ),
                  ),
                  SizedBox(height: 15),
                  FadeInUp(
                    delay: Duration(milliseconds: 600),
                    child: Row(
                      children: [
                        Expanded(child: _buildMetricCard(context, 'Air Pressure', '1012 hPa', Icons.speed_rounded)),
                        SizedBox(width: 15),
                        Expanded(child: _buildMetricCard(context, 'Feels Like', '${feelsLike.round()}${settings.unitString}', Icons.thermostat_rounded)),
                      ],
                    ),
                  ),
                  SizedBox(height: 100), // Space for floating nav
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildDetailItem(BuildContext context, IconData icon, String value, String label) {
    final theme = Theme.of(context);
    return Column(
      children: [
        Icon(icon, color: Colors.blueAccent, size: 30),
        SizedBox(height: 8),
        Text(value, 
          style: TextStyle(
            color: theme.textTheme.titleLarge?.color, 
            fontSize: 20, 
            fontWeight: FontWeight.bold
          )
        ),
        Text(label, 
          style: TextStyle(
            color: theme.textTheme.bodySmall?.color?.withOpacity(0.5), 
            fontSize: 12
          )
        ),
      ],
    );
  }

  Widget _buildMetricCard(BuildContext context, String title, String value, IconData icon) {
    final theme = Theme.of(context);
    return Container(
      padding: EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: theme.cardTheme.color,
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: theme.dividerColor.withOpacity(0.05)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(icon, color: Colors.blueAccent, size: 18),
              SizedBox(width: 8),
              Text(title, 
                style: TextStyle(
                  color: theme.textTheme.bodySmall?.color?.withOpacity(0.5), 
                  fontSize: 12
                )
              ),
            ],
          ),
          SizedBox(height: 10),
          Text(value, 
            style: TextStyle(
              color: theme.textTheme.titleMedium?.color, 
              fontSize: 18, 
              fontWeight: FontWeight.bold
            )
          ),
        ],
      ),
    );
  }
}
