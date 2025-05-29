import { useState } from 'react';
import Button from '../ui/Button';
import useCommissionsStore from '../../store/useCommissionsStore';
import useWarehousesStore from '../../store/useWarehousesStore';

interface SubscriptionFormProps {
  onClose: () => void;
}

const SubscriptionForm = ({ onClose }: SubscriptionFormProps) => {
  const { warehouses } = useWarehousesStore();
  const { addSubscription } = useCommissionsStore();
  
  const [formData, setFormData] = useState({
    warehouseId: '',
    plan: 'basic',
    amount: 250,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 6)).toISOString().split('T')[0],
    isActive: true,
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // Update amount based on plan selection
    if (name === 'plan') {
      let amount = 250;
      if (value === 'premium') amount = 500;
      if (value === 'enterprise') amount = 1000;
      
      setFormData(prev => ({
        ...prev,
        [name]: value,
        amount
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' 
          ? (e.target as HTMLInputElement).checked 
          : type === 'number' 
            ? parseFloat(value) 
            : value
      }));
    }
    
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
    
    if (!formData.warehouseId) {
      newErrors.warehouseId = 'يرجى اختيار المستودع';
    }
    
    if (!formData.startDate) {
      newErrors.startDate = 'يرجى اختيار تاريخ البدء';
    }
    
    if (!formData.endDate) {
      newErrors.endDate = 'يرجى اختيار تاريخ الانتهاء';
    } else if (new Date(formData.endDate) <= new Date(formData.startDate)) {
      newErrors.endDate = 'يجب أن يكون تاريخ الانتهاء بعد تاريخ البدء';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const selectedWarehouse = warehouses.find(w => w.id === formData.warehouseId);
    if (!selectedWarehouse) return;
    
    addSubscription({
      warehouseId: formData.warehouseId,
      warehouseName: selectedWarehouse.name,
      plan: formData.plan as 'basic' | 'premium' | 'enterprise',
      amount: formData.amount,
      startDate: new Date(formData.startDate).toISOString(),
      endDate: new Date(formData.endDate).toISOString(),
      isActive: formData.isActive,
    });
    
    onClose();
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="warehouseId" className="form-label">المستودع</label>
          <select
            id="warehouseId"
            name="warehouseId"
            className={`form-select ${errors.warehouseId ? 'border-error' : ''}`}
            value={formData.warehouseId}
            onChange={handleChange}
          >
            <option value="">اختر المستودع</option>
            {warehouses
              .filter(warehouse => warehouse.isActive)
              .map(warehouse => (
                <option key={warehouse.id} value={warehouse.id}>
                  {warehouse.name}
                </option>
              ))
            }
          </select>
          {errors.warehouseId && <p className="text-error text-sm">{errors.warehouseId}</p>}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="plan" className="form-label">الخطة</label>
          <select
            id="plan"
            name="plan"
            className="form-select"
            value={formData.plan}
            onChange={handleChange}
          >
            <option value="basic">أساسية (250 ر.س)</option>
            <option value="premium">متميزة (500 ر.س)</option>
            <option value="enterprise">شركات (1000 ر.س)</option>
          </select>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="startDate" className="form-label">تاريخ البدء</label>
            <input
              id="startDate"
              name="startDate"
              type="date"
              className={`form-input ${errors.startDate ? 'border-error' : ''}`}
              value={formData.startDate}
              onChange={handleChange}
            />
            {errors.startDate && <p className="text-error text-sm">{errors.startDate}</p>}
          </div>
          
          <div className="space-y-2">
            <label htmlFor="endDate" className="form-label">تاريخ الانتهاء</label>
            <input
              id="endDate"
              name="endDate"
              type="date"
              className={`form-input ${errors.endDate ? 'border-error' : ''}`}
              value={formData.endDate}
              onChange={handleChange}
            />
            {errors.endDate && <p className="text-error text-sm">{errors.endDate}</p>}
          </div>
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
          إضافة
        </Button>
      </div>
    </form>
  );
};

export default SubscriptionForm;