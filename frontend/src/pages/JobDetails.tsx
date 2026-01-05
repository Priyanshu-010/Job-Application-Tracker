import { useEffect, useState } from "react";
import { getJobApi } from "../api/job.api";
import type { Job } from "../types/job.types";
import { useParams } from "react-router-dom";
import { formatDate } from "../utils/date";
import { PenSquareIcon, Trash2Icon } from "lucide-react";

function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  useEffect(() => {
    if (!id) throw new Error("Id not provided");
    getJobApi(id).then(setJob);
  }, [id]);
  return (
    <div>
      <div>
        <h1>{job?.company}</h1>
        <h1>{job?.role}</h1>
        <h1>{job?.description}</h1>
        <h1>{job?.status}</h1>
        <h1>{formatDate(job?.applicationDate)}</h1>
      </div>
      <div>
        <button>
          <PenSquareIcon />
        </button>
        <button>
          <Trash2Icon />
        </button>
      </div>
    </div>
  );
}

export default JobDetails;
