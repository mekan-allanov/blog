import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import { db } from "../db";
import { users } from "../db/schema";

const router = Router();

router.post("/register", async (req, res) => {
	const { email, password, name } = req.body;

	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		const [user] = await db
			.insert(users)
			.values({
				email,
				password: hashedPassword,
				name,
			})
			.returning();

		const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: "24h" });

		res.json({ token });
	} catch (error) {
		res.status(400).json({ error: "Registration failed" });
	}
});

router.post("/login", async (req: Request, res: Response) => {
	const { email, password } = req.body;

	try {
		const [user] = await db.select().from(users).where(eq(users.email, email));

		if (!user || !(await bcrypt.compare(password, user.password))) {
			return res.status(401).json({ error: "Invalid credentials" });
		}

		const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: "24h" });

		res.json({ token });
	} catch (error) {
		res.status(400).json({ error: "Login failed" });
	}
});

export default router;
