var DBHelper = require("../util/DBHelper");

var videos = new DBHelper.mongoose.Schema({
    name:String,
    image:String,
    genre:String,
    language:String,
    category:String,
    description:String,
    file:String,
    comments:[{
        rating:Number,
        comment:String,
        author:String,
        date:Date
    }]

});

module.exports = DBHelper.db.model("videos",videos,"videos");