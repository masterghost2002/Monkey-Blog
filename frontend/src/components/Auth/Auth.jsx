import React, { useEffect, useCallback, useReducer} from 'react';
import { INITIAL_STATE, authReducer } from '../ComponentSates/AuthStates';
import { CustomToast } from '../Reponses/Toast';
import { useDispatch} from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthContainer from './AuthComponents/AuthContainer';
import { AUTH_TOKEN } from '../BackendResponses/backendRequest';
import { authActions } from '../../Store';
import { verifyAccessPath } from '../Routes/routeValidator';
export default function Auth() {
    // router dom and server
    const [state, dispatchState] = useReducer(authReducer, INITIAL_STATE);
    const AUTH_ACCESS_TOKEN = localStorage.getItem('auth_access_token');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    //auth form states

    const { addToast } = CustomToast();

    const verify_access_token = useCallback(async () => {
        dispatch(authActions.setLogoSplash());
        const response = await AUTH_TOKEN();
        if (response.status === 404 ) {
            dispatch(authActions.logout());
            dispatch(authActions.setLogoSplash());
            navigate('/');
            return;
        }
        dispatch(authActions.login([response.data.user._id, response.data.user.name]));
        dispatch(authActions.setLogoSplash());
        if(verifyAccessPath(location.pathname)){
            switch(location.pathname)
            {
                case '/':
                    navigate('/blogs');
                    break;
                default:
                    navigate(location.pathname);
                    break;
            }
        }
        else navigate('/notfound');
    }, [dispatch, location.pathname, navigate]);


    useEffect(() => {
        if(AUTH_ACCESS_TOKEN !== null)
            verify_access_token();
        return;
    }, [verify_access_token, AUTH_ACCESS_TOKEN]);
    return (
        <AuthContainer addToast={addToast} navigate={navigate} dispatch={dispatch} dispatchState= {dispatchState} state = {state} />
    )
};