import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User } from "@/types/user.type";
import { CONFIG } from '@/config';

interface UserState {
    user: User | null;
    loginTime: number | null; // Track login time for session expiration
    setUser: (user: User, persist?: boolean) => void;
    clearUser: () => void;
}

const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            user: null,
            loginTime: null,
            setUser: (user, persist = true) => {
                const loginTime = Date.now();
                set({ user, loginTime });

                if (persist) {
                    localStorage.setItem('user', JSON.stringify(user));
                    localStorage.setItem('loginTime', loginTime.toString());
                } else {
                    localStorage.removeItem('user');
                    localStorage.removeItem('loginTime');
                }
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
                if (!state?.loginTime) return;

                const currentTime = Date.now();
                const elapsedTime = currentTime - state.loginTime;

                if (elapsedTime > CONFIG.USER_SESSION_EXPIRATION) {
                    state.clearUser();
                }
            },
        }
    )
);

export default useUserStore;
