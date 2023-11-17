'use client'
import { convertToVND } from '@/utils/helper'
import { Container, Stack, Typography } from '@mui/material'
import Link from 'next/link'

type Props = {
  users: {
    name: string;
    price: number;
    check: boolean;
    sheet_name: string;
    sheet_link: string;
    sheet_id: number;
  }[]
}

export const SheetsPage = ({ users }: Props) => {

  return (
    <Container>
      <Stack gap={1}>
        {users.map((user, index) => (
          <Stack key={index} gap={1}>
            <Typography>
              <Typography component='span' fontSize={24} fontWeight={700} color={'blue'}>{user.name}</Typography>
              ơi, A/C còn
              <Typography component='span' fontSize={24} color={'red'}> {convertToVND(user.price)} </Typography>
              có vẻ như chưa trả ở name sheet: {user.sheet_name}</Typography>
            <Typography>Link sheet ở đây nha A/C
              <Link href={`${user.sheet_link}#gid=${user.sheet_id}`} target='_blank'>
                {`${user.sheet_link}#gid=${user.sheet_id}`}
              </Link>
            </Typography>

          </Stack>
        ))}
      </Stack>
    </Container>
  )
}
