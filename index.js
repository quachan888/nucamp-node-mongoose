const mongoose = require('mongoose');
const Campsite = require('./models/campsite');

const url = 'mongodb://localhost:27017/nucampsite';

const connect = mongoose.connect(url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

connect.then(() => {
    console.log('Connected correctly to server');

    Campsite.create({
        name: 'React Lake Campground',
        description: 'Test'
    })
        .then((campsite) => {
            console.log('Add succedded', campsite);
            return Campsite.find();
        })
        .then((campsite) => {
            console.log('Founded: ', campsite);
            return Campsite.deleteMany();
        })
        .then(() => {
            return mongoose.connection.close();
        })
        .catch((err) => {
            console.log(err);
            mongoose.connection.close();
        });
});
