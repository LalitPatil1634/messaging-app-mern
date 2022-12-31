import React from 'react'
import './Login.css'
import { auth, provider } from '../firebase'
import { signInWithPopup } from 'firebase/auth'
import { useStateValue } from './StateProvider'
import { actionType } from './reducer'

export const Login = () => {
  const [{ }, dispatch] = useStateValue();

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then(result => {
        dispatch({
          type: actionType.SET_USER,
          user: result.user
        })
      })
      .catch(err => alert(err.message))
  }

  return (
    <div className="login">
      <div className="login_container">
        <img src="logo512.png" alt="whatsapp" />
        <div className="login_text">
          <h1>Sign in to Messaging App</h1>
        </div>
        <button onClick={signIn}>Sign In with Google</button>
      </div>
    </div>
  )
}
