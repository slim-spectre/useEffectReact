import { useContext, useState } from 'react'
import type { SingleUserProps } from '../interfaces/UserProps'
import { ThemeContext } from '../utils/ThemeContext'



export const User = ({ user, dispatch }: SingleUserProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    age: user.age,
    gender: user.gender,
    phone: user.phone,
  })
  const theme = useContext(ThemeContext);

  const handleSave = () => {
    dispatch({
      type: 'update_user',
      payload: { id: user.id, ...formData },
    })
    setIsEditing(false)
  }

  return (
    <div className={`flex flex-col gap-2 ${theme == 'light' ? 'bg-amber-400' : 'bg-gray-900'} text-white  rounded-2xl p-4 w-64 shadow-md`}>
      {isEditing ? (
        <>
          <p className="font-bold">ID: {user.id}</p>  
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="p-1.5 rounded-lg bg-amber-100 border border-amber-600 text-sm"
            placeholder="First Name"
          />
          <input
            type="number"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
            className="p-1.5 rounded-lg bg-amber-100 border border-amber-600 text-sm"
            placeholder="Age"
          />
          <input
            type="text"
            value={formData.gender}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'male' | 'female' })}
            className="p-1.5 rounded-lg bg-amber-100 border border-amber-600 text-sm"
            placeholder="Gender"
          />
          <input
            type="text"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="p-1.5 rounded-lg bg-amber-100 border border-amber-600 text-sm"
            placeholder="Phone"
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleSave}
              className="flex-1 bg-green-700 text-white rounded-xl p-2 text-sm font-semibold hover:bg-green-800 cursor-pointer border-none"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="flex-1 bg-gray-600 text-white rounded-xl p-2 text-sm font-semibold hover:bg-gray-700 cursor-pointer border-none"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="font-bold">Id : {user.id}</p>
          <p>First name : {user.firstName}</p>
          <p>Age : {user.age}</p>
          <p>Gender : {user.gender}</p>
          <p>Phone : {user.phone}</p>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => setIsEditing(true)}
              className="flex-1 bg-amber-800 text-white rounded-xl p-2 text-sm font-semibold hover:bg-amber-900 cursor-pointer border-none"
            >
              Update
            </button>
            <button
              onClick={() => dispatch({ type: 'delete_user', payload: user.id })}
              className="flex-1 bg-red-600 text-white rounded-xl p-2 text-sm font-semibold hover:bg-red-700 cursor-pointer border-none"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  )
}