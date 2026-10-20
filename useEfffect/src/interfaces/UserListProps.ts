
import type { UserProps } from "./UserProps"
import type { Action } from "../types/Action"
import type { Dispatch } from "react"

export interface UserListProps {
  users : UserProps[],
  dispatch: Dispatch<Action>
}