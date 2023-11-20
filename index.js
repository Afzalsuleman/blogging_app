const express=require('express');
const app=express();
const swaggerJsDoc=require('swagger-jsdoc');
const swaggerUi=require('swagger-ui-express');

require("dotenv").config();
const PORT = process.env.PORT || 3000;

const swaggerOptions={
    swaggerDefinition:{
        info:{
            title: 'blogging API',
            description: "Bloging API Information",
            contact:{
                name: "Zayantic Devloper"
            },
            servers:["http://localhost:4000"]
        }
    },
    apis:["index.js"]
};
const swaggerDocs=swaggerJsDoc(swaggerOptions);
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerDocs));

// middleware 
app.use(express.json());

const blog = require('./routes/blog');

// mount 
app.use("/api/v1",blog);

const dbConnect = require('./config/database');
dbConnect();

// Start Server 
app.listen(PORT,()=>{
    console.log("App is Running at the",PORT);
})

// Default Route 
app.get('/', (req,res) => {
    res.send(`<h1>HomePage</h1>`)
})