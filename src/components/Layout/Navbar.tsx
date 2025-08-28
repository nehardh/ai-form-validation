import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { ChevronDown, User, LogOut } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div className="flex-1">
        <h1 className="text-xl font-semibold text-gray-800">Healthcare Claim Validation</h1>
      </div>
      
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
        >
          <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="text-sm">
            <p className="font-medium text-gray-700">{user?.name}</p>
            <p className="text-gray-500">{user?.role}</p>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </button>
        
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200">
            <button
              onClick={logout}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};