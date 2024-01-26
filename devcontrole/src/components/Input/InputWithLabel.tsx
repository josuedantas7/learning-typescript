import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface InputWithLabelProps {
    label?: string
    register?: any
    field: string
    password?: boolean
    email?: boolean
    textarea?: boolean
}

export function InputWithLabel({label,field,password,email,textarea} : InputWithLabelProps) {
  return (
    <div className="flex flex-col w-full gap-3">
      <Label htmlFor={label}>{label}</Label>
      {password ? (
          <Input name={field} type="password" id={label} placeholder={label} />
        ): email ? (
            <Input name={field} type="email" id={label} placeholder={label} />
        ): textarea ? (
            <textarea name={field} className="border px-3 py-2 rounded-lg" style={{resize: "none"}} rows={3} id={label} placeholder={label} />
        ) : (
            <Input name={field} className="w-full" type="text" id={label} placeholder={label} />
        )}
    </div>
  )
}