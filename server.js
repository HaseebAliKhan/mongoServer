const express = require('express');
const cors = require("cors");

const app = express()
const port = process.env.PORT || 3000
const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://admin:admin@cluster0.3byks.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

const Users = mongoose.model('Users', {
     name: String,
     email: String,
     pass: String
     
    });


app.use(express.json())
app.use(cors())

app.get('/users',(req,res)=>{
    Users.find({}, (err, users)=> {
        res.send(users)

    });
})

app.get("/users/:id",(req,res)=>{
    Users.findById(req.params.id,  (err, users) =>{
        if(!err){
            res.send(users)
        }else{
            res.send("Not Found")
        }
    });
    
})
 
app.post("/users", (req,res)=>{
    if(!req.body.name || !req.body.email || !req.body.pass){
        res.send("Invalid Data")
    }else{
        const newUsers = new Users({ 
            name: req.body.name,
            email: req.body.email,
            pass: req.body.pass,
         });
    newUsers.save().then(() => {
        res.send("User Created")
        console.log('User Was Created')
    });
    }
    
    
})

app.put("/users/:id",(req,res)=>{
    let newObj = {}
        if(req.body.name=== "" || req.body.name ){
            newObj.name = req.body.name
        }
        if(req.body.email=== "" || req.body.email){
            newObj.email = req.body.email
        }
        if(req.body.pass=== "" || req.body.pass){
            newObj.pass = req.body.pass
        }
        Users.findByIdAndUpdate(req.params.id, newObj, {new:true}, (err,users)=>{
                if (!err) {
                  res.send(users)
                } else {
                  res.status(500).send("error happened")
                }
              })
          })
          app.delete('/users/:id', (req, res) => {
          
            Users.findByIdAndRemove(req.params.id, (err, data) => {
              if (!err) {
                res.send("user deleted")
              } else {
                res.status(500).send("error happened")
              }
            })
          })















app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})