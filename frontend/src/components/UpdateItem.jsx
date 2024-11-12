import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { ItemsContext } from '../App';

const UpdateItem = () => {

  const { isUpdateOpen, setIsUpdateOpen , fetchItems} = useContext(ItemsContext)
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    quantity: ''
  })

  const handleClose = () => {
    setIsUpdateOpen({ visibility: false, id: '' })
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Submit updated item data
    try {
      const response = await axios.put(
        `http://localhost:5050/item/${isUpdateOpen.id}`,
        formData
      );
      console.log('Item updated successfully:', response.data);
      fetchItems();
      handleClose();  // Close the form after submission
    } catch (error) {
      console.log('Error:', error.message);
    }
  };

  useEffect(() => {
    if (isUpdateOpen.visibility) {
      const fetchItem = async () => {
        try {
          const response = await axios.get(`http://localhost:5050/item/${isUpdateOpen.id}`)
          setFormData({
            name: response.data.name,
            category: response.data.category,
            price: response.data.price,
            quantity: response.data.quantity
          })
        } catch (error) {
          console.log(error)
        }
      }
      fetchItem();
    }

  }, [isUpdateOpen.visibility, isUpdateOpen.id])


  return (
    <div
      className={`w-full h-screen flex items-center justify-center bg-black bg-opacity-65 top-0 left-0 fixed z-10 ${isUpdateOpen.visibility ? 'block' : 'hidden'}`}
    >
      <form
        onSubmit={handleSubmit}
        className='flex flex-col w-fit bg-slate-900 p-10 rounded-lg'
      >
        <input
          type='text'
          value={formData.name}
          name='name'
          required
          onChange={handleChange}
          className='bg-white text-black px-3 py-2 rounded-md min-w-[300px] mb-2'
        />

        <input
          type='text'
          value={formData.category}
          name='category'
          required
          onChange={handleChange}
          className='bg-white text-black px-3 py-2 rounded-md min-w-[300px] mb-2'
        />

        <input
          type='number'
          value={formData.price}
          name='price'
          required
          onChange={handleChange}
          className='bg-white text-black px-3 py-2 rounded-md min-w-[300px] mb-2'
        />

        <input
          type='number'
          value={formData.quantity}
          name='quantity'
          required
          onChange={handleChange}
          className='bg-white text-black px-3 py-2 rounded-md min-w-[300px] mb-8'
        />
        <div className='flex flex-row justify-between'>
          <button type='submit' className='bg-green-600'>Update</button>
          <button type='reset' onClick={handleClose} className='bg-red-600'>Close</button>
        </div>
      </form>
    </div>
  )
}

export default UpdateItem