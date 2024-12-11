// Users.js
import Parse from "parse";

export const createUser = async ({ email, password, firstName, lastName }) => {
  const user = new Parse.User();
  user.set("username", email);
  user.set("password", password);
  user.set("email", email);
  user.set("firstName", firstName);
  user.set("lastName", lastName);

  try {
    const newUser = await user.signUp();
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    return null;
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const user = await Parse.User.logIn(email, password);
    return user;
  } catch (error) {
    console.error("Error logging in:", error);
    return null;
  }
};

// Updated checkUser function
export const checkUser = () => {
  const currentUser = Parse.User.current();
  return currentUser && currentUser.authenticated();
};

// CREATE functin for animals
export const createAnimal = (id, name, size, color, price, speciesId) => {
  const Animal = Parse.Object.extend("animals");
  const newAnimal = new Animal();

  // setting attributes
  newAnimal.set("id", id);
  newAnimal.set("name", name);
  newAnimal.set("size", size);
  newAnimal.set("color", color);
  newAnimal.set("price", price);

  // creating Species pointer to maintain relationship
  const Species = Parse.Object.extend("species");
  const speciesPointer = new Species();
  speciesPointer.id = speciesId;  
  newAnimal.set("species", speciesPointer);  

  // returning new animal
  return newAnimal.save()
    .then((response) => {
      console.log("Animal created: ", response);
      return response;
    })
    .catch((err) => {
      console.error("Error while creating animal: ", err);
      throw err;
    });
};

// GET function for animals
export const getAllAnimals = () => {
  const Animal = Parse.Object.extend("animals");
  const query = new Parse.Query(Animal);
  query.include("species"); 

  return query.find()
    .then((results) => {
      const animals = results.map(animal => ({
        name: animal.get("name"),
        size: animal.get("size"),
        color: animal.get("color"),
        species: animal.get("species"), 
        price: animal.get("price")
      }));
      console.log("Fetched animals: ", animals);
      return animals;  
    })
    .catch((err) => {
      console.error("Error while fetching animals: ", err);
      throw err;
    });
};

// CREATE function for species
export const createSpecies = (classification, diet, habitat) => {
  const Species = Parse.Object.extend("species");
  const newSpecies = new Species();

  newSpecies.set("classification", classification);
  newSpecies.set("diet", diet);
  newSpecies.set("habitat", habitat);

  return newSpecies.save()
    .then((response) => {
      console.log("Species created: ", response);
      return response;
    })
    .catch((err) => {
      console.error("Error while creating species: ", err);
      throw err;
    });
};

// GET function for species
export const getAllSpecies = () => {
  const Species = Parse.Object.extend("species");
  const query = new Parse.Query(Species);

  return query.find()
    .then((results) => {
      const speciesList = results.map(species => ({
        name: species.get("diet"),
        classification: species.get("classification"),
        habitat: species.get("habitat")
      }));
      console.log("Fetched species: ", speciesList);
      return speciesList; 
    })
    .catch((err) => {
      console.error("GET Error: ", err);
      throw err;
    });
};

// CREATE function for purchased
export const createPurchased = (name, cost, buyer) => {
  const Purchased = Parse.Object.extend("purchased");
  const newPurchased = new Purchased();

  newPurchased.set("name", name);
  newPurchased.set("cost", cost);
  newPurchased.set("buyer", buyer);

  return newPurchased
    .save()
    .then((response) => {
      console.log("Purchased item created: ", response);
      return response;
    })
    .catch((err) => {
      console.error("Error while creating purchased item: ", err);
      throw err;
    });
};

// GET function for purchased
export const getAllPurchased = () => {
  const Purchased = Parse.Object.extend("purchased");
  const query = new Parse.Query(Purchased);

  return query
    .find()
    .then((results) => {
      const purchasedItems = results.map((item) => ({
        id: item.id,
        name: item.get("name"),
        cost: item.get("cost"),
        buyer: item.get("buyer"),
      }));
      console.log("Fetched purchased items: ", purchasedItems);
      return purchasedItems;
    })
    .catch((err) => {
      console.error("Error while fetching purchased items: ", err);
      throw err;
    });
};