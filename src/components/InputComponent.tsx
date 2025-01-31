import React, { ChangeEvent, useState } from 'react'
import './CustomInput.css'
import plusicon from './../assets/plus.png'
interface NewNoteInput {
  addNote({note, title}:any): string
}

const CustomInput: React.FC<NewNoteInput> = ({ addNote }) => {
  const [note, setnote] = useState('')
  const [title, setTitle] = useState('')

  const updateNote = (e: ChangeEvent<HTMLInputElement>) => {
    setnote(e.target.value)
  }
  const updateTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }


  const addNoteHandler = () => {
    addNote({
      note: note,
      title: title,
    })
    setTitle(title)
    setTitle('')
    setnote('')
  }
  return (
    <>
      <div className="mainnote">
        {/* <h1>Vite React</h1> */}
        <h1 className="header">Add Note</h1>
        <div className="box">
          <input
            onChange={(e) => updateTitle(e)}
            type="text"
            value={title}
            name="note"
            placeholder="title"
            className="input"
          />
          <input
            onChange={(e) => updateNote(e)}
            type="text"
            value={note}
            name="note"
            placeholder="note"
            className="inputmore"
          />
          <button className="btn" onClick={addNoteHandler}>
            Add Note
            <img src={plusicon} alt="s" className="addbtn" />
          </button>
        </div>
      </div>
    </>
  )
}

export default CustomInput
