// src/index.ts
import cors from "cors";
import { config } from "dotenv";
import express from "express";
import path from "path";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import authRoutes from "./routes/auth";
import postsRoutes from "./routes/posts";

config();

const app = express();

// Swagger configuration
const swaggerOptions = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Blog API",
			version: "1.0.0",
			description: "A simple blog API",
		},
		servers: [
			{
				url: process.env.API_URL || "http://localhost:5000",
			},
		],
	},
	apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(express.static(path.join(__dirname, "build")));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postsRoutes);

// Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/", (req, res) => {
	res.send("Hello World!");
});

// const PORT = process.env.PORT || 5000;
app.listen(5000, () => {
	// console.log(`Server running on port ${PORT}`);
	console.log("Server running on port 5000");
});

export default app;
