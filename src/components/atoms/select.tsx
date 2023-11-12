import { Box } from '@mui/material'
import { PropsWithChildren, ReactNode, createContext, useContext, useState } from 'react'

type ValueSelectedType = string | null | ReactNode

type SelectContextType = {
  value: ValueSelectedType,
  onSelect: (value: {
    value: string,
    option: ValueSelectedType
  }) => void
}

type Props = PropsWithChildren & {
  defaultValue?: string
}

type OptionProps = PropsWithChildren & {
  value: string;
}

const SelectContext = createContext<SelectContextType>({
  value: null,
  onSelect: () => { }
})

export const Select = (props: Props) => {
  const { children } = props
  const [optionSelected, setOptionSelected] = useState<{
    value: string,
    option: ValueSelectedType
  }>({
    value: '',
    option: null
  })
  const [isOpen, setIsOpen] = useState(false)

  const onSelect = (value: {
    value: string,
    option: ValueSelectedType
  }) => {
    setOptionSelected(value)
    onToggleOptions()
  }

  const onToggleOptions = () => setIsOpen(pre => !pre)

  return (
    <SelectContext.Provider value={{
      value: optionSelected.value,
      onSelect
    }}>
      <Box position='relative'>
        <Box border={1} borderColor='#ccc' borderRadius={2} bgcolor={'#FFF'} sx={{ cursor: 'pointer' }} p={1} onClick={onToggleOptions}>
          {optionSelected.option ?? 'select option...'}
        </Box>
        <Box display={isOpen ? 'block' : 'none'} position='absolute' top='calc(100% + 4px)' left={0} right={0} border={1} borderColor='#ccc' borderRadius={2} bgcolor={'#FFF'} p={1}>
          {children}
        </Box>
      </Box>
    </SelectContext.Provider>
  )
}

const Option = ({ value, children }: OptionProps) => {
  const { value: valueSelected, onSelect } = useContext(SelectContext)

  const onSelectOption = () => {
    onSelect({
      value,
      option: children
    })
  }

  return (
    <Box
      bgcolor={valueSelected === value ? '#ccc' : 'inherit'}
      p={1}
      sx={{
        cursor: 'pointer',
        ':hover': {
          bgcolor: '#cccccc50'
        }
      }}
      borderRadius={1}
      onClick={onSelectOption}
    >
      {children}
    </Box>
  )
}

Select.Option = Option