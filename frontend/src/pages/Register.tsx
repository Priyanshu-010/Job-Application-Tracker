import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import { registerApi } from "../api/auth.api";
import toast from "react-hot-toast";
import { User, Mail, Lock, UserPlus, ArrowRight } from "lucide-react";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await registerApi(name, email, password);
      login(res.user, res.token);
      toast.success(res.message);
      navigate("/");
    } catch (error) {
      console.log(error, "Error while registering, handleSubmit function");
      toast.error("Error while registering");
    }
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-slate-900/50 p-8 rounded-2xl border border-slate-800 backdrop-blur-sm shadow-xl">
        <div className="text-center">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-500/10 rounded-xl mb-4">
            <UserPlus className="w-8 h-8 text-indigo-500" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white">Create Account</h2>
          <p className="mt-2 text-sm text-slate-400">
            Join us to start tracking your applications
          </p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">
                Full Name
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-500 transition-colors">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  required
                  className="block w-full pl-10 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  placeholder="John Doe"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-500 transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  className="block w-full pl-10 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  placeholder="abc@email.com"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-500 transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  className="block w-full pl-10 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  placeholder="••••••••"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all shadow-lg shadow-indigo-500/25 mt-8"
          >
            Create Account
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </form>

        <p className="text-center text-sm text-slate-400 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
            Sign in instead
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;