module.exports = function(app){

	// Meta data
	var meta = require('../meta.json');

	app.get("/", function (req, res) {   
	    res.render("index.html", meta);
	});

}