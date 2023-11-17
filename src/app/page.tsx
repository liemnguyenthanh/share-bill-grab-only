import { SheetsPage } from "@/components/pages"

const url = 'https://script.googleusercontent.com/a/macros/bita.jp/echo?user_content_key=0eE1jmrpuK-mcd2xL4uW_puwAqQWep0EpXaK7VssmP0L-7o6nqX8ME4V0mW-LTMfTLqxmRjw93-aNvl7tlVCwEA0p8Nl-joVm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_nRPgeZU6HP8d3hra3w8XUBVQhQ28DnQkJQL9R93UYiN6yYwVnDGfdKav5zPrJTegw-dYDdJIo-13eZTaZqANCXp3ctOaegirzTwHKX3qPpEq_pzm8kx7G50JyARCyWU63P0nD0x3y64&lib=Mku0QH6I7NxU3vji3EUa3jJJlMbEl9Nie'

const getUsersNotPay = async () => {
  const data = await fetch(url)
  const response = await data.json()
  return response
}

export default async function Page() {
  const users = await getUsersNotPay()

  return (
    <SheetsPage users={users} />
  )
}
