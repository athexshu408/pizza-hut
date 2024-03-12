export const LoginStart = (userCredentials)=>({
    type:"LOGING_START"
})

export const LoginSuccess=(user)=>({
    type:"LOGING_SUCCESS",
    payload: user, 
});

export const LoginFailure = ()=>({
    type:"LOGIN_FAILURE"
});

export const Logout = ()=>({
    type:"LOGOUT"
});


