import { useState } from 'react';
import { Plus, Search, Edit, Trash2, ToggleLeft as Toggle } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { formatCurrency, formatDate, formatNumber } from '../lib/utils';
import usePharmaciesStore, { Pharmacy } from '../store/usePharmaciesStore';
import useWarehousesStore from '../store/useWarehousesStore';

const Pharmacies = () => {
  const { pharmacies, deletePharmacy, togglePharmacyStatus } = usePharmaciesStore();
  const { CITIES = [], DISTRICTS_MAP = {} } = useWarehousesStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setShowDeleteConfirm(id);
  };

  const confirmDelete = () => {
    if (showDeleteConfirm) {
      deletePharmacy(showDeleteConfirm);
      setShowDeleteConfirm(null);
    }
  };

  const handleToggleStatus = (id: string) => {
    togglePharmacyStatus(id);
  };

  const filteredPharmacies = pharmacies.filter(pharmacy => {
    const matchesSearch = pharmacy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pharmacy.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pharmacy.district.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = cityFilter ? pharmacy.city === cityFilter : true;
    return matchesSearch && matchesCity;
  });

  // Calculate statistics
  const totalPharmacies = pharmacies.length;
  const activePharmacies = pharmacies.filter(p => p.isActive).length;
  const totalOrders = pharmacies.reduce((sum, p) => sum + p.ordersCount, 0);
  const totalSales = pharmacies.reduce((sum, p) => sum + p.totalSales, 0);

  // Initialize pharmaciesByCity as an empty object and populate it safely
  const pharmaciesByCity: Record<string, number> = {};
  pharmacies.forEach(pharmacy => {
    if (pharmacy.city) {
      pharmaciesByCity[pharmacy.city] = (pharmaciesByCity[pharmacy.city] || 0) + 1;
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-secondary-900">إدارة الصيدليات</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-blue-50 border border-blue-100">
          <div className="flex items-center">
            <div className="p-3 rounded-md bg-white shadow-sm">
              <Plus className="h-6 w-6 text-blue-500" />
            </div>
            <div className="mr-4">
              <p className="text-sm text-secondary-600">إجمالي الصيدليات</p>
              <p className="text-xl font-semibold mt-1">{formatNumber(totalPharmacies)}</p>
            </div>
          </div>
        </Card>

        <Card className="bg-green-50 border border-green-100">
          <div className="flex items-center">
            <div className="p-3 rounded-md bg-white shadow-sm">
              <Toggle className="h-6 w-6 text-green-500" />
            </div>
            <div className="mr-4">
              <p className="text-sm text-secondary-600">الصيدليات النشطة</p>
              <p className="text-xl font-semibold mt-1">{formatNumber(activePharmacies)}</p>
            </div>
          </div>
        </Card>

        <Card className="bg-amber-50 border border-amber-100">
          <div className="flex items-center">
            <div className="p-3 rounded-md bg-white shadow-sm">
              <Search className="h-6 w-6 text-amber-500" />
            </div>
            <div className="mr-4">
              <p className="text-sm text-secondary-600">إجمالي الطلبات</p>
              <p className="text-xl font-semibold mt-1">{formatNumber(totalOrders)}</p>
            </div>
          </div>
        </Card>

        <Card className="bg-purple-50 border border-purple-100">
          <div className="flex items-center">
            <div className="p-3 rounded-md bg-white shadow-sm">
              <Edit className="h-6 w-6 text-purple-500" />
            </div>
            <div className="mr-4">
              <p className="text-sm text-secondary-600">إجمالي المبيعات</p>
              <p className="text-xl font-semibold mt-1">{formatCurrency(totalSales)}</p>
            </div>
          </div>
        </Card>
      </div>

      <Card title="توزيع الصيدليات حسب المدن">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Object.entries(pharmaciesByCity).length > 0 ? (
            Object.entries(pharmaciesByCity).map(([city, count]) => (
              <div key={city} className="bg-gray-50 rounded-lg p-4 shadow-sm border border-gray-200">
                <h3 className="font-medium text-secondary-900">{city}</h3>
                <p className="text-2xl font-bold text-primary-600 mt-2">{count}</p>
              </div>
            ))
          ) : (
            <p className="text-secondary-500 col-span-full text-center">
              لا توجد بيانات لعرضها
            </p>
          )}
        </div>
      </Card>

      <Card>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400" size={18} />
            <input
              type="text"
              placeholder="بحث عن صيدلية..."
              className="form-input pr-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full md:w-64">
            <select
              className="form-select"
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
            >
              <option value="">جميع المدن</option>
              {CITIES.map((city) => (
                <option key={city.value} value={city.value}>
                  {city.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="table-container">
          <table className="table">
            <thead className="table-header">
              <tr>
                <th className="table-header-cell">اسم الصيدلية</th>
                <th className="table-header-cell">المدينة</th>
                <th className="table-header-cell">الحي</th>
                <th className="table-header-cell">عدد الطلبات</th>
                <th className="table-header-cell">إجمالي المبيعات</th>
                <th className="table-header-cell">تاريخ التسجيل</th>
                <th className="table-header-cell">الحالة</th>
                <th className="table-header-cell">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {filteredPharmacies.length > 0 ? (
                filteredPharmacies.map((pharmacy) => (
                  <tr key={pharmacy.id} className="table-row">
                    <td className="table-cell font-medium">{pharmacy.name}</td>
                    <td className="table-cell">{pharmacy.city}</td>
                    <td className="table-cell">{pharmacy.district}</td>
                    <td className="table-cell">{formatNumber(pharmacy.ordersCount)}</td>
                    <td className="table-cell">{formatCurrency(pharmacy.totalSales)}</td>
                    <td className="table-cell">{formatDate(pharmacy.createdAt)}</td>
                    <td className="table-cell">
                      <Badge variant={pharmacy.isActive ? 'success' : 'error'}>
                        {pharmacy.isActive ? 'نشط' : 'معلق'}
                      </Badge>
                    </td>
                    <td className="table-cell">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleToggleStatus(pharmacy.id)}
                          className={`p-1 ${pharmacy.isActive ? 'text-amber-600 hover:text-amber-800' : 'text-green-600 hover:text-green-800'} transition-colors`}
                          aria-label={pharmacy.isActive ? 'تعليق' : 'تفعيل'}
                        >
                          <Toggle size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(pharmacy.id)}
                          className="p-1 text-error hover:text-red-800 transition-colors"
                          aria-label="حذف"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-secondary-500">
                    لا توجد صيدليات مطابقة لمعايير البحث
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-4">تأكيد الحذف</h2>
            <p className="mb-6">هل أنت متأكد من حذف هذه الصيدلية؟ لا يمكن التراجع عن هذا الإجراء.</p>
            <div className="flex justify-end space-x-2 items-center">
              <Button 
                variant="secondary" 
                onClick={() => setShowDeleteConfirm(null)}
                className="ml-2"
              >
                إلغاء
              </Button>
              <Button 
                variant="danger" 
                onClick={confirmDelete}
              >
                نعم، حذف الصيدلية
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pharmacies;