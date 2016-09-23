var person = {
  name: 'Andrew',
  age: 24
};
//turn a person object into a JSON string
var personJSON = JSON.stringify(person);

console.log(personJSON);
console.log(typeof personJSON);

//turn it back into an object
var personObject = JSON.parse(personJSON);

console.log(personObject.name);
console.log(typeof personObject);

// FULL STEP BY STEP *****

// Start with string
var animal = '{"name": "Halley"}';

// convert to js object
var animalObject = JSON.parse(animal);

// add age prop
animalObject.age = 16;

// convert back to JSON
var animalString = JSON.stringify(animalObject);

// Log out result
console.log(animalString);
