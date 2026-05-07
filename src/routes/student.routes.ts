import { Router } from "express";
import {
  addStudent,
  getAllStudents,
  getStudentById,
  editStudent,
  removeStudent,
} from "../controllers/student.ts";

const router = Router();

router.post("/", addStudent);
router.get("/", getAllStudents);
router.get("/:id", getStudentById);
router.patch("/:id", editStudent);
router.delete("/:id", removeStudent);

export default router;
