import React from 'react'

type Player = 'X' | 'O' | "Draw" | null;


const Square = ({
    value, 
    onClick, 
    winner,
}:{
    value: Player,
    onClick: () => void,
    winner: Player,
}) => {
    const baseStyle = "w-[100px] h-[100px] text-7xl font-bold text-[#e8e5e5] border-black border-2 flex items-center justify-center";
    const playerStyle = value === 'X' ? 'text-blue-500' : value === 'O' ? 'text-red-500' : '';
    const interactionStyle = !value && !winner ?  'hover:bg-gray-200 cursor-pointer' : 'cursor-not-allowed';
    const disabledStyle = (value || winner) ? 'bg-gray-100' : '';

  return (


    <button 
        className={` ${baseStyle} ${playerStyle} ${interactionStyle} ${disabledStyle} `} 
        disabled={!!value || !!winner}
        onClick={onClick}
    >
      {value}
    </button>
  )
};

export default Square
