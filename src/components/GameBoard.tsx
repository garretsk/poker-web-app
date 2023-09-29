import { Round } from '@/classes/round';
import { Player } from '@/classes/player';
import PlayerSection from './PlayerSection';

interface GameBoardProps {
  winner: string;
  round: Round;
}

/**
 * Represents a custom component called GameBoard
 *
 * This component contains all of the players' cards and related info.
 *
 * @component
 */
export default function GameBoard(props: GameBoardProps) {
  let players: Player[] = props.round.getPlayers();

  return (
    <>
      <section>
        <h2 className='text-3xl flex justify-center'>Winner - {props.winner}</h2>
        {players.map(player => <PlayerSection key={player.getName()} player={player}/>)}
      </section>
    </>
  )
}
