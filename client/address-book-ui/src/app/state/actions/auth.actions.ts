import { createAction } from '@ngrx/store';


export const loggedIn = 'Logged In';
export const loggedOut = 'Logged Out';

export const logInAction = createAction(loggedIn);
export const logOutAction = createAction(loggedOut);
