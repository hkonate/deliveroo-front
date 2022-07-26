import { useState, useEffect } from 'react'
import axios from 'axios'
import './assets/fonts.css'
import './App.css';

function App() {
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const fetchData = async () => {
    const response = await axios.get("https://deliveroo-back-end-react.herokuapp.com/");

    setData(response.data)
    console.log(response.data)
    setIsLoading(false)
  }
  useEffect(() => { fetchData() }, [])

  return isLoading ? (
    <span>En cours de chargement... </span>
  ) : (
    <div>
      <header>
        <div className='underline'><div className='container'><img src="/images/logo-teal.svg" alt="logo" /></div></div>

        <div className="descrip container">
          <div>
            <h2>{data.restaurant.name}</h2>
            <p>{data.restaurant.description}</p>
          </div>
          <img src="https://f.roocdn.com/images/menus/17697/header-image.jpg" alt="" />
        </div>
      </header>
      <div className='main'>
        <div className='content'>
          <div className='menu'>
            {
              data.categories.map((menu, index) => {
                return (
                  (menu.meals.length > 0) &&
                  < div key={index} >
                    <h3>{menu.name}</h3>
                    <div className='menu-item'>
                      {menu.meals.map((plate, i) => {
                        return (<div key={i} className='meal'>
                          <div className='meal-descrip'>
                            <h4>{plate.title}</h4>
                            <p>{plate.description}</p>
                            <div className='meals-price'>
                              <span>{plate.price} €</span>
                              {plate.popular && <span>★ Populaire</span>}
                            </div>
                          </div>
                          <div className='meals-pics'>
                            {
                              plate.picture && <img src={plate.picture} alt="plate" />
                            }
                          </div>
                        </div>)
                      })}
                    </div>
                  </div>)
              })
            }
          </div>
          <div className='cart'>
            <button>Valider mon panier</button>
            <p>Votre panier est vide</p>
          </div>
        </div>
      </div>
    </div >)
}

export default App;
