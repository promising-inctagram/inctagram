import { Ref, SVGProps, forwardRef, memo } from 'react'

const MoreHorizontalOutlineIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
      <clipPath id={'more-horizontal-outline_svg__a'}>
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
    <g clipPath={'url(#more-horizontal-outline_svg__a)'} fill={'currentColor'} fillRule={'evenodd'}>
      <path
        d={
          'M14 12a2 2 0 1 1-4 0c0-1.11.89-2 2-2a2 2 0 0 1 2 2M21 12a2 2 0 1 1-4 0c0-1.11.89-2 2-2a2 2 0 0 1 2 2M7 12a2 2 0 1 1-4 0c0-1.11.89-2 2-2a2 2 0 0 1 2 2'
        }
      />
    </g>
  </svg>
)
const ForwardRef = forwardRef(MoreHorizontalOutlineIcon)
const Memo = memo(ForwardRef)

export default Memo
