import parse from 'parse-link-header';
import { User } from '../store/users/types';

const BASE_URL: string = 'https://api.github.com';
const USERS_PATH: string = '/users';
const USERS_PER_PAGE: number = 30; //determined by github

export interface IGithubAPIUsersResponse {
  users: User[];
  pagePrevUserId: string;
  pageNextUserId: string;
}

const calcPrevUsersPage = function (pageNextUserId: string): string{

  const pageNextUserIdNum =  parseInt(pageNextUserId);
  if( isNaN(pageNextUserIdNum) || ((pageNextUserIdNum - USERS_PER_PAGE) <= 0 )) return '';
  
  // even if the resulting id doesn't not exist, 
  // as long as its over '0', github is smart enough
  // to start its results from the next existing one
  return (pageNextUserIdNum - USERS_PER_PAGE).toString();
}

export async function callGithubApiUsers(
  since: string = ''
): Promise<IGithubAPIUsersResponse> {
  // check if we need to start from specific user
  const query = since === '' ? '' : `?since=${since}`;

  const res = await fetch(`${BASE_URL}${USERS_PATH}${query}`, {
    headers: {
      Accept: 'application/vnd.github.v3+json'
    }
  });

  if (!res.ok) {
    throw Error(res.statusText);
  }

  const users: User[] = await res.json();

  // "link "header contains the user id of the next (we care)
  // and the first (we currently don't care) page
  let pageNextUserId: string = '';
  const linkHeader = res.headers.get('link') || '';
  const parseResults = parse(linkHeader);

  if (parseResults && parseResults.next && parseResults.next.since) {
    pageNextUserId = parseResults.next.since;
  }

  const pagePrevUserId = calcPrevUsersPage(pageNextUserId);

  return {
    users,
    pageNextUserId,
    pagePrevUserId
  };
}

export async function callGithubApiUser(
  login: string = ''
): Promise<User> {

  const res = await fetch(`${BASE_URL}${USERS_PATH}/${login}`, {
    headers: {
      Accept: 'application/vnd.github.v3+json'
    }
  });

  if (!res.ok) {
    throw Error(res.statusText);
  }

  const user: User = await res.json();

  return user;
}
