const express=require('express');
const router=express.Router();
const searchServices=require('../services/searchServices');
const {check}=require('express-validator');
//crear token de la sesion

//api/search
router.post('/',
    searchServices.searchLocation
);

module.exports=router;