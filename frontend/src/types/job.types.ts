export type JobStatus =
  | "applied"
  | "interviewing"
  | "offered"
  | "rejected";

export type Job = {
  _id: string;
  company: string;
  role: string;
  description: string;
  status: JobStatus;
  location: string;
  applicationDate: string;
  createdAt: string;
  updatedAt: string;
};

export type JobInput = Omit<Job, "_id" | "createdAt" | "updatedAt">