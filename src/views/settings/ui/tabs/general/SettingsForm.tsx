import { ReactNode, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

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
import {
  SavedSettingsForm,
  selectIsReturningFromPolicy,
  selectSavedSettingsForm,
  setReturningFromPolicy,
  updateFormField,
} from '@/views/settings/model/settings-slice'
import { SettingFields } from '@/views/settings/model/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { isBefore, parse, subYears } from 'date-fns'
import Link from 'next/link'
import { useRouter } from 'next/router'

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
  aboutMe: string
  city: string
  country: string
  dateOfBirth: string
  firstName: string
  lastName: string
  username: string
}

export const SettingsForm = ({ dateOfBirth, ...rest }: Props) => {
  const savedSettingsForm = useSelector(selectSavedSettingsForm)
  const isReturningFromPolicy = useSelector(selectIsReturningFromPolicy)
  const dispatch = useDispatch()

  const { t } = useTranslation()
  const router = useRouter()
  const { labels, placeholders, submitButton, toastMessages, validation } =
    t.profileSettingPage.settingsForm
  const [ageError, setAgeError] = useState<ReactNode | null>(null)
  const [updateProfile] = useUpdateProfileMutation()
  const {
    control,
    formState: { errors },
    getValues,
    handleSubmit,
    reset,
    setValue,
  } = useForm<SettingFields>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(settingsSchemeCreator(t.profileSettingPage.settingsForm.validation)),
  })

  const onClickUpdate = () => {
    const formValues = getValues()

    for (const [field, value] of Object.entries(formValues)) {
      if (field === 'dateOfBirth') {
        continue
      }
      dispatch(updateFormField({ field: field as keyof SavedSettingsForm, value }))
    }

    dispatch(setReturningFromPolicy(true))
  }

  useEffect(() => {
    const parsedDate = dateOfBirth ? parse(dateOfBirth, 'dd.MM.yyyy', new Date()) : undefined

    if (isReturningFromPolicy) {
      reset({
        ...savedSettingsForm,
      })
      dispatch(setReturningFromPolicy(false))
    } else {
      if (parsedDate) {
        setValue('dateOfBirth', new Date(dateOfBirth))
      }
      reset({
        ...rest,
      })
    }
  }, [reset, dispatch])

  const formHandler = handleSubmit(async data => {
    const ageLimitDate = subYears(new Date(), 13)
    const redirectBackUrl = `${Paths.privacyPolicy}?redirectTo=${encodeURIComponent(router.asPath)}`

    if (data.dateOfBirth && !isBefore(data.dateOfBirth, ageLimitDate)) {
      setAgeError(
        <Translate
          tags={{
            1: () => (
              <Typography
                as={Link}
                href={redirectBackUrl}
                onClick={onClickUpdate}
                variant={'small_link'}
              >
                {validation.linkPolicy}
              </Typography>
            ),
          }}
          text={validation.ageValidationMessage}
        />
      )

      return
    }
    setAgeError('')

    await updateProfile(data)
      .unwrap()
      .then(() => {
        showToast({ message: toastMessages.success })
      })
      .catch(() => {
        showToast({ message: toastMessages.error, variant: 'error' })
      })
  })

  return (
    <form className={s.form} onSubmit={formHandler}>
      <div className={s.formContainer}>
        <ControlledTextField
          control={control}
          isRequired
          label={labels.userName}
          name={'username'}
        />
        <ControlledTextField
          control={control}
          isRequired
          label={labels.firstName}
          name={'firstName'}
        />
        <ControlledTextField
          control={control}
          isRequired
          label={labels.lastName}
          name={'lastName'}
        />
        <ControlledDatePicker
          control={control}
          error={ageError || errors.dateOfBirth?.message}
          label={labels.dateOfBirth}
          name={'dateOfBirth'}
        />
        <div className={s.selectGroup}>
          <div className={s.selectGroupItem}>
            <ControlledSelect
              control={control}
              label={labels.country}
              name={'country'}
              options={countries}
              placeHolder={placeholders.countryPlaceholder}
            />
          </div>

          <div className={s.selectGroupItem}>
            <ControlledSelect
              control={control}
              label={labels.city}
              name={'city'}
              options={cities}
              placeHolder={placeholders.cityPlaceholder}
            />
          </div>
        </div>

        <ControlledTextArea
          className={s.textArea}
          control={control}
          label={labels.aboutMe}
          name={'aboutMe'}
          placeholder={placeholders.aboutMePlaceholder}
        />
        <Button className={s.submitButton} type={'submit'}>
          {submitButton}
        </Button>
      </div>
    </form>
  )
}
