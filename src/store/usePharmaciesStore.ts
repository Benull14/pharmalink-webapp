import { create } from 'zustand';
import { generateId } from '../lib/utils';

export interface Pharmacy {
  id: string;
  userId: string;
  name: string;
  city: string;
  district: string;
  ordersCount: number;
  totalSales: number;
  isActive: boolean;
  createdAt: string;
}

interface PharmaciesState {
  pharmacies: Pharmacy[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  addPharmacy: (pharmacy: Omit<Pharmacy, 'id' | 'createdAt'>) => void;
  updatePharmacy: (id: string, updates: Partial<Pharmacy>) => void;
  deletePharmacy: (id: string) => void;
  togglePharmacyStatus: (id: string) => void;
}

// Initial mock data
const mockPharmacies: Pharmacy[] = [
  {
    id: '1',
    userId: '1',
    name: 'صيدلية الشفاء',
    city: 'الرياض',
    district: 'العليا',
    ordersCount: 156,
    totalSales: 45600,
    isActive: true,
    createdAt: new Date(2023, 5, 15).toISOString(),
  },
  {
    id: '2',
    userId: '2',
    name: 'صيدلية الدواء',
    city: 'جدة',
    district: 'الصفا',
    ordersCount: 89,
    totalSales: 28900,
    isActive: true,
    createdAt: new Date(2023, 6, 10).toISOString(),
  },
  {
    id: '3',
    userId: '3',
    name: 'صيدلية الحياة',
    city: 'الدمام',
    district: 'الشاطئ',
    ordersCount: 234,
    totalSales: 67800,
    isActive: true,
    createdAt: new Date(2023, 7, 20).toISOString(),
  },
  {
    id: '4',
    userId: '4',
    name: 'صيدلية الرعاية',
    city: 'الرياض',
    district: 'النخيل',
    ordersCount: 178,
    totalSales: 52400,
    isActive: true,
    createdAt: new Date(2023, 8, 5).toISOString(),
  },
  {
    id: '5',
    userId: '5',
    name: 'صيدلية الأمل',
    city: 'جدة',
    district: 'الحمراء',
    ordersCount: 145,
    totalSales: 43200,
    isActive: true,
    createdAt: new Date(2023, 8, 15).toISOString(),
  },
  {
    id: '6',
    userId: '6',
    name: 'صيدلية السلامة',
    city: 'المدينة المنورة',
    district: 'العزيزية',
    ordersCount: 98,
    totalSales: 31500,
    isActive: true,
    createdAt: new Date(2023, 9, 1).toISOString(),
  },
  {
    id: '7',
    userId: '7',
    name: 'صيدلية الصحة',
    city: 'الرياض',
    district: 'السليمانية',
    ordersCount: 167,
    totalSales: 48900,
    isActive: true,
    createdAt: new Date(2023, 9, 20).toISOString(),
  },
  {
    id: '8',
    userId: '8',
    name: 'صيدلية المدينة',
    city: 'المدينة المنورة',
    district: 'قباء',
    ordersCount: 112,
    totalSales: 35600,
    isActive: false,
    createdAt: new Date(2023, 10, 5).toISOString(),
  },
  {
    id: '9',
    userId: '9',
    name: 'صيدلية الخليج',
    city: 'الدمام',
    district: 'الفيصلية',
    ordersCount: 143,
    totalSales: 41800,
    isActive: true,
    createdAt: new Date(2023, 10, 15).toISOString(),
  },
  {
    id: '10',
    userId: '10',
    name: 'صيدلية النور',
    city: 'جدة',
    district: 'النزهة',
    ordersCount: 134,
    totalSales: 39700,
    isActive: true,
    createdAt: new Date(2023, 11, 1).toISOString(),
  },
  {
    id: '11',
    userId: '11',
    name: 'صيدلية الوفاء',
    city: 'الرياض',
    district: 'الملز',
    ordersCount: 189,
    totalSales: 55300,
    isActive: true,
    createdAt: new Date(2024, 0, 5).toISOString(),
  },
  {
    id: '12',
    userId: '12',
    name: 'صيدلية البلد',
    city: 'جدة',
    district: 'البوادي',
    ordersCount: 156,
    totalSales: 46200,
    isActive: false,
    createdAt: new Date(2024, 0, 20).toISOString(),
  }
];

const usePharmaciesStore = create<PharmaciesState>((set) => ({
  pharmacies: mockPharmacies,
  isLoading: false,
  error: null,

  addPharmacy: (pharmacyData) => set((state) => ({
    pharmacies: [
      ...state.pharmacies,
      {
        ...pharmacyData,
        id: generateId(),
        createdAt: new Date().toISOString(),
      },
    ],
  })),

  updatePharmacy: (id, updates) => set((state) => ({
    pharmacies: state.pharmacies.map((pharmacy) =>
      pharmacy.id === id ? { ...pharmacy, ...updates } : pharmacy
    ),
  })),

  deletePharmacy: (id) => set((state) => ({
    pharmacies: state.pharmacies.filter((pharmacy) => pharmacy.id !== id),
  })),

  togglePharmacyStatus: (id) => set((state) => ({
    pharmacies: state.pharmacies.map((pharmacy) =>
      pharmacy.id === id ? { ...pharmacy, isActive: !pharmacy.isActive } : pharmacy
    ),
  })),
}));

export default usePharmaciesStore;