'use client';
import { getUnpaidUsers } from '@/services/sheet';
import { UsersType } from '@/types';
import { convertToVND, findClosestMatch } from '@/utils/helper';
import {
  Avatar,
  Box,
  Container,
  Divider,
  Stack,
  Typography,
  keyframes,
  styled,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Loading } from '../atoms';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2

const StyledContainer = styled(Container)({
  color: 'green',
});

const StyledStack = styled(Stack)({
  backgroundColor: '#fec8d8',
  borderRadius: '16px',
  alignItems: 'center',
});

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
    <StyledContainer>
      <StyledStack gap={3}>
        {isLoading ? (
          <Loading />
        ) : users.length > 0 ? (
          <StyledStack gap={2} padding={2}>
            <Stack>
              <Image alt="Where is the money?" src="/images/cat.gif" width={300} height={200} />
              <Typography style={{ position: 'absolute' }} color={'white'}>
                A/c chuyển tìn giúp iem ạ
              </Typography>
            </Stack>
            {users.map((user, index) => (
              <StyledStack key={index}>
                <Grid
                  container
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  padding={2}
                  borderRadius={4}
                  bgcolor={'#BED8FF'}
                >
                  <Grid xs={8}>
                    <Typography>
                      <Typography component="span" fontSize={24} fontWeight={700} color={'blue'}>
                        {user.name}🥹🥹🥹🥹🥹🥹
                      </Typography>
                      <Typography component="span" fontSize={24} fontWeight={700} color={'black'}>
                        ơi, A/C còn
                      </Typography>
                      <Typography component="span" fontSize={24} color={'blue'}>
                        {' '}
                        {convertToVND(user.price)}{' '}
                      </Typography>
                      <Typography component="span" fontSize={24} fontWeight={700} color={'black'}>
                        có vẻ như chưa trả ở name sheet: {user.sheet_name}
                      </Typography>
                    </Typography>
                    <Typography color={'black'}>
                      Link sheet ở đây nha A/C
                      <Link href={`${user.sheet_link}#gid=${user.sheet_id}`} target="_blank">
                        {' '}
                        Link Full HD (K che)
                      </Link>
                    </Typography>
                  </Grid>
                  <Grid xs={2}>
                    <Avatar
                      alt={user.name}
                      src={findClosestMatch(user.name) as string}
                      sx={{ width: 64, height: 64 }}
                    />
                  </Grid>
                </Grid>
              </StyledStack>
            ))}
          </StyledStack>
        ) : (
          <StyledStack
            height={'100vh'}
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
          >
            <Box display={'flex'}>
              <Image
                src={'/images/khoa.png'}
                alt=""
                style={{ width: 300, height: 'auto' }}
                width={300}
                height={200}
              />
              <Image
                src={'/images/dancing.gif'}
                alt=""
                style={{ width: 300, height: 'auto' }}
                width={300}
                height={200}
              />
            </Box>
            <Typography fontSize={24} fontWeight={500}>
              Created by{' '}
              <Typography component="span" color={'#004488'} fontSize={24} fontWeight={600}>
                <u>Khoa Le</u>
              </Typography>
            </Typography>
          </StyledStack>
        )}
      </StyledStack>
    </StyledContainer>
  );
};
