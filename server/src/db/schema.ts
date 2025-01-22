import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	id: serial("id").primaryKey(),
	email: varchar("email", { length: 255 }).notNull().unique(),
	password: varchar("password", { length: 255 }).notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	createdAt: timestamp("created_at").defaultNow(),
	updatedAt: timestamp("updated_at").defaultNow(),
});

export const posts = pgTable("posts", {
	id: serial("id").primaryKey(),
	title: varchar("title", { length: 255 }).notNull(),
	content: text("content").notNull(),
	mediaUrl: varchar("media_url", { length: 255 }),
	authorId: serial("author_id").references(() => users.id),
	createdAt: timestamp("created_at").defaultNow(),
	updatedAt: timestamp("updated_at").defaultNow(),
});
