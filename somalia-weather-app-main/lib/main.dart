import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:google_fonts/google_fonts.dart';
import 'providers/auth_provider.dart';
import 'providers/theme_provider.dart';
import 'providers/settings_provider.dart';
import 'screens/login_screen.dart';
import 'screens/register_screen.dart';
import 'screens/main_wrapper.dart';
import 'theme/app_theme.dart';
import 'screens/admin/admin_dashboard_screen.dart';
import 'screens/admin/manage_users_screen.dart';
import 'screens/admin/manage_cities_screen.dart';
import 'screens/admin/manage_weather_screen.dart';
import 'screens/admin/statistics_screen.dart';
import 'screens/admin/weather_report_screen.dart';

void main() {
  // Disable runtime fetching of fonts to prevent web hangs on restricted networks
  GoogleFonts.config.allowRuntimeFetching = false;
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthProvider()),
        ChangeNotifierProvider(create: (_) => ThemeProvider()),
        ChangeNotifierProvider(create: (_) => SettingsProvider()),
      ],
      child: MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final themeProvider = Provider.of<ThemeProvider>(context);
    
    return MaterialApp(
      title: 'Somalia Weather System',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.lightTheme,
      darkTheme: AppTheme.darkTheme,
      themeMode: themeProvider.themeMode,
      home: Consumer<AuthProvider>(
        builder: (context, auth, _) {
          return auth.isAuthenticated ? MainWrapper() : LoginScreen();
        },
      ),
      routes: {
        '/register': (context) => RegisterScreen(),
        '/admin/users': (context) => ManageUsersScreen(),
        '/admin/cities': (context) => ManageCitiesScreen(),
        '/admin/weather': (context) => ManageWeatherScreen(),
        '/admin/stats': (context) => StatisticsScreen(),
        '/admin/report': (context) => WeatherReportScreen(),
      },
    );
  }
}
