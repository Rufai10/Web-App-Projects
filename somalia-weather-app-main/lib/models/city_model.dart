class City {
  final String id;
  final String name;
  final String region;

  City({
    required this.id,
    required this.name,
    required this.region,
  });

  factory City.fromJson(Map<String, dynamic> json) {
    return City(
      id: json['_id']?.toString() ?? '',
      name: json['name']?.toString() ?? 'Unknown',
      region: json['region']?.toString() ?? 'Unknown',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      '_id': id,
      'name': name,
      'region': region,
    };
  }
}
