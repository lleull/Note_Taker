import { useState } from 'react'
import './App.css'
import editIcon from './assets/editing.png'
import deleteIcon from './assets/delete.png'
import plusIcon from './assets/plus.png'
import CustomInput from './components/InputComponent'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
function App() {
  const [addNoteInputs, setaddNoteInputs] = useState(false)
  const [search, setSearch] = useState('')
  const showAddForm = () => setaddNoteInputs(!addNoteInputs)
  const notes = useSelector((state) => state.notes)
  const dispatch = useDispatch()
  const handleAddNotes = (notes) => {
    dispatch({
      type: 'ADD_NOTE',
      payload: notes,
    })
    setaddNoteInputs(!addNoteInputs)
  }
  const updateSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  return (
    <>
      <div className="mainApp">
        {addNoteInputs && <CustomInput addNote={handleAddNotes} />}
        <div className="boxWrapper">
          <div className="sidebar">
            <h2 className="Title">Docker</h2>
            <div className="wrapicon">
              <img onClick={showAddForm} src={plusIcon} alt="s" className="addIcon" />
              {[1, 2, 3, 4, 5].map((it, i) => (
                <div key={i} className="bub" />
              ))}
            </div>
          </div>
          <div className="notewrap">
            <input
              type="text"
              placeholder="search"
              name="search"
              value={search}
              className="searchinput"
            />
            <h2 className="noteTitle">Notes</h2>
            <div className="sectionnote">
              {notes.length &&
                notes.map((it, i) => (
                  <div key={i} className="notebox">
                    <h2 className="boxtitle">{it?.title}</h2>
                    <div className="wrapLines">
                      {[1, 2, 3, 4, 5, 6, 7].map((it, i) => (
                        <div key={i} className="lines" />
                      ))}
                    </div>
                    <p className="boxnote">{it?.note}</p>
                    <div className="Edits">
                      <img src={editIcon} alt="s" className="editbtn" />
                      <img
                        src={deleteIcon}
                        alt="s"
                        className="editbtn"
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
