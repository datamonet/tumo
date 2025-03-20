# About

Tumo – Open-source AI media generation via API, supporting Replicate, OpenAI, and more. 🚀

## Running Locally

1. Clone the repository and install dependencies:

   ```bash
   git clone https://github.com/datamonet/tumo
   cd tumo
   pnpm install
   ```

2. Create an `.env` file to store API keys. Use `.env.example` as a reference.

3. Initialize the Prisma database:

   ```bash
   # Generate Prisma client
   pnpm prisma generate

   # Create and apply migrations
   pnpm prisma migrate dev --name init
   ```

4. Run the development server:

   ```bash
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the application.

## Database Setup

Tumo uses PostgreSQL as its database. You'll need to have PostgreSQL installed and running before starting the application.

### Setting up PostgreSQL

1. Install PostgreSQL:

   - macOS: `brew install postgresql` and `brew services start postgresql`
   - Linux: `sudo apt install postgresql`
   - Windows: Download from [postgresql.org](https://www.postgresql.org/download/windows/)

2. Create a database for Tumo:

   ```bash
   # Connect to PostgreSQL
   psql -U postgres

   # Create a new database
   CREATE DATABASE tumo;

   # Create a user (optional)
   CREATE USER tumouser WITH ENCRYPTED PASSWORD 'your_password';

   # Grant privileges
   GRANT ALL PRIVILEGES ON DATABASE tumo TO tumouser;
   ```

3. Update your `.env` file with the PostgreSQL connection string:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/tumo"
   ```

### Database Management

If you need to reset the database:

```bash
# Reset the database (deletes all data)
pnpm prisma migrate reset --force

# Apply migrations after reset
pnpm prisma migrate dev
```

To view your database:

```bash
# Open Prisma Studio
pnpm prisma studio
```

This project was bootstrapped with [https://github.com/vercel-labs/ai-sdk-image-generator](https://github.com/vercel-labs/ai-sdk-image-generator).
