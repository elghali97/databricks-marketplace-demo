import React from 'react';
import { UserRole } from '../../types/user';
import { Users, UserPlus, Search, Shield, Filter, MoreHorizontal } from 'lucide-react';

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
  }
];

const UserManagement = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-secondary-600 to-secondary-700 text-white">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">User Management</h1>
            <p className="text-neutral-600">Manage user accounts, roles, and permissions</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all duration-200 font-medium shadow-sm">
            <UserPlus className="h-4 w-4" />
            <span>Add User</span>
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-xl">
              <Users className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-600">Total Users</p>
              <p className="text-2xl font-bold text-neutral-900">1,456</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-12 h-12 bg-success-100 rounded-xl">
              <Users className="w-6 h-6 text-success-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-600">Active Users</p>
              <p className="text-2xl font-bold text-neutral-900">1,328</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-12 h-12 bg-secondary-100 rounded-xl">
              <Shield className="w-6 h-6 text-secondary-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-600">Providers</p>
              <p className="text-2xl font-bold text-neutral-900">78</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-12 h-12 bg-warning-100 rounded-xl">
              <Users className="w-6 h-6 text-warning-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-600">Admins</p>
              <p className="text-2xl font-bold text-neutral-900">12</p>
            </div>
          </div>
        </div>
      </div>

      {/* User Table */}
      <div className="bg-white border border-neutral-200 rounded-xl shadow-sm">
        <div className="p-6 border-b border-neutral-200">
          <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
            <div className="flex items-center space-x-3">
              <Search className="h-5 w-5 text-neutral-500" />
              <h2 className="text-lg font-semibold text-neutral-900">User Directory</h2>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search users..."
                  className="pl-10 pr-4 py-2 w-64 bg-white border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-neutral-500" />
                <select className="px-3 py-2 bg-white border border-neutral-200 rounded-lg text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                  <option value="all">All Roles</option>
                  <option value="admin">Admin</option>
                  <option value="provider">Provider</option>
                  <option value="user">User</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-neutral-200">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Last Active</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Date Joined</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {mockUsers.map((user) => (
                <tr key={user.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center text-white font-semibold text-sm">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-neutral-900">{user.name}</div>
                        <div className="text-sm text-neutral-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      user.role === UserRole.ADMIN ? 'bg-secondary-100 text-secondary-800' : 
                      user.role === UserRole.PROVIDER ? 'bg-primary-100 text-primary-800' :
                      'bg-neutral-100 text-neutral-800'
                    }`}>
                      {user.role === UserRole.ADMIN && <Shield className="w-3 h-3 mr-1" />}
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      user.status === 'active' ? 'bg-success-100 text-success-800' : 'bg-error-100 text-error-800'
                    }`}>
                      <div className={`w-2 h-2 rounded-full mr-2 ${
                        user.status === 'active' ? 'bg-success-600' : 'bg-error-600'
                      }`}></div>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">{user.lastActive}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">{user.dateJoined}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-neutral-100 text-neutral-500 hover:text-neutral-700 transition-colors">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 border-t border-neutral-200 bg-neutral-50">
          <div className="flex items-center justify-between text-sm text-neutral-600">
            <span>Showing 4 of 1,456 users</span>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 border border-neutral-200 rounded text-neutral-500 hover:text-neutral-700 hover:bg-white transition-colors">
                Previous
              </button>
              <button className="px-3 py-1 bg-primary-600 text-white rounded hover:bg-primary-700 transition-colors">
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