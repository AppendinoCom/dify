import { useState, ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'
import Button from '@/app/components/base/button'
import Input from '@/app/components/base/input'
import { login } from '@/service/common'
import Toast from '@/app/components/base/toast'

type Props = {
  isInvite: boolean
  isEmailSetup: boolean
  allowRegistration: boolean
}

declare namespace JSX {
  interface IntrinsicElements {
    div: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
  }
}

const MailAndPasswordAuth = ({ isEmailSetup }: Props) => {
  const { t } = useTranslation()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setLoading] = useState(false)

  const handleSignIn = async () => {
    try {
      setLoading(true)
      const res = await login({
        email,
        password,
        remember_me: true,
      })
      if (res.result === 'success') {
        localStorage.setItem('console_token', res.data.access_token)
        localStorage.setItem('refresh_token', res.data.refresh_token)
        router.push('/apps')
      } else {
        Toast.notify({
          type: 'error',
          message: res.message || t('login.error.emailOrPasswordMismatch'),
        })
      }
    }
    catch (error: any) {
      Toast.notify({
        type: 'error',
        message: error.message,
      })
    }
    finally {
      setLoading(false)
    }
  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)

  return (
    <div className='w-full'>
      <div className='space-y-5'>
        <div>
          <Input
            className='!h-10'
            placeholder={t('login.email')}
            value={email}
            onChange={handleEmailChange}
            type="email"
          />
        </div>
        <div>
          <Input
            className='!h-10'
            placeholder={t('login.password')}
            value={password}
            onChange={handlePasswordChange}
            type="password"
          />
        </div>
        <div>
          <Button 
            className='w-full' 
            type='primary' 
            disabled={!email || !password} 
            onClick={handleSignIn}
            loading={isLoading}
          >
            {t('login.signIn')}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default MailAndPasswordAuth
