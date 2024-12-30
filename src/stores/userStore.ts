import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User } from "@/types/user.type";
import { CONFIG } from '@/config';
import { Notifications } from "@/types/general.type";

interface UserState {
    user: User | null;
    loginTime: number | null;
    setUser: (user: User, shouldPersist?: boolean) => void;
    clearUser: () => void;
    addNotification: (notification: Notifications) => void;
    deleteNotification: (notificationId: string) => void;
}

const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            user: null,
            loginTime: null,
            setUser: (user, shouldPersist = true) => {
                const loginTime = Date.now();
                set({ 
                    user, 
                    loginTime 
                });
                
                // Let Zustand's persist middleware handle persistence
                // Remove manual localStorage management
            },
            clearUser: () => {
                set({ user: null, loginTime: null });
                // Remove manual localStorage management
            },
            addNotification: (notification: Notifications) =>
                set((state) => ({
                    user: state.user ? {
                        ...state.user,
                        notifications: [...(state.user.notifications || []), notification]
                    } : null
                })),

            deleteNotification: (notificationId: string) =>
                set((state) => ({
                    user: state.user
                        ? {
                            ...state.user,
                            notifications: state.user.notifications.filter(
                                (notification) => notification._id !== notificationId
                            ),
                        }
                        : null,
                })),
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
                console.log('Rehydrated state:', state?.user?.notifications);

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