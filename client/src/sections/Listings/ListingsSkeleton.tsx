import React from 'react'
import { Alert, Divider, Skeleton } from 'antd'
import './ListingsSkeleton.css'

interface Props {
  error?: boolean
  title: string
}

export const ListingsSkeleton = ({ error = false, title }: Props) => {
  const errorAlert = error ? (
    <Alert
      type="error"
      message="Something went wrong, try again later :("
      className="listings-skeleton__alert"
    />
  ) : null

  return (
    <div className="listings-skeleton">
      {errorAlert }
      <h2>{ title }</h2>
      <Skeleton
        paragraph={ { rows: 1 } }
        active />
      <Divider />
      <Skeleton
        paragraph={ { rows: 1 } }
        active />
      <Divider />
      <Skeleton
        paragraph={ { rows: 1 } }
        active />
    </div>
  )
}