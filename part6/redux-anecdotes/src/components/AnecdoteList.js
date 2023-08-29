import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, vote }) => {
  return (
    <div key={anecdote.id}>
      <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
    </div>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(addVote(id))
  }

  return (
    <div>
      {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <Anecdote anecdote={anecdote} vote={vote} />
      )}
    </div>
  )
}

export default AnecdoteList