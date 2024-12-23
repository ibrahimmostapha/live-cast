import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const [showAction, setAction] = useState(null)
  const { dispatch } = useAuthContext()

  const signup = async (email,firstName,lastName, password,password2) => {
    setIsLoading(true)
    setError(null)
    
    if (firstName.length < 2) {
      setError("Make sure you entered your first name correctly!")
      setIsLoading(false)
      return
    }
    
    if (lastName.length < 2) {
      setError("Make sure you entered your last name correctly!")
      setIsLoading(false)
      return
    }

    if (email.length < 6 || !String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      setError("Please enter a valid email address!")
      setIsLoading(false)
      return
    }
    
    if (password.length < 6) {
      setError("Password must be longer than 6 characters!")
      setIsLoading(false)
        return
      }
      
      let numOfCapital = 0
      
      for (let i = 0; i < password.length; i++) {
        if (password.charCodeAt(i) >= 65 && password.charCodeAt(i) <= 90 && password.charAt(i).toUpperCase() == password.charAt(i)) numOfCapital++
      }
      
      if (numOfCapital == 0) {
        setError("Password must contain at least an uppercase letter!")
        setIsLoading(false)
        return
      }
      
      if (password != password2) {
        setError("You've reentered the password incorrectly!")
        setIsLoading(false)
        return
    }

    setAction(true)

    const response = await fetch('http://localhost:3001/api/auth/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email,firstName,lastName, password })
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
      setAction(false)
    }
    if (response.ok) {
      localStorage.setItem('user', JSON.stringify(json))

      dispatch({type: 'LOGIN', payload: json})

      setIsLoading(false)
    }
  }

  return { signup, isLoading, error, showAction, setAction}
}