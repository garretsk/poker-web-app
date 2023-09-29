import { Round } from '@/classes/round';
import { Player } from '@/classes/player';
import Image from 'next/image';
import { StackOfCards } from '@/classes/stack-of-cards';
import { NUM_CARDS } from '@/constants/poker';
import { Card } from '@/classes/card';
import CardView from './CardView';

interface PlayerSectionProps {
  player: Player;
}

/**
 * Represents a custom component called PlayerSection.
 *
 * This component represents a section where player name and hand will be shown.
 *
 * @component
 */
export default function PlayerSection(props: PlayerSectionProps) {
  
  const hand: StackOfCards = props.player.showHand();
  const handResult = props.player.evaluateHand();
  let cards: Card[] = []
  for (let i = 0; i < NUM_CARDS; i++) {
    cards.push(hand.getCard(i));
  }

  return (
    <>
      <section className='flex flex-wrap p-2 m-6 "border-double border border-solid border-gray-300 rounded-lg"'>
        <h4 className='w-full'>Name: {props.player.getName()}</h4>
        <h4 className='w-full'>Result: {handResult.name}</h4>
        {cards.map(card => <CardView key={card.getRank() + card.getSuit()} card={card}/>)}
      </section>
    </>
  )
}
