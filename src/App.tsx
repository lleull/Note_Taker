import { useEffect, useState } from 'react'
import './App.css'
import editIcon from './assets/editing.png'
import deleteIcon from './assets/delete.png'
import plusIcon from './assets/plus.png'
import CustomInput from './components/custominput/InputComponent'
// import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import Login from './components/login/login'
import NoteBox from './components/notebox'
import { collection, doc, onSnapshot } from 'firebase/firestore'
import { auth, db } from './lib/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useDispatch } from 'react-redux'
function App() {
  const [addNoteInputs, setaddNoteInputs] = useState(false)
  const [search, setSearch] = useState('')
  const [loading, setloading] = useState(false)
  const [filteredNote, setFilteredNote] = useState([])
  const showAddForm = () => setaddNoteInputs(!addNoteInputs)
  const userData = useSelector((state) => state.userData)
  const dispatch = useDispatch()
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setloading(true)
        const userDocRef = doc(db, 'users', user.uid)
        const unsubscribeUser = onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data()
            console.log('Datenneea', data)
            dispatch({
              type: 'LOGIN_USER',
              payload: data,
            })
          } else {
            console.log('nNOOO DOAOT')
          }
        })

        return () => unsubscribeUser()
        setloading(false)
      } else {
        console.log('NULL')
      }
    })

    return () => unsubscribe()
  }, [])

  // Unsubscribe from the listener when the component unmounts

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
  const handleToogle = () => setaddNoteInputs(!addNoteInputs)
  return (
    <>
      {!loading ? (
        <div className="wrapload">
          <h1 className="load">Loading</h1>
        </div>
      ) : userData.id ? (
        <div className="mainApp">
          {addNoteInputs && <CustomInput toggleNoteBox={handleToogle} />}
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
                  ? filteredNote?.map((note) => <NoteBox data={note} />)
                  : userData?.notes.map((note) => <NoteBox data={note} />)}
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
