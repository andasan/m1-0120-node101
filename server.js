const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const app = express();

const memberRoute = require('./routes/routes');
const members = require('./model/Member');

//Template Engine
app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.set('views', 'views'); //explicitly setting the views directory

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


//Homepage route
// app.get('/', (req,res)=> {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });
app.get('/', (req,res)=>{
    res.render('index', { 
        title: 'Hola with Handlebars', 
        members
    });
})

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Members API route
app.use('/api/members', memberRoute);

//catch-all-middleware
app.use((req,res)=> {
    // res.status(404).send('<h1>Error 404: Page not found</h1>');
    res.sendFile(path.join(__dirname, 'public', '404.html'));
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, ()=> console.log(`Server started at port ${PORT}`));