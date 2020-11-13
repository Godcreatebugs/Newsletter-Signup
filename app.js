//jshint esversion:6


// npm modules
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const port =3000;
// app from express
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
// statisized the photos
app.use(express.static("Static"));
//use express get method to post html page
app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html")
})
//app post method for console logging
app.post("/",function(req,res){
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

//java script object expected from mailchimp api
const data = {
  members:[
    {
      email_address:email,
      status:"subscribed",
      merge_fields:{
      FNAME:firstName,
      LNAME:lastName
      }
    }
  ]
};

const jsonData = JSON.stringify(data);
const url = "https://us2.api.mailchimp.com/3.0/lists/b91b4950da";

const options = {
  method:"POST",
  auth:"godcreatebugs:6701d91007b69c5d4d0c697e5dd92f9a-us2"
}

const request = https.request(url,options,function(response){
    // now resposnse setup
    if(response.statusCode ===200){
      res.sendFile(__dirname + "/success.html")
    }
    else{
      res.sendFile(__dirname + "/failure.html")
    }


    response.on("data",function(data){
      console.log(JSON.parse(data));
    })
})
  // console.log("First Name :", firstName,"Last Name :", lastName , "email: ",email);


request.write(jsonData);
request.end();
})

app.post("/failure",function(req,res){
  res.redirect("/");
})

app.listen(env.process.PORT || port,function(){
  console.log("Server is Running on port 3000")
})


// api key
// 6701d91007b69c5d4d0c697e5dd92f9a-us2
// list id
// b91b4950da
