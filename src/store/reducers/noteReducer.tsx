import { Action } from 'redux'

export interface notetype {
  notes: object[]
}

const initialValue = {
  notes: [
    { title: 'JavaScript', note: 'Learn about variables, functions, and objects.' },
    { title: 'React', note: 'Build user interfaces with JSX.' },
    { title: 'Node.js', note: 'Run JavaScript on the server-side.' },
    { title: 'Python', note: 'Learn about data science and machine learning.' },
    { title: 'SQL', note: 'Work with databases and manage data.' },
  ],
}
type addAction = {
  type: 'ADD_NOTE'
  payload: any
}

type removeAction = {
  type: 'DELETE_NOTE'
  payload: any
}

export const noteReducer = (state: notetype = initialValue, action: Action) => {
  switch (action.type) {
    case 'ADD_NOTE': {
      return { ...state, notes: [...state.notes, action.payload] }
    }
    // case "DELETE_NOTE":{
    //   return{...state, notes:[ state?.notes.filter((items:any) => items.title === action.payload)]}
    // }
    default:
      return state
  }
}
