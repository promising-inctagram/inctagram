import { useState } from 'react'

import { Page, getSidebarLayout } from '@/components'
import { LogoutConfirmation } from '@/views/logout/ui/LogoutConfirmation'

function LogoutPage() {
  const [open, setOpen] = useState(true)

  return (
    <Page>
      <LogoutConfirmation isOpen={open} onOpenChange={setOpen} />
    </Page>
  )
}

LogoutPage.getLayout = getSidebarLayout
export default LogoutPage
