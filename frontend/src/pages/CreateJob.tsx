import { useState, type ChangeEvent, type FormEvent } from "react";
import type { JobStatus } from "../types/job.types";
import { createJobApi } from "../api/job.api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function CreateJob() {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<JobStatus>("applied");
  const [location, setLocation] = useState("");
  const [applicationDate, setApplicationDate] = useState("");
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createJobApi({
        company,
        role,
        description,
        status,
        location,
        applicationDate,
      });
      toast.success("Job created successfully");
      navigate("/")
    } catch (error) {
      console.log(error, " Error in handleSubmit CreateJob");
      toast.error("Error while creating Job")
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>Company: </label>
      <input
        type="text"
        placeholder="Ex. Google"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setCompany(e.target.value)
        }
      />
      <label>Role: </label>
      <input
        type="text"
        placeholder="Enter your name"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setRole(e.target.value)}
      />
      <label>Description: </label>
      <input
        type="text"
        placeholder="About the Role"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setDescription(e.target.value)
        }
      />
      <label>Status: </label>
      <input
        type="text"
        list="statusOptions"
        placeholder="Select or enter Status"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setStatus(e.target.value as JobStatus)
        }
      />
      <datalist id="statusOptions">
        <option value="applied" />
        <option value="interviewing" />
        <option value="offered" />
        <option value="rejected" />
      </datalist>
      <label>Location: </label>
      <input
        type="text"
        placeholder="Enter Location"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setLocation(e.target.value)
        }
      />
      <label>Date: </label>
      <input
        type="date"
        placeholder="Enter Location"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setApplicationDate(e.target.value)
        }
      />
      <button>Create</button>
    </form>
  );
}

export default CreateJob;
