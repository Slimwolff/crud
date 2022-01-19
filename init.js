const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const db = require('./models');



//database connection and handle error
db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to database!');
}).catch(err => {
    console.log("Cannot connect to the database!!", err);
    process.exit();
})


const corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', express.static(path.join(__dirname, 'public')));
 
require('./routes/user.routes')(app);

app.listen(3000, () => {
    console.log('running');
})

