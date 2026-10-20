import type { UserProps } from "../interfaces/UserProps"

export type Action =
  | { type: 'set_users'; payload: UserProps[] }
  | { type: 'add_user'; payload: UserProps }
  | { type: 'delete_user'; payload: number }
  | { type: 'update_user'; payload: UserProps }