"use client"
import Square from '@/components/Square';
import React, { useState} from 'react';

type Player = "X" | "O" | "Draw" | null;

function calculateWinner(squares: Player[]): Player | null {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];  // Return 'X' or 'O'
        }
    }

    if (!squares.includes(null)) {
        return "Draw";
    }

    return null;
}



const Board = () => {
    const [squares, setSquares] = useState<Player[]>(Array(9).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState<Player>(
        Math.round(Math.random()) === 1 ? "X" : "O"
    );
    const [winner, setWinner] = useState<Player | "Draw">(null);

    function handleSquareClick(index: number) {
        // --> 1. Check if the square is already filled or if there is a winner
        if (squares[index] || winner) {
            return;
        }

        // --> 2. Create a new array with the updated square
        const newSquares = squares.slice();
        newSquares[index] = currentPlayer;
        setSquares(newSquares);

        // --> 3. Check for a winner or draw using the new board state
        const newWinner = calculateWinner(newSquares);
        if (newWinner) {
            setWinner(newWinner);
        } else {
            setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
        }
    }

    // --> Reset the game
    function resetGame() {
        setSquares(Array(9).fill(null));
        setWinner(null);
        // --> Start next game with a random player agaiin
        setCurrentPlayer(Math.round(Math.random()) === 1 ? 'X' : 'O');
    }

    // ----> Determine Status Message 
    let status;
    if (winner) {
        if (winner === "Draw") {
            status = "It's a Draw!";
        } else {
            status = ` Winner: ${winner} `
        }
    } else {
        status = ` Next player: ${currentPlayer} `
    };


    return (
        <div className='flex flex-col items-center mt-8'>
            <p className='mb-4 text-xl font-semibold' > {status} </p>

            <div className='grid gap-0.5 grid-cols-3 w-[306px] h-[306px] border border-black'>
                {squares.map((value, i) => (
                    <Square
                        winner={winner}
                        key={i}
                        onClick={() => handleSquareClick(i)}
                        value={value}
                    />

                ))}
            </div>

            {(winner) && (
                <button 
                    onClick={resetGame}
                    className='mt-6 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                    >
                    Play Again?
                </button>
            )}
        </div>
    )
}

export default Board
