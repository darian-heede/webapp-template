var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
//mongo --port 27017 -u "app_user" -p "password" --authenticationDatabase "app"

/* GET home page. */
router.get('/', function(req, res, next) {
	var title = { title: 'This is just a template' };
	MongoClient.connect(process.env.APP_DB, { useNewUrlParser: true }, (err, db) => {
		if(err) {
			title =  { title: err, subtitle: process.env.APP_DB};
			res.render('index', title);
			return;
		}
		var dbo = db.db('app');
		dbo.collection('log').insert(
			{
				test: "This is a write test"
			},
  		(error, result) => {
		  	if(error) {
		  		title = { title: error, subtitle: process.env.APP_DB };
		  		res.render('index', title);
		  		return;
		  	}
	  		title = { title: 'Entry inserted', subtitle: process.env.APP_DB };
	  		res.render('index', title);
				db.close();
				return;
  		}
		);
	});
  
});


module.exports = router;
