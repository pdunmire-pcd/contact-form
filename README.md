# Paris Allkurti – Contact Form App

A personal portfolio site with a contact form, built for SDEV 305 at Green River College.

## Deployed URL
http://[134.199.210.150:3004]

## Tech Stack
- **Backend:** Node.js, Express
- **Templating:** EJS
- **Database:** MySQL (hosted on Digital Ocean)
- **Styling:** CSS
- **Other:** dotenv, nodemon

## Features
- Resume/home page
- Contact form with client-side and server-side validation
- MySQL database storage for all form submissions
- Portfolio page showcasing projects from SDEV 301, SDEV 305, freelance, and personal work
- Password-protected admin dashboard at `/admin`

## Pages
| Route | Description |
|-------|-------------|
| `/` | Resume/home page |
| `/contact` | Contact form |
| `/portfolio` | Project portfolio |
| `/admin` | Login-protected admin dashboard |

## Local Setup
1. Clone the repo
```
   git clone https://github.com/pdunmire-pcd/contact-form.git
   cd contact-form
```
2. Install dependencies
```
   npm install
```
3. Create a `.env` file in the root (see `.env.example` for required variables)
4. Run the app
```
   npm run dev
```
5. Open `http://localhost:3004` in your browser

## Environment Variables
Create a `.env` file with the following:
```
DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
DB_PORT=3306
ADMIN_USER=loc_user
ADMIN_PASS=loc_pwd
```

## Project Structure
```
contact-form/
├── app.js              ← Express server and routes
├── views/
│   ├── home.ejs        ← Resume page
│   ├── contact.ejs     ← Contact form
│   ├── portfolio.ejs   ← Portfolio page
│   ├── admin.ejs       ← Admin dashboard
│   ├── login.ejs       ← Admin login form
│   ├── confirmation.ejs
│   └── partials/
│       └── navbar.ejs
├── public/
│   ├── styles/
│   │   └── styles.css
│   ├── js/
│   │   └── main.js
│   └── images/
├── .env                ← Not committed (see .env.example)
├── .env.example
└── package.json
```

## Author
Paris Allkurti — [LinkedIn](https://www.linkedin.com/in/paris-allkurti) · [GitHub](https://github.com/pdunmire-pcd)