import express from 'express';
import { dirname, join } from 'path';

const app = express();
const PORT = 3004;

// In-memory "database"
const contacts = [];

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // parses form data

// Tell Express to use EJS
app.set('view engine', 'ejs');
app.set('views', join(import.meta.dirname, 'views'));

// Home page (your form)
app.get('/', (req, res) => {
  res.render('home');
});

// Handle form submission
app.post('/submit', (req, res) => {
  const contact = req.body;   // grab form data
  contacts.push(contact);     // store it in the array
  res.redirect('/confirmation');
});

// Confirmation page
app.get('/confirmation', (req, res) => {
  res.render('confirmation');
});

// Admin page — shows all submissions
app.get('/admin', (req, res) => {
  res.render('admin', { contacts });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});