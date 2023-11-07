'use client'
import { HomeContext } from '@/providers';
import { postFile } from '@/services';
import { convertToVND, parseBillDetails, parseBillItems } from '@/utils/helper';
import { Box, CircularProgress, Grid, Stack, Typography } from '@mui/material';
import { Fragment, useContext, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';

const fileTypes = ["JPG", "PNG", "GIF"];

const FeesManage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { updateFees, fees } = useContext(HomeContext)

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
    <Box sx={{
      'label': {
        maxWidth: 'none !important'
      }
    }}>
      <Typography fontSize={24} mb={2}>Upload Fees (total prices, ship, discount ....)</Typography>
      <FileUploader handleChange={handleUploadFee} name="file" types={fileTypes} />

      {isLoading && <CircularProgress />}

      <Box my={3}>
        {
          fees ?
            (
              <Stack gap={1}>
                <Typography>Total: <b>{convertToVND(fees.subtotal)}</b></Typography>
                <Typography>Applicable fees : <b>{convertToVND(fees.shipping)}</b></Typography>
                <Typography>Discount : <b>{
                  convertToVND(fees.discount.reduce((a, c) => (a += c), 0))

                }</b></Typography>

              </Stack>
            )
            : 'Please upload fees'
        }
      </Box>
    </Box>
  )
}

export default FeesManage
