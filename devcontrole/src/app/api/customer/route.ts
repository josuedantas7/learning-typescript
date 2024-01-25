import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prismaClient from  '@/lib/prisma'

export async function POST(request: Request){
    
    const session = await getServerSession(authOptions)

    if (!session || !session.user){
        return NextResponse.json({ error: 'Unauthorized'}, { status: 401})
    }
    
    const { name, email, phone, address, userId } = await request.json()

    try {
        await prismaClient.customer.create({
            data: {
                name,
                phone,
                email,
                address: address ? address : '',
                userId,
            }
        })

        return NextResponse.json({ success: 'Costumer created'}, { status: 201})
    }catch{
        return NextResponse.json({ error: 'Failed create new costumer'}, { status: 400}) 
    }


}

export async function DELETE(request : Request){
    const session = await getServerSession(authOptions)

    if (!session || !session.user){
        return NextResponse.json({ error: 'Unauthorized'}, { status: 401})
    }

    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("id")

    if (!userId){
        return NextResponse.json({ error: 'User not found'}, { status: 404})
    }

    const findTickets = await prismaClient.ticket.findFirst({
        where: {
            customerId: userId
        }
    })

    if (findTickets){
        return NextResponse.json({ error: 'User has tickets'}, { status: 400})
    }

    try {
        await prismaClient.customer.delete({
            where: {
                id: userId
            }
        })
        return NextResponse.json({ success: 'Costumer deleted'}, { status: 200})
    } catch{
        return NextResponse.json({ error: 'Failed delete costumer'}, { status: 400})
    }
}