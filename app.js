const express = require('express')
const path = require('path')
const app = express();
const axios = require('axios');

//loading static assets....
app.use('/css',express.static(path.resolve(__dirname,"assets/css")));
app.use('/js',express.static(path.resolve(__dirname,"assets/js")));

// Set the view engine to EJS
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
   
    try {
        const response = await axios.get('https://api.openweathermap.org/data/2.5/weather?lat=28.9535111&lon=80.1763357&appid=e6ceecea37b4593d9d6d14daccef0f10',{
            params: {
                units:'metric'
            }
        }); // Replace with your API URL
        const apiData = response.data;
        console.log(apiData);

        res.render('index', { apiData });
    } catch (error) {
        console.error('Error fetching data from API:', error);
        res.render('error'); // Render an error page or handle the error as needed
    }
});

app.listen('7000',()=>{
    console.log("Server is listening at 7000");
})