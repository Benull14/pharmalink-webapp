import { mockAuth, mockDatabase } from './mockAuth';

// Mock Supabase client with our mock authentication
export const supabase = {
  auth: mockAuth,
  from: mockDatabase.from
};