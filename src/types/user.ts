export interface User {
  id: number
  firstName: string
  lastName: string
  birthDate: string
}

export interface UserState {
  users: User[]
  searchQuery: string
}
