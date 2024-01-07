import express  from 'express';
const router =  express.Router();
// const checkIfuser = require('../helper').checkIfuser;
import  helper  from '../helper.js'
import {addToSavedData,editSavedData,deleteSavedData,fetchSavedDataForuser} from '../controller/userController.js';
const checkIfuser = helper.checkIfuser;

router.post('/add-to-schema',checkIfuser,addToSavedData);
router.put('/edit-saved-data',checkIfuser,editSavedData);
router.delete('/delete-saved-data/:id',checkIfuser,deleteSavedData);
router.get('/fetch-saved-data/:id',checkIfuser,fetchSavedDataForuser);

export default router;