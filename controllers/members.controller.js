const { v4: uuidv4 } = require('uuid');
const members = require('../model/Member');

const idFilter = req => member => member.id === +req.params.id;

exports.getAllMembers = (req,res) => {
    res.json(members);
}

exports.getOneMember = (req,res) => {
    // const found = members.some(member => member.id === +req.params.id);
    const found = members.some(idFilter(req));

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
};

exports.createMember = (req, res)=>  {
    // res.send(req.body);
    const newMember = {
        // id: Math.random(),
        id: uuidv4(),
        status: 'active',
        ...req.body
    }
    members.push(newMember);
    // res.json(members);
    res.redirect('/');
};

exports.updateMember = (req,res) => {
    const found = members.some(idFilter(req));

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
};

exports.deleteMember = (req,res) => {
    const found = members.some(idFilter(req));

    if(found){
        res.json({ 
            msg: 'Member deleted successfully', 
            member: members.filter(member => member.id !== parseInt(req.params.id))
        }) //parseInt(req.params.id) same as +req.params.id
    }else{
        //400 = Bad Request
        res.status(400).json({ msg: `No member with the id of ${req.params.id}`});
    }
};