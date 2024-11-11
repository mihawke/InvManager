import React from 'react'

const ItemCard = ({ name, category, price, quantity }) => {
    return (
        <div className='flex flex-col items-start border-2 p-4 rounded-lg bg-white text-black'>
            <p className='text-lg font-bold'>{name}</p>
            <p className='text-sm font-semibold'>{category}</p>
            <p className='text-sm font-semibold'>${price}</p>
            <p className='text-xs font-bold'>{quantity} in stock</p>
        </div>
    )
}

export default ItemCard