# mongoose
Installing and setting up Mongoose:
Add MongoDB and Mongoose to the project’s package.json.  Store your MongoDB Atlas database URI in the private .env file as MONGO_URI. Surround the URI with single or double quotes and make sure no space exists between both the variable and the `=` and the value and `=`. Connect to the database using the following syntax:

`mongoose.connect(<Your URI>, { useNewUrlParser: true, useUnifiedTopology: true }); `

 
