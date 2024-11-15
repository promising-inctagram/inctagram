import { useEffect, useMemo } from 'react'
import { UseFormSetValue } from 'react-hook-form'

import { OptionsValue } from '@/components/ui'
import { useCountriesQuery, useLazyCitiesQuery } from '@/shared/api/profile/profile.api'
import { SettingFields } from '@/views/settings/model/types'

export const useCountryCity = (
  locale: string,
  id: string,
  setValue?: UseFormSetValue<SettingFields>
) => {
  const { data: countries, isLoading: isLoadingCountries } = useCountriesQuery()

  const [fetchCities, { data: cities, isFetching: isFetchingCities, isLoading: isLoadingCities }] =
    useLazyCitiesQuery()

  const transformToOptions = <T,>(
    array: T[],
    optionKey: keyof T,
    valueKey: keyof T
  ): OptionsValue[] => {
    return array.map(item => ({
      option: item[optionKey] as string,
      value: item[valueKey]?.toString() || '',
    }))
  }
  const countryOptions = useMemo(
    () => transformToOptions(countries || [], locale === 'en' ? 'name_en' : 'name_ru', 'id'),
    [countries, locale]
  )

  useEffect(() => {
    if (id) {
      fetchCities({ id: id })
      if (setValue) {
        setValue('city', '')
      }
    }
  }, [id, fetchCities])

  const cityOptions = useMemo(
    () => transformToOptions(cities || [], locale === 'en' ? 'name_en' : 'name_ru', 'id'),
    [cities, locale]
  )

  return { cityOptions, countryOptions, isFetchingCities, isLoadingCities, isLoadingCountries }
}
