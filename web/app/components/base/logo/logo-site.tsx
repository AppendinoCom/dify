'use client'
import type { FC } from 'react'
import classNames from '@/utils/classnames'

type LogoSiteProps = {
  className?: string
}

const LogoSite: FC<LogoSiteProps> = ({
  className,
}) => {
  return (
    <div className={classNames('block w-[22.651px] h-[24.5px]', className)} />
  )
}

export default LogoSite
