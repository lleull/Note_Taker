import React, { ChangeEvent, useState } from 'react'
import './CustomInput.css'

interface NewNoteInput {
  addNote(note: string): string
}

const CustomInput: React.FC<NewNoteInput> = ({ addNote }) => {
  const [note, setnote] = useState('')

  const updateNote = (e: ChangeEvent<HTMLInputElement>) => {
    setnote(e.target.value)
  }

  const addNoteHandler = () => {
    addNote(note)
    setnote('')
  }
  return (
    <>
      <div>
        <h1>Vite React</h1>
        <div className="box">
          <input
            onChange={(e) => updateNote(e)}
            type="text"
            value={note}
            name="note"
            placeholder="note"
            className="input"
          />
          <button
            style={{
              background: 'red',
              borderRadius: '20px',
              padding: '10px',
            }}
            onClick={addNoteHandler}
          >
            Add Note
          </button>
        </div>
      </div>
    </>
  )
}

export default CustomInput
