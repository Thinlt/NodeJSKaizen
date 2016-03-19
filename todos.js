/**
 * Created by thinlt on 3/19/2016.
 */

var express = require('express');

var router = express.Router();

var todoItems = [
    {id: 1, desc: 'foo'},
    {id: 2, desc: 'bar'},
    {id: 3, desc: 'baz'},
];

router.get('/', function (req, res) {
    //res.send('Hello express!');
    res.render('index', {
        title: 'My APP',
        items: todoItems
    });
});


router.post('/add', function(req, res){
    var newItem = req.body.newItem;
    todoItems.push({
        id: todoItems.length,
        desc: newItem
    });

    res.redirect('/');
});

module.exports = router;
