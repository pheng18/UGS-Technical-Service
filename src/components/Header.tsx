import React from "react";
import { User, signOut } from "../firebase";
import { Search, Bell, Settings, LogOut } from "lucide-react";

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
  searchTerm: string;
  onSearchChange: (val: string) => void;
  searchPlaceholder?: string;
}

export default function Header({
  user,
  onLogout,
  searchTerm,
  onSearchChange,
  searchPlaceholder = "ຄົ້ນຫາອຸປະກອນ ຫຼື ເລກລະຫັດ...",
}: HeaderProps) {
  return (
    <header className="flex justify-between items-center w-full px-8 h-16 sticky top-0 z-40 bg-white border-b border-slate-200/80 shadow-sm">
      {/* Left Search Bar */}
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm transition-all text-slate-800 placeholder-slate-400"
            placeholder={searchPlaceholder}
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      {/* Right User Bar */}
      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full"></span>
        </button>
        <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors">
          <Settings className="w-5 h-5" />
        </button>

        <div className="h-8 w-[1px] bg-slate-200 mx-1"></div>

        {user ? (
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-slate-800 leading-none">{user.displayName || user.email}</p>
              <p className="text-[10px] text-slate-500 font-medium mt-1">
                {user.email?.includes("admin") ? "ຜູ້ຈັດການເຕັກນິກ" : "ວິສະວະກອນເຕັກນິກ"}
              </p>
            </div>
            <div className="group relative">
              <img
                alt="User Profile"
                className="h-10 w-10 rounded-full border border-slate-300 object-cover cursor-pointer hover:border-primary transition-colors"
                src={user.photoURL || "https://lh3.googleusercontent.com/a/default-user=s96-c"}
              />
              <div className="absolute right-0 top-12 bg-white border border-slate-200 rounded-lg shadow-lg py-2 w-48 hidden group-hover:block z-50 animate-fade-in">
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="text-xs font-bold text-slate-800 truncate">{user.displayName || "Technical User"}</p>
                  <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
                </div>
                <button
                  onClick={onLogout}
                  className="w-full px-4 py-2 text-left text-xs text-primary hover:bg-slate-50 flex items-center gap-2"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>ອອກຈາກລະບົບ</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
              <Settings className="w-4 h-4 text-slate-400" />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
