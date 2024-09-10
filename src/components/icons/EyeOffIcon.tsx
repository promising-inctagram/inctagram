import { Ref, SVGProps, forwardRef, memo } from 'react'

const EyeOffIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={'24'}
    ref={ref}
    viewBox={'0 0 24 24'}
    width={'24'}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <defs>
      <clipPath id={'eye-off_svg__a'}>
        <rect
          fill={'#fff'}
          fillOpacity={0}
          height={23}
          rx={-0.5}
          transform={'translate(.5 .5)'}
          width={23}
        />
      </clipPath>
    </defs>
    <rect fill={'none'} height={23} rx={-0.5} transform={'translate(.5 .5)'} width={23} />
    <g clipPath={'url(#eye-off_svg__a)'} fill={'currentColor'}>
      <path
        d={
          'M13.5 12c0 .82-.68 1.5-1.5 1.5-.83 0-1.5-.68-1.5-1.5 0-.83.67-1.5 1.5-1.5.82 0 1.5.67 1.5 1.5'
        }
        fillRule={'evenodd'}
      />
      <path
        d={
          'M15.29 18.12 14 16.78l-.07-.08-1.27-1.26c-.21.03-.41.05-.61.06-.47 0-.93-.08-1.36-.26a3.5 3.5 0 0 1-1.15-.75c-.33-.33-.59-.72-.77-1.14-.18-.43-.28-.89-.27-1.35 0-.21.02-.41.06-.61l-2-2L5 7.87c-1.13 1.06-2.1 2.28-2.87 3.63-.09.15-.14.32-.14.5 0 .17.05.34.14.5.63 1.09 4 6.5 9.89 6.5h.25c1.1-.04 2.2-.26 3.23-.67zM8.59 5.76l2.8 2.8c.2-.04.4-.06.61-.06.92 0 1.81.36 2.47 1.02S15.5 11.07 15.5 12c-.01.2-.03.4-.06.61l2.68 2.68.83.83c1.15-1.06 2.13-2.28 2.92-3.62.08-.16.13-.33.13-.5 0-.18-.05-.35-.13-.5-.64-1.11-4.17-6.68-10.14-6.5a9.1 9.1 0 0 0-3.23.67zM20.71 19.29 19.41 18l-2-2-9.52-9.53L6.42 5 4.71 3.29c-.1-.1-.21-.17-.33-.22A1 1 0 0 0 4 2.99c-.14 0-.27.03-.39.08s-.23.12-.32.22c-.19.18-.3.44-.3.71 0 .26.11.52.3.71L5.53 7l1.75 1.7 7.31 7.3.07.07L16 17.41l.59.59 2.7 2.71c.09.09.2.16.32.21s.25.08.39.08c.13 0 .26-.03.38-.08q.18-.075.33-.21.135-.15.21-.33c.05-.12.08-.25.08-.38 0-.14-.03-.27-.08-.39a1 1 0 0 0-.21-.32'
        }
      />
    </g>
  </svg>
)
const ForwardRef = forwardRef(EyeOffIcon)
const Memo = memo(ForwardRef)

export default Memo
