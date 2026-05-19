import 'package:flutter/material.dart';
import 'package:animate_do/animate_do.dart';
import '../../services/api_service.dart';
import '../../providers/auth_provider.dart';
import 'package:provider/provider.dart';

class AdminDashboardScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    
    return Scaffold(
      body: CustomScrollView(
        slivers: [
          SliverAppBar(
            expandedHeight: 150,
            pinned: true,
            flexibleSpace: FlexibleSpaceBar(
              title: Text('Admin Control Panel', style: TextStyle(fontWeight: FontWeight.bold)),
              background: Container(
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    colors: [theme.primaryColor, theme.primaryColor.withOpacity(0.7)],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                ),
              ),
            ),
          ),
          SliverPadding(
            padding: EdgeInsets.all(20),
            sliver: SliverGrid(
              gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 2,
                mainAxisSpacing: 20,
                crossAxisSpacing: 20,
                childAspectRatio: 1.1,
              ),
              delegate: SliverChildListDelegate([
                _buildAdminCard(
                  context,
                  'Manage Users',
                  Icons.people_alt_rounded,
                  Colors.blue,
                  () => Navigator.pushNamed(context, '/admin/users'),
                ),
                _buildAdminCard(
                  context,
                  'Manage Cities',
                  Icons.location_city_rounded,
                  Colors.orange,
                  () => Navigator.pushNamed(context, '/admin/cities'),
                ),
                _buildAdminCard(
                  context,
                  'Weather Data',
                  Icons.wb_cloudy_rounded,
                  Colors.teal,
                  () => Navigator.pushNamed(context, '/admin/weather'),
                ),
                _buildAdminCard(
                  context,
                  'Statistics',
                  Icons.analytics_rounded,
                  Colors.purple,
                  () => Navigator.pushNamed(context, '/admin/stats'),
                ),
                _buildAdminCard(
                  context,
                  'Weather Report',
                  Icons.assessment_rounded,
                  Colors.indigo,
                  () => Navigator.pushNamed(context, '/admin/report'),
                ),
              ]),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildAdminCard(BuildContext context, String title, IconData icon, Color color, VoidCallback onTap) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    
    return FadeInUp(
      child: GestureDetector(
        onTap: onTap,
        child: Container(
          decoration: BoxDecoration(
            color: isDark ? Colors.grey[900] : Colors.white,
            borderRadius: BorderRadius.circular(20),
            boxShadow: [
              BoxShadow(
                color: color.withOpacity(0.2),
                blurRadius: 10,
                offset: Offset(0, 5),
              ),
            ],
          ),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(icon, size: 40, color: color),
              SizedBox(height: 12),
              Text(
                title,
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 14,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
