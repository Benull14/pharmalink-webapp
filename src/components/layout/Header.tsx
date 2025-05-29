import { Bell, LogOut, Menu, User } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header = ({ toggleSidebar }: HeaderProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="bg-white border-b border-secondary-200 py-4 px-4 md:px-6 flex items-center justify-between">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="mr-4 text-secondary-500 hover:text-secondary-700 md:hidden"
          aria-label="Toggle Sidebar"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-semibold text-secondary-900">نظام إدارة الصيدليات</h1>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-4">
        <button className="relative p-2 text-secondary-500 hover:text-secondary-700 rounded-full hover:bg-secondary-100">
          <Bell size={20} />
          <span className="absolute top-1 right-1 h-2 w-2 bg-primary-500 rounded-full"></span>
        </button>
        
        <div className="relative">
          <button
            className="flex items-center space-x-2 text-secondary-700 focus:outline-none"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <div className="w-8 h-8 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center">
              <User size={18} />
            </div>
            <span className="hidden md:block font-medium">أحمد محمد</span>
          </button>
          
          {dropdownOpen && (
            <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
              <div className="py-1" role="menu" aria-orientation="vertical">
                <a
                  href="#profile"
                  className="block px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-100"
                  role="menuitem"
                >
                  الملف الشخصي
                </a>
                <a
                  href="#settings"
                  className="block px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-100"
                  role="menuitem"
                >
                  الإعدادات
                </a>
                <a
                  href="#logout"
                  className="flex items-center px-4 py-2 text-sm text-error hover:bg-secondary-100"
                  role="menuitem"
                >
                  <LogOut size={16} className="ml-2" />
                  تسجيل الخروج
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;