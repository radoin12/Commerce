

const express=require('express')

const modelBooks=require('../model/modelproduct')

const router=express.Router()
const{authorisation,IsAdmin}=require('../midlware/authjsonwebtoken')


router.post('/addbooks',IsAdmin,async(req,res)=>{
    try {
        const{image,name,type,description,price,contry,created}=req.body
      
  
         
      
            const product=await modelBooks.create({
              image,name,type,description,price,contry,created
          
      
         })
       res.send(product)
    } catch (error) {
      res.send(error)  
 
    }
  
  
   
})
router.post('/addbooks',IsAdmin,async(req,res)=>{
  try {
      const{image,name,type,description,price,contry,created}=req.body
    

       
    
          const product=await modelBooks.create({
            image,name,type,description,price,contry,created
        
    
       })
     res.send(product)
  } catch (error) {
    res.send(error)  

  }


 
})
router.get('/displayBook',async(req,res)=>{
const page = parseInt(req.query.page) || 1;
const perPage = 3; // Set the number of posts to display per page
  try {
    const totalPosts = await modelBooks.countDocuments();

   
    const totalPages = Math.ceil(totalPosts / perPage);
    modelBooks.find({})
    .skip((page-1)*perPage)
    .limit(perPage)
    
    

    .then((books)=>{
     
      res.send({books,totalPages,page})
    })
   
      
  } catch (error) {
      res.send(error)
  }
})


router.delete('/deleteBook/:id',IsAdmin,async(req,res)=>{
 const id=req.params.id
 try {
    const y=await modelBooks.findByIdAndDelete(id)
     res.json(y)
 
 } catch (error) {
    res.send(error)
 }

})
router.put('/updatebook/:id',IsAdmin,async(req,res)=>{
    const id=req.params.id
    
    try {
        const {image,name,type,description,price,contry}=req.body
      
       const updatebook=await modelBooks.findByIdAndUpdate(id,req.body,{new:true})
    
       updatebook.save()
       res.json(updatebook)
    } catch (error) {
        res.status(500).json(error)
    }
})
router.get('/onlybook/:id',IsAdmin,async(req,res)=>{
    const id=req.params.id
 try {
   const book=await modelBooks.findById(id) 
   res.send(book)
 } catch (error) {
    res.send(error)
 }
})


module.exports=router