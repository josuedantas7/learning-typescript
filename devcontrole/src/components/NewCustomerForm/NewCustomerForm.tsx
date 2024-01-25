'use client'
import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

import { useForm } from 'react-hook-form'

import { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'

import { api } from '@/lib/api'

import { useRouter } from 'next/navigation'
import Notification from '../Notifier/Notification'
import { revalidatePath } from 'next/cache'

type CreateuserFormData = z.infer<typeof createUserFormSchema>

interface UserProps{
    name: string;
    tel: string;
    email: string;
    address?: string;
}

const createUserFormSchema = z.object({
    name: z.string().min(1, 'Campo nome não pode ser vazio').transform(name => {
        return name.trim().split(' ').map(word => word[0].toUpperCase().concat(word.slice(1))).join(' ')
    }),
    email: z.string().email('Email inválido').min(1, 'Campo email não pode ser vazio'),
    tel: z.string().refine((value) => {
      return /^(?:\(\d{2}\)\s?)?\d{9}$/.test(value) || /^\d{2}\s\d{9}$/.test(value) || /^\d{11}$/.test(value)
    }, {
      message: "O numero de telefone deve estar (DD) 999999999"
    }),
    address: z.string()
})

const NewCustomerForm = ( {userId}:  { userId : string}) => {

    const { 
        register, 
        handleSubmit, 
        formState: { errors } } = useForm<CreateuserFormData>({
        resolver: zodResolver(createUserFormSchema)
      })

    const router = useRouter()


    async function onSubmit(data : UserProps){
        try {
            await api.post('/api/customer', {
                name: data.name,
                phone: data.tel,
                email: data.email,
                address: data.address,
                userId: userId
            })
            Notification('success', 'Cliente cadastrado com sucesso')
            router.replace('/dashboard/customer')
            router.refresh()
        }catch{
            Notification('error', 'Erro ao cadastrar cliente')
        }
    }


  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col gap-4 mt-8'>
        <div className="w-full items-center gap-1.5">
            <Label htmlFor="name">Nome completo</Label>
            <Input {...register('name')} type="text" id="name" placeholder="Digite o nome..." />
            {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
        </div>
        <div className='flex gap-3'>
            <div className="w-full items-center gap-1.5">
                <Label htmlFor="tel">Telefone</Label>
                <Input {...register('tel')} type="text" id="tel" placeholder="Exemplo: (94) 984231330" />
                {errors.tel && <p className='text-red-500'>{errors.tel.message}</p>}
            </div>
            <div className="w-full items-center gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input {...register('email')} type="email" id="email" placeholder="Email" />
                {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
            </div>
        </div>
        <div className="w-full items-center gap-1.5">
            <Label htmlFor="endereco">Endereço</Label>
            <Input {...register('address')} type="text" id="endereco" placeholder="Digite o endereço do cliente" />
            {errors.address && <p className='text-red-500'>{errors.address.message}</p>}
        </div>
        <Button type='submit' className="w-full mt-4">Cadastrar cliente</Button>
    </form>
  )
}

export default NewCustomerForm
