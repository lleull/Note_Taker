import React from 'react'
import './notebox.css'
import editIcon from "../../assets/editing.png"
import deleteIcon from '../../assets/delete.png'
const NoteBox = ({ data }: any) => {
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
