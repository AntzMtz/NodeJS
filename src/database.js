const mongodb = require('mongoose');
mongodb.Promise = global.Promise;
//var conMongo = 'mongodb+srv://' + user + ':' + pass + '@antonio.cdkse.mongodb.net/'  + colecion + '?retryWrites=true&w=majority';
var conMongo = 'mongodb+srv://AntzMtz:Maryant01@antonio.wzscw.mongodb.net/Escuela?retryWrites=true&w=majority';

mongodb.connect(conMongo, {
        
        useNewUrlParser: true,
        
        useUnifiedTopology: true,
        useNewUrlParser: true
        //useMongoClient: true
    })
    .then(() => {
        console.log(mongodb.Collection);

        console.log('DB Connected!' + user)
    })
    .catch(err => console.log("DB Connection Error:" + err.message));


module.exports = mongodb;