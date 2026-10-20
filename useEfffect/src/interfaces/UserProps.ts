import type { Dispatch } from "react";
import type { Action } from "../types/Action";

export interface UserProps {
  id : number,
  firstName : string,
  age: number,
  gender : 'male' | 'female',
  phone : string,
}

export interface SingleUserProps {
  user: UserProps
  dispatch: Dispatch<Action>
}