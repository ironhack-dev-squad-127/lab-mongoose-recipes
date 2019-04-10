const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });


// Delete all recipes to clean the collection and avoid "unique" problems
Recipe.deleteMany()
  .then(() => {

    // Iteration 2
    Recipe.create({
      title: 'Pain au chocolat',
      level: 'Amateur Chef',
      ingredients: ['chocolate', 'flour', 'eggs', 'butter'],
      cuisine: 'French',
      dishType: 'Breakfast',
      image: 'https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/113581.jpg',
      duration: 42,
      creator: 'Maxence Bouret',
    })
      .then(recipeCreated => {
        console.log('Iteration 2', recipeCreated.title)
      })

    // Iteration 3
    Recipe.insertMany(data)
      .then(createdRecipes => {
        console.log('Iteration 3')
        for (let i = 0; i < createdRecipes.length; i++) {
          console.log(i, createdRecipes[i].title)
        }

        // Iteration 4
        Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100})
        .then(info => {
          console.log('Iteration 4', info)
        })

        // Iteration 5
        Recipe.deleteOne({ title: "Carrot Cake" })
        .then(info => {
          console.log('Iteration 5', info)
        })
      })
  })

setTimeout(() => {
  // Iteration 6
  mongoose.disconnect()
}, 2000)