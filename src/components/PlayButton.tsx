import React from 'react'

interface PlayButtonProps {
  handleClick: () => void;
}

/**
 * Represents a custom component called PlayButton
 *
 * This component contains a button that will be clicked in order to start the game.
 *
 * @component
 */
export default function PlayButton(props: PlayButtonProps) {
  return (
    <div>
      <button className='btn btn-primary' onClick={props.handleClick}>Play</button>
    </div>
  )
}