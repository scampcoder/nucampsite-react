import * as ActionTypes from './ActionTypes';
import { CAMPSITES } from '../shared/campsites';


export const addComment = (campsiteId, rating, author, text) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        campsiteId: campsiteId,
        rating: rating,
        author: author,
        text: text
    }
});

export const fetchCampsites = () => dispatch => {
    dispatch(campsitesLoading());
    setTimeout(() => {
        dispatch(addCampsites(CAMPSITES));
    }, 2000);
}