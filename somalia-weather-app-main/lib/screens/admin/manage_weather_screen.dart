import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../providers/auth_provider.dart';
import '../../services/api_service.dart';
import '../../models/weather_model.dart';
import '../../models/city_model.dart';

class ManageWeatherScreen extends StatefulWidget {
  @override
  _ManageWeatherScreenState createState() => _ManageWeatherScreenState();
}

class _ManageWeatherScreenState extends State<ManageWeatherScreen> {
  final ApiService _apiService = ApiService();
  List<Weather> _weatherList = [];
  List<City> _cities = [];
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _fetchData();
  }

  Future<void> _fetchData() async {
    final auth = Provider.of<AuthProvider>(context, listen: false);
    try {
      final weather = await _apiService.getWeather(auth.user?.token ?? '');
      final cities = await _apiService.getCities(auth.user?.token ?? '');
      setState(() {
        _weatherList = weather;
        _cities = cities;
        _isLoading = false;
      });
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Error: $e')));
    }
  }

  Future<void> _showAddWeatherDialog() async {
    if (_cities.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Please add cities first')));
      return;
    }

    String? selectedCityId = _cities.first.id;
    final tempController = TextEditingController();
    final conditionController = TextEditingController();
    final humidityController = TextEditingController();
    final windController = TextEditingController();

    return showDialog(
      context: context,
      builder: (context) => StatefulBuilder(
        builder: (context, setDialogState) => AlertDialog(
          title: Text('Add Weather Data'),
          content: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                DropdownButtonFormField<String>(
                  value: selectedCityId,
                  items: _cities.map((c) => DropdownMenuItem(value: c.id, child: Text(c.name))).toList(),
                  onChanged: (val) => setDialogState(() => selectedCityId = val),
                  decoration: InputDecoration(labelText: 'City'),
                ),
                TextField(controller: tempController, decoration: InputDecoration(labelText: 'Temperature (°C)'), keyboardType: TextInputType.number),
                TextField(controller: conditionController, decoration: InputDecoration(labelText: 'Condition (e.g. Sunny)')),
                TextField(controller: humidityController, decoration: InputDecoration(labelText: 'Humidity (%)'), keyboardType: TextInputType.number),
                TextField(controller: windController, decoration: InputDecoration(labelText: 'Wind Speed (km/h)'), keyboardType: TextInputType.number),
              ],
            ),
          ),
          actions: [
            TextButton(onPressed: () => Navigator.pop(context), child: Text('Cancel')),
            ElevatedButton(
              onPressed: () async {
                final auth = Provider.of<AuthProvider>(context, listen: false);
                try {
                  await _apiService.createWeather(auth.user?.token ?? '', {
                    'cityId': selectedCityId,
                    'temperature': double.parse(tempController.text),
                    'condition': conditionController.text,
                    'humidity': int.parse(humidityController.text),
                    'windSpeed': double.parse(windController.text),
                    'date': DateTime.now().toIso8601String(),
                  });
                  Navigator.pop(context);
                  _fetchData();
                } catch (e) {
                  ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Error: $e')));
                }
              },
              child: Text('Add'),
            ),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Manage Weather')),
      floatingActionButton: FloatingActionButton(
        onPressed: _showAddWeatherDialog,
        child: Icon(Icons.add),
      ),
      body: _isLoading 
        ? Center(child: CircularProgressIndicator())
        : ListView.builder(
            itemCount: _weatherList.length,
            itemBuilder: (context, index) {
              final weather = _weatherList[index];
              return ListTile(
                title: Text('${weather.city?.name ?? 'Unknown'}: ${weather.temperature}°C'),
                subtitle: Text('${weather.condition} | Humidity: ${weather.humidity}%'),
                trailing: IconButton(
                  icon: Icon(Icons.delete_outline, color: Colors.redAccent),
                  onPressed: () async {
                    final auth = Provider.of<AuthProvider>(context, listen: false);
                    try {
                      await _apiService.deleteWeather(auth.user?.token ?? '', weather.id);
                      _fetchData();
                    } catch (e) {
                      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Error: $e')));
                    }
                  },
                ),
              );
            },
          ),
    );
  }
}
