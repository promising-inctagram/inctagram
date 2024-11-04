import { useForm } from 'react-hook-form'

import { ControlledDatePicker } from '@/components/controlled-date-picker'
import { ControlledSelect } from '@/components/controlled-select'
import { ControlledTextArea } from '@/components/controlled-text-area'
import { ControlledTextField } from '@/components/controlled-text-field'
import { Button } from '@/components/ui'
import { LocaleValidation } from '@/locales/en'
import { useUpdateProfileMutation } from '@/shared/api/profile/profile.api'
import { useTranslation } from '@/shared/hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import { enUS } from 'date-fns/locale'
import * as z from 'zod'

import s from './SettingsForm.module.scss'

const countries = [
  { option: 'United States', value: 'us' },
  { option: 'Canada', value: 'ca' },
  { option: 'United Kingdom', value: 'uk' },
  { option: 'Australia', value: 'au' },
]

// Пример массива городов
const cities = [
  { option: 'New York', value: 'ny' },
  { option: 'Los Angeles', value: 'la' },
  { option: 'San Francisco', value: 'sf' },
  { option: 'Chicago', value: 'chi' },
]

const profileSchemeCreator = (t: LocaleValidation) => {
  return z.object({
    aboutMe: z
      .string()
      .max(200, 'About Me must be at most 200 characters')
      .regex(
        /^[0-9A-Za-zА-Яа-я\s!@#$%^&*(),.?":{}|<>]+$/,
        'About Me can contain letters, numbers, spaces, and special characters'
      )
      .optional(),

    city: z.string().optional(),

    country: z.string().optional(),

    dateOfBirth: z
      .union([
        z.string().refine(val => val !== '', {
          message: 'Date of Birth is required',
        }),
        z.date().refine(date => !isNaN(date.getTime()), {
          message: 'Invalid date format',
        }),
      ])
      .transform(val => (typeof val === 'string' ? new Date(val) : val)),
    firstName: z
      .string()
      .min(1, 'First Name is required')
      .max(50, 'First Name must be at most 50 characters')
      .regex(/^[A-Za-zА-Яа-я]+$/, 'First Name can contain only letters'),

    lastName: z
      .string()
      .min(1, 'Last Name is required')
      .max(50, 'Last Name must be at most 50 characters')
      .regex(/^[A-Za-zА-Яа-я]+$/, 'Last Name can contain only letters'),

    userName: z
      .string()
      .min(6, 'Username must be at least 6 characters')
      .max(30, 'Username must be at most 30 characters')
      .regex(
        /^[0-9A-Za-z_-]+$/,
        'Username can contain only letters, numbers, underscores, and hyphens'
      ),
  })
}

export type ProfileFields = z.infer<ReturnType<typeof profileSchemeCreator>>

export const SettingsForm = () => {
  const { t } = useTranslation()
  const [updateProfile] = useUpdateProfileMutation()
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ProfileFields>({
    defaultValues: {
      aboutMe: '',
      city: '',
      country: '',
      dateOfBirth: undefined,
      firstName: '',
      lastName: '',
      userName: '',
    },
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: zodResolver(profileSchemeCreator(t.validation)),
  })

  const formHandler = handleSubmit(async data => {
    try {
      await updateProfile(data)
      console.log('Profile updated successfully')
    } catch (error) {
      console.error('Failed to update profile:', error)
    }
  })

  return (
    <>
      <form className={s.form} onSubmit={formHandler}>
        <div className={s.formContainer}>
          <ControlledTextField
            control={control}
            label={'Username'}
            name={'userName'}
            placeholder={'Enter your username'}
          />
          <ControlledTextField
            control={control}
            label={'First Name'}
            name={'firstName'}
            placeholder={'Enter your first name'}
          />
          <ControlledTextField
            control={control}
            label={'Last Name'}
            name={'lastName'}
            placeholder={'Enter your last name'}
          />
          <ControlledDatePicker
            control={control}
            error={errors.dateOfBirth?.message}
            label={'Date of Birth'}
            locale={enUS}
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
    </>
  )
}
