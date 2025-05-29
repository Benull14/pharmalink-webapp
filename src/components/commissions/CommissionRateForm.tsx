import { useState } from 'react';
import Button from '../ui/Button';
import useCommissionsStore from '../../store/useCommissionsStore';

interface CommissionRateFormProps {
  currentRate: number;
  onClose: () => void;
}

const CommissionRateForm = ({ currentRate, onClose }: CommissionRateFormProps) => {
  const { setDefaultCommissionRate } = useCommissionsStore();
  
  const [rate, setRate] = useState(currentRate);
  const [error, setError] = useState<string>('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setRate(value);
    
    if (error) setError('');
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rate <= 0 || rate > 100) {
      setError('يجب أن تكون النسبة أكبر من 0 وأقل من أو تساوي 100');
      return;
    }
    
    setDefaultCommissionRate(rate);
    onClose();
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="rate" className="form-label">نسبة العمولة (%)</label>
          <input
            id="rate"
            name="rate"
            type="number"
            step="0.01"
            min="0"
            max="100"
            className={`form-input ${error ? 'border-error' : ''}`}
            value={rate}
            onChange={handleChange}
          />
          {error && <p className="text-error text-sm">{error}</p>}
        </div>
        
        <p className="text-sm text-secondary-600">
          سيتم تطبيق نسبة العمولة الجديدة على جميع العمولات المستقبلية.
        </p>
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
          حفظ التغييرات
        </Button>
      </div>
    </form>
  );
};

export default CommissionRateForm;