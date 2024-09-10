import { ComponentPropsWithoutRef } from 'react'

import s from './Iconography.module.scss'

import { Icon } from './iconography.mock'

type iconListProps = {
  icons: Icon[]
}

export const Iconography = ({ icons }: iconListProps) => {
  return (
    // todo: change <div className={s.card}> to Card component once it be ready
    <div className={s.card}>
      {icons.map(el => {
        return (
          <div className={s.container} key={el.name}>
            <IconBox component={el.component} />
            {/*todo: change <span className={s.title}> to Typography component once it be ready*/}
            <span className={s.title}>{el.name}</span>
          </div>
        )
      })}
    </div>
  )
}

type IconBoxProps = ComponentPropsWithoutRef<'div'> & Omit<Icon, 'name'>

const IconBox = ({ component, ...rest }: IconBoxProps) => {
  return (
    <div className={s.box} {...rest}>
      {component}
    </div>
  )
}
