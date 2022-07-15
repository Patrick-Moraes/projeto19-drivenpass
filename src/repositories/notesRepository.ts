import { client } from "../config/database.js"
import { notesData } from "../services/notesService.js"

async function checkIfTitleIsDuplicate(title: string, userId: number) {
    const exists = await client.notes.findFirst({
        where: {
            userId,
            title,
        },
    })
    return exists
}

async function createNewNote(body: notesData, userId: number) {
    await client.notes.create({
        data: {
            userId,
            title: body.title,
            description: body.description,
        },
    })
}

async function returnAllNotes(userId: number) {
    const allNotes = await client.notes.findMany({
        where: {
            userId,
        },
    })
    return allNotes
}

export const notesRepository = {
    checkIfTitleIsDuplicate,
    createNewNote,
    returnAllNotes,
}
