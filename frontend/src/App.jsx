import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import ItemCard from './components/ItemCard'
import SearchItems from './components/SearchItems'
import { createContext } from 'react'
import CreateItem from './components/CreateItem'
import UpdateItem from './components/UpdateItem'

export const ItemsContext = createContext();

function App() {
  const [items, setItems] = useState([])
  const [categories, setCategories] = useState([])
  const [isUpdateOpen, setIsUpdateOpen] = useState({
    visibility: false,
    id: ''
  })

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
  const [createItem, setCreateItem] = useState(false)

  useEffect(() => {
    fetchItems();
    fetchCategories();
  }, [])

  return (
    <ItemsContext.Provider value={{ categories, setItems, isUpdateOpen, setIsUpdateOpen, createItem, setCreateItem, fetchItems }}>
      <UpdateItem />
      <SearchItems />
      <button className='bg-blue-600 w-fit mt-4' onClick={() => setCreateItem(true)}>Create Item</button>
      {createItem && <CreateItem />}

      <div className='grid grid-cols-4 gap-4 mt-4'>
        {items.map(item => (
          <ItemCard
            key={item._id}
            name={item.name}
            category={item.category}
            price={item.price}
            quantity={item.quantity}
            id={item._id}
            onClickUpdate={setIsUpdateOpen}
          />
        ))}
      </div>
    </ItemsContext.Provider>
  )
}

export default App
