const mongoose = require('mongoose');
require('dotenv').config();


// To Connect to the database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database connected'))
    .catch(err => console.error('Error connecting to the database:', err));

    const Person = require('./models/person');


(async () => {
// Create and save a new person
const newPerson = new Person({
    name: 'Adriel King',
    age: 20,
    favoriteFoods: ['Rice', 'Indomie']
});

try{
const savedPerson = await newPerson.save();
    console.log('Person saved successfully:', savedPerson);
    } catch (err) {
        console.error('Error saving person:', err);
    }

// Create many people
const arrayOfPeople = [
    { name: 'Blessing', age: 31, favoriteFoods: ['Vegies', 'Salad'] },
    { name: 'Naomi', age: 33, favoriteFoods: ['Pasta', 'Eba'] },
    { name: 'Clinton', age: 31, favoriteFoods: ['Beans', 'Plantain'] }
];

try{
const createdPeople = await Person.create(arrayOfPeople);
        console.log('People created successfully:', createdPeople);
    } catch (err) {
        console.error('Error creating people:', err);
    }

// Find all people with a given name
const nameToSearch = 'Adriel King';

try {
    const foundPeople = await Person.find({ name: nameToSearch });
    console.log(`People with name "${nameToSearch}":`, foundPeople);
        } catch (err) {
    console.error('Error finding people:', err);
}

// Find one person with a certain food in their favorites
const foodToSearch = 'Indomie';

try {
    const person = await Person.findOne({ favoriteFoods: foodToSearch });
    console.log(`Person with "${foodToSearch}" in favorites:`, person);
} catch (err) {
    console.error('Error finding person:', err);
}

// Find a person by their _id
const personIdToSearch = '64c60d79f3fa4beb1dd05e0c'; // Replace with the actual _id of the person you want to find

try {
    const person = await Person.findById(personIdToSearch);
    console.log('Person with ID:', person);
} catch (err) {
    console.error('Error finding person by ID:', err);
}

// Perform classic update: Find a person by _id, add "hamburger" to their favoriteFoods, and then save the updated person
const personIdToUpdate = '64c60d79f3fa4beb1dd05e0c'; // Replace with the actual _id of the person you want to update

try {
    const personToUpdate = await Person.findById(personIdToUpdate);
    personToUpdate.favoriteFoods.push('Corn');
    const updatedPerson = await personToUpdate.save();
    console.log('Person updated successfully:', updatedPerson);
} catch (err) {
    console.error('Error finding person for update:', err);
}

// Perform new update: Find a person by name and set their age to 20
const personNameToUpdate = 'Blessing'; // Replace with the name of the person you want to update

try {
    const updatedPerson = await Person.findOneAndUpdate(
    { name: personNameToUpdate },
    { age: 20 },
    { new: true }
    );
    console.log('Person updated successfully:', updatedPerson);
    } catch (err) {
    console.error('Error updating person:', err);
}

// Delete one person by _id
const personIdToDelete = '64c60d82f3fa4beb1dd05e10'; // Replace with the actual _id of the person you want to delete

try {
    const deletedPerson = await Person.findByIdAndRemove(personIdToDelete);
    console.log('Person deleted successfully:', deletedPerson);
} catch (err) {
    console.error('Error deleting person:', err);
}
    

// Delete all people whose name is "Mary"
const nameToDelete = 'Mary';

try {
    const deleteResult = await Person.deleteMany({name: nameToDelete});
    console.log(`${deleteResult.deletedCount} people name "${nameToDelete}" were deleted.`);
} catch (err) {
    console.error('Error deleting people:', err);
}

// Chain search query helpers: Find people who like burritos, sort them by name, limit the results to two documents, and hide their age

try {
    const peopleWhoLikeBeans = await Person.find({ favoriteFoods: 'beans'}).sort('name').limit(2).select('-age');
    console.log('People who like Beans:', peopleWhoLikeBeans);
} catch (err) {
        console.error('Error finding people who like beans:', err);
    }

// Close the database connection when all operations are done
mongoose.connection.close();
})();
