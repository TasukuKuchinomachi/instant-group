import { useState, type KeyboardEvent } from 'react'
import styles from './NameInput.module.css'

interface Props {
  names: string[]
  onAdd: (name: string) => void
  onRemove: (index: number) => void
}

export function NameInput({ names, onAdd, onRemove }: Props) {
  const [value, setValue] = useState('')

  const handleAdd = () => {
    const trimmed = value.trim()
    if (trimmed) {
      onAdd(trimmed)
      setValue('')
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAdd()
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.inputRow}>
        <input
          type="text"
          className={styles.input}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="名前を入力"
        />
        <button className={styles.addButton} onClick={handleAdd} disabled={!value.trim()}>
          追加
        </button>
      </div>
      {names.length > 0 && (
        <ul className={styles.nameList}>
          {names.map((name, i) => (
            <li key={i} className={styles.nameItem}>
              <span>{name}</span>
              <button className={styles.removeButton} onClick={() => onRemove(i)}>
                &times;
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
