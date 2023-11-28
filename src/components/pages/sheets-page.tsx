'use client';
import { getUnpaidUsers } from '@/services/sheet';
import { UserDataType, UsersType } from '@/types';
import { convertToVND, findClosestMatch } from '@/utils/helper';
import { Box, Container, Stack, Typography, keyframes, styled } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Loading } from '../atoms';

export const SheetsPage = () => {
  const [users, setUsers] = useState<UsersType>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const users: UsersType = await getUnpaidUsers();
      setIsLoading(false);
      setUsers(users);
    };
    getData();
  }, []);

  return (
    <Container>
      <Stack gap={3}>
        {isLoading ? (
          <Loading />
        ) : users.length > 0 ? (
          <Stack gap={2}>
            {users.map((user, index) => (
              <Stack key={index} gap={1} p={2} borderRadius={4} bgcolor={'#cccccc50'} width={1}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <Typography>
                      <Typography component="span" fontSize={24} fontWeight={700} color={'blue'}>
                        {user.name}🥹🥹🥹🥹🥹🥹
                      </Typography>
                      ơi, A/C còn
                      <Typography component="span" fontSize={24} color={'red'}>
                        {convertToVND(user.price)}
                      </Typography>
                      có vẻ như chưa trả ở name sheet: {user.sheet_name}
                    </Typography>
                    <Typography>
                      Link sheet ở đây nha A/C
                      <Link href={`${user.sheet_link}#gid=${user.sheet_id}`} target="_blank">
                        Link Full HD (K che)
                      </Link>
                    </Typography>
                  </div>
                  <Image
                    alt={user.name}
                    src={findClosestMatch(user.name) as string}
                    width={100}
                    height={100}
                  />
                </div>
              </Stack>
            ))}
            <Image alt="Where is the money?" src="/images/money.png" width={300} height={200} />
          </Stack>
        ) : (
          <Box
            height={'100dvh'}
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            gap={2}
          >
            <Image
              src={'/images/khoa.png'}
              alt=""
              style={{ width: 300, height: 'auto' }}
              width={300}
              height={200}
            />
            <Typography fontSize={24} fontWeight={500}>
              Created by{' '}
              <Typography component="span" color={'#004488'} fontSize={24} fontWeight={600}>
                <u>Khoa Le</u>
              </Typography>
            </Typography>
          </Box>
        )}
      </Stack>
    </Container>
  );
};
