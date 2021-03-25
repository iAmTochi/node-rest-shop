const express = require('express');
const router = express.Router();


//Handle incoming Get request to /orders
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Orders were fetched"
    })
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: "Orders was created"
    })
});

router.get('/:orderId', (req, res, next) => {
     
    res.status(200).json({
            message: "Order details",
            id: req.params.orderId
    });
});



router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: "Order deleted",
        id: req.params.orderId
    });
});


module.exports = router;