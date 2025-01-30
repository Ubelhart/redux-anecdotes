import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import {
  setNotification,
  clearNotification,
} from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    if (state.filter === 'all') {
      return state.anecdotes
    }
    return state.anecdotes.filter((anecdote) => {
      return anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
    })
  })
  const dispatch = useDispatch()

  const handleClick = (id, content) => {
    dispatch(vote(id))
    dispatch(setNotification(`voted for ${content}`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

  return (
    <div>
      {[...anecdotes]
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button
                onClick={() => handleClick(anecdote.id, anecdote.content)}
              >
                vote
              </button>
            </div>
          </div>
        ))}
    </div>
  )
}

export default AnecdoteList
