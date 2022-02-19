import React, {useState, useEffect} from 'react';
import './App.css';
import MyRecipesComponent from './MyRecipesComponent';

function App() {
  const video = 'https://files.cdn.thinkific.com/file_uploads/397660/attachments/90d/92f/4be/food.mp4';
  const MY_ID = '1301e6d7';
  const MY_KEY = '0b3f23c457dc9a48c5d1c5afd4330673';
  const [mySearch, setMySearch] = useState('');
  const [myRecipes, setMyRecipes] = useState([]);
  const [submitted, setSubmitted] = useState('avocado');

  const myRecipeSearch = (e) => {
    setMySearch(e.target.value);
  }

  const finalSearch = (e) => {
    e.preventDefault();
    setSubmitted(mySearch);
  }

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`https://api.edamam.com/search?q=${submitted}&app_id=${MY_ID}&app_key=${MY_KEY}`);
      const data = await response.json();
      setMyRecipes(data.hits);
    }
    fetchData();
  }, [submitted])

  return (
    <div className="App">
      <div className="container">
        <video autoPlay muted loop>
          <source src={video} type="video/mp4" />
        </video>
        <h1>Find a Recipe</h1>
      </div>
      <div className="container" style={{flexDirection: 'row'}}>
        <form onSubmit={finalSearch}>
          <input className='search' placeholder='search...' onChange={myRecipeSearch} value={mySearch} ></input>
        </form>
        <button>🍳</button>
      </div>
      {myRecipes.map(element => (
        <MyRecipesComponent
          key={element.id}
          label={element.recipe.label}
          image={element.recipe.image}
          calories={element.recipe.calories} 
          ingredients={element.recipe.ingredientLines}/>
      ))}
    </div>

  );
}

export default App;
