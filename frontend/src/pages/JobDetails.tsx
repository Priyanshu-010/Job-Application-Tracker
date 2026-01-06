import { useEffect, useState } from "react";
import { deleteJobApi, getJobApi } from "../api/job.api";
import type { Job } from "../types/job.types";
import { useNavigate, useParams } from "react-router-dom";
import { formatDate } from "../utils/date";
import { PenSquareIcon, Trash2Icon } from "lucide-react";

function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) throw new Error("Id not provided");
    getJobApi(id).then(setJob);
  }, [id]);
  
  const handleClick = () => {
    if (window.confirm("Are you sure you want to delete this job listing?")) {
      try {
        if (!id) throw new Error("Id not provided");
        deleteJobApi(id);
        navigate("/");
      } catch (error) {
        console.log(error, "Error in deleting deleteJobApi");
      }
    }
  };

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

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
        <button onClick={handleEdit}>
          <PenSquareIcon />
        </button>
        <button onClick={handleClick}>
          <Trash2Icon />
        </button>
      </div>
    </div>
  );
}

export default JobDetails;
