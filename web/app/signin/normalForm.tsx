import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter, useSearchParams } from 'next/navigation'
import Loading from '../components/base/loading'
import MailAndPasswordAuth from './components/mail-and-password-auth'
import cn from '@/utils/classnames'
import { getSystemFeatures } from '@/service/common'
import { defaultSystemFeatures } from '@/types/feature'
import Toast from '@/app/components/base/toast'

declare namespace JSX {
  interface IntrinsicElements {
    div: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
    h2: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
  }
}

const NormalForm = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const searchParams = useSearchParams()
  const consoleToken = decodeURIComponent(searchParams.get('access_token') || '')
  const refreshToken = decodeURIComponent(searchParams.get('refresh_token') || '')
  const message = decodeURIComponent(searchParams.get('message') || '')
  const [isLoading, setIsLoading] = useState(true)
  const [systemFeatures, setSystemFeatures] = useState(defaultSystemFeatures)

  const init = useCallback(async () => {
    try {
      if (consoleToken && refreshToken) {
        localStorage.setItem('console_token', consoleToken)
        localStorage.setItem('refresh_token', refreshToken)
        router.replace('/apps')
        return
      }

      if (message) {
        Toast.notify({
          type: 'error',
          message,
        })
      }
      const features = await getSystemFeatures()
      const allFeatures = { ...defaultSystemFeatures, ...features }
      setSystemFeatures(allFeatures)
    }
    catch (error) {
      console.error(error)
      setSystemFeatures(defaultSystemFeatures)
    }
    finally { setIsLoading(false) }
  }, [consoleToken, refreshToken, message, router])

  useEffect(() => {
    init()
  }, [init])

  if (isLoading || consoleToken) {
    return <div className={cn('flex w-full grow flex-col items-center justify-center', 'px-6', 'md:px-[108px]')}>
      <Loading type='area' />
    </div>
  }

  return (
    <div className="mx-auto mt-8 w-full">
      <div className="mx-auto w-full">
        <h2 className="title-4xl-semi-bold text-text-primary">{t('login.pageTitle')}</h2>
      </div>
      <div className="relative">
        <MailAndPasswordAuth isInvite={false} isEmailSetup={systemFeatures.is_email_setup} allowRegistration={false} />
      </div>
    </div>
  )
}

export default NormalForm
