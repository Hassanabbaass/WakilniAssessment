const router = require("express").Router();
const { db } = require("../db");

router.get('/:id', (req,res) => {
    const pid = req.params.id;
    const q = "SELECT * FROM items WHERE `pid`= ?";

    db.query(q,[pid], (err,data) => {
        if(err) return res.status(500).send(err);

        return res.status(200).json(data);
    });
});

router.post('/add/:ptid', (req,res) => {
    const pid = req.params.ptid;
    const q = "INSERT INTO items(`name`,`serial`,`pid`) VALUES (?)"

    const values = [
        req.body.name,
        req.body.serial,
        pid        
    ]

    db.query(q,[values], (err,data) => {
        if(err) return res.status(500).json(err);
        return res.json("Item has been added")
    })
})

router.put('/update/:id', (req,res) => {
    const itemid = req.params.id;
    const q = "UPDATE items SET `name`=?, `serial`= ? WHERE `id`= ?"
    const values = [
        req.body.name,
        req.body.serial
    ]

    db.query(q,[...values, itemid], (err,data) => {
        if(err) return res.status(500).json(err);
        return res.json("Item has been updated")
    })
})

router.delete('/delete/:id', (req,res) => {
    const itemid = req.params.id
    const q = "DELETE FROM items WHERE `id` = ?"
    db.query(q, [itemid], (err,data) => {
        if(err) return res.status(500).json(err);

        return res.json("Item has been deleted!")
    })
})

router.put('/checked/:id', (req,res) => {
    const itemid = req.params.id
    const q = "UPDATE items SET `checked` = NOT `checked` WHERE `id` = ?"
    db.query(q,[itemid], (err,data) => {
        if(err) return res.status(500).json(err);
        return res.json("Item SOLD NOT SOLD changed")
    })
})

module.exports = router;