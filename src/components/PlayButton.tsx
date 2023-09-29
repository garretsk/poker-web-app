'use client';
import React from 'react'

interface PlayButtonProps {
  handleClick: () => void;
}

export default function PlayButton(props: PlayButtonProps) {
  return (
    <div>
      <button className='btn btn-primary' onClick={props.handleClick}>Play</button>
    </div>
  )
}