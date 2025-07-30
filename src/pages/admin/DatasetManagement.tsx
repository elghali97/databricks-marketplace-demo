import React from 'react';
import { Database, Plus, Search, Filter } from 'lucide-react';
import { SearchFilter } from '../../components/common/SearchFilter';
import { DatasetCard } from '../../components/datasets/DatasetCard';
import { mockDatasets } from '../../data/mockData';

const DatasetManagement = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-primary-700 text-white">
            <Database className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">Dataset Management</h1>
            <p className="text-neutral-600">Manage and monitor all datasets in the marketplace</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all duration-200 font-medium shadow-sm">
            <Plus className="h-4 w-4" />
            <span>Add Dataset</span>
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-xl">
              <Database className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-600">Total Datasets</p>
              <p className="text-2xl font-bold text-neutral-900">324</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-12 h-12 bg-success-100 rounded-xl">
              <Database className="w-6 h-6 text-success-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-600">Active Datasets</p>
              <p className="text-2xl font-bold text-neutral-900">298</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-12 h-12 bg-warning-100 rounded-xl">
              <Database className="w-6 h-6 text-warning-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-600">Pending Review</p>
              <p className="text-2xl font-bold text-neutral-900">26</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
          <div className="flex items-center space-x-3">
            <Search className="h-5 w-5 text-neutral-500" />
            <h2 className="text-lg font-semibold text-neutral-900">Search & Filter</h2>
          </div>
          <div className="flex items-center space-x-3">
            <Filter className="h-4 w-4 text-neutral-500" />
            <select className="px-3 py-2 bg-white border border-neutral-200 rounded-lg text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
              <option value="all">All Categories</option>
              <option value="passenger">Passenger Traffic</option>
              <option value="hotel">Hotel Occupancy</option>
              <option value="operational">Operational</option>
            </select>
            <select className="px-3 py-2 bg-white border border-neutral-200 rounded-lg text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
                 <div className="mt-4">
           <SearchFilter 
             onSearch={(query) => console.log('Search:', query)}
             onFilter={(filters) => console.log('Filter:', filters)}
           />
         </div>
      </div>

      {/* Dataset Grid */}
      <div className="bg-white border border-neutral-200 rounded-xl shadow-sm">
        <div className="p-6 border-b border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-neutral-900">All Datasets</h2>
              <p className="text-sm text-neutral-600">Manage dataset visibility, pricing, and access controls</p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-neutral-500">
              <span>Showing 324 datasets</span>
            </div>
          </div>
        </div>
        <div className="p-6">
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {mockDatasets.slice(0, 6).map((dataset) => (
               <DatasetCard key={dataset.id} dataset={dataset} />
             ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default DatasetManagement;