import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { ItemsContext } from '../App'

const SearchItems = () => {
    const [query, setQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('');
    const [maxPrice, setMaxPrice] = useState('')

    const { categories, setItems } = useContext(ItemsContext)

    const handleQuerySubmit = (e) => {
        e.preventDefault();
    }
    const handleCategorySubmit = async (e) => {
        e.preventDefault();
    }

    const handlePriceSubmit = async (e) => {
        e.preventDefault();
    }

    const fetchFilteredItems = async () => {
        try {
            const params = new URLSearchParams();
            if (query) {
                params.append('query', query);
            }
            if (selectedCategory) {
                params.append('category', selectedCategory);
            }
            if (maxPrice) {
                params.append('maxPrice', maxPrice);
            }
            const response = await axios.get(`http://localhost:5050/items/filter?${params.toString()}`)
            setItems(response.data); 
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        // Call fetchFilteredItems whenever any of the filters change
        fetchFilteredItems();
    }, [query, selectedCategory, maxPrice]);

    const handleResetFilter = () => {
        setMaxPrice('');
        setSelectedCategory('');
        setQuery('');
        fetchFilteredItems();
    }

    return (
        <div className='flex flex-row items-center justify-between'>
            <form onSubmit={handleQuerySubmit}>
                <input
                    type='text'
                    placeholder='Search item...'
                    className='bg-white text-black px-3 py-2 rounded-md min-w-[300px]'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </form>
            <form onSubmit={handleCategorySubmit}>
                <label htmlFor='categories' className='mr-2'>Categories:</label>
                <select name='categories' onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
                    <option value={''}>All</option>
                    {categories.map((category, index) => (
                        <option
                            key={index}
                            value={category}
                        >
                            {category}
                        </option>
                    ))}
                </select>
            </form>
            <form onSubmit={handlePriceSubmit}>
                <label htmlFor='max-price' className='mr-2'>Max Price:</label>
                <input
                    type='number'
                    name='max-price'
                    className='bg-white text-black px-3 py-2 rounded-md w-[100px]'
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                />
            </form>
            <button onClick={handleResetFilter}>Reset Filter</button>
        </div>
    )
}

export default SearchItems