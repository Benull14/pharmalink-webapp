// Mock user data
const MOCK_USERS = [
  {
    id: '1',
    email: 'admin@example.com',
    password: 'admin123', // In a real app, this would be hashed
    role: 'admin'
  }
];

export const mockAuth = {
  currentUser: null as any,
  
  signInWithPassword: async ({ email, password }: { email: string, password: string }) => {
    const user = MOCK_USERS.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('البريد الإلكتروني أو كلمة المرور غير صحيحة');
    }
    
    mockAuth.currentUser = user;
    localStorage.setItem('mockUser', JSON.stringify(user));
    
    return { data: { user }, error: null };
  },
  
  getUser: async () => {
    const savedUser = localStorage.getItem('mockUser');
    const user = savedUser ? JSON.parse(savedUser) : null;
    mockAuth.currentUser = user;
    return { data: { user }, error: null };
  },
  
  signOut: async () => {
    mockAuth.currentUser = null;
    localStorage.removeItem('mockUser');
    return { error: null };
  },

  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    // Add event listener for storage changes to handle auth state across tabs
    const storageListener = (e: StorageEvent) => {
      if (e.key === 'mockUser') {
        const user = e.newValue ? JSON.parse(e.newValue) : null;
        callback(user ? 'SIGNED_IN' : 'SIGNED_OUT', { user });
      }
    };

    window.addEventListener('storage', storageListener);

    // Return subscription object that matches Supabase's interface
    return {
      data: {
        subscription: {
          unsubscribe: () => {
            window.removeEventListener('storage', storageListener);
          }
        }
      }
    };
  }
};

export const mockDatabase = {
  from: (table: string) => ({
    select: (columns: string) => ({
      eq: (column: string, value: string) => ({
        single: async () => {
          if (table === 'users' && mockAuth.currentUser) {
            return {
              data: { role: mockAuth.currentUser.role },
              error: null
            };
          }
          return { data: null, error: new Error('User not found') };
        }
      })
    })
  })
};