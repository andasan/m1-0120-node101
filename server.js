const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

let members = [
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
app.use(bodyParser.urlencoded({extended:false}));


// app.get('/', (req,res)=> {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

//set static folder
app.use(express.static(path.join(__dirname, 'public')));


app.get('/api/members', (req,res) => {
    res.json(members);
});

//create a member
app.post('/api/members/post', (req, res)=>  {
    // res.send(req.body);
    const newMember = {
        id: Math.random(), //uuid
        ...req.body
    }
    members.push(newMember);
    res.json(members);
});

//update a member
app.put('/api/members/post/:id', (req,res) => {
    const found = members.some(member => member.id === +req.params.id);

    if(found){
        members = members.map(member => {
            if(member.id === +req.params.id){
                return {
                    ...member,
                    ...req.body
                };
            }
            return member;
        });
        res.json({ msg: 'Members updated', members});
    }
});

//catch-all-middleware
app.use((req,res)=> {
    // res.status(404).send('<h1>Error 404: Page not found</h1>');
    res.sendFile(path.join(__dirname, 'public', '404.html'));
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, ()=> console.log(`Server started at port ${PORT}`));