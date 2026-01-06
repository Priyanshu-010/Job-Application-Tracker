import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";
import { LogOut, PlusIcon } from "lucide-react";
import type { MouseEvent } from "react";
import toast from "react-hot-toast";

function Navbar() {
  const user = useAuthStore((state) => state.user);
  const { logout } = useAuthStore();
  const navigate = useNavigate()

  const handleClick = async(e: MouseEvent<HTMLButtonElement>)=>{
    e.preventDefault()
    try {
      logout();
      toast.success("Logout Successful")
      navigate("/login")
    } catch (error) {
      console.log(error, "Error while Logging out navbar handleClick function")
      toast.error("Error Logging Out")
    }
  }
  return (
    <header>
      <nav>
        <Link to="/">JobApplication Tracker</Link>

        <div>
          {user ? (
            <div>
              <Link
                to="/create"
                className="hidden md:flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg transition-colors shadow-lg shadow-indigo-500/20"
              >
                <PlusIcon size={18} />
                Create Job
              </Link>
              <button
                onClick={handleClick}
                className="flex items-center gap-2 text-slate-400 hover:text-red-400 px-3 py-2 transition-colors border-l border-slate-800 ml-2"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3 text-sm font-medium">
              <Link
                to="/login"
                className="text-slate-300 hover:text-white px-4 py-2 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-slate-800 hover:bg-slate-700 text-white px-5 py-2 rounded-lg transition-all border border-slate-700"
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
