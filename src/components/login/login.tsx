import React, { useEffect } from 'react'
import { useState } from 'react'
import './login.css'
import { toast } from 'react-toastify'
import { auth } from '../../lib/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { db } from '../../lib/firebase'
import { setDoc, doc } from 'firebase/firestore'
import { useDispatch } from 'react-redux'
import { collection, query, where, getDocs } from 'firebase/firestore'

const Login = () => {
  const [createAccount, setcreateAccount] = useState(true)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.target)
    const { email, password } = Object.fromEntries(formData)
    try {
      const res = await signInWithEmailAndPassword(auth, email, password)
      console.log('LOGGED', res)

      const userRef = collection(db, 'users')
      const q = query(userRef, where('id', '==', res.user.uid))

      const querySnapshot = await getDocs(q)

      const userDoc = querySnapshot.docs[0] // Get the first document (assuming unique ID)
      const userData = userDoc.data()
      console.log('Filtered user data:', userData)
      dispatch({
        type: 'LOGIN_USER',
        payload: userData,
      })
    } catch (error) {
      console.log('err', error)
      toast.error(`${error}`)
    } finally {
      setLoading(false)
    }
    toast.success('Signed in')
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)

    const { username, email, password } = Object.fromEntries(formData)
    try {
      setLoading(true)
      const res = await createUserWithEmailAndPassword(auth, email, password)

      await setDoc(doc(db, 'users', res?.user?.uid), {
        username,
        email,
        id: res?.user?.uid,
        notes: [],
      })

      toast.success('Account created! you can now login')
    } catch (error) {
      console.log('Errr', error?.message)
      // toast.error(`${Error.toString()}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login">
      {createAccount ? (
        <div className="item">
          <h2>Welcome Back</h2>
          <form onSubmit={handleLogin}>
            <input type="text" placeholder="Email" name="email" />
            <input type="password" placeholder="Password" name="password" />
            <button disabled={loading}>{loading ? 'Loading' : 'Sign In'}</button>
          </form>
          <h3 className="changeh3" onClick={() => setcreateAccount(!createAccount)}>
            Create a new account
          </h3>
        </div>
      ) : (
        <div className="item">
          <h2>Create an account</h2>
          <form onSubmit={handleRegister}>
            <input type="text" placeholder="Username" name="username" />
            <input type="text" placeholder="Email" name="email" />
            <input type="password" placeholder="Password" name="password" />
            <button disabled={loading}>{loading ? 'Loading' : 'Sign Up'}</button>
            <h3 onClick={() => setcreateAccount(!createAccount)} className="changeh3">
              Already have an account
            </h3>
          </form>
        </div>
      )}
    </div>
  )
}

export default Login
