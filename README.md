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

#### Reset Database Script

You can use the provided reset-db script to quickly reset your development database:

```bash
# Reset the database and create an admin user
pnpm reset-db
```

This script will:

1. Drop all tables in the database
2. Run migrations to recreate the schema
3. Create an initial admin user with the credentials you provide

#### Manual Database Management

If you prefer manual control:

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

### Development Configuration

#### Prisma Logging

By default, Prisma query logs are disabled to keep the console clean. If you need to debug database queries:

1. Set `DEBUG_PRISMA=true` in your `.env` file
2. Restart the development server

```bash
# In your .env file
DEBUG_PRISMA=true
```

## Acknowledgments

This project was bootstrapped with [https://github.com/vercel-labs/ai-sdk-image-generator](https://github.com/vercel-labs/ai-sdk-image-generator).
