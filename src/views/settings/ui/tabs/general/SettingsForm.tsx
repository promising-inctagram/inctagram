import { ReactNode, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { ControlledDatePicker } from '@/components/controlled-date-picker'
import { ControlledSelect } from '@/components/controlled-select'
import { ControlledTextArea } from '@/components/controlled-text-area'
import { ControlledTextField } from '@/components/controlled-text-field'
import { Button, showToast } from '@/components/ui'
import { useUpdateProfileMutation } from '@/shared/api/profile/profile.api'
import { useTranslation } from '@/shared/hooks'
import { useCountryCity } from '@/views/settings/model/hooks/useCountryCity'
import { isAgeValid } from '@/views/settings/model/is-age-valid'
import { settingsSchemeCreator } from '@/views/settings/model/settings-scheme-creator'
import {
  SavedSettingsForm,
  selectIsReturningFromPolicy,
  selectSavedSettingsForm,
  setReturningFromPolicy,
  updateFormField,
} from '@/views/settings/model/settings-slice'
import { SettingFields, SettingsFormProps } from '@/views/settings/model/types'
import { AgeError } from '@/views/settings/ui/tabs/general/AgeError'
import { zodResolver } from '@hookform/resolvers/zod'
import { format, parse } from 'date-fns'

import s from './SettingsForm.module.scss'

export const SettingsForm = ({ dateOfBirth, ...props }: SettingsFormProps) => {
  const savedSettingsForm = useSelector(selectSavedSettingsForm)
  const isReturningFromPolicy = useSelector(selectIsReturningFromPolicy)
  const dispatch = useDispatch()

  const { locale, t } = useTranslation()
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
    watch,
  } = useForm<SettingFields>({
    defaultValues: {
      ...props,
      city: savedSettingsForm.city || String(props.city.id),
      country: String(props.country.id),
      dateOfBirth: dateOfBirth ? parse(dateOfBirth, 'dd/MM/yyyy', new Date()) : undefined,
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(settingsSchemeCreator(t.profileSettingPage.settingsForm.validation)),
  })

  const { country: countryId, firstName, lastName, username } = watch()
  const { cityOptions, countryOptions, isFetchingCities, isLoadingCities, isLoadingCountries } =
    useCountryCity(locale || 'en', countryId)
  const isSaveDisabled =
    !firstName || !lastName || !username || errors.firstName || errors.lastName || errors.username

  const handleSaveChanges = () => {
    const { dateOfBirth, ...values } = getValues()

    Object.entries(values).forEach(([field, value]) => {
      if (value !== '') {
        dispatch(updateFormField({ field: field as keyof SavedSettingsForm, value }))
      }
    })

    dispatch(setReturningFromPolicy(true))
  }

  useEffect(() => {
    if (isReturningFromPolicy) {
      reset(savedSettingsForm)
      dispatch(setReturningFromPolicy(false))
    }
  }, [reset, setValue, dispatch])

  const formHandler = handleSubmit(async data => {
    const formatDate = format(data.dateOfBirth, 'dd/MM/yyyy')

    const transformData = {
      ...data,
      cityId: Number(data.city),
      dateOfBirth: formatDate,
    }

    if (!isAgeValid(data.dateOfBirth)) {
      setAgeError(
        <AgeError
          dateOfBirth={data.dateOfBirth}
          onSaveFormData={handleSaveChanges}
          validationMessages={{
            ageValidationMessage: validation.ageValidationMessage,
            linkPolicy: validation.linkPolicy,
          }}
        />
      )

      return
    }
    setAgeError(null)

    try {
      await updateProfile(transformData).unwrap()
      showToast({ message: toastMessages.success })
    } catch {
      showToast({ message: toastMessages.error, variant: 'error' })
    }
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
          inputVal={dateOfBirth}
          label={labels.dateOfBirth}
          name={'dateOfBirth'}
        />
        <div className={s.selectGroup}>
          <div className={s.selectGroupItem}>
            <ControlledSelect
              control={control}
              label={labels.country}
              name={'country'}
              options={countryOptions}
              placeHolder={placeholders.countryPlaceholder}
            />
          </div>

          <div className={s.selectGroupItem}>
            <ControlledSelect
              control={control}
              disabled={isLoadingCities || isFetchingCities}
              label={labels.city}
              name={'city'}
              options={cityOptions}
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
        <Button className={s.submitButton} disabled={isSaveDisabled} type={'submit'}>
          {submitButton}
        </Button>
      </div>
    </form>
  )
}
