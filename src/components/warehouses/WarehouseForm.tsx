import { useState, useEffect } from 'react';
import Button from '../ui/Button';
import useWarehousesStore, { Warehouse, CITIES, DISTRICTS_MAP } from '../../store/useWarehousesStore';

interface WarehouseFormProps {
  warehouse: Warehouse | null;
  onClose: () => void;
}

const WarehouseForm = ({ warehouse, onClose }: WarehouseFormProps) => {
  const { addWarehouse, updateWarehouse, addUser } = useWarehousesStore();
  
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    district: '',
    isActive: true,
    // User data
    userName: '',
    userEmail: '',
    userPhone: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  useEffect(() => {
    if (warehouse) {
      setFormData({
        name: warehouse.name,
        city: warehouse.city,
        district: warehouse.district,
        isActive: warehouse.isActive,
        userName: '',
        userEmail: '',
        userPhone: '',
      });
    }
  }, [warehouse]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => {
      const updates = {
        ...prev,
        [name]: type === 'checkbox' 
          ? (e.target as HTMLInputElement).checked 
          : value
      };

      // Reset district when city changes
      if (name === 'city') {
        updates.district = '';
      }

      return updates;
    });
    
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
      newErrors.name = 'اسم المستودع مطلوب';
    }
    
    if (!formData.city) {
      newErrors.city = 'المدينة مطلوبة';
    }
    
    if (!formData.district) {
      newErrors.district = 'الحي مطلوب';
    }

    if (!warehouse) {
      if (!formData.userName.trim()) {
        newErrors.userName = 'اسم المسؤول مطلوب';
      }
      
      if (!formData.userEmail.trim()) {
        newErrors.userEmail = 'البريد الإلكتروني مطلوب';
      } else if (!/\S+@\S+\.\S+/.test(formData.userEmail)) {
        newErrors.userEmail = 'يرجى إدخال بريد إلكتروني صحيح';
      }
      
      if (!formData.userPhone.trim()) {
        newErrors.userPhone = 'رقم الهاتف مطلوب';
      } else if (!/^\d{10}$/.test(formData.userPhone.replace(/\s/g, ''))) {
        newErrors.userPhone = 'يجب أن يتكون رقم الهاتف من 10 أرقام';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (warehouse) {
      updateWarehouse(warehouse.id, {
        name: formData.name,
        city: formData.city,
        district: formData.district,
        isActive: formData.isActive,
      });
    } else {
      // Create user first
      const userData = {
        name: formData.userName,
        email: formData.userEmail,
        phone: formData.userPhone,
      };
      
      addUser(userData);

      // Then create warehouse
      addWarehouse({
        userId: generateId(), // In a real app, this would be the created user's ID
        name: formData.name,
        city: formData.city,
        district: formData.district,
        isActive: formData.isActive,
      });
    }
    
    onClose();
  };

  const availableDistricts = formData.city ? DISTRICTS_MAP[formData.city] : [];
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="form-label">اسم المستودع</label>
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
          <label htmlFor="city" className="form-label">المدينة</label>
          <select
            id="city"
            name="city"
            className={`form-select ${errors.city ? 'border-error' : ''}`}
            value={formData.city}
            onChange={handleChange}
          >
            <option value="">اختر المدينة</option>
            {CITIES.map(city => (
              <option key={city.value} value={city.value}>
                {city.label}
              </option>
            ))}
          </select>
          {errors.city && <p className="text-error text-sm">{errors.city}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="district" className="form-label">الحي</label>
          <select
            id="district"
            name="district"
            className={`form-select ${errors.district ? 'border-error' : ''}`}
            value={formData.district}
            onChange={handleChange}
            disabled={!formData.city}
          >
            <option value="">اختر الحي</option>
            {availableDistricts?.map(district => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
          {errors.district && <p className="text-error text-sm">{errors.district}</p>}
        </div>

        {!warehouse && (
          <>
            <div className="space-y-2">
              <label htmlFor="userName" className="form-label">اسم المسؤول</label>
              <input
                id="userName"
                name="userName"
                type="text"
                className={`form-input ${errors.userName ? 'border-error' : ''}`}
                value={formData.userName}
                onChange={handleChange}
              />
              {errors.userName && <p className="text-error text-sm">{errors.userName}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="userEmail" className="form-label">البريد الإلكتروني</label>
              <input
                id="userEmail"
                name="userEmail"
                type="email"
                className={`form-input ${errors.userEmail ? 'border-error' : ''}`}
                value={formData.userEmail}
                onChange={handleChange}
              />
              {errors.userEmail && <p className="text-error text-sm">{errors.userEmail}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="userPhone" className="form-label">رقم الهاتف</label>
              <input
                id="userPhone"
                name="userPhone"
                type="tel"
                className={`form-input ${errors.userPhone ? 'border-error' : ''}`}
                value={formData.userPhone}
                onChange={handleChange}
              />
              {errors.userPhone && <p className="text-error text-sm">{errors.userPhone}</p>}
            </div>
          </>
        )}
        
        <div className="flex items-center space-x-2">
          <input
            id="isActive"
            name="isActive"
            type="checkbox"
            className="form-checkbox"
            checked={formData.isActive}
            onChange={handleChange}
          />
          <label htmlFor="isActive" className="form-label m-0 mr-2">نشط</label>
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
          {warehouse ? 'حفظ التغييرات' : 'إضافة المستودع'}
        </Button>
      </div>
    </form>
  );
};

export default WarehouseForm;