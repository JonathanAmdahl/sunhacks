import express, { Express, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const app: Express = express();
const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });
const port = process.env.PORT || 3000;

// Function to test database connection
async function testDatabaseConnection() {
    try {
      await prisma.$connect();
      console.log('✅ Successfully connected to the database');
    } catch (error) {
      console.error('❌ Unable to connect to the database:', error);
      process.exit(1);
    }
  }
  
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript Express!');
});

// Start the server and test database connection
app.listen(port, async () => {
    console.log(`Server is running on port ${port}`);
    await testDatabaseConnection();
  });
  
// Graceful shutdown
process.on('SIGINT', async () => {
    await prisma.$disconnect();
    process.exit();
});