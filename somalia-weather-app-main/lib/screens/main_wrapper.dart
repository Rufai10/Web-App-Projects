import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart';
import 'dashboard_screen.dart';
import 'explore_screen.dart';
import 'settings_screen.dart';
import 'welcome_home_screen.dart';
import 'admin/admin_dashboard_screen.dart';

class MainWrapper extends StatefulWidget {
  @override
  _MainWrapperState createState() => _MainWrapperState();
}

class _MainWrapperState extends State<MainWrapper> {
  int _selectedIndex = 0;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    final auth = Provider.of<AuthProvider>(context);
    final isAdmin = auth.user?.role == 'Admin';

    final List<Widget> screens = isAdmin 
      ? [
          WelcomeHomeScreen(),
          AdminDashboardScreen(),
          SettingsScreen(),
        ]
      : [
          WelcomeHomeScreen(),
          DashboardScreen(),
          ExploreScreen(),
          SettingsScreen(),
        ];

    return Scaffold(
      extendBody: true,
      body: IndexedStack(
        index: _selectedIndex,
        children: screens,
      ),
      bottomNavigationBar: Container(
        margin: EdgeInsets.all(24),
        height: 70,
        decoration: BoxDecoration(
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(isDark ? 0.3 : 0.1),
              blurRadius: 20,
              offset: Offset(0, 10),
            ),
          ],
        ),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(25),
          child: BackdropFilter(
            filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
            child: Container(
              padding: EdgeInsets.symmetric(horizontal: 10),
              color: (isDark ? Colors.black : Colors.white).withOpacity(0.7),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: isAdmin 
                  ? [
                      _buildNavItem(0, Icons.info_rounded, 'About'),
                      _buildNavItem(1, Icons.admin_panel_settings_rounded, 'Admin'),
                      _buildNavItem(2, Icons.person_rounded, 'Account'),
                    ]
                  : [
                      _buildNavItem(0, Icons.info_rounded, 'About'),
                      _buildNavItem(1, Icons.wb_sunny_rounded, 'Today'),
                      _buildNavItem(2, Icons.explore_rounded, 'Cities'),
                      _buildNavItem(3, Icons.person_rounded, 'Account'),
                    ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildNavItem(int index, IconData icon, String label) {
    final isSelected = _selectedIndex == index;
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return GestureDetector(
      onTap: () => setState(() => _selectedIndex = index),
      behavior: HitTestBehavior.opaque,
      child: AnimatedContainer(
        duration: Duration(milliseconds: 300),
        curve: Curves.easeInOut,
        padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        decoration: BoxDecoration(
          color: isSelected 
              ? theme.primaryColor.withOpacity(0.1) 
              : Colors.transparent,
          borderRadius: BorderRadius.circular(15),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              icon,
              color: isSelected 
                  ? theme.primaryColor 
                  : (isDark ? Colors.white54 : Colors.grey),
              size: 26,
            ),
            if (isSelected)
              Container(
                margin: EdgeInsets.only(top: 4),
                width: 4,
                height: 4,
                decoration: BoxDecoration(
                  color: theme.primaryColor,
                  shape: BoxShape.circle,
                ),
              ),
          ],
        ),
      ),
    );
  }
}
