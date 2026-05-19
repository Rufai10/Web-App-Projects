import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../providers/auth_provider.dart';
import '../../services/api_service.dart';
import '../../models/city_model.dart';

class ManageCitiesScreen extends StatefulWidget {
  @override
  _ManageCitiesScreenState createState() => _ManageCitiesScreenState();
}

class _ManageCitiesScreenState extends State<ManageCitiesScreen> {
  final ApiService _apiService = ApiService();
  List<City> _cities = [];
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _fetchCities();
  }

  Future<void> _fetchCities() async {
    final auth = Provider.of<AuthProvider>(context, listen: false);
    try {
      final cities = await _apiService.getCities(auth.user?.token ?? '');
      setState(() {
        _cities = cities;
        _isLoading = false;
      });
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Error: $e')));
    }
  }

  Future<void> _showAddCityDialog() async {
    final nameController = TextEditingController();
    final regionController = TextEditingController();
    
    return showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Add New City'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(controller: nameController, decoration: InputDecoration(labelText: 'City Name')),
            TextField(controller: regionController, decoration: InputDecoration(labelText: 'Region')),
          ],
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: Text('Cancel')),
          ElevatedButton(
            onPressed: () async {
              final auth = Provider.of<AuthProvider>(context, listen: false);
              try {
                await _apiService.createCity(auth.user?.token ?? '', nameController.text, regionController.text);
                Navigator.pop(context);
                _fetchCities();
              } catch (e) {
                ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Error: $e')));
              }
            },
            child: Text('Add'),
          ),
        ],
      ),
    );
  }

  Future<void> _deleteCity(String id) async {
    final auth = Provider.of<AuthProvider>(context, listen: false);
    try {
      await _apiService.deleteCity(auth.user?.token ?? '', id);
      _fetchCities();
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Error: $e')));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Manage Cities')),
      floatingActionButton: FloatingActionButton(
        onPressed: _showAddCityDialog,
        child: Icon(Icons.add),
      ),
      body: _isLoading 
        ? Center(child: CircularProgressIndicator())
        : ListView.builder(
            itemCount: _cities.length,
            itemBuilder: (context, index) {
              final city = _cities[index];
              return ListTile(
                title: Text(city.name),
                subtitle: Text(city.region),
                trailing: IconButton(
                  icon: Icon(Icons.delete, color: Colors.red),
                  onPressed: () => _deleteCity(city.id),
                ),
              );
            },
          ),
    );
  }
}
