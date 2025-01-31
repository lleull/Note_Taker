import './App.css'
import CustomInput from './components/InputComponent'
import { useSelector } from 'react-redux'
import { notetype } from './store/reducers/noteReducer'
import { useDispatch } from 'react-redux'
function App() {
  const notes = useSelector<notetype, notetype>((state) => state.notes)
  const dispatch = useDispatch()

  const addNote = (notes: string) => {
    dispatch({ type: 'ADD_NOTE', payload: notes })
  }
  return (
    <>
      <div className="mainApp">
        {/* <h1>Vite React</h1> */}
        <CustomInput addNote={addNote} />

        <div
          style={{
            gap: '10px',
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          {notes.length &&
            notes.map((note, i) => {
              return <h3 key={i}>{note}</h3>
            })}
        </div>
      </div>
    </>
  )
}

export default App
