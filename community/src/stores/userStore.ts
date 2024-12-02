import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User } from "@/types/user.type";  // Assuming User type is correctly defined
import { CONFIG } from '@/config';

interface UserState {
    user: User | null;
    loginTime: number | null;  // Add loginTime to state to track session expiration
    setUser: (user: User) => void;
    clearUser: () => void;
}

const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            user: null,
            loginTime: null,
            setUser: (user) => {
                const loginTime = Date.now(); 
                set({ user, loginTime });
                localStorage.setItem('loginTime', loginTime.toString());
            },
            clearUser: () => {
                set({ user: null, loginTime: null });
                localStorage.removeItem('user');
                localStorage.removeItem('loginTime');
            },
        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() =>
                typeof window !== 'undefined'
                    ? localStorage
                    : {
                        getItem: () => null,
                        setItem: () => { },
                        removeItem: () => { },
                    }
            ),
            onRehydrateStorage: () => (state) => {
                if (state?.loginTime) {
                    const currentTime = Date.now();
                    const elapsedTime = currentTime - state.loginTime;

                    // Clear user data if the expiration time has passed (using CONFIG for expiration time)
                    if (elapsedTime > CONFIG.USER_SESSION_EXPIRATION) {
                        state.clearUser();
                    }
                }
            },
        }
    )
);

export default useUserStore;
