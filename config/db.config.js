require('dotenv').config();

const password = process.env.dbpassword;

module.exports = {
    url: `mongodb+srv://init:${password}@clusterinit.7lnt0.mongodb.net/user_collection?retryWrites=true&w=majority`
}