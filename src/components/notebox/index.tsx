import React from 'react'
import './notebox.css'
import editIcon from '../../assets/editing.png'
import deleteIcon from '../../assets/delete.png'
import { arrayRemove, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import { useSelector } from 'react-redux'
const NoteBox = ({ data }: any) => {
  const userinfo = useSelector((state) => state.userData)

  const handleDeleteNote = async (title) => {
    try {
      console.log('title', title)
      const userRef = doc(db, 'users', userinfo?.id)
      await updateDoc(userRef, {
        notes: arrayRemove({
          title: title,
        }),
      })
      console.log('SUCCESSUFL')
    } catch (error) {
      console.log('err', error)
    }
  }

  return (
    <div key={data?.title} className="notebox">
      <h2 className="boxtitle">{data?.title}</h2>
      <div className="wrapLines">
        {[1, 2, 3, 4, 5, 6, 7].map((it, i) => (
          <div key={i} className="lines" />
        ))}
      </div>
      <p className="boxnote">{data?.note}</p>
      <div className="Edits">
        <img src={editIcon} alt="s" className="editbtn" />
        <img
          onClick={() => handleDeleteNote(data?.title)}
          src={deleteIcon}
          // onClick={deleteAll(note?.title)}
          alt="s"
          className="editbtn"
        />
      </div>
    </div>
  )
}

export default NoteBox
