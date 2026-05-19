import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTheme {
  // Brand Colors
  static const Color primaryBlue = Color(0xFF0061FF);
  static const Color darkBackground = Color(0xFF0F172A);
  static const Color cardBackground = Color(0xFF1E293B);
  static const Color accentCyan = Color(0xFF00F2FE);
  static const Color textMain = Colors.white;
  static const Color textSecondary = Color(0xFF94A3B8);

  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.light,
      primaryColor: primaryBlue,
      scaffoldBackgroundColor: const Color(0xFFF8FAFC),
      colorScheme: ColorScheme.fromSeed(
        seedColor: primaryBlue,
        brightness: Brightness.light,
        primary: primaryBlue,
        onPrimary: Colors.white,
        secondary: accentCyan,
        surface: Colors.white,
        onSurface: const Color(0xFF0F172A),
      ),
      textTheme: GoogleFonts.outfitTextTheme(ThemeData.light().textTheme),
      appBarTheme: AppBarTheme(
        backgroundColor: Colors.transparent,
        elevation: 0,
        scrolledUnderElevation: 0,
        centerTitle: true,
        titleTextStyle: GoogleFonts.outfit(
          color: const Color(0xFF0F172A),
          fontSize: 22,
          fontWeight: FontWeight.bold,
          letterSpacing: -0.5,
        ),
        iconTheme: const IconThemeData(color: Color(0xFF0F172A), size: 24),
      ),
      bottomNavigationBarTheme: const BottomNavigationBarThemeData(
        showSelectedLabels: false,
        showUnselectedLabels: false,
      ),
      cardTheme: CardThemeData(
        color: Colors.white,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(24),
          side: BorderSide(color: Colors.grey.withOpacity(0.1)),
        ),
      ),
    );
  }

  static ThemeData get darkTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      primaryColor: primaryBlue,
      scaffoldBackgroundColor: darkBackground,
      colorScheme: ColorScheme.fromSeed(
        seedColor: primaryBlue,
        brightness: Brightness.dark,
        primary: primaryBlue,
        onPrimary: Colors.white,
        secondary: accentCyan,
        surface: cardBackground,
        onSurface: Colors.white,
      ),
      textTheme: GoogleFonts.outfitTextTheme(ThemeData.dark().textTheme),
      appBarTheme: AppBarTheme(
        backgroundColor: Colors.transparent,
        elevation: 0,
        scrolledUnderElevation: 0,
        centerTitle: true,
        titleTextStyle: GoogleFonts.outfit(
          color: Colors.white,
          fontSize: 22,
          fontWeight: FontWeight.bold,
          letterSpacing: -0.5,
        ),
        iconTheme: const IconThemeData(color: Colors.white, size: 24),
      ),
      bottomNavigationBarTheme: const BottomNavigationBarThemeData(
        showSelectedLabels: false,
        showUnselectedLabels: false,
      ),
      cardTheme: CardThemeData(
        color: cardBackground,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(24),
          side: BorderSide(color: Colors.white.withOpacity(0.05)),
        ),
      ),
    );
  }
}
