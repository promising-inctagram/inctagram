import { Translate } from '@/components'
import { Typography } from '@/components/ui'
import { Paths } from '@/shared/enums'
import Link from 'next/link'

type TermsAgreementLabelProps = {
  policy: string
  terms: string
  termsAgreement: string
}

export const TermsAgreementLabel = ({
  policy,
  terms,
  termsAgreement,
}: TermsAgreementLabelProps) => {
  return (
    <Typography variant={'small_text'}>
      <Translate
        tags={{
          1: () => (
            <Typography as={Link} href={Paths.termsOfService} variant={'small_link'}>
              {terms}
            </Typography>
          ),
          2: () => (
            <Typography as={Link} href={Paths.privacyPolicy} variant={'small_link'}>
              {policy}
            </Typography>
          ),
        }}
        text={termsAgreement}
      />
    </Typography>
  )
}
