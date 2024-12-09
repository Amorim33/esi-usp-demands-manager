import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { z } from "zod";

export const roleSchema = z.enum(["STUDENT", "ADVISOR", "ADMIN"]);
export type Role = z.infer<typeof roleSchema>;

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name").notNull(),
  email: varchar("email").notNull().unique(),
  role: varchar("role").notNull().$type<Role>(),
});

export const statusSchema = z.enum(["SUBMITTED", "PENDING", "EVALUATED"]);
export type Status = z.infer<typeof statusSchema>;

export const reports = pgTable("reports", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  title: varchar("title").notNull(),
  content: text("content").notNull(),
  status: varchar("status").notNull().$type<Status>(),
});

export const demands = pgTable("demands", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  title: varchar("title").notNull(),
  description: varchar("description").notNull(),
  studentDeadline: timestamp("student_deadline").notNull(),
  advisorDeadline: timestamp("advisor_deadline").notNull(),
});
