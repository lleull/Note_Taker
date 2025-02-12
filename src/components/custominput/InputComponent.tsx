import React, { ChangeEvent, useState } from 'react'
import './CustomInput.css'
import plusicon from './../../assets/plus.png'
import { arrayUnion, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { useSelector } from 'react-redux'
import { db } from '../../lib/firebase'
interface NewNoteInput {
  toggleNoteBox: any
}

const CustomInput: React.FC<NewNoteInput> = ({ toggleNoteBox }) => {
  const [note, setnote] = useState('')
  const [title, setTitle] = useState('')
  const userinfo = useSelector((state) => state?.userData)

  const updateNote = (e: ChangeEvent<HTMLInputElement>) => {
    setnote(e.target.value)
  }
  const updateTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleAddNote = async () => {
    try {
      const userRef = doc(db, 'users', userinfo?.id)
      await updateDoc(userRef, {
        notes: arrayUnion({
          title,
          note,
        }),
      })
      toggleNoteBox()
    } catch (error) {
      console.log('err', error)
    }
  }

  return (
    <>
      <div className="mainnote">
        {/* <h1>Vite React</h1> */}
        <div className="form">
        <h1 className="header">Add Note</h1>
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
            className="input"
          />
          <button className='btn'  onClick={handleAddNote}>
            Add Note
            <img src={plusicon} alt="s" className="addbtn" />
          </button>
        </div>
      </div>
    </>
  )
}

export default CustomInput
