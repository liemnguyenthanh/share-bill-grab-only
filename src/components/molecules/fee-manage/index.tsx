'use client'
import { HomeContext } from '@/providers';
import { postFile } from '@/services';
import { convertToVND, parseBillDetails, parseBillItems } from '@/utils/helper';
import { Box, CircularProgress, Grid, Stack, Typography } from '@mui/material';
import { Fragment, useContext, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';

const fileTypes = ["JPG", "PNG", "GIF"];

const messageStatus: any = {
  '1': <Typography fontWeight={600} color={'blue'}>upload fees to compare....</Typography>,
  '2': <Typography fontWeight={600} color={'#2d5e27'}>valid with fees</Typography>,
  '3': <Typography fontWeight={600} color={'#fb1919'}>something is wrong, total dish item is not equal with total fee</Typography>,
}

export const FeesManage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { updateFees, fees, dishItems } = useContext(HomeContext)

  const handleUploadFee = async (file: any) => {
    setIsLoading(true)
    const res = await postFile(file)
    setIsLoading(false)
    const dataSource = res?.
      text.split('\n') // convert to array
      .filter((item: string) => !!item) // remove empty
    const result = parseBillDetails(dataSource)
    updateFees(result)
  }

  return (
    <Stack sx={{
      'label': {
        maxWidth: 'none !important'
      },
    }}
      justifyContent='space-between'
      height={1}
    >
      <Box>
        <Typography fontSize={24} mb={2}>Fees</Typography>
        <FileUploader handleChange={handleUploadFee} name="file" types={fileTypes} />

        {isLoading && <CircularProgress />}

        {
          fees ?
            (
              <Stack gap={1}>
                <Typography>Total: <b>{convertToVND(fees.subtotal)}</b></Typography>
                <Typography>Applicable fees : <b>{convertToVND(fees.shipping)}</b></Typography>
                <Typography>Discount : <b>{convertToVND(fees.discount)}</b></Typography>
              </Stack>
            )
            : 'Please upload fees'
        }

      </Box>
      <Box >
        {(() => {
          const total = dishItems.reduce((a, c) => (a += (c.amount * c.price)), 0)
          let status = '1'

          if (fees?.subtotal) {
            status = fees?.subtotal === total ? '2' : '3'
          }
          return (
            <Fragment>
              <Typography component='p' display='flex' gap={1} mt={1}>
                Compare Total: <b>{convertToVND(total)}</b></Typography>
              <Typography>
                {messageStatus[status]}
              </Typography>
            </Fragment>
          )
        })()
        }
      </Box>
    </Stack>
  )
}
