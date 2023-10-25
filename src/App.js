import React, { Component, Suspense, useEffect, useState } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import { AuthService } from './services/auth.service'
import TokenService from './services/TokenService'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
const OrganizersPage = React.lazy(() => import('./views/pages/main/orginizers/OrganizersPage'))
const VotersPage = React.lazy(() => import('./views/pages/main/voters/VotersPage'))
const ReportsPage = React.lazy(() => import('./views/pages/main/reports/ReportsPage'))

function App() {
  const [userLogin, setUserLogin] = useState(false)

  useEffect(() => {
    const user = TokenService.getUser()
    console.log(user)

    if (user) {
      setUserLogin(true)
    } else {
      logOut()
    }
  }, [])

  const logOut = () => {
    AuthService.logout()
    setUserLogin(false)
    // change status
  }


  return (
    <HashRouter>
      <Suspense fallback={loading}>
        <Routes>
          {/* <Route exact path="/login" name="Login Page" element={<Login />} /> */}
          <Route
            exact
            path="/register"
            name="Register Page"
            element={userLogin ? <Register /> : <Login />}
          />
          <Route
            exact
            path="/#/organizers"
            name="Login Page"
            element={userLogin ? <OrganizersPage /> : <Login />}
          />
          <Route
            exact
            path="/#/voters"
            name="Login Page"
            element={userLogin ? <VotersPage /> : <Login />}
          />
          <Route
            exact
            path="/#/reports"
            name="Reports Page"
            element={userLogin ? <ReportsPage /> : <Login />}
          />
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />
          <Route path="*" name="Dashboard" element={userLogin ? <DefaultLayout /> : <Login />} />
        </Routes>
      </Suspense>
    </HashRouter>
  )
}

export default App
