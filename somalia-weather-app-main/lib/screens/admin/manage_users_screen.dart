import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../providers/auth_provider.dart';
import '../../services/api_service.dart';
import '../../models/user_model.dart';

class ManageUsersScreen extends StatefulWidget {
  @override
  _ManageUsersScreenState createState() => _ManageUsersScreenState();
}

class _ManageUsersScreenState extends State<ManageUsersScreen> {
  final ApiService _apiService = ApiService();
  List<User> _users = [];
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _fetchUsers();
  }

  Future<void> _fetchUsers() async {
    final auth = Provider.of<AuthProvider>(context, listen: false);
    try {
      final users = await _apiService.getUsers(auth.user?.token ?? '');
      setState(() {
        _users = users;
        _isLoading = false;
      });
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Error: $e')));
    }
  }

  Future<void> _deleteUser(String id) async {
    final auth = Provider.of<AuthProvider>(context, listen: false);
    try {
      await _apiService.deleteUser(auth.user?.token ?? '', id);
      _fetchUsers();
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('User deleted')));
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Error: $e')));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Manage Users')),
      body: _isLoading 
        ? Center(child: CircularProgressIndicator())
        : ListView.builder(
            itemCount: _users.length,
            itemBuilder: (context, index) {
              final user = _users[index];
              return ListTile(
                title: Text(user.name),
                subtitle: Text(user.email),
                trailing: user.role == 'Admin' 
                  ? Icon(Icons.verified_user) 
                  : IconButton(
                      icon: Icon(Icons.delete, color: Colors.red),
                      onPressed: () => _deleteUser(user.id),
                    ),
              );
            },
          ),
    );
  }
}
