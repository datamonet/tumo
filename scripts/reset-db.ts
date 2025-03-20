#!/usr/bin/env tsx
/**
 * Database Reset Script for TUMO
 *
 * This script is for LOCAL DEVELOPMENT ONLY.
 * It will:
 * 1. Drop all tables in the database
 * 2. Run migrations to recreate the schema
 * 3. Create an initial admin user
 *
 * Usage:
 *   pnpm tsx scripts/reset-db.ts
 *
 * Environment variables required:
 *   - DATABASE_URL: PostgreSQL connection string
 */

import { PrismaClient } from "@prisma/client";
import { execSync } from "child_process";
import readline from "readline";
import bcryptjs from "bcryptjs";

// Check if we're in development mode
if (process.env.NODE_ENV === "production") {
  console.error("❌ This script cannot be run in production mode");
  process.exit(1);
}

const prisma = new PrismaClient();

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function promptQuestion(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

/**
 * Create an admin user
 */
async function createAdminUser(email: string, password: string) {
  try {
    // Hash password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create admin user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: "ADMIN",
      },
    });

    return { success: true, user };
  } catch (error) {
    console.error("Error creating admin user:", error);
    return { success: false, error };
  }
}

async function resetDatabase() {
  try {
    console.log("🔄 Starting database reset process...");

    // Confirm with the user
    const confirmation = await promptQuestion(
      '⚠️  WARNING: This will DELETE ALL DATA in your local database. Are you sure? (type "yes" to confirm): '
    );

    if (confirmation.toLowerCase() !== "yes") {
      console.log("❌ Database reset cancelled");
      process.exit(0);
    }

    // Get admin credentials
    const adminEmail =
      (await promptQuestion("Enter admin email (default: admin@takin.ai): ")) || "admin@takin.ai";
    const adminPassword =
      (await promptQuestion("Enter admin password (default: demo): ")) || "demo";

    console.log("🧹 Dropping all tables...");

    // Drop all tables using Prisma migrate reset
    execSync("pnpm prisma migrate reset --force", { stdio: "inherit" });

    console.log("✅ Database schema reset successfully");

    // Create admin user
    console.log("👤 Creating admin user...");

    try {
      const result = await createAdminUser(adminEmail, adminPassword);

      if (result.success) {
        console.log("✅ Admin user created successfully");
      } else {
        console.error("❌ Failed to initialize admin user");
        process.exit(1);
      }
    } catch (error) {
      console.error("❌ Error creating admin user:", error);
      process.exit(1);
    }

    console.log("\n🎉 Database reset complete!");
    console.log(`\nAdmin credentials:\n  Email: ${adminEmail}\n  Password: ${adminPassword}`);
    console.log("\nYou can now start the application with: pnpm dev");
  } catch (error) {
    console.error("❌ Error resetting database:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    rl.close();
  }
}

resetDatabase();
