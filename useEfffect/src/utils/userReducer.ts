import type { UserProps } from "../interfaces/UserProps"
import type { Action } from "../types/Action"

export const userReducer = (state: UserProps[], action: Action): UserProps[] => {
  switch (action.type) {
    case 'set_users':
      return action.payload

    case 'add_user':
      return [...state, action.payload]

    case 'delete_user':
      return state.filter((user) => user.id !== action.payload)

    case 'update_user':
      return state.map((user) => (user.id === action.payload.id ? action.payload : user))

    default:
      return state
  }
}