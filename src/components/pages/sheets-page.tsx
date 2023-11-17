'use client'
import { convertToVND } from '@/utils/helper'
import { Box, CircularProgress, Container, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import { Fragment, useEffect, useState } from 'react'

type usersType = {
  name: string;
  price: number;
  check: boolean;
  sheet_name: string;
  sheet_link: string;
  sheet_id: number;
}[]

const url = 'https://script.googleusercontent.com/a/macros/bita.jp/echo?user_content_key=0eE1jmrpuK-mcd2xL4uW_puwAqQWep0EpXaK7VssmP0L-7o6nqX8ME4V0mW-LTMfTLqxmRjw93-aNvl7tlVCwEA0p8Nl-joVm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_nRPgeZU6HP8d3hra3w8XUBVQhQ28DnQkJQL9R93UYiN6yYwVnDGfdKav5zPrJTegw-dYDdJIo-13eZTaZqANCXp3ctOaegirzTwHKX3qPpEq_pzm8kx7G50JyARCyWU63P0nD0x3y64&lib=Mku0QH6I7NxU3vji3EUa3jJJlMbEl9Nie'

const getUsersNotPay = async (): Promise<usersType> => {
  const data = await fetch(url)
  const response = await data.json()
  return response
}

export const SheetsPage = () => {
  const [users, setUsers] = useState<usersType>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true)
      const users: usersType = await getUsersNotPay()
      setIsLoading(false)
      setUsers(users)
    }
    getData()

  }, [])

  const renderLoading = Array.from({ length: 20 }, (_, index) => (
    <Fragment key={index}>
      <CircularProgress color="secondary" />
      <CircularProgress color="success" />
      <CircularProgress color="inherit" />
      <CircularProgress color="secondary" />
      <CircularProgress color="success" />
      <CircularProgress color="inherit" />
      <CircularProgress color="secondary" />
      <CircularProgress color="success" />
      <CircularProgress color="inherit" />
      <CircularProgress color="secondary" />
      <CircularProgress color="success" />
      <CircularProgress color="inherit" />
    </Fragment>
  ))

  return (
    <Container>
      <Stack gap={3}>
        {isLoading &&
          <Box display='flex' gap={2} flexWrap='wrap'>
            {renderLoading}
          </Box>}
        {users.map((user, index) => (
          <Stack key={index} gap={1} p={2} borderRadius={4} bgcolor={'#cccccc50'}>
            <Typography>
              <Typography component='span' fontSize={24} fontWeight={700} color={'blue'}>{user.name}🥹🥹🥹🥹🥹🥹</Typography>
              ơi, A/C còn
              <Typography component='span' fontSize={24} color={'red'}> {convertToVND(user.price)} </Typography>
              có vẻ như chưa trả ở name sheet: {user.sheet_name}</Typography>
            <Typography>Link sheet ở đây nha A/C
              <Link href={`${user.sheet_link}#gid=${user.sheet_id}`} target='_blank'>
                Link Full HD (K che)
              </Link>
            </Typography>

          </Stack>
        ))}
      </Stack>
    </Container>
  )
}
