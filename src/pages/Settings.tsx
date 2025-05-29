import { useState } from 'react';
import { Info, Bell, CreditCard, Lock, Shield } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const Settings = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'notifications' | 'billing' | 'security'>('general');
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-secondary-900">الإعدادات</h1>
      </div>

      <div className="bg-white rounded-lg shadow-card">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-64 border-b md:border-b-0 md:border-l border-secondary-200">
            <nav className="p-4">
              <ul className="space-y-1">
                <li>
                  <button
                    className={`flex items-center w-full px-4 py-3 rounded-md transition-colors ${
                      activeTab === 'general'
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-secondary-700 hover:bg-secondary-50'
                    }`}
                    onClick={() => setActiveTab('general')}
                  >
                    <Info size={18} className="ml-3" />
                    <span>الإعدادات العامة</span>
                  </button>
                </li>
                <li>
                  <button
                    className={`flex items-center w-full px-4 py-3 rounded-md transition-colors ${
                      activeTab === 'notifications'
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-secondary-700 hover:bg-secondary-50'
                    }`}
                    onClick={() => setActiveTab('notifications')}
                  >
                    <Bell size={18} className="ml-3" />
                    <span>الإشعارات</span>
                  </button>
                </li>
                <li>
                  <button
                    className={`flex items-center w-full px-4 py-3 rounded-md transition-colors ${
                      activeTab === 'billing'
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-secondary-700 hover:bg-secondary-50'
                    }`}
                    onClick={() => setActiveTab('billing')}
                  >
                    <CreditCard size={18} className="ml-3" />
                    <span>الفوترة</span>
                  </button>
                </li>
                <li>
                  <button
                    className={`flex items-center w-full px-4 py-3 rounded-md transition-colors ${
                      activeTab === 'security'
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-secondary-700 hover:bg-secondary-50'
                    }`}
                    onClick={() => setActiveTab('security')}
                  >
                    <Shield size={18} className="ml-3" />
                    <span>الأمان</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
          
          <div className="flex-1 p-6">
            {activeTab === 'general' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">الإعدادات العامة</h2>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="companyName" className="form-label">اسم المنشأة</label>
                    <input id="companyName" type="text" className="form-input" defaultValue="فارما دش" />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="contactEmail" className="form-label">البريد الإلكتروني للتواصل</label>
                    <input id="contactEmail" type="email" className="form-input" defaultValue="support@pharmadash.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="language" className="form-label">اللغة</label>
                    <select id="language" className="form-select">
                      <option value="ar">العربية</option>
                      <option value="en">الإنجليزية</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="timezone" className="form-label">المنطقة الزمنية</label>
                    <select id="timezone" className="form-select">
                      <option value="Asia/Riyadh">(GMT+3) الرياض، المملكة العربية السعودية</option>
                      <option value="Asia/Dubai">(GMT+4) دبي، الإمارات العربية المتحدة</option>
                      <option value="Asia/Amman">(GMT+3) عمان، الأردن</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button>حفظ التغييرات</Button>
                </div>
              </div>
            )}
            
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">إعدادات الإشعارات</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-secondary-200">
                    <div>
                      <h3 className="font-medium">إشعارات الطلبات الجديدة</h3>
                      <p className="text-sm text-secondary-500">تلقي إشعار عند وصول طلب جديد</p>
                    </div>
                    <div className="flex items-center">
                      <label className="inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="form-checkbox" defaultChecked />
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b border-secondary-200">
                    <div>
                      <h3 className="font-medium">إشعارات المنتجات منخفضة المخزون</h3>
                      <p className="text-sm text-secondary-500">تلقي إشعار عندما يصل مخزون المنتج إلى الحد الأدنى</p>
                    </div>
                    <div className="flex items-center">
                      <label className="inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="form-checkbox" defaultChecked />
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b border-secondary-200">
                    <div>
                      <h3 className="font-medium">تنبيهات العمولات المستحقة</h3>
                      <p className="text-sm text-secondary-500">تلقي إشعار عند استحقاق دفع العمولات</p>
                    </div>
                    <div className="flex items-center">
                      <label className="inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="form-checkbox" defaultChecked />
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b border-secondary-200">
                    <div>
                      <h3 className="font-medium">إشعارات البريد الإلكتروني اليومية</h3>
                      <p className="text-sm text-secondary-500">تلقي ملخص يومي عن الأنشطة بالبريد الإلكتروني</p>
                    </div>
                    <div className="flex items-center">
                      <label className="inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="form-checkbox" />
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button>حفظ التغييرات</Button>
                </div>
              </div>
            )}
            
            {activeTab === 'billing' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">إعدادات الفوترة</h2>
                
                <div className="bg-primary-50 border border-primary-200 rounded-md p-4 mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <CreditCard className="h-5 w-5 text-primary-500" />
                    </div>
                    <div className="mr-3">
                      <h3 className="text-sm font-medium text-primary-800">الخطة الحالية: متميزة</h3>
                      <p className="mt-1 text-sm text-primary-700">
                        تجديد تلقائي في 15 أكتوبر 2024
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="paymentMethod" className="form-label">طريقة الدفع</label>
                    <select id="paymentMethod" className="form-select">
                      <option value="card">بطاقة ائتمان</option>
                      <option value="bank">تحويل بنكي</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="billingCycle" className="form-label">دورة الفوترة</label>
                    <select id="billingCycle" className="form-select">
                      <option value="monthly">شهري</option>
                      <option value="quarterly">ربع سنوي</option>
                      <option value="annually">سنوي</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="vatNumber" className="form-label">الرقم الضريبي</label>
                    <input id="vatNumber" type="text" className="form-input" placeholder="أدخل الرقم الضريبي" />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button>حفظ التغييرات</Button>
                </div>
              </div>
            )}
            
            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">إعدادات الأمان</h2>
                
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">تغيير كلمة المرور</h3>
                    
                    <div className="space-y-2">
                      <label htmlFor="currentPassword" className="form-label">كلمة المرور الحالية</label>
                      <input id="currentPassword" type="password" className="form-input" />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="newPassword" className="form-label">كلمة المرور الجديدة</label>
                      <input id="newPassword" type="password" className="form-input" />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="confirmPassword" className="form-label">تأكيد كلمة المرور</label>
                      <input id="confirmPassword" type="password" className="form-input" />
                    </div>
                    
                    <div className="flex justify-end">
                      <Button>تحديث كلمة المرور</Button>
                    </div>
                  </div>
                  
                  <div className="border-t border-secondary-200 pt-6">
                    <h3 className="text-lg font-medium mb-4">المصادقة الثنائية</h3>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">تفعيل المصادقة الثنائية</p>
                        <p className="text-sm text-secondary-500">تأمين حسابك باستخدام رمز إضافي عند تسجيل الدخول</p>
                      </div>
                      <div className="flex items-center">
                        <label className="inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="form-checkbox" />
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-secondary-200 pt-6">
                    <h3 className="text-lg font-medium mb-4">جلسات تسجيل الدخول</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <p className="font-medium">الرياض، المملكة العربية السعودية</p>
                          <p className="text-sm text-secondary-500">Chrome على Windows • الجهاز الحالي</p>
                        </div>
                        <div>
                          <span className="badge badge-success">نشط</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <p className="font-medium">دبي، الإمارات العربية المتحدة</p>
                          <p className="text-sm text-secondary-500">Safari على iOS • 20 أبريل 2024</p>
                        </div>
                        <div>
                          <Button size="sm" variant="outline">تسجيل الخروج</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <Button variant="danger">تسجيل الخروج من جميع الأجهزة</Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;