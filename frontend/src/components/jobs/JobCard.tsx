import { Link } from "react-router-dom";
import type { Job } from "../../types/job.types";
import { formatDate } from "../../utils/date";
import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { deleteJobApi } from "../../api/job.api";
import type { Dispatch, SetStateAction } from "react";

type Props = {
  job: Job;
  setJobs: Dispatch<SetStateAction<Job[]>>;
};
function JobCard({ job, setJobs }: Props) {
  const handleClick = (id: string) => {
    if (window.confirm("Are you sure you want to delete this job listing?")) {
      try {
        deleteJobApi(id);
        setJobs((prev: Job[]) => prev.filter((job) => job._id !== id));
      } catch (error) {
        console.log(error, "Error in deleting deleteJobApi");
      }
    }
  };

  return (
    <div className="p-6 border border-amber-500">
      <Link to={`/detail/${job._id}`} key={job._id}>
        <h1>{job.company}</h1>
        <h1>{job.role}</h1>
        <h1>{job.description}</h1>
        <h1>{job.status}</h1>
        <h1>{formatDate(job.applicationDate)}</h1>
      </Link>
      <div>
        <button>
          <PenSquareIcon />
        </button>
        <button onClick={() => handleClick(job._id)}>
          <Trash2Icon />
        </button>
      </div>
    </div>
  );
}

export default JobCard;
