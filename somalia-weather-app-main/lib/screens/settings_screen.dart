import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:animate_do/animate_do.dart';
import '../providers/auth_provider.dart';
import '../providers/theme_provider.dart';
import '../providers/settings_provider.dart';

class SettingsScreen extends StatefulWidget {
  @override
  _SettingsScreenState createState() => _SettingsScreenState();
}

class _SettingsScreenState extends State<SettingsScreen> {
  void _showFeedback(BuildContext context, String feature) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('$feature feature coming soon!'),
        backgroundColor: Theme.of(context).primaryColor,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
        duration: Duration(seconds: 2),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final auth = Provider.of<AuthProvider>(context);
    final themeProvider = Provider.of<ThemeProvider>(context);
    final settings = Provider.of<SettingsProvider>(context);
    final user = auth.user;
    final theme = Theme.of(context);

    return Scaffold(
      backgroundColor: theme.scaffoldBackgroundColor,
      body: CustomScrollView(
        slivers: [
          SliverAppBar(
            expandedHeight: 120,
            pinned: true,
            backgroundColor: theme.scaffoldBackgroundColor,
            title: Text('Account Settings', style: TextStyle(fontWeight: FontWeight.bold)),
            centerTitle: true,
            flexibleSpace: FlexibleSpaceBar(
              background: Container(
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    colors: [theme.primaryColor.withOpacity(0.05), theme.scaffoldBackgroundColor],
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                  ),
                ),
              ),
            ),
          ),
          SliverToBoxAdapter(
            child: SingleChildScrollView(
              padding: EdgeInsets.fromLTRB(20, 0, 20, 120),
              child: Column(
                children: [
                  FadeInDown(
                    child: _buildProfileCard(user?.name ?? 'User', user?.email ?? 'user@example.com'),
                  ),
                  SizedBox(height: 30),
                  FadeInUp(
                    delay: Duration(milliseconds: 200),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Padding(
                          padding: const EdgeInsets.only(left: 10, bottom: 12),
                          child: Text('PREFERENCES', 
                            style: TextStyle(
                              fontSize: 12, 
                              fontWeight: FontWeight.w800, 
                              color: theme.primaryColor,
                              letterSpacing: 1.5
                            )
                          ),
                        ),
                        _buildSettingsCard([
                          _buildToggleTile(
                            'Temperature Unit',
                            'Switch to ${settings.isCelsius ? "Fahrenheit" : "Celsius"}',
                            Icons.thermostat_rounded,
                            settings.isCelsius,
                            (val) => settings.toggleTemperatureUnit(val),
                          ),
                          _buildDivider(),
                          _buildToggleTile(
                            'Dark Mode',
                            'Enable dark interface',
                            Icons.dark_mode_rounded,
                            themeProvider.themeMode == ThemeMode.dark,
                            (val) => themeProvider.toggleTheme(val),
                          ),
                          _buildDivider(),
                          _buildToggleTile(
                            'Auto Refresh',
                            'Update weather automatically',
                            Icons.refresh_rounded,
                            settings.autoRefresh,
                            (val) => settings.toggleAutoRefresh(val),
                          ),
                        ]),
                      ],
                    ),
                  ),
                  SizedBox(height: 30),
                  FadeInUp(
                    delay: Duration(milliseconds: 400),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Padding(
                          padding: const EdgeInsets.only(left: 10, bottom: 12),
                          child: Text('ABOUT', 
                            style: TextStyle(
                              fontSize: 12, 
                              fontWeight: FontWeight.w800, 
                              color: theme.primaryColor,
                              letterSpacing: 1.5
                            )
                          ),
                        ),
                        _buildSettingsCard([
                          _buildSimpleTile(
                            'Privacy Policy', 
                            'How we protect your data',
                            Icons.privacy_tip_outlined, 
                            onTap: () => _showFeedback(context, 'Privacy Policy'),
                          ),
                          _buildDivider(),
                          _buildSimpleTile(
                            'Terms of Service', 
                            'Standard usage terms',
                            Icons.description_outlined,
                            onTap: () => _showFeedback(context, 'Terms of Service'),
                          ),
                          _buildDivider(),
                          _buildSimpleTile(
                            'App Version', 
                            'Current version installed',
                            Icons.info_outline, 
                            trailing: '1.0.0',
                            onTap: () => _showFeedback(context, 'App Version: 1.0.0'),
                          ),
                        ]),
                      ],
                    ),
                  ),
                  SizedBox(height: 40),
                  FadeInUp(
                    delay: Duration(milliseconds: 600),
                    child: SizedBox(
                      width: double.infinity,
                      child: TextButton.icon(
                        onPressed: () => auth.logout(),
                        icon: Icon(Icons.logout_rounded, size: 20),
                        label: Text('SIGN OUT', style: TextStyle(fontWeight: FontWeight.bold, letterSpacing: 1.2)),
                        style: TextButton.styleFrom(
                          foregroundColor: Colors.redAccent,
                          padding: EdgeInsets.all(20),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(24),
                            side: BorderSide(color: Colors.redAccent.withOpacity(0.2)),
                          ),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildProfileCard(String name, String email) {
    return Container(
      padding: EdgeInsets.all(24),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [Theme.of(context).primaryColor, Theme.of(context).primaryColor.withOpacity(0.7)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(30),
        boxShadow: [
          BoxShadow(
            color: Theme.of(context).primaryColor.withOpacity(0.2),
            blurRadius: 20,
            offset: Offset(0, 10),
          )
        ],
      ),
      child: Row(
        children: [
          CircleAvatar(
            radius: 35,
            backgroundColor: Colors.white.withOpacity(0.2),
            child: Text(name[0].toUpperCase(), style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold, color: Colors.white)),
          ),
          SizedBox(width: 20),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(name, style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.white)),
                Text(email, style: TextStyle(fontSize: 14, color: Colors.white.withOpacity(0.8))),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSettingsCard(List<Widget> children) {
    final theme = Theme.of(context);
    return Container(
      decoration: BoxDecoration(
        color: theme.cardTheme.color,
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: theme.dividerColor.withOpacity(0.05)),
      ),
      child: Column(children: children),
    );
  }

  Widget _buildDivider() {
    return Divider(height: 1, indent: 60, color: Theme.of(context).dividerColor.withOpacity(0.05));
  }

  Widget _buildToggleTile(String title, String subtitle, IconData icon, bool value, ValueChanged<bool> onChanged) {
    final theme = Theme.of(context);
    return ListTile(
      contentPadding: EdgeInsets.symmetric(horizontal: 20, vertical: 4),
      leading: Container(
        padding: EdgeInsets.all(8),
        decoration: BoxDecoration(
          color: theme.primaryColor.withOpacity(0.1),
          borderRadius: BorderRadius.circular(10),
        ),
        child: Icon(icon, color: theme.primaryColor, size: 22),
      ),
      title: Text(title, style: TextStyle(fontWeight: FontWeight.w600, fontSize: 16)),
      subtitle: Text(subtitle, style: TextStyle(fontSize: 13, color: theme.textTheme.bodySmall?.color?.withOpacity(0.5))),
      trailing: Switch.adaptive(
        value: value,
        onChanged: onChanged,
        activeColor: theme.primaryColor,
      ),
    );
  }

  Widget _buildSimpleTile(String title, String subtitle, IconData icon, {String? trailing, VoidCallback? onTap}) {
    final theme = Theme.of(context);
    return ListTile(
      onTap: onTap,
      contentPadding: EdgeInsets.symmetric(horizontal: 20, vertical: 4),
      leading: Container(
        padding: EdgeInsets.all(8),
        decoration: BoxDecoration(
          color: theme.dividerColor.withOpacity(0.05),
          borderRadius: BorderRadius.circular(10),
        ),
        child: Icon(icon, color: theme.textTheme.bodySmall?.color?.withOpacity(0.6), size: 22),
      ),
      title: Text(title, style: TextStyle(fontWeight: FontWeight.w600, fontSize: 16)),
      subtitle: Text(subtitle, style: TextStyle(fontSize: 13, color: theme.textTheme.bodySmall?.color?.withOpacity(0.5))),
      trailing: trailing != null 
          ? Text(trailing, style: TextStyle(fontWeight: FontWeight.bold, color: theme.primaryColor))
          : Icon(Icons.arrow_forward_ios_rounded, size: 14, color: theme.dividerColor.withOpacity(0.3)),
    );
  }
}
