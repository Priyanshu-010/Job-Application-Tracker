import { useEffect, useState } from "react";
import { getJobsApi } from "../api/job.api";
import type { Job } from "../types/job.types";
import JobCard from "../components/jobs/JobCard";
import Loader from "../components/common/Loader";
import { Briefcase, Plus } from "lucide-react";
import { Link } from "react-router-dom";

function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getJobsApi();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <div className="p-2 bg-indigo-500/10 rounded-lg">
              <Briefcase className="text-indigo-500" size={24} />
            </div>
            Applications
          </h1>
          <p className="mt-1 text-slate-400">
            Manage and track your active job applications
          </p>
        </div>
        
        {/* Mobile-only create button if you want it here as well as navbar */}
        <Link
          to="/create"
          className="md:hidden flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-indigo-500/20"
        >
          <Plus size={20} />
          New Application
        </Link>
      </div>

      {/* Grid Section */}
      {jobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard job={job} setJobs={setJobs} key={job._id} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-slate-900/30 border border-dashed border-slate-800 rounded-3xl">
          <div className="p-4 bg-slate-900 rounded-2xl mb-4">
            <Briefcase size={40} className="text-slate-700" />
          </div>
          <h3 className="text-xl font-semibold text-white">No applications yet</h3>
          <p className="mt-2 text-slate-400 max-w-xs">
            Start tracking your career journey by adding your first job application.
          </p>
          <Link
            to="/create"
            className="mt-6 flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
          >
            <Plus size={18} />
            Add your first job
          </Link>
        </div>
      )}
    </div>
  );
}

export default Jobs;