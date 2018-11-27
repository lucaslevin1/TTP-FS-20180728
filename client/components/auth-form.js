import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {Form, Button, Header} from 'semantic-ui-react'

const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props
  return (
    <React.Fragment>
      <Header as="h2">{displayName}</Header>
      <Form onSubmit={handleSubmit} name={name}>
        <Form.Group widths="equal">
          {name === 'signup' ? (
            <Form.Field>
              <label htmlFor="userName">Name</label>
              <input name="userName" type="text" placeholder="Name" />
            </Form.Field>
          ) : (
            <div className="no-margin" />
          )}
          <Form.Field>
            <label htmlFor="email">Email</label>
            <input name="email" type="text" placeholder="Email" />
          </Form.Field>
          <Form.Field>
            <label htmlFor="password">Password</label>
            <input name="password" type="password" placeholder="Password" />
          </Form.Field>
        </Form.Group>
        <Button type="submit">{displayName}</Button>
        {error && error.response && <div> {error.response.data} </div>}
      </Form>
    </React.Fragment>
  )
}

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      let name = null
      if (formName === 'signup') name = evt.target.userName.value
      dispatch(auth(name, email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
