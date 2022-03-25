import React, {useRef} from 'react'
import { Login } from '../components/Login'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../utils/firebase'


export const SignIn = () => {

    const emailRef = useRef()
    const passwordRef = useRef()

    const login = async () => {
      try{
          await signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
          .then((response)=> {
            if(response) {
               window.location = './dashboard'
            }
          })

      }
      
      catch(error) {
        alert(error.message)
      }
    }

  return (
    <div>
        <Login 
            title='Sign In'
            button='Sign In'
            href='/signup'
            link='Sign Up'
            headerStatement='Need an account?'
            emailInput={emailRef}
            passwordInput={passwordRef}
            btnFunction={login}
        />
    </div>
  )
}
