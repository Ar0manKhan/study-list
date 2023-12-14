import { pgTable, serial, varchar, integer, unique } from "drizzle-orm/pg-core";

export var user = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 256 }).unique().notNull(),
});

export var topic = pgTable("topics", {
  id: serial("id").primaryKey(),
  title: varchar("name", { length: 256 }).notNull(),
  user: integer("user_id")
    .notNull()
    .references(() => user.id),
});

export var post = pgTable(
  "posts",
  {
    id: serial("id").primaryKey(),
    url: varchar("url", { length: 256 }).notNull(),
    title: varchar("titel", { length: 256 }).notNull(),
    description: varchar("description", { length: 1024 }),
    topic: integer("topic_id")
      .notNull()
      .references(() => topic.id),
  },
  (t) => ({
    uq: unique().on(t.topic, t.url),
  }),
);
