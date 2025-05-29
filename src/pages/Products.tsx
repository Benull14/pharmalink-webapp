import { useState } from 'react';
import { Plus, Search, Edit, Trash2, Filter, MoreVertical } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { formatCurrency } from '../lib/utils';
import useProductsStore, { Product } from '../store/useProductsStore';
import ProductForm from '../components/products/ProductForm';

const Products = () => {
  const { products, categories, deleteProduct } = useProductsStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowAddForm(true);
  };

  const handleDelete = (id: string) => {
    setShowDeleteConfirm(id);
  };

  const confirmDelete = () => {
    if (showDeleteConfirm) {
      deleteProduct(showDeleteConfirm);
      setShowDeleteConfirm(null);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter ? product.category === categoryFilter : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-secondary-900">إدارة المنتجات الطبية</h1>
        <Button 
          onClick={() => {
            setEditingProduct(null);
            setShowAddForm(true);
          }}
          leftIcon={<Plus size={16} />}
        >
          إضافة منتج جديد
        </Button>
      </div>

      <Card>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400" size={18} />
            <input
              type="text"
              placeholder="بحث عن منتج..."
              className="form-input pr-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full md:w-64">
            <div className="relative">
              <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400" size={18} />
              <select
                className="form-select pr-10"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="">جميع الفئات</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="table-container">
          <table className="table">
            <thead className="table-header">
              <tr>
                <th className="table-header-cell">اسم المنتج</th>
                <th className="table-header-cell">الفئة</th>
                <th className="table-header-cell">الشركة</th>
                <th className="table-header-cell">السعر</th>
                <th className="table-header-cell">المخزون</th>
                <th className="table-header-cell">الحالة</th>
                <th className="table-header-cell">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="table-row">
                    <td className="table-cell font-medium">{product.name}</td>
                    <td className="table-cell">{product.category}</td>
                    <td className="table-cell">{product.company}</td>
                    <td className="table-cell">{formatCurrency(product.price)}</td>
                    <td className="table-cell">
                      <span className={product.stock < 10 ? 'text-error font-medium' : ''}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="table-cell">
                      <Badge variant={product.isActive ? 'success' : 'error'}>
                        {product.isActive ? 'متوفر' : 'غير متوفر'}
                      </Badge>
                    </td>
                    <td className="table-cell">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                          aria-label="تعديل"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
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
                  <td colSpan={7} className="px-6 py-8 text-center text-secondary-500">
                    لا توجد منتجات مطابقة لمعايير البحث
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
                {editingProduct ? 'تعديل المنتج' : 'إضافة منتج جديد'}
              </h2>
              <ProductForm
                product={editingProduct}
                onClose={() => {
                  setShowAddForm(false);
                  setEditingProduct(null);
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
            <p className="mb-6">هل أنت متأكد من حذف هذا المنتج؟ لا يمكن التراجع عن هذا الإجراء.</p>
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
                نعم، حذف المنتج
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;