import React from 'react';
import { Link } from "react-router-dom";


function FoodCard ({ food }) {
  return (
    <Link to={`/${food.id}`}>
      <div className='drop-shadow-sm
      rounded-lg
      border-zinc-100
      border
      bg-white
      p-2
      hover:drop-shadow-2xl
      transition-all
      duration-200'>
        <div
          className='h-52 bg-cover bg-center bg-no-repeat mb-4'
          style={{ backgroundImage: `url(${food.image})` }}></div>
        <h1 className='font-semibold text-zinc-700 text-center pb-2'>{food.title}</h1>
      </div>
    </Link>
  )
};
export default FoodCard