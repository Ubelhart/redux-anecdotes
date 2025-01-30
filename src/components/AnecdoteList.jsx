import { useSelector, useDispatch } from 'react-redux'
import { updateAnecdote } from '../reducers/anecdoteReducer'
import { setNotificationWithDelay } from '../reducers/notificationReducer'

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

  const handleClick = (anecdote) => {
    dispatch(updateAnecdote({ ...anecdote, votes: anecdote.votes + 1 }))
    dispatch(setNotificationWithDelay(`you voted '${anecdote.content}'`, 5))
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
              <button onClick={() => handleClick(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  )
}

export default AnecdoteList
