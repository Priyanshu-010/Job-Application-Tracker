import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";
import { LogOut, PlusIcon, Briefcase, User } from "lucide-react";
import type { MouseEvent } from "react";
import toast from "react-hot-toast";

function Navbar() {
  const user = useAuthStore((state) => state.user);
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      logout();
      toast.success("Logout Successful");
      navigate("/login");
    } catch (error) {
      console.log(error, "Error while Logging out navbar handleClick function");
      toast.error("Error Logging Out");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <nav className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-10">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2 text-xl font-bold tracking-tight text-white transition-opacity hover:opacity-90"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 shadow-lg shadow-indigo-500/20">
            <Briefcase size={18} className="text-white" />
          </div>
          <span className="hidden sm:inline">JobTracker</span>
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-2 md:gap-4">
              <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800">
                <div className="h-6 w-6 rounded-full bg-indigo-500/20 flex items-center justify-center">
                  <User size={14} className="text-indigo-400" />
                </div>
                <span className="text-sm font-medium text-slate-300">{user.username}</span>
              </div>

              {/* Create Button */}
              <Link
                to="/create"
                className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/20 active:scale-95"
              >
                <PlusIcon size={18} />
                <span className="hidden md:inline">Create Job</span>
              </Link>

              {/* Logout Button */}
              <button
                onClick={handleClick}
                className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/50 px-3 py-2 text-sm font-medium text-slate-400 transition-colors hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20"
                title="Logout"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-slate-400 transition-colors hover:text-white"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="rounded-xl bg-slate-100 px-5 py-2 text-sm font-bold text-slate-950 transition-all hover:bg-white active:scale-95"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;