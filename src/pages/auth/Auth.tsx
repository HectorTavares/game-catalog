import React, { useState, FormEvent } from 'react'
import { Modal } from '@mui/material'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'

import { useFirebase } from '../../hooks/'
import { Input, Loader } from '../../components'
import { getAuthErrorMessage } from '../../utils'
import { useTheme } from '../../context/themeContext'

import './style.scss'

function Auth(): JSX.Element {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isLogin, setIsLogin] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const navigate = useNavigate()

  const { createUser, login, forgotPassword } = useFirebase()
  const { theme } = useTheme()

  const loginAction = async () => {
    setIsLoading(true)
    try {
      await login(email, password)
      navigate('/')
    } catch (error: any) {
      toast.error(getAuthErrorMessage(error.code))
    } finally {
      setIsLoading(false)
    }
  }

  const registerAction = async () => {
    setIsLoading(true)
    try {
      await createUser(email, password)
      navigate('/')
    } catch (error: any) {
      console.error(error)

      toast.error(getAuthErrorMessage(error.code))
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

  const handleSubmitForgotPassword = async (e: FormEvent) => {
    e.preventDefault()
    try {
      forgotPassword(email)
      toast.success('Email sent')
      setIsModalOpen(false)
    } catch (error: any) {
      toast.error(getAuthErrorMessage(error.code))
    }
  }

  return (
    <main className={`auth ${theme}`}>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className={`modal reset-password`}>
          <form className={`reset-password-form ${theme}`} onSubmit={handleSubmitForgotPassword}>
            <h2>Reset Password</h2>
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
            <button>Send Email</button>
          </form>
        </div>
      </Modal>
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
          <p className='forgot-password' onClick={() => setIsModalOpen(true)}>
            Forgot password?
          </p>
        </form>
      </div>
    </main>
  )
}

export default Auth
