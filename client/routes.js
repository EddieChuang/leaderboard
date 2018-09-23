'use strict'
import React from 'react'
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom'
import { Signin, Signup } from './components/pages'
import Home from './components/pages/Home'
// import StudentExercise from './components/pages/StudentExercise'
// import StudentHomework from './components/pages/StudentHomework'
// import StudentAttendance from './components/pages/StudentAttendance'
// import InstructorExercise from './components/pages/InstructorExercise'

import auth from './utils/auth'

const routes = (
  <BrowserRouter>
    <Switch>
      <Route
        exact
        path="/"
        render={() =>
          auth.signined() ? <Redirect to="/home" /> : <Redirect to="/signin" />
        }
      />
      <Route
        exact
        path="/signin"
        render={() => (auth.signined() ? <Redirect to="/home" /> : <Signin />)}
      />
      <Route exact path="/signup" render={() => <Signup />} />
      <Route
        exact
        path="/home"
        render={() => (auth.signined() ? <Home /> : <Redirect to="/signin" />)}
      />
      {/* <Route
        exact
        path="/exercise"
        render={() => {
          if (!auth.signined()) {
            return <Redirect to="/signin" />
          } else if (auth.isStudent()) {
            return <StudentExercise />
          } else if (auth.isInstructor()) {
            return <InstructorExercise />
          }
        }}
      />
      <Route
        exact
        path="/homework"
        render={() => {
          if (!auth.signined()) {
            return <Redirect to="/signin" />
          } else if (auth.isStudent()) {
            return <StudentHomework />
          } else if (auth.isInstructor()) {
            return <div />
          }
        }}
      />
      <Route
        exact
        path="/attendance"
        render={() => {
          if (!auth.signined()) {
            return <Redirect to="/signin" />
          } else if (auth.isStudent()) {
            return <StudentAttendance />
          } else if (auth.isInstructor()) {
            return <div />
          }
        }}
      /> */}
      {/* <Route exact path="/start" render={() => <Start />} />
      <Route exact path="/signup" render={() => <SignUp />} />
      <Route
        exact
        path="/signin"
        render={() =>
          auth.signined() ? (
            <Redirect to={`/home/${auth.getUser()._id}`} />
          ) : (
            <SignIn />
          )
        }
      />
      <Route
        exact
        path="/home/:userId"
        render={({ match }) =>
          auth.signined() ? (
            <Home userId={match.params.userId} />
          ) : (
            <Redirect to="/signin" />
          )
        }
      /> */}
    </Switch>
  </BrowserRouter>
)

export default routes
