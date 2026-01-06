import { Link, useNavigate } from "react-router-dom";
import type { Job } from "../../types/job.types";
import { formatDate } from "../../utils/date";
import {
  PenSquare,
  Trash2,
  Calendar,
  Briefcase,
  Building2,
} from "lucide-react";
import { deleteJobApi } from "../../api/job.api";
import type { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";

type Props = {
  job: Job;
  setJobs: Dispatch<SetStateAction<Job[]>>;
};

function JobCard({ job, setJobs }: Props) {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "applied":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "interviewing":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      case "accepted":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "rejected":
        return "bg-rose-500/10 text-rose-400 border-rose-500/20";
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    }
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete this job listing?")) {
      try {
        await deleteJobApi(job._id);
        setJobs((prev) => prev.filter((j) => j._id !== job._id));
        toast.success("Application deleted");
      } catch (error) {
        console.error("Error deleting job:", error);
        toast.error("Failed to delete application");
      }
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(`/edit/${job._id}`);
  };

  return (
    <div className="group relative bg-slate-900/40 border border-slate-800 rounded-2xl p-5 hover:border-indigo-500/50 hover:bg-slate-900/60 transition-all duration-300 shadow-sm hover:shadow-indigo-500/10">
      <Link to={`/detail/${job._id}`} className="block space-y-4">
        {/* Header: Status and Actions */}
        <div className="flex items-start justify-between">
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusColor(
              job.status
            )}`}
          >
            {job.status.toUpperCase()}
          </span>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleEdit}
              className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-colors"
            >
              <PenSquare size={18} />
            </button>
            <button
              onClick={handleDelete}
              className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors flex items-center gap-2">
            <Building2 size={18} className="text-slate-500" />
            {job.company}
          </h3>
          <p className="text-slate-300 font-medium flex items-center gap-2 mt-1">
            <Briefcase size={16} className="text-slate-500" />
            {job.role}
          </p>
        </div>

        <p className="text-slate-400 text-sm line-clamp-2 leading-relaxed">
          {job.description}
        </p>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800/50 flex items-center text-slate-500 text-xs gap-4">
          <div className="flex items-center gap-1.5">
            <Calendar size={14} />
            {formatDate(job.applicationDate)}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default JobCard;
