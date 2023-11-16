'use client'
import { StyledTableCell } from '@/components/atoms';
import { HomeContext } from '@/providers';
import { postFile } from '@/services';
import { ESteps } from '@/types';
import { convertToVND, parseBillItems } from '@/utils/helper';
import { Box, Button, CircularProgress, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';

const fileTypes = ["JPG", "PNG", "GIF"];

export const DishManage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { dishItems, updateDishItems, updateStep } = useContext(HomeContext)
  const [uploadMore, setUploadMore] = useState(false)

  const handleUploadDishItems = async (file: any) => {
    setIsLoading(true)
    const res = await postFile(file)
    setIsLoading(false)
    const dataSource = res?.
      text.split('\n') // convert to array
      .filter((item: string) => !!item)

    const tableData = parseBillItems(dataSource)

    const data = uploadMore ? [...tableData, ...dishItems] : tableData
    updateDishItems(data)
  };


  return (
    <Box
      sx={{
        'label': {
          maxWidth: 'none !important'
        }
      }}>
      <Box mb={2} display='flex' justifyContent='space-between' alignItems='center'>
        <Typography fontSize={24} >Dish Items</Typography>
        <Button variant='outlined' onClick={() => setUploadMore(pre => !pre)}>Upload more: <b>{uploadMore ? 'on' : 'off'}</b></Button>
      </Box>
      <FileUploader handleChange={handleUploadDishItems} name="file" types={fileTypes} />

      {isLoading && <CircularProgress />}
      {Boolean(dishItems.length) ?
        (
          <Stack justifyContent='end' gap={2}>
            <TableContainer component={Paper} sx={{ mt: 3, maxHeight: 400 }} >
              <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
                <TableHead>
                  <TableRow>
                    <StyledTableCell width={20}>Stt</StyledTableCell>
                    <StyledTableCell>Món</StyledTableCell>
                    <StyledTableCell align="right">Giá</StyledTableCell>
                    <StyledTableCell align="right">Số lượng</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dishItems.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="left">{index + 1}</TableCell>
                      <TableCell align="left">
                        <Typography fontSize={14} fontWeight={600}>{row.name}</Typography>
                        {row?.optionals?.length && (
                          <Typography fontSize={12}>{row.optionals.join(', ')}</Typography>
                        )}
                      </TableCell>
                      <TableCell align="right">{convertToVND(row.price)}</TableCell>
                      <TableCell align="right">{row.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Button variant='contained' size='large' color='secondary' onClick={() => updateStep(ESteps.FEES)}>Next Step</Button>
          </Stack>
        )
        :
        (
          <Typography textAlign='center' fontSize={24} mt={2}>No data</Typography>
        )
      }
    </Box>
  )
}

