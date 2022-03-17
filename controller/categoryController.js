
const Category = require('../model/category');
const {validationResult} = require('express-validator');
const { request } = require('express');
const { response } = require('express');

exports.addCategory=(request,response)=>{
     
    const errors = validationResult(request);
    if(!errors.isEmpty())
      return response.status(400).json({errors: errors.array()});
     console.log(request.file)
      console.log(request.body.categoryName);
    console.log(request.file.originalname)
    Category.create({
      categoryName: request.body.categoryName,
      categoryImageUrl: "http://localhost:3333/images/"+request.file.filename
      
    })
    .then(result=>{
        return response.status(201).json(result);
    })
    .catch(err=>{
        return response.status(403).json({message: " Something went wrong"});
    });  

}
exports.delete=(request,response)=>{
    Category.deleteOne({_id:request.params._id}).then(result=>{
        if(result.deletedCount)
          return response.status(202).json({message: 'success'});
        else
          return response.status(204).json({message: 'not deleted'});  
      })
      .catch(err=>{
        return response.status(500).json({message: 'Something went wrong'});
      });
}
exports.categorylist=(request,response)=>{
    Category.find().then(results=>{
      response.send(results);
    }).catch(err=>{
console.log(err);
    });

}
exports.update = (request,response,next)=>{
    const errors = validationResult(request);
    if(!errors.isEmpty())
      return response.status(400).json({errors: errors.array()});
    Category.updateOne({_id: request.body.categoryId},
        {
            $set:{
                categoryName: request.body.categoryName,
                categoryImageUrl: "http://localhost:3000/images/"+request.file.filename
            }
        }).then(result=>{
             if(result.modifiedCount)
              return response.status(204).json({message: 'success'});
             else
              return response.status(404).json({message: 'record not found'})
        }).catch(err=>{
          return response.status(500).json({message: 'Something went wrong..'});
        });
}
