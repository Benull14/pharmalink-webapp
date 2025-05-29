import { useState } from 'react';
import { Plus, Search, Edit, Trash2, ToggleLeft as Toggle } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { formatDate } from '../lib/utils';
import useWarehousesStore, { Warehouse } from '../store/useWarehousesStore';
import WarehouseForm from '../components/warehouses/WarehouseForm';

const Warehouses = () => {
  const { warehouses, users, deleteWarehouse, toggleWarehouseStatus } = useWarehousesStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingWarehouse, setEditingWarehouse] = useState<Warehouse | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const handleEdit = (warehouse: Warehouse) => {
    setEditingWarehouse(warehouse);
    setShowAddForm(true);
  };

  const handleDelete = (id: string) => {
    setShowDeleteConfirm(id);
  };

  const confirmDelete = () => {
    if (showDeleteConfirm) {
      deleteWarehouse(showDeleteConfirm);
      setShowDeleteConfirm(null);
    }
  };

  const handleToggleStatus = (id: string) => {
    toggleWarehouseStatus(id);
  };

  const filteredWarehouses = warehouses.filter(warehouse => {
    const searchLower = searchTerm.toLowerCase();
    const warehouseUser = users.find(user => user.id === warehouse.userId);
    
    return warehouse.name.toLowerCase().includes(searchLower) ||
           warehouse.city.toLowerCase().includes(searchLower) ||
           warehouse.district.toLowerCase().includes(searchLower) ||
           warehouseUser?.name.toLowerCase().includes(searchLower);
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-secondary-900">إدارة المستودعات</h1>
        <Button 
          onClick={() => {
            setEditingWarehouse(null);
            setShowAddForm(true);
          }}
          leftIcon={<Plus size={16} />}
        >
          إضافة مستودع جديد
        </Button>
      </div>

      <Card>
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400" size={18} />
            <input
              type="text"
              placeholder="بحث عن مستودع..."
              className="form-input pr-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="table-container">
          <table className="table">
            <thead className="table-header">
              <tr>
                <th className="table-header-cell">اسم المستودع</th>
                <th className="table-header-cell">المدينة</th>
                <th className="table-header-cell">الحي</th>
                <th className="table-header-cell">المسؤول</th>
                <th className="table-header-cell">تاريخ التسجيل</th>
                <th className="table-header-cell">الحالة</th>
                <th className="table-header-cell">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {filteredWarehouses.length > 0 ? (
                filteredWarehouses.map((warehouse) => {
                  const warehouseUser = users.find(user => user.id === warehouse.userId);
                  return (
                    <tr key={warehouse.id} className="table-row">
                      <td className="table-cell font-medium">{warehouse.name}</td>
                      <td className="table-cell">{warehouse.city}</td>
                      <td className="table-cell">{warehouse.district}</td>
                      <td className="table-cell">{warehouseUser?.name}</td>
                      <td className="table-cell">{formatDate(warehouse.createdAt)}</td>
                      <td className="table-cell">
                        <Badge variant={warehouse.isActive ? 'success' : 'error'}>
                          {warehouse.isActive ? 'نشط' : 'معلق'}
                        </Badge>
                      </td>
                      <td className="table-cell">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleEdit(warehouse)}
                            className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                            aria-label="تعديل"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleToggleStatus(warehouse.id)}
                            className={`p-1 ${warehouse.isActive ? 'text-amber-600 hover:text-amber-800' : 'text-green-600 hover:text-green-800'} transition-colors`}
                            aria-label={warehouse.isActive ? 'تعليق' : 'تفعيل'}
                          >
                            <Toggle size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(warehouse.id)}
                            className="p-1 text-error hover:text-red-800 transition-colors"
                            aria-label="حذف"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-secondary-500">
                    لا توجد مستودعات مطابقة لمعايير البحث
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-6">
                {editingWarehouse ? 'تعديل المستودع' : 'إضافة مستودع جديد'}
              </h2>
              <WarehouseForm
                warehouse={editingWarehouse}
                onClose={() => {
                  setShowAddForm(false);
                  setEditingWarehouse(null);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-4">تأكيد الحذف</h2>
            <p className="mb-6">هل أنت متأكد من حذف هذا المستودع؟ لا يمكن التراجع عن هذا الإجراء.</p>
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
                نعم، حذف المستودع
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Warehouses;