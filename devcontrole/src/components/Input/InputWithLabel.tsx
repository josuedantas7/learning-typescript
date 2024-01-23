import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface InputWithLabelProps {
    label: string
    onChange: (value: string) => void
    password?: boolean
    email?: boolean
    textarea?: boolean
}

export function InputWithLabel({label,onChange,password,email,textarea} : InputWithLabelProps) {
  return (
    <div className="flex flex-col w-full gap-3">
      <Label htmlFor={label}>{label}</Label>
      {password ? (
          <Input type="password" id={label} placeholder={label} />
        ): email ? (
            <Input onChange={(e) => onChange(e.target.value)} type="email" id={label} placeholder={label} />
        ): textarea ? (
            <textarea className="border px-3 py-2 rounded-lg" style={{resize: "none"}} rows={3} onChange={(e) => onChange(e.target.value)} id={label} placeholder={label} />
        ) : (
            <Input className="w-full" onChange={(e) => onChange(e.target.value)} type="text" id={label} placeholder={label} />
        )}
    </div>
  )
}