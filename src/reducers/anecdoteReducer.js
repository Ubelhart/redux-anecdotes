import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdocteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote: (state, action) => {
      return state.map((anecdote) => {
        if (anecdote.id === action.payload) {
          return { ...anecdote, votes: anecdote.votes + 1 }
        }
        return anecdote
      })
    },
    setAnecdotes: (state, action) => {
      return action.payload
    },
    appendAnecdote: (state, action) => {
      return [...state, action.payload]
    },
  },
})

export const { vote, appendAnecdote, setAnecdotes } = anecdocteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.create(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const updateAnecdote = (anecdoteToUpdate) => {
  return async (dispatch) => {
    await anecdoteService.update(anecdoteToUpdate)
    dispatch(vote(anecdoteToUpdate.id))
  }
}

export default anecdocteSlice.reducer
