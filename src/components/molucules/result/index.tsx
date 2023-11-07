'use client'
import React, { useContext, useMemo, useState } from 'react'
import { Box, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import { convertToVND } from '@/utils/helper'
import { HomeContext } from '@/providers'

type DataRowType = {
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
        const finalPrice = item.price * (1 - discountPercent) + FSF
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
      <TextField onChange={handleChangeTotal} placeholder='Số người đặt món ở đây nè mấy ní??'/>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Tên tuổi</TableCell>
              <TableCell align="right">Rá cả</TableCell>
              <TableCell align="right">giảm</TableCell>
              <TableCell align="right">mân nỳ</TableCell>
              <TableCell align="right">món</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataTable.map((row, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="right">{row.fullName}</TableCell>
                <TableCell align="right">{convertToVND(row.price)}</TableCell>
                <TableCell align="right">{row.discount}</TableCell>
                <TableCell align="right">{convertToVND(row.finalPrice)}</TableCell>
                <TableCell align="right">{row.title}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  )
}
