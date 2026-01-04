import type { Job, JobInput } from "../types/job.types";
import axiosInstance from "./axiosInstance";

export const getJobsApi = async (): Promise<Job[]> => {
  const res = await axiosInstance.get<Job[]>("/job");
  return res.data;
};
export const getJobApi = async (id: string): Promise<Job> => {
  const res = await axiosInstance.get<Job>(`/job/${id}`);
  return res.data;
};
export const createJobApi = async (job: JobInput): Promise<Job> => {
  const res = await axiosInstance.post<Job>("/job", job);
  return res.data;
};
