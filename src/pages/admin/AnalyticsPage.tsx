import React from 'react';
import { BarChart3, Users, Database, TrendingUp, Activity, Filter } from 'lucide-react';

function AnalyticsPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-secondary-600 to-secondary-700 text-white">
            <BarChart3 className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">Analytics Dashboard</h1>
            <p className="text-neutral-600">Comprehensive marketplace performance insights</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-neutral-500" />
            <select className="px-4 py-2 bg-white border border-neutral-200 rounded-lg text-sm font-medium text-neutral-700 shadow-sm hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-xl">
              <Users className="w-6 h-6 text-primary-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-neutral-600">Total Users</p>
              <p className="text-2xl font-bold text-neutral-900">2,543</p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-success-600 mr-2" />
            <span className="text-success-600 font-semibold">+12%</span>
            <span className="text-neutral-500 ml-2">vs last month</span>
          </div>
        </div>

        <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-12 h-12 bg-secondary-100 rounded-xl">
              <Database className="w-6 h-6 text-secondary-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-neutral-600">Total Datasets</p>
              <p className="text-2xl font-bold text-neutral-900">847</p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-success-600 mr-2" />
            <span className="text-success-600 font-semibold">+8%</span>
            <span className="text-neutral-500 ml-2">vs last month</span>
          </div>
        </div>

        <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-12 h-12 bg-success-100 rounded-xl">
              <Activity className="w-6 h-6 text-success-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-neutral-600">Active Users</p>
              <p className="text-2xl font-bold text-neutral-900">1,829</p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-success-600 mr-2" />
            <span className="text-success-600 font-semibold">+15%</span>
            <span className="text-neutral-500 ml-2">vs last month</span>
          </div>
        </div>

        <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-12 h-12 bg-warning-100 rounded-xl">
              <TrendingUp className="w-6 h-6 text-warning-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-neutral-600">Growth Rate</p>
              <p className="text-2xl font-bold text-neutral-900">23%</p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-success-600 mr-2" />
            <span className="text-success-600 font-semibold">+5%</span>
            <span className="text-neutral-500 ml-2">vs last month</span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-neutral-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="p-6 border-b border-neutral-200">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-100">
                <Users className="h-5 w-5 text-primary-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-neutral-900">User Activity</h2>
                <p className="text-sm text-neutral-600">Daily active users trend</p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-neutral-200 rounded-xl bg-neutral-50">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
                <p className="text-neutral-500 font-medium">Activity Chart</p>
                <p className="text-xs text-neutral-400">Chart implementation pending</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-neutral-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="p-6 border-b border-neutral-200">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-secondary-100">
                <Database className="h-5 w-5 text-secondary-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-neutral-900">Dataset Growth</h2>
                <p className="text-sm text-neutral-600">Monthly dataset additions</p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-neutral-200 rounded-xl bg-neutral-50">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
                <p className="text-neutral-500 font-medium">Growth Chart</p>
                <p className="text-xs text-neutral-400">Chart implementation pending</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;