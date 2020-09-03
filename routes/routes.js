const express = require('express');
const router = express.Router();
const members = require('../model/Member');

//Get ALL members
router.get('/', (req,res) => {
    res.json(members);
});

//Get ONE member
router.get('/:id', (req,res) => {
    const found = members.some(member => member.id === +req.params.id);

    if(found){
        res.json(members.filter(member => {
            
            console.log('paramsId: ', typeof req.params.id);
            console.log('memberId', typeof member.id);

            return member.id === parseInt(req.params.id)
        })) //parseInt(req.params.id) same as +req.params.id
    }else{
        //400 = Bad Request
        res.status(400).json({ msg: `No member with the id of ${req.params.id}`});
    }
});

//Create a member
router.post('/post', (req, res)=>  {
    // res.send(req.body);
    const newMember = {
        id: Math.random(), //uuid
        ...req.body
    }
    members.push(newMember);
    res.json(members);
});

//Update a member
router.put('/update/:id', (req,res) => {
    const found = members.some(member => member.id === +req.params.id);

    if(found){
        const updatedMember = members.map(member => {
            if(member.id === +req.params.id){
                return {
                    ...member,
                    ...req.body
                };
            }
            return member;
        });
        res.json({ msg: 'Member updated', updatedMember});
    }else{
        //400 =  Bad Request
        res.status(400).json({msg: `Unable to update. Member of id ${req.params.id} does not exist.`})
    }
});

//Delete a member
router.delete('/delete/:id', (req,res) => {
    const found = members.some(member => member.id === +req.params.id);

    if(found){
        res.json({ 
            msg: 'Member deleted successfully', 
            member: members.filter(member => member.id !== parseInt(req.params.id))
        }) //parseInt(req.params.id) same as +req.params.id
    }else{
        //400 = Bad Request
        res.status(400).json({ msg: `No member with the id of ${req.params.id}`});
    }
});

module.exports = router;