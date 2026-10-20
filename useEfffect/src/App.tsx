import { useEffect, useReducer, useState, useRef } from 'react'
import './App.css'
import { UserList } from './components/UserList'
import { userReducer } from './utils/userReducer'
import type { UserProps } from './interfaces/UserProps'
import { useDebounce } from './hooks/useDebounce'
import { ThemeContext } from './utils/ThemeContext'

function App() {
  const [users, dispatch] = useReducer(userReducer, [])
  const [theme, setTheme] = useState('light')

  const toggleTheme = () => {
    theme == 'light' ? setTheme('dark') : setTheme('light')
  }

  const [searchTerm, setSearchTerm] = useState(() => {
    const params = new URLSearchParams(window.location.search)
    return params.get('search') || ''
  })

  const debouncedSearch = useDebounce(searchTerm, 300)

  const [newUser, setNewUser] = useState({
    firstName: '',
    age: '',
    gender: '',
    phone: '',
  })

  const nextId = useRef(100)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://dummyjson.com/users')
        if (!response.ok) {
          throw new Error('Not appropriate data')
        }
        const data = await response.json()
        dispatch({ type: 'set_users', payload: data.users })
      } catch (err) {
        console.log(err)
      }
    }

    fetchUsers()
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)

    if (debouncedSearch) {
      params.set('search', debouncedSearch)
    } else {
      params.delete('search')
    }

    const newRelativePathQuery = window.location.pathname + (params.toString() ? `?${params.toString()}` : '')
    window.history.replaceState(null, '', newRelativePathQuery)
  }, [debouncedSearch])

  const filteredUsers = users.filter((user) => {
    const query = debouncedSearch.toLowerCase()
    return (
      user.firstName.toLowerCase().includes(query) ||
      user.gender.toLowerCase().includes(query) ||
      user.phone.toLowerCase().includes(query) ||
      user.age.toString().includes(query)
    )
  })

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newUser.firstName) return

    dispatch({
      type: 'add_user',
      payload: {
        id: nextId.current++,
        firstName: newUser.firstName,
        age: Number(newUser.age) || 0,
        gender: newUser.gender || 'N/A',
        phone: newUser.phone || 'N/A',
      } as UserProps,
    })

    setNewUser({ firstName: '', age: '', gender: '', phone: '' })
  }

  return (
    <ThemeContext value={theme}>
      <div className={`min-h-screen ${theme == 'light' ? "bg-white" : "bg-black"} p-6 flex flex-col items-center gap-6`}>
        <h1 className="text-3xl font-bold text-slate-800">User Management System</h1>

        <div className="w-full max-w-md">
          <input
            type="text"
            placeholder="Search by name, gender, phone or age..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border rounded-2xl bg-white text-black border-slate-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div>
          <button
            className="px-6 py-2 bg-amber-600 text-white font-bold rounded-xl hover:bg-amber-700 cursor-pointer border-none"
            onClick={toggleTheme}
          >
            Change theme
          </button>
        </div>

        <form
          onSubmit={handleAddUser}
          className={`flex flex-wrap gap-2 justify-center ${theme == 'light' ? "bg-white" : "bg-black"} p-4 rounded-2xl shadow-md border border-slate-200`}
        >
          <input
            type="text"
            placeholder="First Name"
            value={newUser.firstName}
            onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
            className="p-2 border rounded-xl bg-slate-50 text-black border-slate-300"
            required
          />
          <input
            type="number"
            placeholder="Age"
            value={newUser.age}
            onChange={(e) => setNewUser({ ...newUser, age: e.target.value })}
            className="p-2 border rounded-xl bg-slate-50 text-black border-slate-300"
          />
          <input
            type="text"
            placeholder="Gender"
            value={newUser.gender}
            onChange={(e) => setNewUser({ ...newUser, gender: e.target.value })}
            className="p-2 border rounded-xl bg-slate-50 text-black border-slate-300"
          />
          <input
            type="text"
            placeholder="Phone"
            value={newUser.phone}
            onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
            className="p-2 border rounded-xl bg-slate-50 text-black border-slate-300"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-amber-600 text-white font-bold rounded-xl hover:bg-amber-700 cursor-pointer border-none"
          >
            Add User
          </button>
        </form>

        <UserList users={filteredUsers} dispatch={dispatch} />
      </div>
    </ThemeContext>
  )
}

export default App
