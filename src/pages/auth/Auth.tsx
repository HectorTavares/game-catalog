import React, { useState, FormEvent } from 'react'
import { Input } from '@/components'

import { useFirebase } from '@/hooks'

import './style.scss'

export const Auth: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLogin, setIsLogin] = useState(true)

  const { createUser, login } = useFirebase()

  const loginAction = async () => {
    try {
      const user = await login(email, password)
      console.log(user)
      //salvar infos e redirecionar
    } catch (error) {
      console.log(error)
    }
  }

  const registerAction = async () => {
    try {
      const user = await createUser(email, password)
      console.log(user)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (isLogin) {
      loginAction()
    } else {
      registerAction()
    }
  }

  return (
    <main className='auth'>
      <div className='container'>
        <h1>{isLogin ? 'Login' : 'Register'}</h1>
        <form className='auth-form' onSubmit={handleSubmit}>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            isSearch={false}
            onReset={() => setEmail('')}
            text='E-mail'
            type='email'
          />
          <Input
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            value={password}
            onReset={() => setPassword('')}
            isSearch={false}
            text='Password'
          />

          <button className='button' type='submit'>
            {isLogin ? 'Login' : 'Register'}
          </button>
          <p onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Don't have an account? register" : 'Already have an account? login'}
          </p>
        </form>
      </div>
    </main>
  )
}
