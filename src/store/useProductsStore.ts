import { create } from 'zustand';
import { generateId } from '../lib/utils';

export interface Product {
  id: string;
  name: string;
  category: string;
  company: string;
  price: number;
  stock: number;
  isActive: boolean;
  createdAt: string;
}

interface ProductsState {
  products: Product[];
  categories: string[];
  companies: string[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  setProducts: (products: Product[]) => void;
}

// Initial mock data
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'باراسيتامول',
    category: 'مسكنات',
    company: 'فارما إنترناشيونال',
    price: 12.5,
    stock: 230,
    isActive: true,
    createdAt: new Date(2023, 5, 15).toISOString(),
  },
  {
    id: '2',
    name: 'أموكسيسيلين',
    category: 'مضادات حيوية',
    company: 'الحكمة للأدوية',
    price: 25.75,
    stock: 150,
    isActive: true,
    createdAt: new Date(2023, 6, 10).toISOString(),
  },
  {
    id: '3',
    name: 'لوراتادين',
    category: 'مضادات الحساسية',
    company: 'الدواء للصناعات الدوائية',
    price: 18.99,
    stock: 85,
    isActive: true,
    createdAt: new Date(2023, 7, 5).toISOString(),
  },
  {
    id: '4',
    name: 'أتورفاستاتين',
    category: 'أدوية القلب',
    company: 'سبيماكو',
    price: 45.5,
    stock: 60,
    isActive: true,
    createdAt: new Date(2023, 8, 20).toISOString(),
  },
  {
    id: '5',
    name: 'ميتفورمين',
    category: 'أدوية السكري',
    company: 'جلفار',
    price: 32.25,
    stock: 120,
    isActive: true,
    createdAt: new Date(2023, 9, 12).toISOString(),
  },
];

const mockCategories = [
  'مسكنات',
  'مضادات حيوية',
  'مضادات الحساسية',
  'أدوية القلب',
  'أدوية السكري',
  'فيتامينات ومكملات',
  'أدوية الجهاز الهضمي',
  'أدوية الجهاز التنفسي',
];

const mockCompanies = [
  'فارما إنترناشيونال',
  'الحكمة للأدوية',
  'الدواء للصناعات الدوائية',
  'سبيماكو',
  'جلفار',
  'الكيميائية السعودية',
  'تبوك للصناعات الدوائية',
];

const useProductsStore = create<ProductsState>((set) => ({
  products: mockProducts,
  categories: mockCategories,
  companies: mockCompanies,
  isLoading: false,
  error: null,

  addProduct: (productData) => set((state) => ({
    products: [
      ...state.products,
      {
        ...productData,
        id: generateId(),
        createdAt: new Date().toISOString(),
      },
    ],
  })),

  updateProduct: (id, updates) => set((state) => ({
    products: state.products.map((product) =>
      product.id === id ? { ...product, ...updates } : product
    ),
  })),

  deleteProduct: (id) => set((state) => ({
    products: state.products.filter((product) => product.id !== id),
  })),

  setProducts: (products) => set({ products }),
}));

export default useProductsStore;