import { Paths } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks/useTranslations'

export const useTabs = () => {
  const { t } = useTranslation()
  const { account_management, devices, general_information, my_payments } = t.profile

  return [
    {
      disabled: false,
      path: Paths.profileSettings_general,
      title: general_information,
      value: 'General information',
    },
    {
      disabled: false,
      path: Paths.profileSettings_devices,
      title: devices,
      value: 'Devices',
    },
    {
      disabled: false,
      path: Paths.profileSettings_account,
      title: account_management,
      value: 'Account Management',
    },
    {
      disabled: false,
      path: Paths.profileSettings_payments,
      title: my_payments,
      value: 'My Payments',
    },
  ]
}
