import 'package:flutter/material.dart';
import 'package:animate_do/animate_do.dart';

class WelcomeHomeScreen extends StatelessWidget {
  final List<Map<String, String>> images = [
    {
      'url': 'assets/images/coastal.jpg',
      'label': 'Mogadishu Coastal'
    },
    {
      'url': 'assets/images/hero.jpg',
      'label': 'Somali Landscapes'
    },
    {
      'url': 'assets/images/mosque.jpg',
      'label': 'Hamar Weyne Mosque'
    },
    {
      'url': 'assets/images/coastal.jpg',
      'label': 'Ocean View'
    },
    {
      'url': 'assets/images/hero.jpg',
      'label': 'Weather Horizons'
    },
    {
      'url': 'assets/images/mosque.jpg',
      'label': 'Islamic Heritage'
    },
  ];

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Scaffold(
      backgroundColor: theme.scaffoldBackgroundColor,
      appBar: AppBar(
        title: Text('Somali Weather System'),
        centerTitle: true,
      ),
      body: CustomScrollView(
        slivers: [
          // Modern Hero Header in SliverToBoxAdapter
          SliverToBoxAdapter(
            child: Container(
              height: 350,
              width: double.infinity,
              child: Stack(
                fit: StackFit.expand,
                children: [
                  Image.asset(
                    'assets/images/hero.jpg',
                    fit: BoxFit.cover,
                  ),
                  Container(
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        begin: Alignment.topCenter,
                        end: Alignment.bottomCenter,
                        colors: [
                          theme.scaffoldBackgroundColor.withOpacity(0.2),
                          theme.scaffoldBackgroundColor,
                        ],
                      ),
                    ),
                  ),
                  Center(
                    child: FadeInDown(
                      child: Container(
                        padding: EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                        decoration: BoxDecoration(
                          color: Colors.black26,
                          borderRadius: BorderRadius.circular(20),
                          border: Border.all(color: Colors.white24),
                        ),
                        child: Text(
                          'Experience the Future\nof Forecast',
                          textAlign: TextAlign.center,
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                            color: Colors.white,
                            fontSize: 24,
                            letterSpacing: 1.2,
                          ),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),

          // Content Section
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  SizedBox(height: 20),
                  FadeInLeft(
                    child: Row(
                      children: [
                        Container(
                          width: 40,
                          height: 4,
                          decoration: BoxDecoration(
                            color: Colors.blueAccent,
                            borderRadius: BorderRadius.circular(2),
                          ),
                        ),
                        SizedBox(width: 12),
                        Text(
                          'PROJECT OVERVIEW',
                          style: TextStyle(
                            color: Colors.blueAccent,
                            fontWeight: FontWeight.w800,
                            letterSpacing: 2,
                            fontSize: 12,
                          ),
                        ),
                      ],
                    ),
                  ),
                  SizedBox(height: 16),
                  FadeInUp(
                    child: Text(
                      'Empowering the Nation with Precise Data',
                      style: TextStyle(
                        fontSize: 32,
                        fontWeight: FontWeight.bold,
                        color: theme.textTheme.titleLarge?.color,
                        height: 1.1,
                      ),
                    ),
                  ),
                  SizedBox(height: 24),
                  FadeInUp(
                    delay: Duration(milliseconds: 200),
                    child: Text(
                      'Our mission is to provide reliable, real-time meteorological insights to every citizen across Somalia. Harnessing advanced satellite imaging and local data hubs, we bring accuracy to your daily forecast.',
                      style: TextStyle(
                        color: theme.textTheme.bodyMedium?.color?.withOpacity(0.7),
                        fontSize: 17,
                        height: 1.6,
                      ),
                    ),
                  ),
                  SizedBox(height: 40),
                  
                  // Feature Cards
                  _buildProfessionalCard(
                    context,
                    'Smart Analytics',
                    'Advanced algorithms predicting regional trends.',
                    Icons.auto_graph_rounded,
                  ),
                  SizedBox(height: 16),
                  _buildProfessionalCard(
                    context,
                    'Regional Hubs',
                    'Expanding network covering 15+ major cities.',
                    Icons.location_on_rounded,
                  ),
                  
                  SizedBox(height: 60),
                  
                  // Visual Gallery Header
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'Somalia in Pictures',
                        style: TextStyle(
                          fontSize: 22,
                          fontWeight: FontWeight.bold,
                          color: theme.textTheme.titleLarge?.color,
                        ),
                      ),
                      TextButton(
                        onPressed: () {},
                        child: Text('View All', style: TextStyle(color: Colors.blueAccent)),
                      ),
                    ],
                  ),
                  SizedBox(height: 20),
                ],
              ),
            ),
          ),

          // Visual Gallery Grid (3x3 style)
          SliverPadding(
            padding: const EdgeInsets.symmetric(horizontal: 24),
            sliver: SliverGrid(
              gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 3,
                mainAxisSpacing: 16,
                crossAxisSpacing: 16,
                childAspectRatio: 0.8, // Adjust for slightly taller images
              ),
              delegate: SliverChildBuilderDelegate(
                (context, index) {
                  return FadeInUp(
                    delay: Duration(milliseconds: index * 50),
                    child: ClipRRect(
                      borderRadius: BorderRadius.circular(16),
                      child: Stack(
                        fit: StackFit.expand,
                        children: [
                          Image.asset(
                            images[index]['url']!,
                            fit: BoxFit.cover,
                          ),
                          Container(
                            decoration: BoxDecoration(
                              gradient: LinearGradient(
                                begin: Alignment.topCenter,
                                end: Alignment.bottomCenter,
                                colors: [Colors.transparent, Colors.black54],
                              ),
                            ),
                          ),
                          Positioned(
                            bottom: 8,
                            left: 8,
                            right: 8,
                            child: Text(
                              images[index]['label']!,
                              textAlign: TextAlign.center,
                              maxLines: 2,
                              overflow: TextOverflow.ellipsis,
                              style: TextStyle(
                                color: Colors.white,
                                fontWeight: FontWeight.bold,
                                fontSize: 10,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  );
                },
                childCount: images.length,
              ),
            ),
          ),

          SliverToBoxAdapter(child: SizedBox(height: 120)), // Extra space for floating nav

          // Footer Section
          SliverToBoxAdapter(
            child: _buildFooter(context),
          ),
        ],
      ),
    );
  }

  Widget _buildProfessionalCard(BuildContext context, String title, String desc, IconData icon) {
    final theme = Theme.of(context);
    return Container(
      padding: EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: theme.cardTheme.color,
        borderRadius: BorderRadius.circular(24),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.05),
            blurRadius: 10,
            offset: Offset(0, 4),
          )
        ],
      ),
      child: Row(
        children: [
          Container(
            padding: EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: Colors.blueAccent.withOpacity(0.1),
              borderRadius: BorderRadius.circular(16),
            ),
            child: Icon(icon, color: Colors.blueAccent, size: 28),
          ),
          SizedBox(width: 20),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: TextStyle(
                    color: theme.textTheme.titleMedium?.color,
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                SizedBox(height: 6),
                Text(
                  desc,
                  style: TextStyle(
                    color: theme.textTheme.bodySmall?.color?.withOpacity(0.6),
                    fontSize: 15,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildFooter(BuildContext context) {
    final theme = Theme.of(context);
    return Container(
      padding: EdgeInsets.all(40),
      color: theme.brightness == Brightness.dark ? Color(0xFF020617) : Color(0xFFF1F5F9),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(Icons.cloud_sync_rounded, color: Colors.blueAccent, size: 32),
              SizedBox(width: 12),
              Text(
                'SWIS',
                style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.w900,
                  color: theme.textTheme.titleLarge?.color,
                  letterSpacing: 1.5,
                ),
              ),
            ],
          ),
          SizedBox(height: 30),
          Text(
            'The official Somalia Weather Information System. Providing accurate data for a resilient future.',
            textAlign: TextAlign.center,
            style: TextStyle(
              color: theme.textTheme.bodySmall?.color?.withOpacity(0.6),
              fontSize: 14,
              height: 1.5,
            ),
          ),
          SizedBox(height: 40),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              _buildSocialIcon(Icons.facebook),
              SizedBox(width: 20),
              _buildSocialIcon(Icons.camera_alt_outlined),
              SizedBox(width: 20),
              _buildSocialIcon(Icons.language_rounded),
            ],
          ),
          SizedBox(height: 40),
          Divider(color: theme.dividerColor.withOpacity(0.1)),
          SizedBox(height: 20),
          Text(
            '© 2026 SWIS Project. All rights reserved.',
            style: TextStyle(color: theme.textTheme.bodySmall?.color?.withOpacity(0.4), fontSize: 12),
          ),
          SizedBox(height: 10),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text('Privacy Policy', style: TextStyle(color: Colors.blueAccent, fontSize: 12)),
              SizedBox(width: 20),
              Text('Terms of Use', style: TextStyle(color: Colors.blueAccent, fontSize: 12)),
              SizedBox(width: 20),
              Text('Contact', style: TextStyle(color: Colors.blueAccent, fontSize: 12)),
            ],
          ),
          SizedBox(height: 20),
        ],
      ),
    );
  }

  Widget _buildSocialIcon(IconData icon) {
    return Container(
      padding: EdgeInsets.all(10),
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        color: Colors.blueAccent.withOpacity(0.1),
      ),
      child: Icon(icon, color: Colors.blueAccent, size: 20),
    );
  }
}
