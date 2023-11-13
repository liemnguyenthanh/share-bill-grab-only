'use client'
import React, { useContext, useMemo, useState } from 'react'
import { Box, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import { convertToVND, getTotalMoneyFinal } from '@/utils/helper'
import { HomeContext } from '@/providers'
import { StyledTableCell } from '@/components/atoms'

export type DataRowType = {
  fullName: string;
  price: number;
  discount: number;
  finalPrice: number;
  title: string;
}

export const ShareBillResult = () => {
  const { dishItems, fees } = useContext(HomeContext)

  const [totalMembers, setTotalMembers] = useState(1)

  const handleChangeTotal = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined) => {
    const value = event?.target.value
    if (value) {
      setTotalMembers(parseFloat(value))
    }
  }

  const dataTable: DataRowType[] = useMemo(() => {
    const result: DataRowType[] = []

    if (dishItems && fees) {
      dishItems.map((item) => {
        const discountPercent = item.price / fees.subtotal
        // fee shipping for each 
        const FSF = fees.shipping / totalMembers
        const finalPrice = (item.price - (fees.discount * discountPercent)) + FSF
        const row: DataRowType = {
          fullName: '',
          price: item.price,
          discount: discountPercent,
          finalPrice,
          title: item.name
        }

        for (let index = 0; index < item.amount; index++) {
          result.push(row)
        }
      })
    }
    return result
  }, [totalMembers, dishItems, fees])

  if (!dishItems || !fees) {

    return (
      <Typography fontSize={24} py={3} textAlign='center'>
        Nhập liệu đi mấy má!!
      </Typography>
    )
  }

  return (
    <Stack gap={2}>
      <TextField onChange={handleChangeTotal} placeholder='Số người đặt món ở đây nè mấy ní??' />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell width={20}>Stt</StyledTableCell>
              <StyledTableCell>Tên tuổi</StyledTableCell>
              <StyledTableCell align="right">Rá cả</StyledTableCell>
              <StyledTableCell align="right">giảm</StyledTableCell>
              <StyledTableCell align="right">mân nỳ</StyledTableCell>
              <StyledTableCell align="right">món</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataTable.map((row, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left">{index + 1}</TableCell>
                <TableCell align="right">{row.fullName}</TableCell>
                <TableCell align="right">{convertToVND(row.price)}</TableCell>
                <TableCell align="right">{Number(row.discount).toFixed(3)}</TableCell>
                <TableCell align="right">{convertToVND(row.finalPrice)}</TableCell>
                <TableCell align="right">{row.title}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack gap={2}>
        <Typography>Total money: {convertToVND(getTotalMoneyFinal(dataTable))}</Typography>
      </Stack>
    </Stack>
  )
}
