import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:animate_do/animate_do.dart';
import '../providers/auth_provider.dart';

class LoginScreen extends StatefulWidget {
  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();

  void _submit() async {
    if (_formKey.currentState!.validate()) {
      try {
        await Provider.of<AuthProvider>(context, listen: false).login(
          _emailController.text,
          _passwordController.text,
        );
      } catch (e) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(e.toString()),
            backgroundColor: Colors.redAccent,
            behavior: SnackBarBehavior.floating,
          ),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [Color(0xFF0F172A), Color(0xFF1E293B)],
          ),
        ),
        child: SafeArea(
          child: Padding(
            padding: EdgeInsets.symmetric(horizontal: 30.0),
            child: Form(
              key: _formKey,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  FadeInDown(
                    duration: Duration(milliseconds: 800),
                    child: Text(
                      'Welcome Back',
                      style: TextStyle(
                        fontSize: 32,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                    ),
                  ),
                  FadeInDown(
                    duration: Duration(milliseconds: 1000),
                    child: Text(
                      'Check the skies of Somalia',
                      style: TextStyle(
                        fontSize: 16,
                        color: Colors.white70,
                      ),
                    ),
                  ),
                  SizedBox(height: 50),
                  FadeInUp(
                    child: TextFormField(
                      controller: _emailController,
                      style: TextStyle(color: Colors.white),
                      decoration: InputDecoration(
                        hintText: 'Email',
                        hintStyle: TextStyle(color: Colors.white38),
                        prefixIcon: Icon(Icons.email_outlined, color: Colors.blueAccent),
                      ),
                      validator: (val) => val!.isEmpty ? 'Enter email' : null,
                    ),
                  ),
                  SizedBox(height: 20),
                  FadeInUp(
                    delay: Duration(milliseconds: 200),
                    child: TextFormField(
                      controller: _passwordController,
                      obscureText: true,
                      style: TextStyle(color: Colors.white),
                      decoration: InputDecoration(
                        hintText: 'Password',
                        hintStyle: TextStyle(color: Colors.white38),
                        prefixIcon: Icon(Icons.lock_outline, color: Colors.blueAccent),
                      ),
                      validator: (val) => val!.length < 6 ? 'Password too short' : null,
                    ),
                  ),
                  SizedBox(height: 40),
                  FadeInUp(
                    delay: Duration(milliseconds: 400),
                    child: Consumer<AuthProvider>(
                      builder: (context, auth, _) => auth.isLoading
                          ? Center(child: CircularProgressIndicator())
                          : Container(
                              width: double.infinity,
                              height: 60,
                              decoration: BoxDecoration(
                                borderRadius: BorderRadius.circular(15),
                                gradient: LinearGradient(
                                  colors: [Color(0xFF007AFF), Color(0xFF38BDF8)],
                                ),
                              ),
                              child: ElevatedButton(
                                onPressed: _submit,
                                style: ElevatedButton.styleFrom(
                                  backgroundColor: Colors.transparent,
                                  shadowColor: Colors.transparent,
                                  shape: RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(15),
                                  ),
                                ),
                                child: Text(
                                  'Login',
                                  style: TextStyle(
                                    fontSize: 18,
                                    fontWeight: FontWeight.bold,
                                    color: Colors.white,
                                  ),
                                ),
                              ),
                            ),
                    ),
                  ),
                  SizedBox(height: 20),
                  FadeInUp(
                    delay: Duration(milliseconds: 600),
                    child: Center(
                      child: TextButton(
                        onPressed: () => Navigator.pushNamed(context, '/register'),
                        child: Text(
                          "Don't have an account? Register",
                          style: TextStyle(color: Colors.blueAccent),
                        ),
                      ),
                    ),
                  )
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
