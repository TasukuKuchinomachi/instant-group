import styles from './GroupResult.module.css'

interface Props {
  groups: string[][]
  onReroll: () => void
  onReset: () => void
}

export function GroupResult({ groups, onReroll, onReset }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {groups.map((members, i) => (
          <div key={i} className={styles.card}>
            <h3 className={styles.cardTitle}>グループ {i + 1}</h3>
            <ul className={styles.memberList}>
              {members.map((name, j) => (
                <li key={j} className={styles.member}>{name}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className={styles.actions}>
        <button className={styles.rerollButton} onClick={onReroll}>
          リロール
        </button>
        <button className={styles.resetButton} onClick={onReset}>
          リセット
        </button>
      </div>
    </div>
  )
}
