import { DocsContent, Page, getLayout } from '@/components'
import { Paths } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks'

function TermsOfServicePage() {
  const { t } = useTranslation()

  return (
    <Page>
      <DocsContent
        buttonText={t.termsOfServicePage.backButton}
        docsContent={t.termsOfServicePage.content}
        href={Paths.signUp}
        title={t.termsOfServicePage.pageTitle}
      />
    </Page>
  )
}

TermsOfServicePage.getLayout = getLayout
export default TermsOfServicePage
