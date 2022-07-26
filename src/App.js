import { useState, useEffect } from 'react'
import axios from 'axios'
import './assets/fonts.css'
import './App.css';

function App() {
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [order, setOrder] = useState([])
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
                        return (<div key={i} className='meal' onClick={() => {
                          const newOrder = [...order]
                          if (order.length > 0) {
                            let find = order.findIndex(dish => dish.name === plate.title);
                            if (find !== -1) {
                              newOrder[find].count++;
                            } else {
                              newOrder.push({ name: plate.title, count: 1, price: plate.price })
                            }
                          }
                          else {
                            newOrder.push({ name: plate.title, count: 1, price: plate.price })
                            console.log('bobo');
                          }

                          setOrder(newOrder);
                        }}>
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
          <div>
            <div className='cart' >
              <button style={{ "background-color": order.length > 0 ? '#00ccbc' : '#bac3c3', cursor: order.length > 0 ? "initial" : "not-allowed", color: order.length > 0 ? "white" : "#8b9a9b" }}>Valider mon panier</button>
              {order.length > 0 ? (
                <div className='box'>
                  <div className='recipe'>
                    {order.map((dish, index) => {
                      return (<div className='dishes' key={index}>
                        <div className='dishe'>
                          <p onClick={() => {
                            const newOrder = [...order]
                            if (newOrder[index].count === 1) {
                              newOrder.splice(index, 1)
                            } else {
                              newOrder[index].count--
                            }
                            setOrder(newOrder)
                          }}>-</p>
                          <p>{dish.count}</p>
                          <p onClick={() => {
                            const newOrder = [...order]
                            newOrder[index].count++
                            setOrder(newOrder)
                          }}>+</p>
                          <p>{dish.name}</p>
                        </div>
                        <div>
                          <p>{dish.price}</p>
                        </div>

                      </div>)
                    })}
                  </div>
                  <div>
                    <div className='delivery'>
                      <div className='deliveries'>
                        <p>Sous-total</p>
                        <p>{order.reduce((acc, cur) => acc + cur.price * cur.count, 0).toFixed(2)} €</p>
                      </div>
                      <div className='deliveries'>
                        <p>Frais de livraison</p>
                        <p>2.50 €</p>
                      </div>
                    </div>
                    <div className='split'>
                      <p>Total</p>
                      <p>{(order.reduce((acc, cur) => acc + cur.price * cur.count, 0) + 2.50).toFixed(2)} €</p></div>
                  </div>
                </div>) : (<p>Votre panier est vide</p>)}

            </div>
          </div>

        </div>
      </div>
    </div >)
}

export default App;
