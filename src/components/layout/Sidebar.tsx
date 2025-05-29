import { Link, useLocation } from 'react-router-dom';
import { BarChart3, FileMusic as FileMedical, Home, Store, Pill, DollarSign, Settings, X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SidebarProps {
  open: boolean;
  closeSidebar: () => void;
}

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

const Sidebar = ({ open, closeSidebar }: SidebarProps) => {
  const location = useLocation();
  
  const navItems: NavItem[] = [
    { path: '/', label: 'لوحة التحكم', icon: <Home size={20} /> },
    { path: '/products', label: 'المنتجات الطبية', icon: <FileMedical size={20} /> },
    { path: '/warehouses', label: 'إدارة المستودعات', icon: <Store size={20} /> },
    { path: '/pharmacies', label: 'إدارة الصيدليات', icon: <Pill size={20} /> },
    { path: '/commissions', label: 'العمولات والاشتراكات', icon: <DollarSign size={20} /> },
    { path: '/settings', label: 'الإعدادات', icon: <Settings size={20} /> }
  ];
  
  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={closeSidebar}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 right-0 w-64 bg-white border-l border-secondary-200 z-30 transition-transform duration-300 transform md:translate-x-0 md:static md:z-0",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex justify-between items-center h-16 px-6 border-b border-secondary-200">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-primary-500 rounded-md flex items-center justify-center">
              <BarChart3 size={20} className="text-white" />
            </div>
            <span className="font-bold text-lg mr-2 text-secondary-900">فارما دش</span>
          </div>
          <button 
            onClick={closeSidebar}
            className="text-secondary-500 hover:text-secondary-700 md:hidden"
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="py-6 px-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center px-4 py-3 rounded-md transition-colors",
                    location.pathname === item.path
                      ? "bg-primary-50 text-primary-700"
                      : "text-secondary-700 hover:bg-secondary-50"
                  )}
                  onClick={() => {
                    if (open) closeSidebar();
                  }}
                >
                  <span className="ml-3">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;