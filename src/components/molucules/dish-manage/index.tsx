'use client'
import { HomeContext } from '@/providers';
import { postFile } from '@/services';
import { convertToVND, parseBillItems } from '@/utils/helper';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import { Fragment, useContext, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';

const fileTypes = ["JPG", "PNG", "GIF"];

const messageStatus: any = {
  '1': <Typography color={'blue'}>upload fees to compare....</Typography>,
  '2': <Typography color={'#2d5e27'}>valid with fees</Typography>,
  '3': <Typography color={'#fb1919'}>something is wrong, total dish item is not equal with total fee</Typography>,
}

export const DishManage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { dishItems, updateDishItems, fees } = useContext(HomeContext)

  const handleUploadDishItems = async (file: any) => {
    setIsLoading(true)
    const res = await postFile(file)
    setIsLoading(false)
    const dataSource = res?.
      text.split('\n') // convert to array
      .filter((item: string) => !!item) // remove empty
      .filter((item: string) => item.substring(0, 2).includes('x')) ?? []

    const tableData = parseBillItems(dataSource)
    updateDishItems(tableData)
  };


  return (
    <Box
      sx={{
        'label': {
          maxWidth: 'none !important'
        }
      }}>
      <Typography fontSize={24} mb={2}>Dish Items</Typography>
      <FileUploader handleChange={handleUploadDishItems} name="file" types={fileTypes} />

      {isLoading && <CircularProgress />}

      <Grid container border={1} mt={3} bgcolor={'#333333'}>
        <Grid item md={7}>
          <Typography component='p' p={1} color={'white'}>Name</Typography>
        </Grid>
        <Grid item md={3}>
          <Typography component='p' p={1} textAlign='center' color={'white'} borderLeft={1} borderRight={1}>Price</Typography>
        </Grid>
        <Grid item md={2}>
          <Typography component='p' p={1} color={'white'}>Quantity</Typography>
        </Grid>
      </Grid>

      {Boolean(dishItems.length) ?
        (
          <Fragment>
            {
              dishItems.map((row, index) => (
                <Grid container border={1} key={index}>
                  <Grid item md={7}>
                    <Typography component='p' p={1}>
                      {row.name}
                    </Typography>
                  </Grid>
                  <Grid item md={3}>
                    <Typography component='p' p={1} borderLeft={1} borderRight={1}>
                      {convertToVND(row.price)}
                    </Typography>
                  </Grid>
                  <Grid item md={2}>
                    <Typography component='p' p={1}>
                      {row.amount}
                    </Typography>
                  </Grid>
                </Grid>
              ))
            }
            {(() => {
              const total = dishItems.reduce((a, c) => (a += (c.amount * c.price)), 0)
              let status = '1'

              if (fees?.subtotal) {
                status = fees?.subtotal === total ? '2' : '3'
              }
              return (
                <Fragment>
                  <Typography component='p' display='flex' gap={1} mt={1}>Total: <b>{convertToVND(total)}</b> <span>{messageStatus[status]}</span></Typography>
                </Fragment>
              )
            })()
            }
          </Fragment>
        )
        :
        (
          <Typography textAlign='center' fontSize={24} mt={2}>No data</Typography>
        )
      }
    </Box>
  )
}

