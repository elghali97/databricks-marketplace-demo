import React from 'react';
import { Database, Plus, Search, Filter } from 'lucide-react';
import { SearchFilter } from '../../components/common/SearchFilter';
import { DatasetCard } from '../../components/datasets/DatasetCard';
import { mockDatasets } from '../../data/mockData';

const DatasetManagement = () => {
  return (
    <div className="space-y-8 animate-fade-in px-6 py-8">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 text-white shadow-lg">
            <Database className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-slate-800 tracking-tight" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
              Dataset Management
            </h1>
            <p className="text-slate-600 text-lg" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
              Manage and monitor all datasets in the marketplace
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-slate-700 to-slate-800 text-white rounded-xl hover:from-slate-800 hover:to-slate-900 transition-all duration-200 font-bold text-sm shadow-lg hover:shadow-xl">
            <Plus className="h-5 w-5" />
            <span>Add Dataset</span>
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-300 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl shadow-md">
              <Database className="w-7 h-7 text-slate-700" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-600" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>Total Datasets</p>
              <p className="text-3xl font-bold text-slate-800" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>52</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-slate-300 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl shadow-md">
              <Database className="w-7 h-7 text-emerald-700" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-600" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>Active Datasets</p>
              <p className="text-3xl font-bold text-slate-800" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>52</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-slate-300 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl shadow-md">
              <Database className="w-7 h-7 text-amber-700" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-600" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>Pending Review</p>
              <p className="text-3xl font-bold text-slate-800" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>3</p>
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
              placeholder="Search datasets..."
              className="flex-1 px-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}
            />
          </div>
          <div className="flex items-center space-x-3">
            <select className="px-4 py-2 bg-white border border-slate-300 rounded-xl text-sm font-medium text-slate-700 shadow-sm hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent">
              <option value="">All Categories</option>
              <option value="market-trading">Market & Trading</option>
              <option value="alternative-data">Alternative Data</option>
              <option value="risk-compliance">Risk & Compliance</option>
              <option value="esg-sustainability">ESG & Sustainability</option>
            </select>
            <select className="px-4 py-2 bg-white border border-slate-300 rounded-xl text-sm font-medium text-slate-700 shadow-sm hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent">
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Dataset Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockDatasets.slice(0, 9).map((dataset) => (
          <div key={dataset.id} className="transform hover:scale-[1.02] transition-all duration-300">
            <DatasetCard dataset={dataset} />
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center">
        <button className="px-8 py-3 bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 rounded-xl hover:from-slate-200 hover:to-slate-300 transition-all duration-200 font-bold text-sm shadow-lg hover:shadow-xl">
          Load More Datasets
        </button>
      </div>
    </div>
  );
};

export default DatasetManagement;