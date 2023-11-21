'use client'
import { convertToVND } from '@/utils/helper'
import { Box, Container, Stack, Typography, keyframes, styled } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import QT_IMG from '@/assets/images/quynhtrang.png'
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

const loader = keyframes`
  from {
    transform: translate(-30px);
  }
  to {
    transform: translate(300px);
  }
`;

const LoadingItem = styled(Box)({
  background: `linear-gradient(to bottom, #2838c7 0%,#5979ef 17%,#869ef3 32%,#869ef3 45%,#5979ef 59%,#2838c7 100%)`,
  animation: `${loader} 2s infinite`,
  animationTimingFunction: 'linear'
})

export const SheetsPage = () => {
  const [users, setUsers] = useState<usersType>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true)
      const users: usersType = await getUsersNotPay()
      setIsLoading(false)
      setUsers(users)
    }
    getData()
  }, [])

  return (
    <Container>
      <Stack gap={3}>
        {isLoading ?
          <Box height={'100dvh'} display='flex' alignItems='center' justifyContent='center'>
            <Box width={300} height={10} border={2} borderRadius={'7px'} borderColor={'#b2b2b2'} p={'2px 1px'} overflow='hidden' fontSize={0}>
              {[1, 2, 3].map((_, index) => (
                <LoadingItem key={index}
                  width={30}
                  height={1}
                  display='inline-block'
                  mr={'2px'}
                />
              ))}
            </Box>
          </Box>
          : (
            users.length > 0 ?
              users.map((user, index) => (
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
              ))
              :
              (
                <Box height={'100dvh'} display='flex' alignItems='center' justifyContent='center' flexDirection='column' gap={2}>
                  <Image src={QT_IMG} alt='' style={{ width: 150, height: 'auto' }} />
                  <Typography fontSize={24} fontWeight={500}>Created by 
                    <Typography component='span' color={'#004488'} fontSize={24} fontWeight={600}><u>Khoa Le</u></Typography>
                  </Typography>
                </Box>
              )
          )
        }

      </Stack>
    </Container>
  )
}
