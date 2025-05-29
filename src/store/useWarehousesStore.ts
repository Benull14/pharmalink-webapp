import { create } from 'zustand';
import { generateId } from '../lib/utils';

export interface Warehouse {
  id: string;
  userId: string;
  name: string;
  city: string;
  district: string;
  isActive: boolean;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface WarehousesState {
  warehouses: Warehouse[];
  users: User[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  addWarehouse: (warehouse: Omit<Warehouse, 'id' | 'createdAt'>) => void;
  updateWarehouse: (id: string, updates: Partial<Warehouse>) => void;
  deleteWarehouse: (id: string) => void;
  toggleWarehouseStatus: (id: string) => void;
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
}

export const CITIES = [
  { label: 'الرياض', value: 'الرياض' },
  { label: 'جدة', value: 'جدة' },
  { label: 'الدمام', value: 'الدمام' },
  { label: 'المدينة المنورة', value: 'المدينة المنورة' },
];

export const DISTRICTS_MAP: Record<string, string[]> = {
  'الرياض': ['العليا', 'النخيل', 'الملز', 'السليمانية', 'الورود'],
  'جدة': ['الروضة', 'الحمراء', 'الصفا', 'البوادي', 'النزهة'],
  'الدمام': ['الشاطئ', 'الفيصلية', 'البديع', 'المنار', 'النور'],
  'المدينة المنورة': ['العزيزية', 'قباء', 'العوالي', 'الحرم', 'النصر'],
};

// Initial mock data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'محمد العتيبي',
    email: 'mohammed@pharmastore.com',
    phone: '0112345678',
  },
  {
    id: '2',
    name: 'أحمد الغامدي',
    email: 'ahmed@pharmastore.com',
    phone: '0126789012',
  },
];

const mockWarehouses: Warehouse[] = [
  {
    id: '1',
    userId: '1',
    name: 'المستودع الرئيسي',
    city: 'الرياض',
    district: 'العليا',
    isActive: true,
    createdAt: new Date(2022, 3, 10).toISOString(),
  },
  {
    id: '2',
    userId: '2',
    name: 'مستودع الصفا',
    city: 'جدة',
    district: 'الصفا',
    isActive: true,
    createdAt: new Date(2022, 5, 15).toISOString(),
  },
];

const useWarehousesStore = create<WarehousesState>((set) => ({
  warehouses: mockWarehouses,
  users: mockUsers,
  isLoading: false,
  error: null,

  addWarehouse: (warehouseData) => set((state) => ({
    warehouses: [
      ...state.warehouses,
      {
        ...warehouseData,
        id: generateId(),
        createdAt: new Date().toISOString(),
      },
    ],
  })),

  updateWarehouse: (id, updates) => set((state) => ({
    warehouses: state.warehouses.map((warehouse) =>
      warehouse.id === id ? { ...warehouse, ...updates } : warehouse
    ),
  })),

  deleteWarehouse: (id) => set((state) => ({
    warehouses: state.warehouses.filter((warehouse) => warehouse.id !== id),
  })),

  toggleWarehouseStatus: (id) => set((state) => ({
    warehouses: state.warehouses.map((warehouse) =>
      warehouse.id === id ? { ...warehouse, isActive: !warehouse.isActive } : warehouse
    ),
  })),

  addUser: (userData) => set((state) => ({
    users: [
      ...state.users,
      {
        ...userData,
        id: generateId(),
      },
    ],
  })),

  updateUser: (id, updates) => set((state) => ({
    users: state.users.map((user) =>
      user.id === id ? { ...user, ...updates } : user
    ),
  })),
}));

export default useWarehousesStore;