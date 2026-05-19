import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class SettingsProvider with ChangeNotifier {
  bool _isCelsius = true;
  bool _autoRefresh = true;

  bool get isCelsius => _isCelsius;
  bool get autoRefresh => _autoRefresh;

  SettingsProvider() {
    loadSettings();
  }

  void toggleTemperatureUnit(bool isCelsius) async {
    _isCelsius = isCelsius;
    notifyListeners();
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool('isCelsius', isCelsius);
  }

  void toggleAutoRefresh(bool enabled) async {
    _autoRefresh = enabled;
    notifyListeners();
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool('autoRefresh', enabled);
  }

  void loadSettings() async {
    final prefs = await SharedPreferences.getInstance();
    _isCelsius = prefs.getBool('isCelsius') ?? true;
    _autoRefresh = prefs.getBool('autoRefresh') ?? true;
    notifyListeners();
  }

  double convertTemp(double celsius) {
    if (_isCelsius) return celsius;
    return (celsius * 9 / 5) + 32;
  }

  String get unitString => _isCelsius ? '°C' : '°F';
}
