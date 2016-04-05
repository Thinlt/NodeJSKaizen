/**
 * Created by thinlt on 3/19/2016.
 */

var express = require('express');
var mongodb = require('mongodb');

var router = express.Router();
var MongoClient = mongodb.MongoClient;
var MongoObjectId = mongodb.ObjectId;

var todoItems = [
    {id: 1, desc: 'foo'},
    {id: 2, desc: 'bar'},
    {id: 3, desc: 'baz'},
];

router.get('/', function (req, res) {
    //res.send('Hello express!');
    /*res.render('index', {
        title: 'My APP',
        items: todoItems
    });*/

    var url = 'mongodb://localhost:27017/mydb';
    MongoClient.connect(url, function(err, db){
        if(err){
            console.log("Connect to database error " + err);
        } else {
            console.log("Connect to database to view / success!");

            var collection = db.collection('items');
            collection.find().toArray(function(err, results){
                if( err ) {
                    console.log(err);
                } else {
                    res.render('index', {
                        title: 'My Items Collection',
                        items: results
                    })
                }
            });
        }
    });

});

var countNull = 0;
router.post('/add', function(req, res){
    var newItem = req.body.newItem;
    /*todoItems.push({
     id: todoItems.length,
     desc: newItem
     });*/
    var url = 'mongodb://localhost:27017/mydb';
    MongoClient.connect(url, function(err, db){
        if(err){
            console.log("Connect to database error " + err);
        } else {
            console.log("Prepare insert to database!");
            var collection = db.collection('items');
            collection.find().toArray(function(err, results){
                var count = results.length;

                if( newItem ) {
                    collection.insert({
                        id: count,
                        desc: newItem
                    });
                    console.log("Insert to database success!");
                } else {
                    countNull++;
                    console.log("Can't insert null item! (" + countNull + ")");
                }
            });
        }
    });

    res.redirect('/');
});

//delete item router
router.get('/delete/:id', function(req, res){
    var url = 'mongodb://localhost:27017/mydb';
    MongoClient.connect(url, function(err, db){
        if(err){
            console.log("Connect to database error " + err);
        } else {
            console.log("Prepare insert to database!");
            var collection = db.collection('items');
            if( req.params.id ){
                var items = collection.find({"_id": new MongoObjectId(req.params.id)});
                items.each(function(err, item){
                    if(item){
                        var name = item.desc;
                        collection.deleteOne({'_id' : new MongoObjectId(req.params.id)}, function(err, res){
                            console.log('Remove item '+ name + ' server: '+ res);
                        });
                    }
                });
            }
        }
    });

    res.redirect('/');
});

module.exports = router;
