const router = require("express").Router();
const { db } = require("../db");

router.get('/', (req,res) => {
    const q = "SELECT producttype.id,producttype.product_type_name,producttype.image, COUNT(items.id) AS itemcount FROM producttype LEFT OUTER JOIN items ON producttype.id = items.pid AND items.checked = true GROUP BY producttype.id,producttype.product_type_name,producttype.image";

    db.query(q, (err,data) => {
        if(err) return res.status(500).send(err);

        return res.status(200).json(data);
    });
})

router.post('/add', (req,res) => {
    const q = "INSERT INTO producttype(`product_type_name`,`image`) VALUES (?)"

    const values = [
        req.body.product_type_name,
        req.body.image,        
    ]

    db.query(q,[values], (err,data) => {
        if(err) return res.status(500).json(err);
        return res.json("Product Type has been created")
    })
})

router.put('/update/:id', (req,res) => {
    const productTypeId = req.params.id;

    const values = [
        req.body.product_type_name,
        req.body.image, 
    ]

    const q = "UPDATE producttype SET `product_type_name`=?, `image`=? WHERE `id`= ?"

    db.query(q,[...values, productTypeId], (err,data) => {
        if(err) return res.status(500).json(err);
        return res.json("Product Type has been updated")
    })
})

router.delete('/delete/:id', (req,res) => {
    const productTypeId = req.params.id
    const q = "DELETE FROM producttype WHERE `id` = ?"

    db.query(q, [productTypeId], (err,data) => {
        if(err) return res.status(500).json(err);

        return res.json("Product Type has been deleted!")
    })
})

module.exports = router;