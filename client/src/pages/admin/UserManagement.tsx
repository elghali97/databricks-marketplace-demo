import React from 'react';
import { UserRole } from '../../types/user';
import { Users, UserPlus, Search, Shield, Filter, MoreHorizontal, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  lastActive: string;
  dateJoined: string;
  status: 'active' | 'inactive';
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: UserRole.CONSUMER,
    lastActive: '2024-01-20',
    dateJoined: '2023-12-01',
    status: 'active'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: UserRole.ADMIN,
    lastActive: '2024-01-21',
    dateJoined: '2023-11-15',
    status: 'active'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@travelcorp.com',
    role: UserRole.PROVIDER,
    lastActive: '2024-01-19',
    dateJoined: '2023-10-12',
    status: 'active'
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah@airlinetech.com',
    role: UserRole.CONSUMER,
    lastActive: '2024-01-18',
    dateJoined: '2023-11-28',
    status: 'inactive'
  },
  // Add more mock users...
];

const UserManagement = () => {
  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return 'bg-purple-100 text-purple-800';
      case UserRole.PROVIDER:
        return 'bg-blue-100 text-blue-800';
      case UserRole.CONSUMER:
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-emerald-600" />;
      case 'inactive':
        return <Clock className="h-4 w-4 text-amber-600" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in px-6 py-8">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 text-white shadow-lg">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-slate-800 tracking-tight" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
              User Management
            </h1>
            <p className="text-slate-600 text-lg" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
              Manage user accounts, roles, and permissions
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-slate-700 to-slate-800 text-white rounded-xl hover:from-slate-800 hover:to-slate-900 transition-all duration-200 font-bold text-sm shadow-lg hover:shadow-xl">
            <UserPlus className="h-5 w-5" />
            <span>Add User</span>
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white border border-slate-300 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl shadow-md">
              <Users className="w-7 h-7 text-slate-700" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-600" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>Total Users</p>
              <p className="text-3xl font-bold text-slate-800" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>1,667</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-slate-300 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl shadow-md">
              <CheckCircle className="w-7 h-7 text-emerald-700" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-600" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>Active Users</p>
              <p className="text-3xl font-bold text-slate-800" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>1,534</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-slate-300 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl shadow-md">
              <Shield className="w-7 h-7 text-blue-700" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-600" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>Providers</p>
              <p className="text-3xl font-bold text-slate-800" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>29</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-slate-300 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl shadow-md">
              <Shield className="w-7 h-7 text-purple-700" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-600" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>Admins</p>
              <p className="text-3xl font-bold text-slate-800" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>5</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white border border-slate-300 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <Search className="h-5 w-5 text-slate-500" />
            <input
              type="text"
              placeholder="Search users by name or email..."
              className="flex-1 px-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}
            />
          </div>
          <div className="flex items-center space-x-3">
            <select className="px-4 py-2 bg-white border border-slate-300 rounded-xl text-sm font-medium text-slate-700 shadow-sm hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent">
              <option value="">All Roles</option>
              <option value="admin">Admin</option>
              <option value="provider">Provider</option>
              <option value="consumer">Consumer</option>
            </select>
            <select className="px-4 py-2 bg-white border border-slate-300 rounded-xl text-sm font-medium text-slate-700 shadow-sm hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent">
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white border border-slate-300 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-800" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                All Users
              </h3>
              <p className="text-sm text-slate-600" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                Manage user accounts and permissions
              </p>
            </div>
            <div className="text-sm text-slate-500" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
              Showing {mockUsers.length} users
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                  Role
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                  Last Active
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {mockUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-slate-400 to-slate-500 flex items-center justify-center text-white font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-bold text-slate-800" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                          {user.name}
                        </div>
                        <div className="text-sm text-slate-500" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(user.status)}
                      <span className="ml-2 text-sm font-medium text-slate-700" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                    {user.lastActive}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="p-2 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-500" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
              Showing 1-{mockUsers.length} of 1,667 users
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-4 py-2 bg-white border border-slate-300 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                Previous
              </button>
              <button className="px-4 py-2 bg-slate-700 text-white rounded-xl text-sm font-medium hover:bg-slate-800 transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;