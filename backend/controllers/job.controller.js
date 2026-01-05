import Job from "../models/job.model.js";

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ user: req.user.id }).sort({
      applicationDate: -1,
    });
    res.status(200).json(jobs);
  } catch (error) {
    console.log("Error in getAllJobs Controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findOne({_id: id, user: req.user.id });
    res.status(200).json(job);
  } catch (error) {
    console.log("Error in getJob Controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const createJob = async (req, res) => {
  const { company, role, description, status, location, applicationDate } = req.body;
  try {
    const newJob = await Job.create({
      company,
      role,
      description,
      status,
      location,
      applicationDate,
      user: req.user.id
    });
    res.status(201).json(newJob);
  } catch (error) {
    console.log("Error in createJob Controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const updateJob = async (req, res) => {
  const { company, role, description, status, location, applicationDate } = req.body;
  try {
    const { id } = req.params;
    const job = await Job.findOne({_id: id, user: req.user.id});
    if (!job) {
      return res.status(400).json({ message: "Job does not exists" });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      id,
      {
        company,
        role,
        description,
        status,
        location,
        applicationDate,
      },
      { new: true }
    );

    res.status(200).json(updatedJob);
  } catch (error) {
    console.log("Error in updateJob Controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findOne({_id: id, user: req.user.id});
    if (!job) {
      return res.status(400).json({ message: "Job does not exists" });
    }

    await Job.findByIdAndDelete(id);
    res.status(200).json({ message: "Job Application deleted" });
  } catch (error) {
    console.log("Error in deleteJob Controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
