import { useEffect } from 'react';
import { 
  BarChart3, 
  ShoppingBag, 
  Building2, 
  Warehouse, 
  DollarSign,
  TrendingUp
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import Card from '../components/ui/Card';
import { formatCurrency, formatNumber } from '../lib/utils';
import useStatsStore from '../store/useStatsStore';

const Dashboard = () => {
  const { stats, fetchStats, isLoading } = useStatsStore();

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const statCards = [
    {
      title: 'إجمالي الصيدليات',
      value: stats.totalPharmacies,
      icon: <Building2 size={24} className="text-blue-500" />,
      bgColor: 'bg-blue-50',
    },
    {
      title: 'إجمالي المستودعات',
      value: stats.totalWarehouses,
      icon: <Warehouse size={24} className="text-purple-500" />,
      bgColor: 'bg-purple-50',
    },
    {
      title: 'إجمالي الطلبات',
      value: stats.totalOrders,
      icon: <ShoppingBag size={24} className="text-amber-500" />,
      bgColor: 'bg-amber-50',
    },
    {
      title: 'إجمالي المبيعات',
      value: formatCurrency(stats.totalSales),
      icon: <TrendingUp size={24} className="text-primary-500" />,
      bgColor: 'bg-primary-50',
    },
    {
      title: 'إجمالي العمولات',
      value: formatCurrency(stats.totalCommissions),
      icon: <DollarSign size={24} className="text-emerald-500" />,
      bgColor: 'bg-emerald-50',
    },
    {
      title: 'الطلبات النشطة',
      value: stats.activeOrders,
      icon: <BarChart3 size={24} className="text-rose-500" />,
      bgColor: 'bg-rose-50',
    },
  ];

  const COLORS = ['#4ade80', '#3b82f6', '#f97316', '#ec4899', '#8b5cf6', '#14b8a6'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-secondary-900">لوحة التحكم</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card, index) => (
          <Card key={index} className={`${card.bgColor} border border-opacity-50`}>
            <div className="flex items-center">
              <div className="p-3 rounded-md bg-white shadow-sm">{card.icon}</div>
              <div className="mr-4">
                <p className="text-sm text-secondary-600">{card.title}</p>
                <p className="text-xl font-semibold mt-1">{card.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="المبيعات الشهرية" className="lg:col-span-2">
          {isLoading ? (
            <div className="h-80 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={stats.monthlySalesData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis 
                  tickFormatter={(value) => `${value / 1000}K`} 
                  orientation="right"
                />
                <Tooltip 
                  formatter={(value) => [`${formatNumber(Number(value))} ر.س`, 'المبيعات']}
                  labelStyle={{ fontFamily: 'Tajawal' }}
                />
                <Bar dataKey="sales" fill="#4ade80" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </Card>

        <Card title="توزيع المنتجات حسب الفئة">
          {isLoading ? (
            <div className="h-80 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stats.productCategoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                  nameKey="category"
                  label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {stats.productCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend layout="vertical" verticalAlign="middle" align="left" />
                <Tooltip formatter={(value) => [value, 'عدد المنتجات']} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </Card>

        <Card title="آخر التحديثات">
          <div className="space-y-4">
            <div className="border-r-4 border-primary-500 pr-4 py-2">
              <p className="text-secondary-600">تم إضافة 15 منتج جديد في الأسبوع الماضي</p>
              <p className="text-sm text-secondary-500 mt-1">12 أبريل 2024</p>
            </div>
            <div className="border-r-4 border-blue-500 pr-4 py-2">
              <p className="text-secondary-600">تم تسجيل 3 مستودعات جديدة</p>
              <p className="text-sm text-secondary-500 mt-1">10 أبريل 2024</p>
            </div>
            <div className="border-r-4 border-amber-500 pr-4 py-2">
              <p className="text-secondary-600">إجمالي المبيعات ارتفع بنسبة 12% مقارنة بالشهر السابق</p>
              <p className="text-sm text-secondary-500 mt-1">5 أبريل 2024</p>
            </div>
            <div className="border-r-4 border-purple-500 pr-4 py-2">
              <p className="text-secondary-600">تم تحصيل 85% من إجمالي العمولات لشهر مارس</p>
              <p className="text-sm text-secondary-500 mt-1">1 أبريل 2024</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;