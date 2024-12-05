import { useEffect, useMemo } from 'react'

import { OptionsValue } from '@/components/ui'
import { useCountriesQuery, useLazyCitiesQuery } from '@/shared/api/profile/profile.api'

export const useCountryCity = (locale: string, id?: string) => {
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
    }
  }, [id, fetchCities])

  const cityOptions = useMemo(
    () => transformToOptions(cities || [], locale === 'en' ? 'name_en' : 'name_ru', 'id'),
    [cities, locale]
  )

  return { cityOptions, countryOptions, isFetchingCities, isLoadingCities, isLoadingCountries }
}
