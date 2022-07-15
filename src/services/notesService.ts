import { notes } from "@prisma/client"

import { notesRepository } from "../repositories/notesRepository.js"
import { createNewNote } from "../utils/createNewNote.js"
import { ensureNoteTitleIsNotDuplicate } from "../utils/ensureNoteTitleIsNotDuplicate.js"

export type notesData = Omit<notes, "id" | "userId">

async function createNote(body: notesData, userId: number) {
    ensureNoteTitleIsNotDuplicate(body.title, userId)
    createNewNote(body, userId)
}

async function returnAllNotes(userId: number) {
    const notes = await notesRepository.returnAllNotes(userId)
    notes.map((cred) => {
        delete cred.id
        delete cred.userId
    })

    return notes
}

export const notesService = {
    createNote,
    returnAllNotes,
}
