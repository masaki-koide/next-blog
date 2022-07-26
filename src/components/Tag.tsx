import { MouseEventHandler, useCallback, useState } from 'react'

type Props = {
  children: string
  onClick: (selected: boolean) => void
}

export function Tag({ children, onClick }: Props) {
  const [selected, setSelected] = useState(false)
  const onButtonClick = useCallback<
    MouseEventHandler<HTMLButtonElement>
  >(() => {
    setSelected(!selected)
    onClick(!selected)
  }, [onClick, selected])

  return (
    <span
      className={`text-sm before:content-['#'] p-1.5 rounded-lg ${
        selected ? 'bg-blue-400 text-slate-50 font-bold' : 'text-blue-400 '
      }`}
    >
      <button onClick={onButtonClick}>{children}</button>
    </span>
  )
}
