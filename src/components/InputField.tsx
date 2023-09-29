interface InputFieldProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

/**
 * Represents a custom component called InputField
 *
 * This component contains the input field for the names of the players.
 *
 * @component
 */
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