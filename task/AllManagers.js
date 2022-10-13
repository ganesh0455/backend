const express=require('express');
const app=express();
const router=express.Router();
const db=require('../models/index');
const {employee,role,project,gdo}=db;
app.use(express.json());

//role.belongsTo(employee,{foriegnKey:'roleId',targetKey:'id'});
employee.belongsTo(role,{foriegnKey:'roleId',targetKey:'id'})

router.get('/',async (request,response)=>{
    const allManagers=await employee.findAll({
    include:[
        {
            model:role,
            required:true,
            attributes:['roleName']
        },
        {
            model:project,
            required:true,
            attributes:['projName']
        },
        {
            model:gdo,
            required:true,
            attributes:['id','gdoName']
        }
        ],
        where:{
            roleId:2
        },
        attributes:['id','name']
    })
    //response.send(allManagers)
    if(allManagers){
        response.status(200).json({
            success:true,
            data:allManagers
        })
    }
    else{
        response.send(400).json({
            success:false,
            message:"Can't fetch managers"
        })
    }
})

module.exports=router;