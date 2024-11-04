import { Page, getSidebarLayout } from '@/components'
import { Settings } from '@/views/profile/ui/settings/Settings'

function SettingsPage() {
  return (
    <Page>
      <Settings />
    </Page>
  )
}
SettingsPage.getLayout = getSidebarLayout
export default SettingsPage
