const express= require("express");
const port =8080;
const server =express()


server.listen(port, () => {  console.log('We are live on ' + port);});

server.get('/health',(req,res)=>{res.send("Endpoint is up and running")})