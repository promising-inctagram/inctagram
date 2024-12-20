import React, { useEffect, useState } from 'react'

// Компонент для отображения времени публикации
export const TimeAgo = (timestamp: string) => {
  const [timeAgo, setTimeAgo] = useState('')

  useEffect(() => {
    const updateTimeAgo = () => {
      const now: Date = new Date() // Текущее время
      const postTime = new Date(timestamp) // Время публикации
      const diff: number = Math.floor((now.getTime() - postTime.getTime()) / 1000)

      if (diff < 60) {
        setTimeAgo(`${diff} секунд назад`)
      } else if (diff < 3600) {
        setTimeAgo(`${Math.floor(diff / 60)} минут назад`)
      } else if (diff < 86400) {
        setTimeAgo(`${Math.floor(diff / 3600)} часов назад`)
      } else if (diff < 604800) {
        setTimeAgo(`${Math.floor(diff / 86400)} дней назад`)
      } else {
        setTimeAgo(`${Math.floor(diff / 604800)} недель назад`)
      }
    }

    // Обновление времени каждую минуту
    const interval = setInterval(updateTimeAgo, 60000)

    // Первоначальное обновление времени
    updateTimeAgo()

    // Очистка интервала при размонтировании компонента
    return () => clearInterval(interval)
  }, [timestamp])

  return timeAgo
}
