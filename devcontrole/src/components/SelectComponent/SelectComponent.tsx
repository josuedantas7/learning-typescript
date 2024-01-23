import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "../ui/label"

interface SelectComponentProps {
    field: string
    clients: string[]
    onChange: (value: string) => void
}

export default function SelectComponent({field, clients, onChange} : SelectComponentProps) {

  return (
    <Select onValueChange={onChange} >
      <Label htmlFor={field}>{field}</Label>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={field} />
      </SelectTrigger>
      <SelectContent className="w-full">
        <SelectGroup>
          {
            clients.map((client) => (
                <SelectItem key={client} value={client}>
                    <SelectLabel>{client}</SelectLabel>
                </SelectItem>
            ))
          }
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
