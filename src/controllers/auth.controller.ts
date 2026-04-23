import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/user";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";
export const AuthController = {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await UserRepository.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid Credintials" });
    }
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({
      token,
      message: "Login succesful",
      user: { email: user.email },
    });
  },
};
