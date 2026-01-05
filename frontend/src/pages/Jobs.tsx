import { useEffect, useState } from "react";
import { getJobsApi } from "../api/job.api";
import type { Job } from "../types/job.types";

function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    getJobsApi().then(setJobs); //This is equivalent to .then((data)=>setJobs(data))
  }, []);

  return (
    <div>
      {jobs.map((job) => (
        <div key={job._id}>
          <h1>{job.company}</h1>
          <h1>{job.role}</h1>
          <h1>{job.description}</h1>
          <h1>{job.status}</h1>
          <h1>{job.applicationDate}</h1>
        </div>
      ))}
    </div>
  );
}

export default Jobs;
