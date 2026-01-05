import { useEffect, useState } from "react";
import { getJobsApi } from "../api/job.api";
import type { Job } from "../types/job.types";
import JobCard from "../components/jobs/JobCard";

function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    getJobsApi().then(setJobs); //This is equivalent to .then((data)=>setJobs(data))
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {jobs.map((job) => (
        <JobCard job={job} setJobs={setJobs} key={job._id}/>
      ))}
    </div>
  );
}

export default Jobs;
