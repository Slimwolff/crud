require('dotenv').config();
const password = process.env.DBPASS;

module.exports = {
    url: `mongodb+srv://init:<${password}>@clusterinit.7lnt0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
}