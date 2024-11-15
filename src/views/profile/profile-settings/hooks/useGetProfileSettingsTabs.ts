import { useTranslation } from '@/shared/hooks/useTranslations'

export const useGetProfileSettingsTabs = () => {
  const { t } = useTranslation()
  const { account_management, devices, general_information, my_payments } = t.profile

  return [
    {
      disabled: false,
      title: general_information,
      value: 'General information',
    },
    {
      disabled: false,
      title: devices,
      value: 'Devices',
    },
    {
      disabled: false,
      title: account_management,
      value: 'Account Management',
    },
    {
      disabled: false,
      title: my_payments,
      value: 'My Payments',
    },
  ]
}
