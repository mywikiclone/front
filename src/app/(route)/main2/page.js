import Link from "next/link"
import styles from '../style.css'

export default function Home() {
  return (
    <div className={styles.container}>   
      <div className={styles.box}>
        <div className={styles.innerMBox}>main</div>
        <div className={styles.innerSBox}>sub</div>
      </div>
    </div>
  );
}
