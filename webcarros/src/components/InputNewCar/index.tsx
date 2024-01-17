interface InputNewCarProps{
    value: string;
    label: string;
    onChange: (e: string) => void;
}

const InputNewCar = ({value,label,onChange} : InputNewCarProps) => {
  return (
    <div className="w-full">
        <label className='font-bold'>
            {label}
        </label>
        <input value={value} onChange={(e) => onChange(e.target.value)} className='w-full px-2 py-1 rounded-lg border-2' />
    </div>
  )
}

export default InputNewCar
