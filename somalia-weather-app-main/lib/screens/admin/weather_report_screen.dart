import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:animate_do/animate_do.dart';
import '../../services/api_service.dart';
import '../../providers/auth_provider.dart';

class WeatherReportScreen extends StatefulWidget {
  @override
  _WeatherReportScreenState createState() => _WeatherReportScreenState();
}

class _WeatherReportScreenState extends State<WeatherReportScreen> {
  final ApiService _apiService = ApiService();
  Map<String, dynamic>? _reportData;
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _fetchReport();
  }

  Future<void> _fetchReport() async {
    final auth = Provider.of<AuthProvider>(context, listen: false);
    try {
      final data = await _apiService.getReport(auth.user?.token ?? '');
      setState(() {
        _reportData = data;
        _isLoading = false;
      });
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Error: $e')));
      setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    
    return Scaffold(
      appBar: AppBar(
        title: Text('Weather Analytics Report'),
        centerTitle: true,
      ),
      body: _isLoading 
        ? Center(child: CircularProgressIndicator())
        : RefreshIndicator(
            onRefresh: _fetchReport,
            child: SingleChildScrollView(
              padding: EdgeInsets.all(20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  FadeInDown(
                    child: _buildSummaryCard(theme),
                  ),
                  SizedBox(height: 30),
                  FadeInUp(
                    child: Text(
                      'City Performance (Avg Temp)',
                      style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                    ),
                  ),
                  SizedBox(height: 16),
                  _buildCityList(theme),
                ],
              ),
            ),
          ),
    );
  }

  Widget _buildSummaryCard(ThemeData theme) {
    final summary = _reportData?['summary'] ?? {};
    return Container(
      padding: EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: theme.cardTheme.color,
        borderRadius: BorderRadius.circular(24),
        boxShadow: [BoxShadow(color: Colors.black12, blurRadius: 10)],
      ),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              _buildStat('Avg Temp', '${(summary['avgTemperature'] ?? 0).toStringAsFixed(1)}°'),
              _buildStat('Max Temp', '${(summary['maxTemperature'] ?? 0).toStringAsFixed(1)}°'),
              _buildStat('Min Temp', '${(summary['minTemperature'] ?? 0).toStringAsFixed(1)}°'),
            ],
          ),
          Divider(height: 40),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              _buildStat('Avg Humidity', '${(summary['avgHumidity'] ?? 0).toStringAsFixed(1)}%'),
              _buildStat('Avg Wind', '${(summary['avgWindSpeed'] ?? 0).toStringAsFixed(1)}kph'),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildStat(String label, String value) {
    return Column(
      children: [
        Text(label, style: TextStyle(color: Colors.grey, fontSize: 12)),
        SizedBox(height: 4),
        Text(value, style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.blueAccent)),
      ],
    );
  }

  Widget _buildCityList(ThemeData theme) {
    final cities = _reportData?['cityAverages'] as List? ?? [];
    return ListView.builder(
      shrinkWrap: true,
      physics: NeverScrollableScrollPhysics(),
      itemCount: cities.length,
      itemBuilder: (context, index) {
        final city = cities[index];
        final info = city['cityInfo'] ?? {};
        return FadeInUp(
          delay: Duration(milliseconds: index * 50),
          child: Card(
            margin: EdgeInsets.only(bottom: 12),
            child: ListTile(
              leading: CircleAvatar(
                backgroundColor: Colors.blueAccent.withOpacity(0.1),
                child: Text('${index + 1}', style: TextStyle(color: Colors.blueAccent)),
              ),
              title: Text(info['name'] ?? 'Unknown City'),
              subtitle: Text(info['region'] ?? ''),
              trailing: Text(
                '${(city['avgTemp'] ?? 0).toStringAsFixed(1)}°',
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
              ),
            ),
          ),
        );
      },
    );
  }
}
