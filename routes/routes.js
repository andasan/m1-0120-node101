const express = require('express');
const router = express.Router();
const memberController = require('../controllers/members.controller');
const members = require('../model/Member');

//Get ALL members
router.get('/', memberController.getAllMembers);

//Get ONE member
router.get('/:id', memberController.getOneMember);

//Create a member
router.post('/post', memberController.createMember);

//Update a member
router.put('/update/:id', memberController.updateMember);

//Delete a member
router.delete('/delete/:id', memberController.deleteMember);

module.exports = router;