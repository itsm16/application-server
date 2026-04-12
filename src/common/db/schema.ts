import { pgTable } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";

const usersTable = pgTable("users", {
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
    name: t.varchar({length: 255}).notNull(),
    email: t.varchar({length: 322}).notNull().unique(),
    password: t.varchar({length: 255}).notNull(),
})

const applicationsTable = pgTable("applications", {
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
    userId: t.integer().notNull().references(() => usersTable.id),
    company: t.varchar({length: 255}).notNull(),
    role: t.varchar({length: 255}).notNull(),
    skills: t.varchar({length: 255}).array(),
    resumeSuggestions: t.varchar({length: 350}).array(),
    status: t.varchar({length: 255}).default("applied"),
    appliedDate: t.date().notNull().defaultNow(),
})

export {
    usersTable,
    applicationsTable
}