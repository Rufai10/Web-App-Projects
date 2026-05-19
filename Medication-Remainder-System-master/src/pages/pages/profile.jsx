import { Link } from 'react-router-dom';

export default function UserProfile() {
  // Mock user data (replace with real data or props)
  const user = {
    username: 'john_doe',
    email: 'john@example.com',
    role: 'User',
    fullName: 'John Doe',
    phoneNumber: '+252 612345678',
    gender: 'Male',
    dob: '1995-04-12',
    address: 'Mogadishu, Somalia',
    createdAt: '2024-01-15',
  };

  const fields = [
    ['Username', user.username],
    ['Email', user.email],
    ['Role', user.role],
    ['Full Name', user.fullName],
    ['Phone Number', user.phoneNumber],
    ['Gender', user.gender],
    ['Date of Birth', user.dob],
    ['Address', user.address],
    ['Account Created', user.createdAt],
  ];

  return (
    <div className="min-h-screen bg-gray-100 font-sans py-10 px-4">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-xl p-6 animate-fade-in">
        <div className="text-center mb-6">
          <div className="text-blue-600 text-6xl mb-2">
            <i className="bi bi-person-circle"></i>
          </div>
          <h3 className="text-2xl font-semibold">👤 User Profile</h3>
        </div>

        <ul className="divide-y divide-gray-200">
          {fields.map(([label, value], index) => (
            <li key={index} className="py-3 flex justify-between">
              <span className="font-semibold text-gray-700">{label}:</span>
              <span className="text-gray-600">{value}</span>
            </li>
          ))}
        </ul>

        <div className="text-center mt-6">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 border border-blue-500 text-blue-500 hover:bg-blue-50 px-5 py-2 rounded-full transition"
          >
            <i className="bi bi-arrow-left-circle"></i> Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
