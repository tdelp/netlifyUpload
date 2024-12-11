import { useState } from "react";
import Parse from "parse";

Parse.initialize("4AVSMbAhhvLMXgOeQ0jn8JFBXgvNEbSqLaXingUt", "soCNFHXs48gR1N9ur0KIUbkohjGwK6CLDpkoDpus");
Parse.serverURL = "https://parseapi.back4app.com/";

const SearchInput = ({ label, value, onChange }) => {
  return (
    <div className="form-group">
      <label>{label}: </label>
      <input 
        type="text" 
        placeholder={label} 
        className="search-input" 
        value={value} 
        onChange={(e) => onChange(e.target.value)} 
      />
    </div>
  );
};

const SearchForm = ({ onAnimalAdded }) => {
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [buyer, setBuyer] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Save to Back4App
    const Animal = new Parse.Object("purchased"); // Replace "Animal" with your Parse class name
    Animal.set("name", name);
    Animal.set("cost", parseFloat(cost));
    Animal.set("buyer", buyer);

    try {
      await Animal.save();
      alert("Animal added successfully!");

      // Notify parent component to refresh the list
      onAnimalAdded({ name, cost: parseFloat(cost), buyer });

      // Clear form
      setName("");
      setCost("");
      setBuyer("");
    } catch (error) {
    }
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <SearchInput label="Animal Name" value={name} onChange={setName} />
      <SearchInput label="Sponser Amount" value={cost} onChange={setCost} />
      <SearchInput label="Sponser's Name" value={buyer} onChange={setBuyer} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default SearchForm;
