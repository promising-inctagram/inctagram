import { DocsContent, Page } from '@/components'
import { getLayout } from '@/components/layout'
import { Paths } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks'

function PrivacyPolicyPage() {
  const { t } = useTranslation()

  return (
    <Page>
      <DocsContent
        buttonText={t.privacyPolicyPage.backButton}
        docsContent={t.privacyPolicyPage.content}
        href={Paths.signUp}
        title={t.privacyPolicyPage.pageTitle}
      />
    </Page>
  )
}

PrivacyPolicyPage.getLayout = getLayout
export default PrivacyPolicyPage
