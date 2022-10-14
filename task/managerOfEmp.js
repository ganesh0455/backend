const express=require('express');
const app=express();
const router=express.Router();
const db=require('../models/index');
const {employee,role,gdo,project}=db;
app.use(express.json());

router.get('/',async (request,response)=>{
    const {gdoId}=request.query;
    const ManagerName=await employee.findOne({
        include:[{
            model:role,
            required:true,
            attributes:['roleName']
        }],
        where:{
            gdoId:gdoId,
            roleId:2
        },
        attributes:['name']
    })
    if(ManagerName){
        response.status(200).json({
            success:true,
            data:ManagerName
        })
    }
    else{
        response.status(400).json({
            success:false,
            message:`Gdo${gdoId} is not found`
        })
    }
})

module.exports=router;