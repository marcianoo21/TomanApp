import { create } from 'zustand';

interface AuthState {
  loggedInUser: boolean;
  loading: boolean;
  setLoggedInUser: (value: boolean) => void;
  setLoading: (value: boolean) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  loggedInUser: false,
  loading: false,
  setLoggedInUser: (value) => set({ loggedInUser: value }),
  setLoading: (value) => set({ loading: value }),
}));

export default useAuthStore;
