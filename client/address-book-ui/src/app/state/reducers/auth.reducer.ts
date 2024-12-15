import {createReducer, on} from '@ngrx/store';

import {AppState} from '../../models/app-state';
import * as AuthActions from '../actions/auth.actions';

const defaultState: AppState = {
    isUserLoggedIn: false,
}

export const authReducer = createReducer(
    defaultState,
    on(AuthActions.logInAction, state => ({...state, isUserLoggedIn: true})),
    on(AuthActions.logOutAction, state => ({...state, isUserLoggedIn: false})),
)
