export type ApiResponse = Record<string, any>

export interface User extends ApiResponse{
  login: string,
  id: number,
  node_id: string,
  avatar_url: string,
  gravatar_id: string,
  url: string,
  html_url: string,
  followers_url: string,
  following_url: string,
  gists_url: string,
  starred_url: string,
  subscriptions_url: string,
  organizations_url: string,
  repos_url: string,
  events_url: string,
  received_events_url: string,
  type: string,
  site_admin: boolean,
  // properties after site_admin are available
  // only when requesting a specific user
  name?: string,
  company?: string,
  blog?: string,
  location?: string,
  email?: string | null,
  hireable?: boolean,
  bio?: string,
  public_repos?: number,
  public_gists?: number,
  followers?: number,
  following?: number,
  created_at?: string,
  updated_at?: string
}

export enum UsersActionTypes {
  FETCH_USERS_REQUEST = '@@user/FETCH_USERS_REQUEST',
  FETCH_USERS_SUCCESS = '@@user/FETCH_USERS_SUCCESS',
  FETCH_USERS_ERROR = '@@user/FETCH_USERS_ERROR',
  FETCH_USER_REQUEST = '@@user/FETCH_USER_REQUEST',
  FETCH_USER_SUCCESS = '@@user/FETCH_USER_SUCCESS',
  FETCH_USER_ERROR = '@@user/FETCH_USER_ERROR',
  NO_OP = '@@user/NO_OP'
}

export interface UsersState {
  readonly data: User[],
  readonly loading: boolean,
  readonly error: Error | void,
  pagePrevUserId: string,
  pageNextUserId: string,
}
