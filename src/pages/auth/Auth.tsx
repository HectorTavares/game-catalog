import React, { useState, FormEvent } from 'react'
import { Input, Loader } from '../../components'

import { useFirebase } from '../../hooks/'
import { useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getAuthErrorMessage } from '../../utils'

import './style.scss'

export const Auth: React.FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isLogin, setIsLogin] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const navigate = useNavigate()

  const { createUser, login } = useFirebase()

  const loginAction = async () => {
    setIsLoading(true)
    try {
      const user = await login(email, password)
      console.log(user)
      navigate('/')
      //salvar infos e redirecionar
    } catch (error: any) {
      toast.error(getAuthErrorMessage(error.code))
    } finally {
      setIsLoading(false)
    }
  }

  const registerAction = async () => {
    setIsLoading(true)
    try {
      const user = await createUser(email, password)
      console.log(user)
      navigate('/')
    } catch (error: any) {
      console.log(error)

      toast.error('getAuthErrorMessage(error.code)')
    } finally {
      setIsLoading(false)
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

          <button disabled={isLoading} className='button' type='submit'>
            {isLoading ? <Loader /> : isLogin ? 'Sign in' : 'Sign up'}
          </button>
        </form>
      </div>
    </main>
  )
}
