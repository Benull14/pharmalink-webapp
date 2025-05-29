import { useState } from 'react';
import { DollarSign, CreditCard, ClipboardCheck, Tag } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { formatCurrency, formatDate } from '../lib/utils';
import useCommissionsStore from '../store/useCommissionsStore';
import CommissionForm from '../components/commissions/CommissionForm';
import SubscriptionForm from '../components/commissions/SubscriptionForm';
import CommissionRateForm from '../components/commissions/CommissionRateForm';

const Commissions = () => {
  const { 
    commissions, 
    subscriptions, 
    defaultCommissionRate,
    markCommissionAsPaid
  } = useCommissionsStore();
  
  const [activeTab, setActiveTab] = useState<'commissions' | 'subscriptions'>('commissions');
  const [showCommissionForm, setShowCommissionForm] = useState(false);
  const [showSubscriptionForm, setShowSubscriptionForm] = useState(false);
  const [showRateForm, setShowRateForm] = useState(false);
  
  const unpaidCommissions = commissions.filter(c => !c.isPaid);
  const paidCommissions = commissions.filter(c => c.isPaid);
  const activeSubscriptions = subscriptions.filter(s => s.isActive);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-secondary-900">العمولات والاشتراكات</h1>
        <div className="flex flex-wrap gap-2">
          <Button 
            onClick={() => setShowRateForm(true)}
            leftIcon={<Tag size={16} />}
            variant="secondary"
          >
            تعديل نسبة العمولة ({defaultCommissionRate}%)
          </Button>
          {activeTab === 'commissions' ? (
            <Button 
              onClick={() => setShowCommissionForm(true)}
              leftIcon={<DollarSign size={16} />}
            >
              إضافة عمولة جديدة
            </Button>
          ) : (
            <Button 
              onClick={() => setShowSubscriptionForm(true)}
              leftIcon={<CreditCard size={16} />}
            >
              إضافة اشتراك جديد
            </Button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-card">
        <div className="border-b border-secondary-200">
          <div className="flex -mb-px">
            <button
              className={`py-4 px-6 border-b-2 font-medium text-sm focus:outline-none ${
                activeTab === 'commissions'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
              }`}
              onClick={() => setActiveTab('commissions')}
            >
              العمولات
            </button>
            <button
              className={`py-4 px-6 border-b-2 font-medium text-sm focus:outline-none ${
                activeTab === 'subscriptions'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
              }`}
              onClick={() => setActiveTab('subscriptions')}
            >
              الاشتراكات
            </button>
          </div>
        </div>
        
        <div className="p-6">
          {activeTab === 'commissions' ? (
            <div className="space-y-8">
              {/* Unpaid Commissions */}
              <div>
                <h3 className="text-lg font-semibold mb-4">العمولات غير المدفوعة</h3>
                <div className="table-container">
                  <table className="table">
                    <thead className="table-header">
                      <tr>
                        <th className="table-header-cell">المستودع</th>
                        <th className="table-header-cell">الفترة</th>
                        <th className="table-header-cell">المبلغ</th>
                        <th className="table-header-cell">تاريخ الإنشاء</th>
                        <th className="table-header-cell">الحالة</th>
                        <th className="table-header-cell">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="table-body">
                      {unpaidCommissions.length > 0 ? (
                        unpaidCommissions.map((commission) => (
                          <tr key={commission.id} className="table-row">
                            <td className="table-cell font-medium">{commission.warehouseName}</td>
                            <td className="table-cell">{commission.period}</td>
                            <td className="table-cell">{formatCurrency(commission.amount)}</td>
                            <td className="table-cell">{formatDate(commission.createdAt)}</td>
                            <td className="table-cell">
                              <Badge variant="warning">غير مدفوع</Badge>
                            </td>
                            <td className="table-cell">
                              <Button 
                                size="sm"
                                variant="outline"
                                leftIcon={<ClipboardCheck size={14} />}
                                onClick={() => markCommissionAsPaid(commission.id)}
                              >
                                تأكيد الدفع
                              </Button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="px-6 py-8 text-center text-secondary-500">
                            لا توجد عمولات غير مدفوعة
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* Paid Commissions */}
              <div>
                <h3 className="text-lg font-semibold mb-4">العمولات المدفوعة</h3>
                <div className="table-container">
                  <table className="table">
                    <thead className="table-header">
                      <tr>
                        <th className="table-header-cell">المستودع</th>
                        <th className="table-header-cell">الفترة</th>
                        <th className="table-header-cell">المبلغ</th>
                        <th className="table-header-cell">تاريخ الإنشاء</th>
                        <th className="table-header-cell">الحالة</th>
                      </tr>
                    </thead>
                    <tbody className="table-body">
                      {paidCommissions.length > 0 ? (
                        paidCommissions.map((commission) => (
                          <tr key={commission.id} className="table-row">
                            <td className="table-cell font-medium">{commission.warehouseName}</td>
                            <td className="table-cell">{commission.period}</td>
                            <td className="table-cell">{formatCurrency(commission.amount)}</td>
                            <td className="table-cell">{formatDate(commission.createdAt)}</td>
                            <td className="table-cell">
                              <Badge variant="success">مدفوع</Badge>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="px-6 py-8 text-center text-secondary-500">
                            لا توجد عمولات مدفوعة
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-lg font-semibold mb-4">الاشتراكات النشطة</h3>
              <div className="table-container">
                <table className="table">
                  <thead className="table-header">
                    <tr>
                      <th className="table-header-cell">المستودع</th>
                      <th className="table-header-cell">الخطة</th>
                      <th className="table-header-cell">المبلغ</th>
                      <th className="table-header-cell">تاريخ البدء</th>
                      <th className="table-header-cell">تاريخ الانتهاء</th>
                      <th className="table-header-cell">الحالة</th>
                    </tr>
                  </thead>
                  <tbody className="table-body">
                    {activeSubscriptions.length > 0 ? (
                      activeSubscriptions.map((subscription) => (
                        <tr key={subscription.id} className="table-row">
                          <td className="table-cell font-medium">{subscription.warehouseName}</td>
                          <td className="table-cell">
                            {subscription.plan === 'basic' && 'أساسية'}
                            {subscription.plan === 'premium' && 'متميزة'}
                            {subscription.plan === 'enterprise' && 'شركات'}
                          </td>
                          <td className="table-cell">{formatCurrency(subscription.amount)}</td>
                          <td className="table-cell">{formatDate(subscription.startDate)}</td>
                          <td className="table-cell">{formatDate(subscription.endDate)}</td>
                          <td className="table-cell">
                            <Badge variant={subscription.isActive ? 'success' : 'error'}>
                              {subscription.isActive ? 'نشط' : 'منتهي'}
                            </Badge>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-8 text-center text-secondary-500">
                          لا توجد اشتراكات نشطة
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Commission Form Modal */}
      {showCommissionForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-6">إضافة عمولة جديدة</h2>
            <CommissionForm onClose={() => setShowCommissionForm(false)} />
          </div>
        </div>
      )}

      {/* Subscription Form Modal */}
      {showSubscriptionForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-6">إضافة اشتراك جديد</h2>
            <SubscriptionForm onClose={() => setShowSubscriptionForm(false)} />
          </div>
        </div>
      )}

      {/* Commission Rate Form Modal */}
      {showRateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-6">تعديل نسبة العمولة</h2>
            <CommissionRateForm 
              currentRate={defaultCommissionRate} 
              onClose={() => setShowRateForm(false)} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Commissions;