import React, { ChangeEvent, useState } from 'react'
import './CustomInput.css'
import plusicon from './../assets/plus.png'
import { arrayUnion, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { useSelector } from 'react-redux'
import { db } from '../lib/firebase'
interface NewNoteInput {
  removeBox: any
}

const CustomInput: React.FC<NewNoteInput> = ({ removeBox }) => {
  const [note, setnote] = useState('')
  const [title, setTitle] = useState('')
  const userinfo = useSelector((state) => state?.userData)

  const updateNote = (e: ChangeEvent<HTMLInputElement>) => {
    setnote(e.target.value)
  }
  const updateTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleLogin = async () => {
    try {
      const userRef = doc(db, 'users', userinfo?.id)
      await updateDoc(userRef, {
        notes: arrayUnion({
          title,
          note,
        }),
      })
      removeBox()
    } catch (error) {
      console.log('err', error)
    }
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
          <button className="btn" onClick={handleLogin}>
            Add Note
            <img src={plusicon} alt="s" className="addbtn" />
          </button>
        </div>
      </div>
    </>
  )
}

export default CustomInput
