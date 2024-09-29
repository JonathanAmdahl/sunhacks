import express, { Request, Response } from 'express';
import prisma from './prisma';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

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
    const newBook = await prisma.book.create({
      data: {
        title,
        pages: {
          create: pages.map((page: { text: string; imageUrl: string }) => ({
            text: page.text,
            imageUrl: page.imageUrl
          }))
        }
      },
      include: {
        pages: true // This will return the created pages along with the book
      }
    });
    res.status(201).json(newBook);
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).json({ error: 'Unable to create book' });
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