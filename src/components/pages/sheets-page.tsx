'use client';
import { convertToVND } from '@/utils/helper';
import { Box, Container, Stack, Typography, keyframes, styled } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type userDataType = {
  name: string[];
  url: string;
};

type usersType = {
  name: string;
  price: number;
  check: boolean;
  sheet_name: string;
  sheet_link: string;
  sheet_id: number;
}[];

const userData: userDataType[] = [
  {
    name: ['Max', 'Manh'],
    url: '/images/max.png',
  },
  {
    name: ['Bao'],
    url: '/images/bao.png',
  },
  {
    name: ['Chien'],
    url: '/images/chien.png',
  },
  {
    name: ['Dylan'],
    url: '/images/dylan.png',
  },
  {
    name: ['Hang'],
    url: '/images/hang.png',
  },
  {
    name: ['Hien', 'Jun'],
    url: '/images/hien.png',
  },
  {
    name: ['Jay'],
    url: '/images/jay.png',
  },
  {
    name: ['Khai'],
    url: '/images/khai.png',
  },
  {
    name: ['Khoa', 'Khoa Pug', 'Pug'],
    url: '/images/khoa.png',
  },
  {
    name: ['Kifushi', 'Moc'],
    url: '/images/kifushi.png',
  },
  {
    name: ['Kim'],
    url: '/images/kim.png',
  },
  {
    name: ['Kudo'],
    url: '/images/kudo.png',
  },
  {
    name: ['Liem'],
    url: '/images/liem.png',
  },
  {
    name: ['Nam', 'Long', 'Can'],
    url: '/images/nam.png',
  },
  {
    name: ['Nguyet'],
    url: '/images/nguyet.png',
  },
  {
    name: ['Quy'],
    url: '/images/quy.png',
  },
  {
    name: ['Trang', 'Chang'],
    url: '/images/quynhtrang.png',
  },
  {
    name: ['Thu'],
    url: '/images/thu.png',
  },
  {
    name: ['Tung'],
    url: '/images/tung.png',
  },
  {
    name: ['Vu'],
    url: '/images/vu.png',
  },
];

const url =
  'https://script.google.com/macros/s/AKfycbyWkdW2vHIVnp2jPbY04gFBS7zcCvUmeBdodRh6klHjsiDrnpWRPUvevsv9ZBwUuaLq/exec';

const getUsersNotPay = async (): Promise<usersType> => {
  const data = await fetch(url);
  const response = await data.json();
  return response;
};

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
  animationTimingFunction: 'linear',
});

function findClosestMatch(inputName: string) {
  // Initialize variables to keep track of the closest match
  let closestMatch = '';
  let minDistance = Infinity;

  // Loop through each user in the userData array
  userData.forEach((user) => {
    // Loop through each name in the user's name array
    user.name.forEach((name) => {
      // Calculate the Levenshtein distance between the inputName and the current name
      const distance = calculateLevenshteinDistance(inputName, name);

      // Update closestMatch if the current distance is smaller
      if (distance < minDistance) {
        minDistance = distance;
        closestMatch = user.url;
      }
    });
  });

  // Return the closest match
  return closestMatch;
}

// Function to calculate Levenshtein distance between two strings
function calculateLevenshteinDistance(str1: string | any[], str2: string | any[]) {
  const m = str1.length;
  const n = str2.length;

  // Create a 2D array to store the distances
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  // Initialize the first row and column
  for (let i = 0; i <= m; i++) {
    dp[i][0] = i;
  }
  for (let j = 0; j <= n; j++) {
    dp[0][j] = j;
  }

  // Fill in the rest of the array
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
    }
  }

  // Return the Levenshtein distance between the two strings
  return dp[m][n];
}

export const SheetsPage = () => {
  const [users, setUsers] = useState<usersType>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const users: usersType = await getUsersNotPay();
      setIsLoading(false);
      setUsers(users);
    };
    getData();
  }, []);

  return (
    <Container>
      <Stack gap={3}>
        {isLoading ? (
          <Box height={'100dvh'} display="flex" alignItems="center" justifyContent="center">
            <Box
              width={300}
              height={10}
              border={2}
              borderRadius={'7px'}
              borderColor={'#b2b2b2'}
              p={'2px 1px'}
              overflow="hidden"
              fontSize={0}
            >
              {[1, 2, 3].map((_, index) => (
                <LoadingItem key={index} width={30} height={1} display="inline-block" mr={'2px'} />
              ))}
            </Box>
          </Box>
        ) : users.length > 0 ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '10px',
              width: '100%',
            }}
          >
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
          </div>
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
