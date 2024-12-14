import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { Button, Card } from '@/components/ui'
/* eslint-disable import/extensions */
import { ArrowIosBackOutlineIcon, ArrowIosForwardOutlineIcon } from '@/components/ui/icons'
import { Image } from '@/shared/types/public-page/Posts'
import clsx from 'clsx'
import { EffectFade, Keyboard, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'

// import lib swiper's styles for proper slider display and disable rule as import require a css file.
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

/* eslint-enable import/extensions */
import s from './Carousel.module.scss'

type CarouselProps = {
  minIcon?: boolean
  slides: Image[] // todo: fix type later while real component usage
} & ComponentPropsWithoutRef<typeof Swiper>

type SwiperRef = ElementRef<typeof Swiper>

export const Carousel = forwardRef<SwiperRef, CarouselProps>(
  ({ minIcon, slides, ...rest }, ref) => {
    const isContent = slides && slides?.length > 1

    return (
      <div className={s.carouselRoot}>
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
              <img alt={'slide image'} className={s.image} src={slide.originFilePath} />
            </SwiperSlide>
          ))}
          <div className={'swiper-pagination'}></div>
          {isContent && <SwiperButtons minIcon={minIcon} />}
        </Swiper>
      </div>
    )
  }
)

type SwiperButtonsProps = {
  minIcon?: boolean
}

const SwiperButtons = ({ minIcon }: SwiperButtonsProps) => {
  const swiper = useSwiper()

  return (
    <div>
      <Card className={s.prevBtn} variant={'transparent'}>
        <Button onClick={() => swiper.slidePrev()} variant={'icon'}>
          <ArrowIosBackOutlineIcon className={clsx(s.icon, minIcon && s.minIcon)} />
        </Button>
      </Card>
      <Card className={clsx(s.nextBtn, minIcon && s.minIcon)} variant={'transparent'}>
        <Button onClick={() => swiper.slideNext()} variant={'icon'}>
          <ArrowIosForwardOutlineIcon className={clsx(s.icon, minIcon && s.minIcon)} />
        </Button>
      </Card>
    </div>
  )
}
