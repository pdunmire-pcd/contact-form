import express from 'express';
import mysql from 'mysql2';
import dotenv from 'dotenv';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3004;

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Create a database connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
}).promise();

// Tell Express to use EJS
app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));

// Home page — resume
app.get('/', (req, res) => {
  res.render('home');
});

// Portfolio page
app.get('/portfolio', (req, res) => {
  res.render('portfolio');
});

// Contact form page
app.get('/contact', (req, res) => {
  res.render('contact', { errors: [], formData: {} });
});

// Handle form submission
app.post('/submit', async (req, res) => {
  const {
    fname, lname, email, jobtitle, company,
    linkedinUrl, howDidWeMeet, other, message,
    mailingList, emailFormat
  } = req.body;

  // --- SERVER-SIDE VALIDATION ---
  const validHowWeMet = ['conference', 'webinar', 'referral', 'other'];
  const errors = [];

  if (!fname || !fname.trim()) errors.push('First name is required.');
  if (!lname || !lname.trim()) errors.push('Last name is required.');

  if (!howDidWeMeet || !validHowWeMet.includes(howDidWeMeet)) {
    errors.push('Please select a valid "How Did We Meet?" option.');
  }

  if (mailingList === 'on') {
    if (!emailFormat || !['html', 'text'].includes(emailFormat)) {
      errors.push('Please select an email format (HTML or Text).');
    }
  }

  if (errors.length > 0) {
    return res.render('contact', {
      errors,
      formData: req.body
    });
  }
  // --- END VALIDATION ---

  const timestamp = new Date().toLocaleString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  });

  const sql = `
    INSERT INTO contacts 
      (fname, lname, email, jobtitle, company, linkedinUrl, howDidWeMeet, other, message, mailingList, emailFormat, timestamp)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  try {
    await pool.execute(sql, [
      fname, lname, email, jobtitle, company,
      linkedinUrl, howDidWeMeet, other, message,
      mailingList ? 1 : 0, emailFormat, timestamp
    ]);
    const contact = { ...req.body, timestamp };
    res.render('confirmation', { contact });
  } catch (err) {
    console.error('DB insert error:', err);
    res.status(500).send('Something went wrong saving your submission.');
  }
});

// Admin page
// Admin login form
app.get('/admin', (req, res) => {
  res.render('login', { error: null });
});

// Handle login submission
app.post('/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (username === process.env.ADMIN_USER && password === process.env.ADMIN_PASS) {
    res.redirect('/admin/dashboard');
  } else {
    res.render('login', { error: 'Invalid username or password. Please try again.' });
  }
});

// The actual admin dashboard
app.get('/admin/dashboard', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM contacts ORDER BY id DESC');
    res.render('admin', { contacts: rows });
  } catch (err) {
    console.error('DB query error:', err);
    res.status(500).send('Could not load submissions.');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});