const verifyAccessPath = (accessablePath)=>{
    if(accessablePath.slice(0, 6) === '/blog/')
        return true;
    if(accessablePath.slice(0, 11) === '/updateblog')
        return true;
    switch(accessablePath){
        case '/redirects':
            return true;
        case '/contactus':
            return true;
        case '/aboutus':
            return true;
        case '/':
            return true;
        case '/blogs': 
            return true;
        case '/myblogs':
            return true;
        case '/addblog':
            return true;
        default: return false;
    }
}
const ROUTE_VALIDATOR = (AUTH_ACCESS_TOKEN, accessablePath, navigate, isLoggedIn)=>{
    const isAccessablePath = verifyAccessPath(accessablePath);
    if(AUTH_ACCESS_TOKEN === null && isAccessablePath)
    {
        navigate(accessablePath);
        return;
    }
    if(isLoggedIn && isAccessablePath){
        navigate('/blogs');
        return;
    }
    if(AUTH_ACCESS_TOKEN === null){
        navigate('/');
        return;
    }
    return true;
}
export {ROUTE_VALIDATOR, verifyAccessPath};
