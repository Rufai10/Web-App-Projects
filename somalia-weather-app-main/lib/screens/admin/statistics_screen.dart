import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:animate_do/animate_do.dart';
import '../../services/api_service.dart';
import '../../providers/auth_provider.dart';

class StatisticsScreen extends StatefulWidget {
  @override
  _StatisticsScreenState createState() => _StatisticsScreenState();
}

class _StatisticsScreenState extends State<StatisticsScreen> {
  final ApiService _apiService = ApiService();
  Map<String, dynamic>? _stats;
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _fetchStats();
  }

  Future<void> _fetchStats() async {
    final auth = Provider.of<AuthProvider>(context, listen: false);
    try {
      final data = await _apiService.getStats(auth.user?.token ?? '');
      setState(() {
        _stats = data;
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
      appBar: AppBar(title: Text('System Statistics')),
      body: _isLoading 
        ? Center(child: CircularProgressIndicator())
        : Padding(
            padding: const EdgeInsets.all(24.0),
            child: Column(
              children: [
                _buildStatTile('Total Users', _stats?['users']?.toString() ?? '0', Icons.people, Colors.blue),
                SizedBox(height: 20),
                _buildStatTile('Cities Covered', _stats?['cities']?.toString() ?? '0', Icons.map, Colors.orange),
                SizedBox(height: 20),
                _buildStatTile('Weather Records', _stats?['weather']?.toString() ?? '0', Icons.wb_sunny, Colors.teal),
                SizedBox(height: 40),
                FadeInUp(
                  child: Container(
                    padding: EdgeInsets.all(20),
                    decoration: BoxDecoration(
                      color: Colors.blueAccent.withOpacity(0.05),
                      borderRadius: BorderRadius.circular(20),
                      border: Border.all(color: Colors.blueAccent.withOpacity(0.2)),
                    ),
                    child: Row(
                      children: [
                        Icon(Icons.info_outline, color: Colors.blueAccent),
                        SizedBox(width: 15),
                        Expanded(
                          child: Text(
                            'These statistics represent real-time data from the SWIS database.',
                            style: TextStyle(color: Colors.blueAccent, fontSize: 13),
                          ),
                        ),
                      ],
                    ),
                  ),
                )
              ],
            ),
          ),
    );
  }

  Widget _buildStatTile(String label, String value, IconData icon, Color color) {
    return FadeInLeft(
      child: Container(
        padding: EdgeInsets.all(24),
        decoration: BoxDecoration(
          color: color.withOpacity(0.1),
          borderRadius: BorderRadius.circular(24),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Row(
              children: [
                Icon(icon, color: color, size: 30),
                SizedBox(width: 20),
                Text(label, style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
              ],
            ),
            Text(value, style: TextStyle(fontSize: 28, fontWeight: FontWeight.w900, color: color)),
          ],
        ),
      ),
    );
  }
}
