import { useEffect, useState } from "react";
import { deleteJobApi, getJobApi, updateJobApi } from "../api/job.api";
import type { Job, JobStatus } from "../types/job.types";
import { useNavigate, useParams, Link } from "react-router-dom";
import { formatDate } from "../utils/date";
import {
  PenSquare,
  Trash2,
  ArrowLeft,
  Building2,
  Briefcase,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import Loader from "../components/common/Loader";
import toast from "react-hot-toast";

function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    getJobApi(id)
      .then((data) => {
        setJob(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this job listing?")) {
      try {
        if (!id) throw new Error("Id not provided");
        await deleteJobApi(id);
        toast.success("Application removed");
        navigate("/");
      } catch (error) {
        console.error("Error in handleDelete:", error);
        toast.error("Error deleting application");
      }
    }
  };

  const handleStatusChange = async (newStatus: JobStatus) => {
    if (!job || !id) return;
    try {
      // Create update payload matching the Job type expected by your API
      const updatedData = { ...job, status: newStatus };
      await updateJobApi(id, updatedData);
      setJob(updatedData); // Optimistic UI update
      toast.success(`Moved to ${newStatus}`);
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  if (loading) return <Loader />;
  if (!job)
    return (
      <div className="text-center py-20 text-slate-400 font-medium">
        Application not found.
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 px-4 md:px-0">
      {/* Navigation */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-slate-400 hover:text-indigo-400 transition-colors mb-8 group"
      >
        <ArrowLeft
          size={20}
          className="group-hover:-translate-x-1 transition-transform"
        />
        <span className="font-medium">Back to Applications</span>
      </Link>

      <div className="bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden backdrop-blur-sm shadow-2xl">
        {/* Header Section */}
        <div className="p-8 md:p-12 border-b border-slate-800 bg-linear-to-br from-indigo-500/5 to-transparent">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
            <div className="space-y-6">
              <div className="flex flex-col gap-3">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-indigo-500" />
                  Quick Status Update
                </p>
                <div className="flex flex-wrap gap-2">
                  {(
                    [
                      "applied",
                      "interviewing",
                      "offered",
                      "rejected",
                    ] as JobStatus[]
                  ).map((s) => (
                    <button
                      key={s}
                      onClick={() => handleStatusChange(s)}
                      className={`px-3 py-1.5 rounded-xl text-[10px] md:text-xs font-bold transition-all border uppercase tracking-wider ${
                        job.status === s
                          ? "bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-500/20"
                          : "bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
                  {job.company}
                </h1>
                <p className="text-xl md:text-2xl text-slate-300 flex items-center gap-3 mt-2 font-medium">
                  <Briefcase className="text-indigo-500" size={24} />
                  {job.role}
                </p>
              </div>
            </div>

            <div className="flex flex-row md:flex-col gap-3">
              <button
                onClick={() => navigate(`/edit/${job._id}`)}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition-all border border-slate-700 shadow-lg"
              >
                <PenSquare size={18} />
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 font-bold transition-all shadow-lg shadow-rose-500/5"
              >
                <Trash2 size={18} />
                Delete
              </button>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 md:p-12 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-5 p-6 rounded-2xl bg-slate-950/40 border border-slate-800/60 group hover:border-indigo-500/30 transition-colors">
              <div className="p-4 bg-indigo-500/10 rounded-2xl text-indigo-500 group-hover:scale-110 transition-transform">
                <Calendar size={28} />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">
                  Applied On
                </p>
                <p className="text-xl text-slate-200 font-semibold">
                  {formatDate(job.applicationDate)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5 p-6 rounded-2xl bg-slate-950/40 border border-slate-800/60 group hover:border-indigo-500/30 transition-colors">
              <div className="p-4 bg-indigo-500/10 rounded-2xl text-indigo-500 group-hover:scale-110 transition-transform">
                <Building2 size={28} />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">
                  Location
                </p>
                <p className="text-xl text-slate-200 font-semibold">
                  {job.location || "Not Specified"}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <div className="h-8 w-1.5 bg-indigo-500 rounded-full"></div>
              Description & Notes
            </h2>
            <div className="bg-slate-950/50 p-8 rounded-3xl border border-slate-800 text-slate-300 leading-relaxed whitespace-pre-wrap text-lg shadow-inner">
              {job.description || (
                <span className="text-slate-600 italic font-medium text-base">
                  No additional description or notes provided for this
                  application.
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;
