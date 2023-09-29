import { Round } from '@/classes/round';
import { Player } from '@/classes/player';
import Image from 'next/image';

interface InputFieldProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function InputField(props: InputFieldProps) {

  return (
    <>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Please enter the player names, separated by commas:</span>
        </label>
        <input value={props.value} onChange={props.onChange} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
      </div>
    </>
  )
}