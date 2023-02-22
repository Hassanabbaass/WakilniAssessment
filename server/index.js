const express = require('express');

const productsRoute = require('./routes/products')
const itemsRoute = require('./routes/items')

const app = express();
app.use(express.json());


app.use('/api/products', productsRoute)
app.use('/api/items', itemsRoute)

app.listen(5500, ()=> {
    console.log("Server is Running")
})