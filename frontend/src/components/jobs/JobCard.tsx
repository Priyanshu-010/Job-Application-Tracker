import { Link } from "react-router-dom";
import type { Job } from "../../types/job.types";

type Props = {
  job: Job;
};
function JobCard({ job }: Props) {
  return (
    <div className="p-6 border border-amber-500">
      <Link to={`/detail/${job._id}`} key={job._id}>
        <h1>{job.company}</h1>
        <h1>{job.role}</h1>
        <h1>{job.description}</h1>
        <h1>{job.status}</h1>
        <h1>{job.applicationDate}</h1>
      </Link>
    </div>
  );
}

export default JobCard;
