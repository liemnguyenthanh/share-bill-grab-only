import React, { Fragment, PropsWithChildren, useEffect, useState } from 'react'

export const ClientOnly = ({ children }: PropsWithChildren) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return <Fragment>{children}</Fragment>

}
