// Imports
const express = require('express');
const app = express();
const port = 3000;
const fs = require("fs")

//Load the handlebars module
const hbs = require('express-handlebars');

//Set the view engine to Handlebars
app.set('view engine', 'hbs');

//Set handlebars configurations
app.engine('hbs', hbs({
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials/',
    extname: 'hbs',
    defaultLayout: 'layout'
}));

// Static Serve the public/ folder
app.use(express.static('public'))

//  |-- -- DEFINING PARTIALS -- --|  //

//hbs.registerPartial('contents-items', '{{prefix}}')


//  |-- -- DEFINING VIEWS -- --|  //

app.get('/', (req, res) => {
    // Serves the 'contents' view
    navs = [{"name": "Home", "link": "/", "active": true}]
    const fileContents = fs.readFileSync('./hosts.json', 'utf8')
    const hosts = JSON.parse(fileContents)
    res.render('contents', {nav: navs, host:hosts});
});

app.listen(port, () => console.log(`App listening to port ${port}`));