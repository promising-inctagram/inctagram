import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

/* eslint-disable import/extensions */
import { ArrowIosBackOutlineIcon, ArrowIosForwardOutlineIcon } from '@/components/ui/icons'
import { EffectFade, Keyboard, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'

// import lib swiper's styles for proper slider display and disable rule as import require a css file.
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

/* eslint-enable import/extensions */
import s from './Carousel.module.scss'

import { Button } from '../button'
import { Card } from '../card'

type CarouselProps = {
  slides: any[] // todo: fix type later while real component usage
} & ComponentPropsWithoutRef<typeof Swiper>

type SwiperRef = ElementRef<typeof Swiper>

export const Carousel = forwardRef<SwiperRef, CarouselProps>(({ slides, ...rest }, ref) => {
  const isContent = slides && slides?.length > 1

  return (
    <Swiper
      centeredSlides
      className={s.swiper}
      modules={[EffectFade, Keyboard, Navigation, Pagination]}
      pagination={{
        clickable: true,
        dynamicBullets: true,
        el: '.swiper-pagination',
      }}
      ref={ref}
      {...rest}
    >
      {slides.map((slide, index) => (
        <SwiperSlide className={s.slide} key={index}>
          <img alt={'slide image'} className={s.image} src={slide} />
        </SwiperSlide>
      ))}
      <div className={'swiper-pagination'}></div>
      {isContent && <SwiperButtons />}
    </Swiper>
  )
})

const SwiperButtons = () => {
  const swiper = useSwiper()

  return (
    <div>
      <Card className={s.prevBtn} variant={'transparent'}>
        <Button onClick={() => swiper.slidePrev()} variant={'icon'}>
          <ArrowIosBackOutlineIcon className={s.icon} />
        </Button>
      </Card>
      <Card className={s.nextBtn} variant={'transparent'}>
        <Button onClick={() => swiper.slideNext()} variant={'icon'}>
          <ArrowIosForwardOutlineIcon className={s.icon} />
        </Button>
      </Card>
    </div>
  )
}
