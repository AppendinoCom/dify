import React from 'react'
import Header from '../signin/_header'
import style from '../signin/page.module.css'
import InstallForm from './installForm'
import classNames from '@/utils/classnames'

const Install = () => {
  return (
    <div className={classNames(
      'bg-background-body',
      style.background,
      'flex w-full min-h-screen',
      'p-4 lg:p-8',
      'gap-x-20',
      'justify-center lg:justify-start',
    )}>
      <div className={
        classNames(
          'flex w-full flex-col bg-background-section-burn shadow rounded-2xl shrink-0',
          'md:w-[608px] space-between',
        )
      }>
        <Header />
        <InstallForm />
        <div className='px-8 py-6 text-sm font-normal text-text-tertiary'>
          © {new Date().getFullYear()} Powered by TechCloud.sk
        </div>
      </div>
    </div>
  )
}

export default Install
