const mongoose = require('mongoose');
const Campsite = require('./models/campsite');

const url = 'mongodb://localhost:27017/nucampsite';

const connect = mongoose.connect(url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

connect.then(() => {
    console.log('Connected correctly to server');

    Campsite.create({
        name: 'React Lake Campground',
        description: 'Test'
    })
        .then((campsite) => {
            console.log('Add succedded', campsite);
            // Add comments to campsite
            return Campsite.findByIdAndUpdate(
                campsite._id,
                {
                    $set: { description: 'Updated Test Document' }
                },
                {
                    new: true
                }
            );
        })
        .then((campsite) => {
            console.log('After update: ', campsite);
            campsite.comments.push({
                rating: 5,
                text: 'What a beautiful view!',
                author: 'Andy'
            });
            campsite.comments.push({
                rating: 3,
                text: 'A lot of mosquitos!',
                author: 'Sandy'
            });

            return campsite.save();
        })
        .then((campsite) => {
            console.log('Founded updated campsite: ', campsite);
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
