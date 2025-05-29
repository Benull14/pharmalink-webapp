import { useState, useEffect } from 'react';
import Button from '../ui/Button';
import useProductsStore, { Product } from '../../store/useProductsStore';

interface ProductFormProps {
  product: Product | null;
  onClose: () => void;
}

const ProductForm = ({ product, onClose }: ProductFormProps) => {
  const { categories, companies, addProduct, updateProduct } = useProductsStore();
  
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    company: '',
    price: 0,
    stock: 0,
    isActive: true,
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        category: product.category,
        company: product.company,
        price: product.price,
        stock: product.stock,
        isActive: product.isActive,
      });
    }
  }, [product]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked 
        : type === 'number' 
          ? parseFloat(value) 
          : value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'اسم المنتج مطلوب';
    }
    
    if (!formData.category) {
      newErrors.category = 'الفئة مطلوبة';
    }
    
    if (!formData.company) {
      newErrors.company = 'الشركة المصنعة مطلوبة';
    }
    
    if (formData.price <= 0) {
      newErrors.price = 'يجب أن يكون السعر أكبر من صفر';
    }
    
    if (formData.stock < 0) {
      newErrors.stock = 'يجب أن يكون المخزون صفر أو أكبر';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    if (product) {
      updateProduct(product.id, formData);
    } else {
      addProduct(formData);
    }
    
    onClose();
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="form-label">اسم المنتج</label>
          <input
            id="name"
            name="name"
            type="text"
            className={`form-input ${errors.name ? 'border-error' : ''}`}
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="text-error text-sm">{errors.name}</p>}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="category" className="form-label">الفئة</label>
          <select
            id="category"
            name="category"
            className={`form-select ${errors.category ? 'border-error' : ''}`}
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">اختر الفئة</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          {errors.category && <p className="text-error text-sm">{errors.category}</p>}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="company" className="form-label">الشركة المصنعة</label>
          <select
            id="company"
            name="company"
            className={`form-select ${errors.company ? 'border-error' : ''}`}
            value={formData.company}
            onChange={handleChange}
          >
            <option value="">اختر الشركة</option>
            {companies.map(company => (
              <option key={company} value={company}>{company}</option>
            ))}
          </select>
          {errors.company && <p className="text-error text-sm">{errors.company}</p>}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="price" className="form-label">السعر</label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            className={`form-input ${errors.price ? 'border-error' : ''}`}
            value={formData.price}
            onChange={handleChange}
          />
          {errors.price && <p className="text-error text-sm">{errors.price}</p>}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="stock" className="form-label">المخزون</label>
          <input
            id="stock"
            name="stock"
            type="number"
            min="0"
            className={`form-input ${errors.stock ? 'border-error' : ''}`}
            value={formData.stock}
            onChange={handleChange}
          />
          {errors.stock && <p className="text-error text-sm">{errors.stock}</p>}
        </div>
        
        <div className="flex items-center space-x-2">
          <input
            id="isActive"
            name="isActive"
            type="checkbox"
            className="form-checkbox"
            checked={formData.isActive}
            onChange={handleChange}
          />
          <label htmlFor="isActive" className="form-label m-0 mr-2">متوفر للبيع</label>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end space-x-2">
        <Button
          type="button"
          variant="secondary"
          onClick={onClose}
          className="ml-2"
        >
          إلغاء
        </Button>
        <Button type="submit">
          {product ? 'حفظ التغييرات' : 'إضافة المنتج'}
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;