import React, { useState, FormEvent } from 'react'
import { Input } from '../../components'

import { useFirebase } from '../../hooks/'
import { useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getAuthErrorMessage } from '../../utils'

import './style.scss'

export const Auth: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const navigate = useNavigate()

  const { createUser, login } = useFirebase()

  const loginAction = async () => {
    try {
      const user = await login(email, password)
      console.log(user)
      navigate('/')
      //salvar infos e redirecionar
    } catch (error: any) {
      toast.error(getAuthErrorMessage(error.code))
    }
  }

  const registerAction = async () => {
    try {
      const user = await createUser(email, password)
      console.log(user)
      navigate('/')
    } catch (error: any) {
      toast.error(getAuthErrorMessage(error.code))
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
        <div className='auth-options'>
          <button
            onClick={() => setIsLogin(true)}
            className={`option ${isLogin ? 'selected' : ''}`}
          >
            Sign in
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`option ${isLogin ? '' : 'selected'}`}
          >
            Sign up
          </button>
        </div>

        <form className='auth-form' onSubmit={handleSubmit}>
          <Input
            onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
              setEmail(e.target.value)
            }
            value={email}
            isSearch={false}
            onReset={() => setEmail('')}
            text='E-mail'
            type='email'
            size='small'
          />
          <Input
            onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
              setPassword(e.target.value)
            }
            type='password'
            value={password}
            onReset={() => setPassword('')}
            isSearch={false}
            text='Password'
            size='small'
          />

          <button className='button' type='submit'>
            {isLogin ? 'Sign in' : 'Sign up'}
          </button>
        </form>
      </div>
    </main>
  )
}
