import { ComponentPropsWithoutRef, ElementRef, forwardRef, useState } from 'react'

import { Button, Card } from '@/components/ui'
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

type CarouselProps = {
  slides: string[]
} & ComponentPropsWithoutRef<typeof Swiper>

type SwiperRef = ElementRef<typeof Swiper>

export const Carousel = forwardRef<SwiperRef, CarouselProps>(({ slides, ...rest }, ref) => {
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const isContent = slides && slides?.length > 1

  return (
    <div className={s.carouselRoot}>
      <Swiper
        centeredSlides
        className={s.swiper}
        modules={[EffectFade, Keyboard, Navigation, Pagination]}
        onSlideChange={swiper => setActiveIndex(swiper.activeIndex)}
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
        {isContent && <SwiperButtons activeIndex={activeIndex} slides={slides} />}
      </Swiper>
    </div>
  )
})

type SwiperButtonsProps = {
  activeIndex: number
  slides: string[]
}

const SwiperButtons = ({ activeIndex, slides }: SwiperButtonsProps) => {
  const swiper = useSwiper()

  return (
    <div>
      {activeIndex !== 0 && (
        <Card className={s.prevBtn} variant={'transparent'}>
          <Button onClick={() => swiper.slidePrev()} variant={'icon'}>
            <ArrowIosBackOutlineIcon className={s.icon} />
          </Button>
        </Card>
      )}
      {slides.length !== activeIndex + 1 && (
        <Card className={s.nextBtn} variant={'transparent'}>
          <Button onClick={() => swiper.slideNext()} variant={'icon'}>
            <ArrowIosForwardOutlineIcon className={s.icon} />
          </Button>
        </Card>
      )}
    </div>
  )
}
