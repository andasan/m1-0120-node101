const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const members = [
    {
        id:1,
        name: 'JC',
        email: 'jc@mail.com',
        status: 'active'
    },
    {
        id:2,
        name: 'ABC',
        email: 'abc@mail.com',
        status: 'active'
    },
    {
        id:3,
        name: 'Mart',
        email: 'mart@mail.com',
        status: 'active'
    }
];

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());


// app.get('/', (req,res)=> {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

//set static folder
app.use(express.static(path.join(__dirname, 'public')));


app.get('/api/members', (req,res) => {
    res.json(members);
});

app.post('/api/members/post', (req, res)=>  {
    res.send(req.body);
})

//catch-all-middleware
app.use((req,res)=> {
    // res.status(404).send('<h1>Error 404: Page not found</h1>');
    res.sendFile(path.join(__dirname, 'public', '404.html'));
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, ()=> console.log(`Server started at port ${PORT}`));