'use strict'
import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { signup as signupAction } from '../../actions/userActions'

class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      status: true,
      message: ''
    }
  }

  onSignup = e => {
    e.preventDefault()
    const username = this.refs.username.value
    const password = this.refs.password.value
    const confirmPassword = this.refs.confirmPassword.value
    const user = { username, password }
    this.props.signup(user, confirmPassword)
  }

  render() {
    const alertClass = this.props.status
      ? 'alert alert-success'
      : 'alert alert-danger'
    const message = this.props.message
    return (
      <Fragment>
        <section>
          <div className="container mt-5">
            <div className="row">
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 mx-auto">
                <div id="signin-widget" className="card mx-auto">
                  <div className="card-header text-center">
                    <h4>Leaderboard System</h4>
                  </div>
                  <div className="card-body">
                    {message ? (
                      <div className={alertClass} role="alert">
                        {message}
                      </div>
                    ) : (
                      ''
                    )}
                    <form onSubmit={this.onSignup}>
                      <div className="form-group">
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <button
                              tabIndex="-1"
                              className="btn btn-outline-secondary"
                              type="button"
                            >
                              <i className="fas fa-user" />
                            </button>
                          </div>
                          <input
                            type="text"
                            ref="username"
                            className="form-control"
                            placeholder="Username"
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <button
                              tabIndex="-1"
                              className="btn btn-outline-secondary"
                              type="button"
                            >
                              <i className="fas fa-lock" />
                            </button>
                          </div>
                          <input
                            type="password"
                            ref="password"
                            className="form-control"
                            placeholder="Password"
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <button
                              tabIndex="-1"
                              className="btn btn-outline-secondary"
                              type="button"
                            >
                              <i className="fas fa-lock" />
                            </button>
                          </div>
                          <input
                            type="password"
                            ref="confirmPassword"
                            className="form-control"
                            placeholder="Confirm password"
                          />
                        </div>
                      </div>
                      <input
                        type="submit"
                        value="Sign Up"
                        className="btn btn-secondary btn-block"
                      />
                    </form>
                  </div>
                  {/* end of card-body */}
                  <div className="card-footer text-right">
                    Already have an account? <a href="/signin">Sign in</a>
                  </div>
                </div>
                {/* end of card */}
              </div>
            </div>
          </div>
        </section>
        {/* end of signin */}
      </Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    ...state.user
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      signup: signupAction
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup)
