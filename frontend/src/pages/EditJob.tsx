import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import type { JobStatus } from "../types/job.types";
import toast from "react-hot-toast";
import { getJobApi, updateJobApi } from "../api/job.api";
import { useNavigate, useParams } from "react-router-dom";

function EditJob() {
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    description: "",
    status: "applied" as JobStatus,
    location: "",
    applicationDate: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        if (!id) throw new Error("Id not provided");
        const job = await getJobApi(id);
        setFormData({
          company: job.company,
          role: job.role,
          description: job.description,
          status: job.status,
          location: job.location,
          applicationDate: job.applicationDate.split("T")[0],
        });
      } catch (error) {
        console.error(error);
        toast.error("Could not fetch job details");
      }
    };
    fetchJob();
  }, [id]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!id) throw new Error("Id not provided");
      await updateJobApi(id, {
        ...formData,
      });
      toast.success("Job updated successfully");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Error while updating job");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Company: </label>
      <input
        type="text"
        name="company"
        value={formData.company}
        placeholder="Ex. Google"
        onChange={handleInputChange}
      />

      <label>Role: </label>
      <input
        type="text"
        name="role"
        value={formData.role}
        placeholder="Enter your Role"
        onChange={handleInputChange}
      />

      <label>Description: </label>
      <input
        type="text"
        name="description"
        value={formData.description}
        placeholder="About the Role"
        onChange={handleInputChange}
      />

      <label>Status: </label>
      <input
        type="text"
        list="statusOptions"
        name="status"
        value={formData.status}
        placeholder="Select or enter Status"
        onChange={handleInputChange}
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
        name="location"
        value={formData.location}
        placeholder="Enter Location"
        onChange={handleInputChange}
      />

      <label>Date: </label>
      <input
        type="date"
        name="applicationDate"
        value={formData.applicationDate}
        onChange={handleInputChange}
      />

      <button type="submit">Update</button>
    </form>
  );
}

export default EditJob;   