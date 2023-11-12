'use client'

import { Select } from "../atoms"

const options = [
  { title: 'item 01', value: '1' },
  { title: 'item 02', value: '2' },
  { title: 'item 03', value: '3' },
  { title: 'item 04', value: '4' },
]

export const ComponentPage = () => {
  return (
    <div className="">
      <Select>
        {options.map(item => (
          <Select.Option value={item.value} key={item.value}>{item.title}</Select.Option>
        ))}
      </Select>
    </div>
  )
}
