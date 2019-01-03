import parse from 'parse-link-header';
import { User } from '../store/users/types';

const BASE_URL: string = 'https://api.github.com';
const USERS_PATH: string = '/users';
const USERS_PER_PAGE: number = 30; //determined by github

export interface IGithubAPIUsersResponse {
  users: User[];
  since: string,
  pagePrevUserId: string;
  pageNextUserId: string;
}

// github doesn't provide a `previous` page link. Since we display
// 30 users per page we just ask for the id of the first user -30.
// Of course this doesn't guarantee that we will get 30 users that
// are different from the current ones being displayed since there
// are ids that are missing.
const calcPrevUsersPage = function (firstUserId: number): string{

  if((firstUserId - USERS_PER_PAGE) <= 0 ) return '';
  
  // even if the resulting id doesn't not exist, 
  // as long as its over '0', github is smart enough
  // to start its results from the next existing one
  return (firstUserId - USERS_PER_PAGE).toString();
}

export async function callGithubApiUsers(
  since: string = ''
): Promise<IGithubAPIUsersResponse> {
  // check if we need to start from specific user
  const query = since === '' ? '' : `?since=${since}`;

  const url = `${BASE_URL}${USERS_PATH}${query}`;

  const res = await fetch(url, {
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
  let pagePrevUserId: string = '';
  const linkHeader = res.headers.get('link') || '';
  const parseResults = parse(linkHeader);

  if (parseResults && parseResults.next && parseResults.next.since) {
    pageNextUserId = parseResults.next.since;
  }


  if(users[0]){
    pagePrevUserId = calcPrevUsersPage(users[0].id);
  }

  return {
    users,
    since,
    pageNextUserId,
    pagePrevUserId
  };
}

export async function callGithubApiUser(
  login: string = ''
): Promise<User> {
  const url = `${BASE_URL}${USERS_PATH}/${login}`;
  
  const res = await fetch(url, {
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
