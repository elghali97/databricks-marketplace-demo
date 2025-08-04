import React from 'react';
import { BarChart3, Users, Database, TrendingUp, Activity, Filter, DollarSign, Download } from 'lucide-react';
import { analyticsData } from '../../data/mockData';
import { formatNumber, formatCurrency } from '../../utils/formatters';

function AnalyticsPage() {
  return (
    <div className="space-y-8 animate-fade-in px-6 py-8">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 text-white shadow-lg">
            <BarChart3 className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-slate-800 tracking-tight" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
              Analytics Dashboard
            </h1>
            <p className="text-slate-600 text-lg" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
              Comprehensive marketplace performance insights
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-slate-500" />
            <select className="px-4 py-2 bg-white border border-slate-300 rounded-xl text-sm font-medium text-slate-700 shadow-sm hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent">
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white border border-slate-300 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl shadow-md">
              <Users className="w-7 h-7 text-slate-700" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-slate-600" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>Total Users</p>
              <p className="text-3xl font-bold text-slate-800" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                {formatNumber(analyticsData.activeUsers)}
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-emerald-600 mr-2" />
            <span className="text-emerald-700 font-bold">+12%</span>
            <span className="text-slate-500 ml-2 font-medium" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>vs last month</span>
          </div>
        </div>

        <div className="bg-white border border-slate-300 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl shadow-md">
              <Database className="w-7 h-7 text-blue-700" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-slate-600" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>Total Datasets</p>
              <p className="text-3xl font-bold text-slate-800" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                {formatNumber(analyticsData.totalDatasets)}
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-emerald-600 mr-2" />
            <span className="text-emerald-700 font-bold">+8%</span>
            <span className="text-slate-500 ml-2 font-medium" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>vs last month</span>
          </div>
        </div>

        <div className="bg-white border border-slate-300 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl shadow-md">
              <DollarSign className="w-7 h-7 text-emerald-700" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-slate-600" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>Revenue</p>
              <p className="text-3xl font-bold text-slate-800" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                {formatCurrency(analyticsData.revenueGenerated)}
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-emerald-600 mr-2" />
            <span className="text-emerald-700 font-bold">+22%</span>
            <span className="text-slate-500 ml-2 font-medium" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>vs last month</span>
          </div>
        </div>

        <div className="bg-white border border-slate-300 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl shadow-md">
              <Download className="w-7 h-7 text-purple-700" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-slate-600" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>Downloads</p>
              <p className="text-3xl font-bold text-slate-800" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                {formatNumber(analyticsData.totalDownloads)}
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-emerald-600 mr-2" />
            <span className="text-emerald-700 font-bold">+18%</span>
            <span className="text-slate-500 ml-2 font-medium" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>vs last month</span>
          </div>
        </div>
      </div>

      {/* Category Distribution */}
      <div className="bg-white border border-slate-300 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 shadow-md">
              <BarChart3 className="h-6 w-6 text-slate-700" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-800 tracking-tight" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                Dataset Distribution by Category
              </h3>
              <p className="text-sm text-slate-600" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                Breakdown of datasets across financial data categories
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {analyticsData.topCategories.map((category, index) => {
            const colors = [
              { bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-300' },
              { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-300' },
              { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300' },
              { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-300' },
              { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-300' },
              { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300' },
              { bg: 'bg-pink-100', text: 'text-pink-700', border: 'border-pink-300' },
              { bg: 'bg-indigo-100', text: 'text-indigo-700', border: 'border-indigo-300' }
            ];
            const color = colors[index % colors.length];
            
            return (
              <div key={category.name} className={`p-6 rounded-2xl border-2 ${color.border} ${color.bg} transition-all duration-300 hover:shadow-lg`}>
                <div className="text-center">
                  <div className={`text-3xl font-bold ${color.text}`} style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                    {category.value}
                  </div>
                  <div className="text-sm font-bold text-slate-600 mt-2" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                    {category.name.replace('_', ' & ').replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                  <div className="text-xs text-slate-500 mt-1" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                    {((category.value / analyticsData.totalDatasets) * 100).toFixed(1)}% of total
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white border border-slate-300 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200">
                <Activity className="h-5 w-5 text-slate-700" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-800" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>System Performance</h4>
                <p className="text-sm text-slate-600" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>Real-time metrics</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>API Response Time</span>
              <span className="text-sm font-bold text-emerald-600">127ms</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>System Uptime</span>
              <span className="text-sm font-bold text-emerald-600">99.8%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '99.8%' }}></div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>Data Quality Score</span>
              <span className="text-sm font-bold text-blue-600">94.2%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '94.2%' }}></div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-300 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200">
                <Users className="h-5 w-5 text-blue-700" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-800" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>User Engagement</h4>
                <p className="text-sm text-slate-600" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>Activity insights</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>Daily Active Users</span>
              <span className="text-sm font-bold text-blue-600">847</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '78%' }}></div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>Avg. Session Duration</span>
              <span className="text-sm font-bold text-purple-600">14.3m</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div className="bg-purple-500 h-2 rounded-full" style={{ width: '72%' }}></div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>User Retention Rate</span>
              <span className="text-sm font-bold text-emerald-600">89.4%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '89.4%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  }

export default AnalyticsPage;