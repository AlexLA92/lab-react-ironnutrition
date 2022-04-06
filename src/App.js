import logo from './logo.svg';
import './App.css';
import foods from './foods.json';
import FoodBox from './components/FoodBox';
import { useState } from 'react';
import { Input } from 'antd';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    servings: '',
    calories: '',
  });

  const [foodState, setFoodState] = useState([...foods]);

  const [searchData, setSearchData] = useState({
    query: '',
    queryResults: foodState,
  });

  const [isFormShown, setIsFormShown] = useState(true);

  const handleDelete = (food) => {
    let newFoodState = [...foodState];
    const indexToDelete = foodState.findIndex(
      (foodItem) => foodItem.name === food.name
    );
    newFoodState.splice(indexToDelete, 1);
    setFoodState(newFoodState);

    let newQueryResults = [...searchData.queryResults];
    const indexQToDelete = newQueryResults.findIndex(
      (foodItem) => foodItem.name === food.name
    );
    newQueryResults.splice(indexQToDelete, 1);
    setSearchData({ queryResults: newQueryResults, query: searchData.value });
  };

  const handleSubmit = (event) => {
    // do not navigate the browser on form submit
    event.preventDefault();
    setFoodState([formData, ...foodState]);
    setFormData({
      name: '',
      image: '',
      servings: '',
      calories: '',
    });
  };

  const handleChanges = (event) => {
    const { value, name } = event.target;
    const newFormData = {
      ...formData,
      [name]: value,
    };
    setFormData(newFormData);
  };

  const handleSearchChanges = (event) => {
    const { value } = event.target;

    if (value === '') {
      setSearchData({ queryResults: foodState, query: '' });
    } else {
      const newQueryResults = [
        ...foodState.filter((food) => {
          return food.name.toLowerCase().includes(value.toLowerCase());
        }),
      ];
      setSearchData({ queryResults: newQueryResults, query: value });
    }
  };

  const foodList = searchData.queryResults.map((food) => {
    return <FoodBox key={food.name} food={food} handleDelete={handleDelete} />;
  });

  return (
    <div className="App">
      <div className="formContainer">
        <h1> Add food entry</h1>
        {isFormShown && (
          <form onSubmit={handleSubmit}>
            <label for="name">Name</label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              type="text"
              onChange={handleChanges}
            />
            <label for="image">Image</label>
            <Input
              id="image"
              name="image"
              value={formData.image}
              type="text"
              onChange={handleChanges}
            />
            <label for="servings">Servings</label>
            <Input
              id="servings"
              name="servings"
              value={formData.servings}
              type="text"
              onChange={handleChanges}
            />
            <label for="calories">Calories</label>
            <Input
              id="calories"
              name="calories"
              value={formData.calories}
              type="text"
              onChange={handleChanges}
            />
            <button type="submit">Add new food</button>
          </form>
        )}
        <button
          onClick={() => {
            setIsFormShown(!isFormShown);
          }}
        >
          {isFormShown ? 'Hide form' : 'Add new food'}
        </button>
      </div>
      <div>
        <h1>Search food</h1>
        <form>
          <label for="name">Name</label>
          <Input
            id="query"
            name="query"
            value={searchData.query}
            type="text"
            onChange={handleSearchChanges}
          />
        </form>
      </div>
      <h1> Food list</h1>
      <div>
        {foodList.length ? (
          <div className="foodList">{foodList}</div>
        ) : (
          <div>Oops ! There is no more content to show !</div>
        )}
      </div>
    </div>
  );
}

export default App;
