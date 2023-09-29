'use client'
import React from 'react';
import { Round } from '@/classes/round';
import { Player } from '@/classes/player';
import InputField from '@/components/InputField';
import PlayButton from '@/components/PlayButton';
import GameBoard from '@/components/GameBoard';

export default function Home() {
  const [gameStarted, setGameStarted] = React.useState(false);
  const [input, setInput] = React.useState('');
  const [round, setRound] = React.useState(new Round([]));
  const [winner, setWinner] = React.useState('');

  function handleClick() {
    setGameStarted(true);

    const names: string[] = input.split(',');

    let round: Round = new Round(names);
    let winner: Player = round.play();
    
    setWinner(winner.getName());
    setRound(round);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      { gameStarted
        ? <GameBoard winner={winner} round={round}/>
        : <>
          <InputField value={input} onChange={handleChange}/>
          <PlayButton handleClick={handleClick}/>
        </> }
    </main>
  )
}
