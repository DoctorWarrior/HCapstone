var DBHelper = require("../util/DBHelper");


var users = new DBHelper.mongoose.Schema({
    username:String,
    password:String,
    email:String
});

module.exports = DBHelper.db.model("users",users,"users");