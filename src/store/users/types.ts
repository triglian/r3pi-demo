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
  site_admin: boolean
}

export enum UsersActionTypes {
  FETCH_REQUEST = '@@user/FETCH_REQUEST',
  FETCH_SUCCESS = '@@user/FETCH_SUCCESS',
  FETCH_ERROR = '@@user/FETCH_ERROR'
}

export interface UsersState {
  readonly data: User[],
  readonly loading: boolean,
  readonly error: Error | void,
  pagePrevUserId: number | void,
  pageNextUserId: number | void,
}