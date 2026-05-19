import 'city_model.dart';

class Weather {
  final String id;
  final String cityId;
  final City? city; // Populated city data
  final double temperature;
  final String condition;
  final int humidity;
  final double windSpeed;
  final DateTime date;

  Weather({
    required this.id,
    required this.cityId,
    this.city,
    required this.temperature,
    required this.condition,
    required this.humidity,
    required this.windSpeed,
    required this.date,
  });

  factory Weather.fromJson(Map<String, dynamic> json) {
    final cityData = json['cityId'];
    String cid = '';
    City? c;

    if (cityData is String) {
      cid = cityData;
    } else if (cityData is Map<String, dynamic>) {
      cid = cityData['_id']?.toString() ?? '';
      c = City.fromJson(cityData);
    }

    return Weather(
      id: json['_id']?.toString() ?? '',
      cityId: cid,
      city: c,
      temperature: (json['temperature'] ?? 0).toDouble(),
      condition: json['condition']?.toString() ?? 'Clear',
      humidity: (json['humidity'] ?? 0).toInt(),
      windSpeed: (json['windSpeed'] ?? 0).toDouble(),
      date: json['date'] != null ? DateTime.parse(json['date']) : DateTime.now(),
    );
  }
}
