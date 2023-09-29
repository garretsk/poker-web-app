import { Round } from '@/classes/round';
import { Player } from '@/classes/player';
import { StackOfCards } from '@/classes/stack-of-cards';
import { Card } from '@/classes/card';
import Image from 'next/image';
import { NUM_CARDS } from '@/constants/poker';

interface GameBoardProps {
  winner: string;
  round: Round;
}

export default function GameBoard(props: GameBoardProps) {
  
  let players: Player[] = props.round.getPlayers();
  let allImages: string[][] = [];
  for (const player of players) {
    let hand: StackOfCards = player.showHand();
    let card: Card;
    let handImages: string[] = [];
    for (let i = 0; i < NUM_CARDS; i++) {
      card = hand.getCard(i);
      handImages.push(card.getRank().toString() + card.getSuit() + '.png');
    }
    allImages.push(handImages);
  }


  return (
    <>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {props.winner}
          
        </tbody>
      </table>
    </>
  )
}
