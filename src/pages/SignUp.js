import React, {useRef} from 'react'
import { Login } from '../components/Login'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import {auth} from '../utils/firebase'
import { setDoc, doc } from 'firebase/firestore'
import db from '../utils/firebase'


export const SignUp = () => {

    const emailRef = useRef()
    const passwordRef = useRef()

    const register = async () => {
        try {
            // create a user with firebase authentication
            await createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
            // add user to the collection
            .then(async (response)=> {
                // create a user document to the users collection
                await setDoc(doc(db, 'users', `${response.user.uid}`),
                {
                    tasks: [
                       
                    ]
                }
                )
                if(response) {
                    window.location = "/dashboard"
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
            title='Sign Up'
            button='Sign Up'
            href='/'
            link='Sign In'
            headerStatement='Already have an account?'
            emailInput={emailRef}
            passwordInput={passwordRef}
            btnFunction={register}
        />
    </div>
  )
}
