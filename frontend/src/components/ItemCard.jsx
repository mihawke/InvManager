import axios from 'axios';
import React, { useContext } from 'react'
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { ItemsContext } from '../App';

const ItemCard = ({ name, category, price, quantity, id, onClickUpdate }) => {

    const { fetchItems } = useContext(ItemsContext)

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:5050/item/${id}`)
            console.log(response.data.message)
            fetchItems();
        } catch (error) {
            console.log(error.response.data.message)
        }
    }

    return (
        <div className='flex flex-col items-start border-2 p-4 rounded-lg bg-white text-black'>
            <p className='text-lg font-bold'>{name}</p>
            <p className='text-sm font-semibold'>{category}</p>
            <p className='text-sm font-semibold'>${price}</p>
            <p className='text-xs font-bold'>{quantity} in stock</p>
            <div className='flex flex-row w-full justify-between mt-2'>
                <FaEdit
                    onClick={() => onClickUpdate({ visibility: true, id: id })}
                    className='text-green-600 cursor-pointer'
                />
                <FaTrashAlt
                    onClick={handleDelete}
                    className='text-red-600 cursor-pointer'
                />
            </div>
        </div>
    )
}

export default ItemCard