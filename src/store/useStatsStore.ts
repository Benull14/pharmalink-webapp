import { create } from 'zustand';

export interface Stats {
  totalPharmacies: number;
  totalWarehouses: number;
  totalOrders: number;
  totalSales: number;
  totalCommissions: number;
  activeOrders: number;
  monthlySalesData: {
    month: string;
    sales: number;
  }[];
  productCategoryData: {
    category: string;
    count: number;
  }[];
}

interface StatsState {
  stats: Stats;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchStats: () => Promise<void>;
}

// Initial mock data
const mockStats: Stats = {
  totalPharmacies: 156,
  totalWarehouses: 12,
  totalOrders: 3854,
  totalSales: 1250000,
  totalCommissions: 12500,
  activeOrders: 124,
  monthlySalesData: [
    { month: 'يناير', sales: 85000 },
    { month: 'فبراير', sales: 92000 },
    { month: 'مارس', sales: 103000 },
    { month: 'أبريل', sales: 118000 },
    { month: 'مايو', sales: 125000 },
    { month: 'يونيو', sales: 132000 },
    { month: 'يوليو', sales: 126000 },
    { month: 'أغسطس', sales: 128000 },
    { month: 'سبتمبر', sales: 115000 },
    { month: 'أكتوبر', sales: 110000 },
    { month: 'نوفمبر', sales: 120000 },
    { month: 'ديسمبر', sales: 130000 },
  ],
  productCategoryData: [
    { category: 'مسكنات', count: 125 },
    { category: 'مضادات حيوية', count: 98 },
    { category: 'أدوية القلب', count: 76 },
    { category: 'أدوية السكري', count: 65 },
    { category: 'فيتامينات ومكملات', count: 135 },
    { category: 'أدوية الجهاز الهضمي', count: 87 },
  ],
};

const useStatsStore = create<StatsState>((set) => ({
  stats: mockStats,
  isLoading: false,
  error: null,

  fetchStats: async () => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // In a real app, this would fetch from an API
      set({ stats: mockStats, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An unknown error occurred', 
        isLoading: false 
      });
    }
  },
}));

export default useStatsStore;