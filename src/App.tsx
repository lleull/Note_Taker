import { useEffect, useState } from 'react'
import './App.css'
import editIcon from './assets/editing.png'
import deleteIcon from './assets/delete.png'
import plusIcon from './assets/plus.png'
import CustomInput from './components/InputComponent'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import Login from './components/login/login'
function App() {
  const [addNoteInputs, setaddNoteInputs] = useState(false)
  const [search, setSearch] = useState('')
  const [filteredNote, setFilteredNote] = useState([])
  const showAddForm = () => setaddNoteInputs(!addNoteInputs)
  const userData = useSelector((state) => state.userData)

  useEffect(() => {
    if (search.length > 0) {
      const filterNotes = userData?.notes.filter((data) =>
        data?.title.toLowerCase().includes(search),
      )
      setFilteredNote(filterNotes)
      console.log('filtered', filterNotes)
    } else {
      return
    }
  }, [search])
  console.log('USDUSUDSD', userData)
  return (
    <>
      {userData.id ? (
        <div className="mainApp">
          {addNoteInputs && <CustomInput removeBox={setaddNoteInputs(true)} />}
          <div className="boxWrapper">
            <div className="sidebar">
              <h2 className="Title">{userData?.username}</h2>
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
                onChange={(e) => setSearch(e.target.value)}
                className="searchinput"
              />
              <h2 className="noteTitle">Notes</h2>
              <div className="sectionnote">
                {search.length
                  ? filteredNote?.map((note, i) => (
                      <div key={i} className="notebox">
                        <h2 className="boxtitle">{note?.title}</h2>
                        <div className="wrapLines">
                          {[1, 2, 3, 4, 5, 6, 7].map((it, i) => (
                            <div key={i} className="lines" />
                          ))}
                        </div>
                        <p className="boxnote">{note?.note}</p>
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
                    ))
                  : userData?.notes.map((note, i) => (
                      <div key={i} className="notebox">
                        <h2 className="boxtitle">{note?.title}</h2>
                        <div className="wrapLines">
                          {[1, 2, 3, 4, 5, 6, 7].map((it, i) => (
                            <div key={i} className="lines" />
                          ))}
                        </div>
                        <p className="boxnote">{note?.note}</p>
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
                    ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  )
}

export default App
