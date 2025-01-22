// src/routes/posts.ts
import { and, eq } from "drizzle-orm";
import { Router } from "express";
import multer from "multer";
import path from "path";
import { db } from "../db";
import { posts } from "../db/schema";
import { authenticateToken, AuthRequest } from "../middleware/auth";

const storage = multer.diskStorage({
	destination: "./uploads/",
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}${path.extname(file.originalname)}`);
	},
});

const upload = multer({ storage });

const router = Router();

// Get all posts
router.get("/api/posts", async (req, res) => {
	try {
		const allPosts = await db.select().from(posts).orderBy(posts.createdAt);
		res.json(allPosts);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch posts" });
	}
});

// Get single post
router.get("/api/posts/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const post = await db
			.select()
			.from(posts)
			.where(eq(posts.id, parseInt(id)));
		res.json(post);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch post" });
	}
});

// Create post
router.post("/api/posts", authenticateToken, upload.single("media"), async (req: AuthRequest, res) => {
	const { title, content } = req.body;
	const mediaUrl = req.file?.filename;

	try {
		const [post] = await db
			.insert(posts)
			.values({
				title,
				content,
				mediaUrl: mediaUrl ? `/uploads/${mediaUrl}` : null,
				authorId: req.user!.id,
			})
			.returning();

		res.json(post);
	} catch (error) {
		res.status(400).json({ error: "Failed to create post" });
	}
});

// Update post
router.put("/api/posts/:id", authenticateToken, upload.single("media"), async (req: AuthRequest, res) => {
	const { id } = req.params;
	const { title, content } = req.body;
	const mediaUrl = req.file?.filename;

	try {
		const [post] = await db
			.select()
			.from(posts)
			.where(and(eq(posts.id, parseInt(id)), eq(posts.authorId, req.user!.id)));

		if (!post) {
			return res.status(404).json({ error: "Post not found or unauthorized" });
		}

		const [updatedPost] = await db
			.update(posts)
			.set({
				title,
				content,
				mediaUrl: mediaUrl ? `/uploads/${mediaUrl}` : post.mediaUrl,
				updatedAt: new Date(),
			})
			.where(eq(posts.id, parseInt(id)))
			.returning();

		res.json(updatedPost);
	} catch (error) {
		res.status(400).json({ error: "Failed to update post" });
	}
});

// Delete post
router.delete("/api/posts/:id", authenticateToken, async (req: AuthRequest, res) => {
	const { id } = req.params;

	try {
		const [post] = await db
			.select()
			.from(posts)
			.where(and(eq(posts.id, parseInt(id)), eq(posts.authorId, req.user!.id)));

		if (!post) {
			return res.status(404).json({ error: "Post not found or unauthorized" });
		}

		await db.delete(posts).where(eq(posts.id, parseInt(id)));

		res.json({ message: "Post deleted successfully" });
	} catch (error) {
		res.status(400).json({ error: "Failed to delete post" });
	}
});

export default router;
