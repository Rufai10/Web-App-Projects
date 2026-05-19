import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/user_model.dart';
import '../models/weather_model.dart';
import '../models/city_model.dart';
import 'package:flutter/foundation.dart';


class ApiService {
  static String get baseUrl {
    if (kIsWeb) {
      return 'http://127.0.0.1:5000/api/v1';
    }
    if (defaultTargetPlatform == TargetPlatform.android) {
      return 'http://10.0.2.2:5000/api/v1';
    }
    return 'http://127.0.0.1:5000/api/v1';
  }

  // --- AUTH ---
  Future<User> login(String email, String password) async {
    final response = await http.post(
      Uri.parse('$baseUrl/auth/login'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'email': email, 'password': password}),
    );

    if (response.statusCode == 200) {
      return User.fromJson(jsonDecode(response.body));
    } else {
      throw Exception(jsonDecode(response.body)['message'] ?? 'Failed to login');
    }
  }

  Future<User> register(String name, String email, String password) async {
    final response = await http.post(
      Uri.parse('$baseUrl/auth/register'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'name': name, 'email': email, 'password': password}),
    );

    if (response.statusCode == 201) {
      return User.fromJson(jsonDecode(response.body));
    } else {
      throw Exception(jsonDecode(response.body)['message'] ?? 'Failed to register');
    }
  }

  // --- CITIES ---
  Future<List<City>> getCities(String token) async {
    final response = await http.get(
      Uri.parse('$baseUrl/cities'),
      headers: {'Authorization': 'Bearer $token'},
    );

    if (response.statusCode == 200) {
      List<dynamic> body = jsonDecode(response.body);
      return body.map((item) => City.fromJson(item)).toList();
    } else {
      throw Exception('Failed to load cities');
    }
  }

  Future<City> createCity(String token, String name, String region) async {
    final response = await http.post(
      Uri.parse('$baseUrl/cities'),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer $token'
      },
      body: jsonEncode({'name': name, 'region': region}),
    );

    if (response.statusCode == 201) {
      return City.fromJson(jsonDecode(response.body));
    } else {
      throw Exception('Failed to create city');
    }
  }

  Future<void> deleteCity(String token, String id) async {
    await http.delete(
      Uri.parse('$baseUrl/cities/$id'),
      headers: {'Authorization': 'Bearer $token'},
    );
  }

  // --- WEATHER ---
  Future<List<Weather>> getWeather(String token) async {
    final response = await http.get(
      Uri.parse('$baseUrl/weather'),
      headers: {'Authorization': 'Bearer $token'},
    );

    if (response.statusCode == 200) {
      List<dynamic> body = jsonDecode(response.body);
      return body.map((item) => Weather.fromJson(item)).toList();
    } else {
      throw Exception('Failed to load weather');
    }
  }

  Future<void> createWeather(String token, Map<String, dynamic> data) async {
    final response = await http.post(
      Uri.parse('$baseUrl/weather'),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer $token'
      },
      body: jsonEncode(data),
    );
    if (response.statusCode != 201) {
      throw Exception('Failed to create weather data');
    }
  }

  Future<void> deleteWeather(String token, String id) async {
    final response = await http.delete(
      Uri.parse('$baseUrl/weather/$id'),
      headers: {'Authorization': 'Bearer $token'},
    );

    if (response.statusCode != 200) {
      throw Exception('Failed to delete weather record');
    }
  }

  // --- USERS (Admin) ---
  Future<List<User>> getUsers(String token) async {
    final response = await http.get(
      Uri.parse('$baseUrl/users'),
      headers: {'Authorization': 'Bearer $token'},
    );

    if (response.statusCode == 200) {
      List<dynamic> body = jsonDecode(response.body);
      // Backend returns User without token here usually, so we need to handle that in User model if needed
      // or just map manually. Assuming User model works.
      return body.map((item) => User.fromJson({...item, 'token': ''})).toList();
    } else {
      throw Exception('Failed to load users');
    }
  }

  Future<void> deleteUser(String token, String id) async {
    await http.delete(
      Uri.parse('$baseUrl/users/$id'),
      headers: {'Authorization': 'Bearer $token'},
    );
  }

  // --- ADMIN (Stats & Reports) ---
  Future<Map<String, dynamic>> getStats(String token) async {
    final response = await http.get(
      Uri.parse('$baseUrl/admin/stats'),
      headers: {'Authorization': 'Bearer $token'},
    );

    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Failed to load stats');
    }
  }

  Future<Map<String, dynamic>> getReport(String token) async {
    final response = await http.get(
      Uri.parse('$baseUrl/admin/report'),
      headers: {'Authorization': 'Bearer $token'},
    );

    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Failed to load report');
    }
  }
}
