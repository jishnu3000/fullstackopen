import { useMutation, useQueryClient } from "@tanstack/react-query"
import { create } from "../services/requests"
import { useNotifDispatch } from "../NotifContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: create,
    onSuccess: (newAnecdote) => {
      console.log(newAnecdote)
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError: (result) => {
      notifDispatch({ type: 'SET_NOTIF', text: `${result}`})
      setTimeout(() => {
        notifDispatch({ type: 'CLEAR_NOTIF'})
      }, 5000)
    }
  })

  const notifDispatch = useNotifDispatch()

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(content)
    notifDispatch({ type: 'SET_NOTIF', text: `anecdote '${content} 'created`})
    setTimeout(() => {
      notifDispatch({ type: 'CLEAR_NOTIF'})
    }, 5000)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
