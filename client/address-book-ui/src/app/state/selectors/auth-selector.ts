import {createFeatureSelector, createSelector} from '@ngrx/store';

import {AppState} from '../../models/app-state';

export const selectAuthFeature = createFeatureSelector<AppState>('auth');
export const selectIsUserLoggedIn = createSelector(
    selectAuthFeature,
    (state: AppState) => state.isUserLoggedIn,
);
