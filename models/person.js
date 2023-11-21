const mongoose = require('mongoose');


// This is to Connect to the database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database connected'))
    .catch(err => console.error('Error connecting to the database:', err));

    // This is to Create a Person schema
    const personSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number },
    favoriteFoods: { type: [String] }
});

// Here I Created a Person model
const Person = mongoose.model('Person', personSchema);

module.exports = Person;
