import React, { Suspense, useEffect, useState } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import { AuthService } from './services/auth.service'
import TokenService from './services/TokenService'
import './App.css'

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
const TasksPage = React.lazy(() => import('./views/pages/main/tasks/TasksDashboard'))
const BirthdaysPage = React.lazy(() => import('./views/pages/main/birthdays/BirthdaysPage'))
const ConsumerDashboard = React.lazy(() => import('./views/pages/consumer/Dashboard'))
const ConsumerTasks = React.lazy(() => import('./views/pages/consumer/Tasks'))
const ConsumerTasksTodo = React.lazy(() => import('./views/pages/consumer/TasksTodo'))
const ConsumerTasksCompleted = React.lazy(() => import('./views/pages/consumer/TasksCompleted'))

function App() {
  const [userLogin, setUserLogin] = useState(true)
  const [loggerType, setLoggerType] = useState('')

  useEffect(() => {
    const user = TokenService.getUser()

    if (user?.jwt) {
      setLoggerType('admin')
      setUserLogin(true)
    } else if (user?.token) {
      setLoggerType('organizer')
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
            element={userLogin && loggerType == 'admin' ? <Register /> : <Login />}
          />
          <Route
            exact
            path="/#/organizers"
            name="Login Page"
            element={userLogin && loggerType == 'admin' ? <OrganizersPage /> : <Login />}
          />
          <Route
            exact
            path="/#/voters"
            name="Login Page"
            element={userLogin && loggerType == 'admin' ? <VotersPage /> : <Login />}
          />
          <Route
            exact
            path="/#/tasks"
            name="Tasks Page"
            element={userLogin && loggerType == 'admin' ? <TasksPage /> : <Login />}
          />
          <Route
            exact
            path="/#/reports"
            name="Reports Page"
            element={userLogin && loggerType == 'admin' ? <ReportsPage /> : <Login />}
          />

          <Route
            exact
            path="/#/birthdays"
            name="Birthdays Page"
            element={userLogin && loggerType == 'admin' ? <BirthdaysPage /> : <Login />}
          />
          <Route
            exact
            path="/consumer/dash"
            name="Consumer Dashboard Page"
            element={userLogin && loggerType == 'organizer' ? <ConsumerDashboard /> : <Login />}
          />
          <Route
            exact
            path="/consumer/tasks"
            name="Consumer Tasks Page"
            element={userLogin && loggerType == 'organizer' ? <ConsumerTasks /> : <Login />}
          />
          <Route
            exact
            path="/consumer/tasks/todo"
            name="Consumer Tasks Todo Page"
            element={userLogin && loggerType == 'organizer' ? <ConsumerTasksTodo /> : <Login />}
          />
          <Route
            exact
            path="/consumer/tasks/completed"
            name="Consumer Tasks Completed Page"
            element={userLogin && loggerType == 'organizer' ? <ConsumerTasksCompleted /> : <Login />}
          />
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />
          <Route
            path="*"
            name="Dashboard"
            element={userLogin ? loggerType == 'admin' ? <DefaultLayout /> : <ConsumerDashboard /> : <Login />}
          />
        </Routes>
      </Suspense>
    </HashRouter>
  )
}

export default App
