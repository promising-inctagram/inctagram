import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { ScrollArea } from '@/components/scroll-area'
import clsx from 'clsx'

import s from './Table.module.scss'

const Table = forwardRef<ElementRef<'table'>, ComponentPropsWithoutRef<'table'>>(
  ({ className, ...props }, ref) => {
    return (
      <ScrollArea>
        <table className={clsx(s.table, className)} {...props} ref={ref} />
      </ScrollArea>
    )
  }
)

const TableHeader = forwardRef<ElementRef<'thead'>, ComponentPropsWithoutRef<'thead'>>(
  ({ className, ...props }, ref) => {
    return <thead className={clsx(s.header)} {...props} ref={ref} />
  }
)

const TableBody = forwardRef<ElementRef<'tbody'>, ComponentPropsWithoutRef<'tbody'>>(
  ({ className, ...props }, ref) => {
    return <tbody className={clsx(s.body, className)} {...props} ref={ref} />
  }
)

const TableFooter = forwardRef<ElementRef<'tfoot'>, ComponentPropsWithoutRef<'tfoot'>>(
  ({ className, ...props }, ref) => {
    return <tfoot className={clsx(s.footer, className)} {...props} ref={ref} />
  }
)

const TableRow = forwardRef<ElementRef<'tr'>, ComponentPropsWithoutRef<'tr'>>(
  ({ className, ...props }, ref) => {
    return <tr className={clsx(s.tableRow, className)} {...props} ref={ref} />
  }
)

const TableHead = forwardRef<ElementRef<'th'>, ComponentPropsWithoutRef<'th'>>(
  ({ className, ...props }, ref) => {
    return <th className={clsx(s.tableHead, className)} {...props} ref={ref} />
  }
)

const TableCell = forwardRef<ElementRef<'td'>, ComponentPropsWithoutRef<'td'>>(
  ({ className, ...props }, ref) => {
    return <td className={clsx(s.cell, className)} {...props} ref={ref} />
  }
)

const TableCaption = forwardRef<ElementRef<'caption'>, ComponentPropsWithoutRef<'caption'>>(
  ({ className, ...props }, ref) => {
    return <caption className={clsx(s.cell, className)} {...props} ref={ref} />
  }
)

export { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow }
