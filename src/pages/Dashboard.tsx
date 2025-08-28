import React from 'react';
import { StatCard } from '../components/Dashboard/StatCard';
import { mockStats } from '../data/mockData';
import { Upload, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

export const Dashboard: React.FC = () => {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Overview of claim validation activities</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Claims Uploaded"
          value={mockStats.claimsUploaded}
          icon={Upload}
          color="blue"
          subtitle="This month"
        />
        <StatCard
          title="Claims with Errors"
          value={mockStats.claimsWithErrors}
          icon={AlertTriangle}
          color="red"
          subtitle="Requires attention"
        />
        <StatCard
          title="Validated Claims"
          value={mockStats.validatedClaims}
          icon={CheckCircle}
          color="green"
          subtitle="Ready to submit"
        />
        <StatCard
          title="Avg Processing Time"
          value={`${mockStats.avgProcessingTime} min`}
          icon={Clock}
          color="yellow"
          subtitle="Per claim"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-700">Claim CLM-002 validated successfully</span>
              </div>
              <span className="text-xs text-gray-500">2 min ago</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-700">Claim CLM-001 requires attention</span>
              </div>
              <span className="text-xs text-gray-500">15 min ago</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-700">New claim uploaded</span>
              </div>
              <span className="text-xs text-gray-500">1 hour ago</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors">
              <div className="font-medium text-emerald-800">Upload New Claim</div>
              <div className="text-sm text-emerald-600">Start the validation process</div>
            </button>
            <button className="w-full text-left px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
              <div className="font-medium text-blue-800">Review Pending Claims</div>
              <div className="text-sm text-blue-600">View claims requiring attention</div>
            </button>
            <button className="w-full text-left px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="font-medium text-gray-800">Generate Report</div>
              <div className="text-sm text-gray-600">Export validation analytics</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};