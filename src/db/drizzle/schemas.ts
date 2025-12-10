import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const carsTable = sqliteTable('cars', {
    id: text("id").primaryKey(),
    brand: text("brand").notNull(),
    model: text("model").notNull(),
    version: text("version").notNull(),
    year: text("year").notNull(),
    plate: text("plate"),
    fuel: text("fuel").notNull(),
    price: text("price").notNull(),
    mileage: text("mileage").notNull(),
    color: text("color").notNull(),
    description: text("description").notNull(),
    images: text("images").notNull().default(""),
    active: integer("active", { mode: 'boolean' }).notNull(),
    user: text("user").notNull(),
    createdAt: text("created_at").notNull(),
    updatedAt: text("updated_at").notNull(),
});

export type CarsTableSelectMode = InferSelectModel<typeof carsTable>;
export type CarsTableInsertMode = InferInsertModel<typeof carsTable>;
