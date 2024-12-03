import { DocsContent, Page } from '@/components'
import { getLayout } from '@/components/layout'
import { Paths } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks'
import { useRouter } from 'next/router'

function PrivacyPolicyPage() {
  const { t } = useTranslation()

  const router = useRouter()
  const { redirectTo } = router.query

  const handleBack = () => {
    if (redirectTo) {
      router.push(redirectTo as string)
    }
  }

  return (
    <Page>
      <DocsContent
        buttonText={
          redirectTo ? t.privacyPolicyPage.backButtonRedirectTo : t.privacyPolicyPage.backButton
        }
        docsContent={t.privacyPolicyPage.content}
        handleBack={handleBack}
        href={Paths.signUp}
        title={t.privacyPolicyPage.pageTitle}
      />
    </Page>
  )
}

PrivacyPolicyPage.getLayout = getLayout
export default PrivacyPolicyPage
