import { useState } from 'react';
import Button from '../ui/Button';
import useCommissionsStore from '../../store/useCommissionsStore';
import useWarehousesStore from '../../store/useWarehousesStore';

interface CommissionFormProps {
  onClose: () => void;
}

const CommissionForm = ({ onClose }: CommissionFormProps) => {
  const { warehouses } = useWarehousesStore();
  const { addCommission } = useCommissionsStore();
  
  const [formData, setFormData] = useState({
    warehouseId: '',
    amount: 0,
    period: '',
    isPaid: false,
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
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
    
    if (!formData.warehouseId) {
      newErrors.warehouseId = 'يرجى اختيار المستودع';
    }
    
    if (formData.amount <= 0) {
      newErrors.amount = 'يجب أن يكون المبلغ أكبر من صفر';
    }
    
    if (!formData.period.trim()) {
      newErrors.period = 'يرجى إدخال الفترة (مثال: يناير 2024)';
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
    
    addCommission({
      warehouseId: formData.warehouseId,
      warehouseName: selectedWarehouse.name,
      amount: formData.amount,
      period: formData.period,
      isPaid: formData.isPaid,
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
          <label htmlFor="amount" className="form-label">المبلغ (ر.س)</label>
          <input
            id="amount"
            name="amount"
            type="number"
            step="0.01"
            min="0"
            className={`form-input ${errors.amount ? 'border-error' : ''}`}
            value={formData.amount}
            onChange={handleChange}
          />
          {errors.amount && <p className="text-error text-sm">{errors.amount}</p>}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="period" className="form-label">الفترة (مثال: أبريل 2024)</label>
          <input
            id="period"
            name="period"
            type="text"
            className={`form-input ${errors.period ? 'border-error' : ''}`}
            value={formData.period}
            onChange={handleChange}
          />
          {errors.period && <p className="text-error text-sm">{errors.period}</p>}
        </div>
        
        <div className="flex items-center space-x-2">
          <input
            id="isPaid"
            name="isPaid"
            type="checkbox"
            className="form-checkbox"
            checked={formData.isPaid}
            onChange={handleChange}
          />
          <label htmlFor="isPaid" className="form-label m-0 mr-2">مدفوع</label>
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

export default CommissionForm;