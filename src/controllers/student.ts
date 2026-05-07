import { Request, Response } from "express";
import { StudentRepository } from "../repositories/students.ts";

const studentRepo = new StudentRepository();

export const addStudent = async (req: Request, res: Response) => {
  try {
    const student = await studentRepo.create(req.body);
    res.status(201).json({ success: true, data: student });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getAllStudents = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    // Fix for the search query string | string[] error
    const searchStr = typeof search === "string" ? search : undefined;

    const students = await studentRepo.findAll(searchStr);
    res.status(200).json({ success: true, data: students });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch students" });
  }
};

export const getStudentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // TYPE FIX: Ensure ID is a string and not an array
    if (typeof id !== "string") {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const student = await studentRepo.findById(id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.status(200).json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching student" });
  }
};

export const editStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // TYPE FIX: Ensure ID is a string
    if (typeof id !== "string") {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const updated = await studentRepo.update(id, req.body);
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(400).json({ success: false, message: "Update failed" });
  }
};

export const removeStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // TYPE FIX: Ensure ID is a string
    if (typeof id !== "string") {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    await studentRepo.delete(id);
    res
      .status(200)
      .json({ success: true, message: "Student deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: "Delete failed" });
  }
};
