import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import ItemCard from './components/ItemCard'
import SearchItems from './components/SearchItems'
import { createContext } from 'react'

export const ItemsContext = createContext();

function App() {
  const [items, setItems] = useState([])
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:5050/items')
        setItems(response.data)
      } catch (error) {
        console.log(error.message)
      }
    }
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5050/categories')
        setCategories(response.data)
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchItems();
    fetchCategories();

  }, [])

  return (
    <ItemsContext.Provider value={{ categories, setItems }}>
      <div className='flex flex-col w-full'>
        <SearchItems />
        <div className='grid grid-cols-4 gap-4 mt-4'>
          {items.map(item => (
            <ItemCard
              key={item._id}
              name={item.name}
              category={item.category}
              price={item.price}
              quantity={item.quantity}
            />
          ))}
        </div>
      </div>
    </ItemsContext.Provider>
  )
}

export default App
