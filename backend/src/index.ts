import express, { Request, Response } from 'express';
import prisma from './prisma';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript Express!');
});

app.get('/books', async (req: Request, res: Response) => {
  try {
    const books = await prisma.book.findMany();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch books' });
  }
});

app.get('/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const book = await prisma.book.findUnique({
      where: { id: parseInt(id) },
      include: { pages: true },
    });

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json(book);
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/books', async (req: Request, res: Response) => {
  try {
    const { title, pages } = req.body;
    
    // Check if pages is defined and is an array
    if (!pages || !Array.isArray(pages)) {
      return res.status(400).json({ error: "Pages must be a valid array" });
    }

    const newPages = pages.map(page => ({
      text: page.text,
      imageUrl: page.imageUrl
    }));

    // Create the book using your database model or ORM
    const newBook = await prisma.book.create({
      data: {
        title,
        pages: {
          create: newPages
        }
      }
    });

    res.status(201).json(newBook);
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).json({ error: "Unable to create book" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit();
});