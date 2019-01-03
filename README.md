# R3PI Demo

## Thought process
The Github API allows for `30` users per request and only provides pagination links for the next page. To support the previous page functionality we just subtract `30` for the id number of the first of the current users. This can, of course, lead to the new list of users having some overlap with the previous one since some ids do not exist. Some alternatives could be to just allow prev page functionality only to pages that have already been visited during the navigation of the user; or a hybrid solutions where we keep the pagination ids of pages already visited and use the `-30` heuristic for pages that have not been visited.

Regarind the single user info, the full info are provided by github with a query for a single user based on their login. There is info missing when querying for a page of users. This is reflected both in the state (with the optional properties) as well in the app. When clicking on a user icon, or hitting a user URL, we first check if the user exists in our current list of `30` users and if all the info on this user is available. If one or both of this checks fail, we make a `/GET` request to Github to get this user's info. 

The overall Redux state structure is pretty simple. It holds: the list of the current `30` users; previous/next pagination ids; the last id of a successful request to list users (useful to disable the "previous" pagination button); whether or not the page is loading; and finally whether there was an error or not.

The app is organised into two main containers: List (component: `UsersListPage.tsx`) and View (component: `UsersViewPage.tsx`). These two orchestrate various other components for listing user info and UI.

The application is beased on [create-react-app](https://github.com/facebook/create-react-app) uses [material ui react components](https://material-ui.com/) for the tables and buttons.

There are also some pretty basic tests that could definitely be improved :-)