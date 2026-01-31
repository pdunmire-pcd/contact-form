//import the express module
import express from 'express';

//create an instance of express
const app = express();

//define a port number
const PORT = 3000;

app.use(express.static('public'));

//set up a basic route
app.get('/', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/home.html`);
});
//start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});