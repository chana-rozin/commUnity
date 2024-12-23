import { IoIosLogOut } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";
import useUserStore from "@/stores/userStore";
import Link from "next/link";
import { logout as logoutService } from "@/services/logout";
import { toast } from "react-toastify";

const MenuPopup = ({ popupRef }: { popupRef: React.RefObject<HTMLDivElement> }) => {
    const { clearUser } = useUserStore();

    const logout = async () => {
        const success = await logoutService();
        if (success)
            clearUser();
        else
            toast.error("Error logout, please try again");
    };

    return (
        <div ref={popupRef} className="absolute top-16">
            <div
                className="absolute -top-2 left-9 w-0 h-0 border-l-8 border-l-transparent border-b-8 border-b-white border-r-8 border-r-transparent"
            ></div>
            <div className="flex flex-col bg-white shadow-lg p-5 py-8 gap-8 rounded-2xl text-gray-500 transition-colors duration-200">
                <div
                    onClick={logout}
                    className="flex gap-3 hover:text-indigo-400 items-center cursor-pointer"
                >
                    <IoIosLogOut />
                    <span>התנתקות</span>
                </div>
                <Link href="/settings/myProfile" className="flex gap-3 hover:text-indigo-400 items-center">
                    <RxAvatar />
                    <span>הפרופיל שלי</span>
                </Link>
            </div>
        </div>
    );
};

export default MenuPopup;
