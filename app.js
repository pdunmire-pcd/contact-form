import express from 'express';
import { join } from 'path';

const app = express();
const PORT = 3004;

// In-memory "database"
const contacts = [];

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Tell Express to use EJS
app.set('view engine', 'ejs');
app.set('views', join(import.meta.dirname, 'views'));

// Home page — resume
app.get('/', (req, res) => {
  res.render('home');
});

// Contact form page
app.get('/contact', (req, res) => {
  res.render('contact');
});

// Handle form submission
app.post('/submit', (req, res) => {
  const contact = {
    ...req.body,
    timestamp: new Date().toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }),
  };
  contacts.push(contact);
  res.render('confirmation', { contact }); // pass data to confirmation page
});

// Admin page
app.get('/admin', (req, res) => {
  res.render('admin', { contacts });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});