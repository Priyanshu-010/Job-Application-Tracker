import { useEffect, useState, useRef, type ChangeEvent, type FormEvent } from "react";
import type { JobStatus } from "../types/job.types";
import toast from "react-hot-toast";
import { getJobApi, updateJobApi } from "../api/job.api";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Building2, Briefcase, AlignLeft, MapPin, Calendar, CheckCircle2, ArrowLeft, Save } from "lucide-react";
import Loader from "../components/common/Loader";

function EditJob() {
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    description: "",
    status: "applied" as JobStatus,
    location: "",
    applicationDate: "",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();
  const dateInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        if (!id) throw new Error("Id not provided");
        const job = await getJobApi(id);
        setFormData({
          company: job.company,
          role: job.role,
          description: job.description,
          status: job.status,
          location: job.location,
          applicationDate: job.applicationDate.split("T")[0],
        });
      } catch (error) {
        console.log(error, "Error in useEffect EditJob")
        toast.error("Could not fetch job details");
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleIconClick = () => {
    dateInputRef.current?.showPicker();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!id) throw new Error("Id not provided");
      await updateJobApi(id, formData);
      toast.success("Changes saved successfully");
      navigate(`/detail/${id}`);
    } catch (error) {
      console.log(error, "Error in handleSubmit EditJob")
      toast.error("Error while updating job");
    }
  };

  if (loading) return <Loader />;

  const inputClasses = "block w-full pl-10 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all";
  const labelClasses = "block text-sm font-medium text-slate-400 mb-1.5 ml-1";

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 px-4 md:px-0">
      <Link to={`/detail/${id}`} className="inline-flex items-center gap-2 text-slate-400 hover:text-indigo-400 transition-colors mb-6 group">
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        Back to Details
      </Link>

      <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 md:p-10 backdrop-blur-sm shadow-xl">
        <h1 className="text-3xl font-bold text-white tracking-tight mb-8">Edit Application</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className={labelClasses}>Company Name</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-3 text-slate-500" size={18} />
                <input required type="text" name="company" value={formData.company} className={inputClasses} onChange={handleInputChange} />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className={labelClasses}>Job Role</label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-3 text-slate-500" size={18} />
                <input required type="text" name="role" value={formData.role} className={inputClasses} onChange={handleInputChange} />
              </div>
            </div>

            <div>
              <label className={labelClasses}>Application Status</label>
              <div className="relative">
                <CheckCircle2 className="absolute left-3 top-3 text-slate-500" size={18} />
                <select name="status" value={formData.status} className={`${inputClasses} appearance-none cursor-pointer`} onChange={handleInputChange}>
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
                <input type="text" name="location" value={formData.location} className={inputClasses} onChange={handleInputChange} />
              </div>
            </div>

            <div>
              <label className={labelClasses}>Date</label>
              <div className="relative group">
                <div 
                  onClick={handleIconClick}
                  className="absolute left-3 top-3 text-slate-500 group-focus-within:text-indigo-500 cursor-pointer z-10 hover:text-indigo-400 transition-colors"
                >
                  <Calendar size={18} />
                </div>
                <input 
                  ref={dateInputRef}
                  type="date" 
                  name="applicationDate" 
                  value={formData.applicationDate} 
                  className={`${inputClasses} [color-scheme:dark]`} 
                  onChange={handleInputChange} 
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className={labelClasses}>Job Description / Notes</label>
              <div className="relative">
                <AlignLeft className="absolute left-3 top-3 text-slate-500" size={18} />
                <textarea rows={4} name="description" value={formData.description} className={`${inputClasses} resize-none pl-10`} onChange={handleInputChange} />
              </div>
            </div>
          </div>

          <button type="submit" className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-500/20 active:scale-[0.98] mt-4">
            <Save size={20} />
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditJob;