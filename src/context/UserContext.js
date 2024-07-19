import React from "react";

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

// function userReducer(state, action) {
//   switch (action.type) {
//     case "LOGIN_SUCCESS":
//       return { ...state, isAuthenticated: true };
//     case "SIGN_OUT_SUCCESS":
//       return { ...state, isAuthenticated: false };
//     default: {
//       throw new Error(`Unhandled action type: ${action.type}`);
//     }
//   }
// }

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  // 여기서 isAuthenticated 를 체크합니다.
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("id_token"),
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut };

// ###########################################################

function loginUser(dispatch, login, password, history, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);
  // todo: 로그인 API 전달 후 정확한 값이 오면 로그인이 되도록 수정.
  if (!!login && !!password) {
    setTimeout(() => {
      localStorage.setItem('id_token', 2)
      setError(null)
      setIsLoading(false)
      dispatch({ type: 'LOGIN_SUCCESS' })

      history.push('/app/dashboard')
    }, 2000);
  } else {
    dispatch({ type: "LOGIN_FAILURE" });
    setError(true);
    setIsLoading(false);
  }
}

function signOut(dispatch, history) {

  // 로그인 토큰 제거
  localStorage.removeItem("id_token");
  // 회사 토큰 제거
  localStorage.removeItem("company_id");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}
