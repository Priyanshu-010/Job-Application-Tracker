import { useState, useRef, type FormEvent } from "react";
import type { JobStatus } from "../types/job.types";
import { createJobApi } from "../api/job.api";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { Building2, Briefcase, AlignLeft, MapPin, Calendar, CheckCircle2, ArrowLeft, Plus } from "lucide-react";

function CreateJob() {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<JobStatus>("applied");
  const [location, setLocation] = useState("");
  const [applicationDate, setApplicationDate] = useState("");
  const navigate = useNavigate();
  
  // Reference for the date input
  const dateInputRef = useRef<HTMLInputElement>(null);

  const handleIconClick = () => {
    // Opens the native calendar picker when the Lucide icon is clicked
    dateInputRef.current?.showPicker();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createJobApi({ company, role, description, status, location, applicationDate });
      toast.success("Job application tracked!");
      navigate("/");
    } catch (error) {
      console.log(error, "Error in handleSubmit createJob")
      toast.error("Error creating application");
    }
  };

  const inputClasses = "block w-full pl-10 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all";
  const labelClasses = "block text-sm font-medium text-slate-400 mb-1.5 ml-1";

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-indigo-400 transition-colors mb-6 group">
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        Back to Dashboard
      </Link>

      <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 md:p-10 backdrop-blur-sm shadow-xl">
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl font-bold text-white tracking-tight">Add New Application</h1>
          <p className="text-slate-400 mt-2">Enter the details of your job application to start tracking.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className={labelClasses}>Company Name</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-3 text-slate-500" size={18} />
                <input required type="text" placeholder="e.g. Google, Stripe" className={inputClasses} onChange={(e) => setCompany(e.target.value)} />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className={labelClasses}>Job Role</label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-3 text-slate-500" size={18} />
                <input required type="text" placeholder="e.g. Full Stack Developer" className={inputClasses} onChange={(e) => setRole(e.target.value)} />
              </div>
            </div>

            <div>
              <label className={labelClasses}>Application Status</label>
              <div className="relative">
                <CheckCircle2 className="absolute left-3 top-3 text-slate-500" size={18} />
                <select 
                  className={`${inputClasses} appearance-none cursor-pointer`}
                  value={status}
                  onChange={(e) => setStatus(e.target.value as JobStatus)}
                >
                  <option value="applied">Applied</option>
                  <option value="interviewing">Interviewing</option>
                  <option value="offered">Offered</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>

            <div>
              <label className={labelClasses}>Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-slate-500" size={18} />
                <input type="text" placeholder="e.g. Remote, NY" className={inputClasses} onChange={(e) => setLocation(e.target.value)} />
              </div>
            </div>

            <div>
              <label className={labelClasses}>Application Date</label>
              <div className="relative group">
                <div 
                  onClick={handleIconClick}
                  className="absolute left-3 top-3 text-slate-500 group-focus-within:text-indigo-500 cursor-pointer z-10 hover:text-indigo-400 transition-colors"
                >
                  <Calendar size={18} />
                </div>
                <input 
                  ref={dateInputRef}
                  required 
                  type="date" 
                  className={`${inputClasses} [scheme:dark]`} 
                  onChange={(e) => setApplicationDate(e.target.value)} 
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className={labelClasses}>Job Description / Notes</label>
              <div className="relative">
                <AlignLeft className="absolute left-3 top-3 text-slate-500" size={18} />
                <textarea rows={4} placeholder="Paste job description or notes..." className={`${inputClasses} resize-none pl-10`} onChange={(e) => setDescription(e.target.value)} />
              </div>
            </div>
          </div>

          <button type="submit" className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-500/20 active:scale-[0.98] mt-4">
            <Plus size={20} />
            Create Application
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateJob;