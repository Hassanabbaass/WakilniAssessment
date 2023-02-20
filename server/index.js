const express = require('express');

const app = express();
app.use(express.json());

app.listen(5500, ()=> {
    console.log("Server is Running")
})