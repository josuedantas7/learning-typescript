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
    name: string;
    clients: ClientesProps[]
}

interface ClientesProps{
  id: string
  name: string
}

export default function SelectComponent({name,field, clients} : SelectComponentProps) {

  return (
    <Select name={name} >
      <Label htmlFor={field}>{field}</Label>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={field} />
      </SelectTrigger>
      <SelectContent className="w-full">
        <SelectGroup>
          {
            clients.map((client) => (
                <SelectItem key={client.name} value={client.id}>
                    <SelectLabel>{client.name}</SelectLabel>
                </SelectItem>
            ))
          }
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
