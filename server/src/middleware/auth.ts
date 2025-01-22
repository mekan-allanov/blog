import { config } from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

config();

export interface AuthRequest extends Request {
	user?: {
		id: number;
		email: string;
	};
}

export const authenticateToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (!token) {
		return res.status(401).json({ error: "Missing authentication token" });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
			id: number;
			email: string;
		};
		req.user = decoded;
		next();
	} catch (error) {
		return res.status(403).json({ error: "Invalid token" });
	}
};
