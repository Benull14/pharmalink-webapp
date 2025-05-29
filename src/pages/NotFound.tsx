import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-7xl font-bold text-primary-500">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-secondary-900">الصفحة غير موجودة</h2>
        <p className="mt-2 text-secondary-600">
          عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
        </p>
        <div className="mt-6">
          <Link to="/">
            <Button leftIcon={<Home size={16} />}>
              العودة للرئيسية
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;