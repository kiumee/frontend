import React, {useEffect} from "react";
import {HashRouter, Route, Switch, Redirect, useHistory} from "react-router-dom";

// components
import Layout from "./Layout";

// pages
import Error from "../pages/error";
import Login from "../pages/login";

// context
import {useUserDispatch, useUserState} from "../context/UserContext";
import {QueryClient, QueryClientProvider} from "react-query";
import {SimpleBackdrop} from './BackDrop/BackDrop'
import {RecoilRoot} from 'recoil';


const queryClient = new QueryClient();

export default function App() {
  // global
  var { isAuthenticated } = useUserState();

  return (
      <QueryClientProvider client={queryClient}> {/* QueryClientProvider 추가 */}
          <RecoilRoot>
              <SimpleBackdrop /> {/* 백드랍 컴포넌트 추가 */}
            <HashRouter>
              <Switch>
                <Route exact path="/" render={() => <Redirect to="/app/dashboard" />} />
                <Route
                  exact
                  path="/app"
                  render={() => <Redirect to="/app/dashboard" />}
                />
                <PrivateRoute path="/app" component={Layout} />
                {/*<PrivateRoute path="/selectCompany" component={SelectCompany} />*/}
                <PublicRoute path="/login" component={Login} />
                <Route component={Error} />
              </Switch>
            </HashRouter>
          </RecoilRoot>
      </QueryClientProvider>
  );

  function PrivateRoute({ component, ...rest }) {
      const userDispatch = useUserDispatch();
      const history = useHistory();
      const company_id = localStorage.getItem("company_id")
      useEffect(() => {
          if (!company_id) {
              userDispatch({ type: "SIGN_OUT_SUCCESS" });
              history.push("/login"); // 렌더링 후 리디렉션
          }
      }, [company_id, userDispatch, history]); // `userDispatch`와 `history`를 의존성 배열에 추가
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            React.createElement(component, props)
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          )
        }
      />
    );
  }

  function PublicRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          ) : (
            React.createElement(component, props)
          )
        }
      />
    );
  }
}
