import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { ItemsContext } from '../App'

const CreateItem = () => {

    const { createItem, setCreateItem , fetchItems} = useContext(ItemsContext)

    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')

    const handleClose = () => {
        setCreateItem(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            name: name,
            category: category,
            price: price,
            quantity: quantity
        };
        try {
            const response = await axios.post('http://localhost:5050/create-item', formData)
            console.log(response.data)
            fetchItems();
            handleClose();

        } catch (error) {
            console.log(error.response.data.message)
        }
    }

    return (
        <div
            className={`w-full h-full flex items-center justify-center bg-black bg-opacity-65 top-0 left-0 fixed z-10 ${createItem ? 'block' : 'hidden'}`}
        >
            <form
                className='flex flex-col w-fit bg-slate-900 p-10 rounded-lg'
                onSubmit={handleSubmit}
            >
                <label htmlFor='name'>Name:</label>
                <input
                    type='text'
                    value={name}
                    name='name'
                    required
                    onChange={(e) => setName(e.target.value)}
                    className='bg-white text-black px-3 py-2 rounded-md min-w-[300px] mb-2'
                />

                <label htmlFor='category'>Category:</label>
                <input
                    type='text'
                    value={category}
                    name='category'
                    required
                    onChange={(e) => setCategory(e.target.value)}
                    className='bg-white text-black px-3 py-2 rounded-md min-w-[300px] mb-2'
                />

                <label htmlFor='price'>Price:</label>
                <input
                    type='number'
                    value={price}
                    name='price'
                    required
                    onChange={(e) => setPrice(e.target.value)}
                    className='bg-white text-black px-3 py-2 rounded-md min-w-[300px] mb-2'
                />

                <label htmlFor='quantity'>Quantity:</label>
                <input
                    type='number'
                    value={quantity}
                    name='quantity'
                    required
                    onChange={(e) => setQuantity(e.target.value)}
                    className='bg-white text-black px-3 py-2 rounded-md min-w-[300px] mb-8'
                />
                <div className='flex flex-row justify-between'>
                    <button type='submit' className='bg-green-600'>Submit</button>
                    <button type='reset' onClick={() => setCreateItem(false)} className='bg-red-600'>Close</button>
                </div>
            </form>
        </div>
    )
}

export default CreateItem