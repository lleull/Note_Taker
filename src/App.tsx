import './App.css'
import CustomInput from './components/InputComponent'

function App() {

  return (
    <>
      <div className='mainApp'>
        {/* <h1>Vite React</h1> */}
        <CustomInput addNote={alert} />
      </div>
    </>
  )
}

export default App
