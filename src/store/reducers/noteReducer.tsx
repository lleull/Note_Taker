import { Action } from 'redux'

export interface notetype {
  notes: string[]
}

const initialValue = {
  notes: ['leull'],
}
type addAction = {
  type: 'ADD_NOTE'
  payload: string
}
type editNote = {
  
}
export const noteReducer = (state: notetype = initialValue, action: Action) => {
  switch (action.type) {
    case 'ADD_NOTE': {
      return { ...state, notes: [...state.notes, action.payload] }
    }
    default:
      return state
  }
}
