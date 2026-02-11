import { useState, useCallback } from 'react'
import { NameInput } from './components/NameInput.tsx'
import { GroupResult } from './components/GroupResult.tsx'
import { divideIntoGroups } from './utils/shuffle.ts'
import styles from './App.module.css'

export function App() {
  const [names, setNames] = useState<string[]>([])
  const [groupCount, setGroupCount] = useState(2)
  const [groups, setGroups] = useState<string[][] | null>(null)

  const maxGroups = Math.max(2, names.length)

  const handleAdd = (name: string) => {
    setNames((prev) => [...prev, name])
  }

  const handleRemove = (index: number) => {
    const next = names.filter((_, i) => i !== index)
    setNames(next)
    const max = Math.max(2, next.length)
    if (groupCount > max) {
      setGroupCount(max)
    }
  }

  const handleDivide = useCallback(() => {
    setGroups(divideIntoGroups(names, groupCount))
  }, [names, groupCount])

  const handleReroll = useCallback(() => {
    setGroups(divideIntoGroups(names, groupCount))
  }, [names, groupCount])

  const handleReset = () => {
    setGroups(null)
  }

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>Instant Group</h1>
      <p className={styles.subtitle}>名前を入力してグループ分け</p>

      {groups === null ? (
        <div className={styles.inputSection}>
          <NameInput names={names} onAdd={handleAdd} onRemove={handleRemove} />

          <div className={styles.controls}>
            <label className={styles.groupLabel}>
              グループ数:
              <select
                className={styles.groupSelect}
                value={groupCount}
                onChange={(e) => setGroupCount(Number(e.target.value))}
              >
                {Array.from({ length: maxGroups - 1 }, (_, i) => i + 2).map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </label>

            <button
              className={styles.divideButton}
              onClick={handleDivide}
              disabled={names.length < 2}
            >
              グループ分け
            </button>
          </div>

          {names.length < 2 && names.length > 0 && (
            <p className={styles.hint}>2人以上の名前を追加してください</p>
          )}
        </div>
      ) : (
        <GroupResult groups={groups} onReroll={handleReroll} onReset={handleReset} />
      )}
    </div>
  )
}
