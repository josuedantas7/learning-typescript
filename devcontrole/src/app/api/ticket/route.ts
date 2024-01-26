import { getServerSession } from "next-auth"
import { NextResponse } from 'next/server'
import { authOptions } from "@/lib/auth"
import prismaClient from '@/lib/prisma'

export async function DELETE(request : Request){
    const session = await getServerSession(authOptions)

    if (!session || !session.user){
        return NextResponse.json({ error: 'Unauthorized'}, { status: 401})
    }

    const { searchParams } = new URL(request.url)
    const ticketId = searchParams.get("id")

    if (!ticketId){
        return NextResponse.json({ error: 'Ticket not found'}, { status: 404})
    }

    try {
        await prismaClient.ticket.delete({
            where: {
                id: ticketId
            }
        })
        return NextResponse.json({ success: 'Ticket deleted'}, { status: 200})
    } catch{
        return NextResponse.json({ error: 'Failed delete ticket'}, { status: 400})
    }
}