import { create } from 'zustand';
import { generateId } from '../lib/utils';

export interface Commission {
  id: string;
  warehouseId: string;
  warehouseName: string;
  amount: number;
  isPaid: boolean;
  period: string;
  createdAt: string;
}

export interface Subscription {
  id: string;
  warehouseId: string;
  warehouseName: string;
  plan: 'basic' | 'premium' | 'enterprise';
  amount: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

interface CommissionsState {
  commissions: Commission[];
  subscriptions: Subscription[];
  defaultCommissionRate: number;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  addCommission: (commission: Omit<Commission, 'id' | 'createdAt'>) => void;
  updateCommission: (id: string, updates: Partial<Commission>) => void;
  deleteCommission: (id: string) => void;
  markCommissionAsPaid: (id: string) => void;
  
  addSubscription: (subscription: Omit<Subscription, 'id'>) => void;
  updateSubscription: (id: string, updates: Partial<Subscription>) => void;
  deleteSubscription: (id: string) => void;
  
  setDefaultCommissionRate: (rate: number) => void;
}

// Initial mock data
const mockCommissions: Commission[] = [
  {
    id: '1',
    warehouseId: '1',
    warehouseName: 'المستودع الرئيسي - الرياض',
    amount: 3500,
    isPaid: true,
    period: 'مارس 2024',
    createdAt: new Date(2024, 2, 5).toISOString(),
  },
  {
    id: '2',
    warehouseId: '2',
    warehouseName: 'مستودع جدة المركزي',
    amount: 2800,
    isPaid: true,
    period: 'مارس 2024',
    createdAt: new Date(2024, 2, 6).toISOString(),
  },
  {
    id: '3',
    warehouseId: '1',
    warehouseName: 'المستودع الرئيسي - الرياض',
    amount: 3250,
    isPaid: false,
    period: 'أبريل 2024',
    createdAt: new Date(2024, 3, 5).toISOString(),
  },
  {
    id: '4',
    warehouseId: '2',
    warehouseName: 'مستودع جدة المركزي',
    amount: 2950,
    isPaid: false,
    period: 'أبريل 2024',
    createdAt: new Date(2024, 3, 6).toISOString(),
  },
  {
    id: '5',
    warehouseId: '4',
    warehouseName: 'مستودع المدينة للأدوية',
    amount: 1750,
    isPaid: false,
    period: 'أبريل 2024',
    createdAt: new Date(2024, 3, 7).toISOString(),
  },
];

const mockSubscriptions: Subscription[] = [
  {
    id: '1',
    warehouseId: '1',
    warehouseName: 'المستودع الرئيسي - الرياض',
    plan: 'premium',
    amount: 500,
    startDate: new Date(2024, 0, 1).toISOString(),
    endDate: new Date(2024, 11, 31).toISOString(),
    isActive: true,
  },
  {
    id: '2',
    warehouseId: '2',
    warehouseName: 'مستودع جدة المركزي',
    plan: 'premium',
    amount: 500,
    startDate: new Date(2024, 0, 15).toISOString(),
    endDate: new Date(2024, 11, 31).toISOString(),
    isActive: true,
  },
  {
    id: '3',
    warehouseId: '3',
    warehouseName: 'مستودع الدمام الطبي',
    plan: 'basic',
    amount: 250,
    startDate: new Date(2024, 1, 1).toISOString(),
    endDate: new Date(2024, 6, 30).toISOString(),
    isActive: false,
  },
  {
    id: '4',
    warehouseId: '4',
    warehouseName: 'مستودع المدينة للأدوية',
    plan: 'enterprise',
    amount: 1000,
    startDate: new Date(2024, 2, 1).toISOString(),
    endDate: new Date(2025, 1, 28).toISOString(),
    isActive: true,
  },
];

const useCommissionsStore = create<CommissionsState>((set) => ({
  commissions: mockCommissions,
  subscriptions: mockSubscriptions,
  defaultCommissionRate: 1.0, // 1%
  isLoading: false,
  error: null,

  addCommission: (commissionData) => set((state) => ({
    commissions: [
      ...state.commissions,
      {
        ...commissionData,
        id: generateId(),
        createdAt: new Date().toISOString(),
      },
    ],
  })),

  updateCommission: (id, updates) => set((state) => ({
    commissions: state.commissions.map((commission) =>
      commission.id === id ? { ...commission, ...updates } : commission
    ),
  })),

  deleteCommission: (id) => set((state) => ({
    commissions: state.commissions.filter((commission) => commission.id !== id),
  })),

  markCommissionAsPaid: (id) => set((state) => ({
    commissions: state.commissions.map((commission) =>
      commission.id === id ? { ...commission, isPaid: true } : commission
    ),
  })),

  addSubscription: (subscriptionData) => set((state) => ({
    subscriptions: [
      ...state.subscriptions,
      {
        ...subscriptionData,
        id: generateId(),
      },
    ],
  })),

  updateSubscription: (id, updates) => set((state) => ({
    subscriptions: state.subscriptions.map((subscription) =>
      subscription.id === id ? { ...subscription, ...updates } : subscription
    ),
  })),

  deleteSubscription: (id) => set((state) => ({
    subscriptions: state.subscriptions.filter((subscription) => subscription.id !== id),
  })),

  setDefaultCommissionRate: (rate) => set({ defaultCommissionRate: rate }),
}));

export default useCommissionsStore;