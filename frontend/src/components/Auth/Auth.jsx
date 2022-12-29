import React, {useReducer} from 'react';
import { INITIAL_STATE, authReducer } from '../ComponentSates/AuthStates';
import { CustomToast } from '../Reponses/Toast';
import { useDispatch} from 'react-redux';
import { useNavigate} from 'react-router-dom';
import AuthContainer from './AuthComponents/AuthContainer';
export default function Auth() {
    // router dom and server
    const [state, dispatchState] = useReducer(authReducer, INITIAL_STATE);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //auth form states

    const { addToast } = CustomToast();

    return (
        <AuthContainer addToast={addToast} navigate={navigate} dispatch={dispatch} dispatchState= {dispatchState} state = {state} />
    )
};