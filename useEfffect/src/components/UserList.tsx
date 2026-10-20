import type { UserListProps } from '../interfaces/UserListProps'
import { User } from './User'

export const UserList = ({ users, dispatch }: UserListProps) => {
  return (
    <div className="flex gap-1 flex-wrap">
      {users.map((user) => (
        <User key={user.id} dispatch={dispatch} user={user} />
      ))}
    </div>
  )
}
