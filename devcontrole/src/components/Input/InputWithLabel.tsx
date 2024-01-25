import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface InputWithLabelProps {
    label: string
    register: any
    field: string
    password?: boolean
    email?: boolean
    textarea?: boolean
}

export function InputWithLabel({label,register,field,password,email,textarea} : InputWithLabelProps) {
  return (
    <div className="flex flex-col w-full gap-3">
      <Label htmlFor={label}>{label}</Label>
      {password ? (
          <Input {...register(field)} type="password" id={label} placeholder={label} />
        ): email ? (
            <Input {...register(field)} type="email" id={label} placeholder={label} />
        ): textarea ? (
            <textarea className="border px-3 py-2 rounded-lg" style={{resize: "none"}} rows={3} {...register(field)} id={label} placeholder={label} />
        ) : (
            <Input className="w-full" {...register(field)} type="text" id={label} placeholder={label} />
        )}
    </div>
  )
}