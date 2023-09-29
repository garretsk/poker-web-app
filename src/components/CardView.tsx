import Image from 'next/image';
import { Card } from '@/classes/card';

interface CardViewProps {
  card: Card;
}

/**
 * Represents a custom component called CardView
 *
 * This component contains a single card.
 *
 * @component
 */
export default function CardView(props: CardViewProps) {

  let source: string = '/' + props.card.getRank() + props.card.getSuit() + '.png';
  
  return (
    <>
      <Image className='m-2' src={source} alt="card" width={100} height={100}/>
    </>
  )
}
