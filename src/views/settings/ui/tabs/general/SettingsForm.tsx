import { ReactNode, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Translate } from '@/components'
import { ControlledDatePicker } from '@/components/controlled-date-picker'
import { ControlledSelect } from '@/components/controlled-select'
import { ControlledTextArea } from '@/components/controlled-text-area'
import { ControlledTextField } from '@/components/controlled-text-field'
import { Button, Typography, showToast } from '@/components/ui'
import { useUpdateProfileMutation } from '@/shared/api/profile/profile.api'
import { Paths } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks'
import { settingsSchemeCreator } from '@/views/settings/model/settings-scheme-creator'
import { SettingFields } from '@/views/settings/model/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { isBefore, subYears } from 'date-fns'
import Link from 'next/link'

import s from './SettingsForm.module.scss'

const countries = [
  { option: 'United States', value: 'us' },
  { option: 'Canada', value: 'ca' },
  { option: 'United Kingdom', value: 'uk' },
  { option: 'Australia', value: 'au' },
]

const cities = [
  { option: 'New York', value: 'ny' },
  { option: 'Los Angeles', value: 'la' },
  { option: 'San Francisco', value: 'sf' },
  { option: 'Chicago', value: 'chi' },
]

type Props = {
  username: string | undefined
}

export const SettingsForm = ({ username }: Props) => {
  const { t } = useTranslation()
  const {
    toastMessages: { error, success },
    validation: { ageValidationMessage, linkPolicy },
  } = t.profileSettingPage.settingsForm
  const [ageError, setAgeError] = useState<ReactNode | null>(null)
  const [updateProfile] = useUpdateProfileMutation()
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<SettingFields>({
    defaultValues: {
      aboutMe: '',
      city: '',
      country: '',
      dateOfBirth: undefined,
      firstName: '',
      lastName: '',
      username: username || '',
    },
    resolver: zodResolver(settingsSchemeCreator(t.profileSettingPage.settingsForm.validation)),
  })

  const formHandler = handleSubmit(async data => {
    const ageLimitDate = subYears(new Date(), 13)

    if (data.dateOfBirth && !isBefore(data.dateOfBirth, ageLimitDate)) {
      setAgeError(
        <Translate
          tags={{
            1: () => (
              <Typography as={Link} href={Paths.privacyPolicy} variant={'small_link'}>
                {linkPolicy}
              </Typography>
            ),
          }}
          text={ageValidationMessage}
        />
      )

      return
    }
    setAgeError('')

    await updateProfile(data)
      .unwrap()
      .then(() => {
        showToast({ message: success })
      })
      .catch(() => {
        showToast({ message: error, variant: 'error' })
      })
  })

  return (
    <form className={s.form} onSubmit={formHandler}>
      <div className={s.formContainer}>
        <ControlledTextField control={control} isRequired label={'Username'} name={'username'} />
        <ControlledTextField control={control} isRequired label={'First Name'} name={'firstName'} />
        <ControlledTextField control={control} isRequired label={'Last Name'} name={'lastName'} />
        <ControlledDatePicker
          control={control}
          error={ageError || errors.dateOfBirth?.message}
          label={'Date of Birth'}
          name={'dateOfBirth'}
        />
        <div className={s.selectGroup}>
          <div className={s.selectGroupItem}>
            <ControlledSelect
              control={control}
              label={'Select your country'}
              name={'country'}
              options={countries}
              placeHolder={'Country'}
            />
          </div>

          <div className={s.selectGroupItem}>
            <ControlledSelect
              control={control}
              label={'Select your city'}
              name={'city'}
              options={cities}
              placeHolder={'City'}
            />
          </div>
        </div>

        <ControlledTextArea
          className={s.textArea}
          control={control}
          label={'About Me'}
          name={'aboutMe'}
          placeholder={'Write something about yourself'}
        />
        <Button className={s.submitButton} type={'submit'}>
          Save Changes
        </Button>
      </div>
    </form>
  )
}
