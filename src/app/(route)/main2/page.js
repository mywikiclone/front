import styles from './style.css'
import TestingDynamic from "@/app/components/dynamicimporttest";
const Home2=()=> {
  return (
    <div className={styles.container}>   
      <div className={styles.box}>
        <div className={styles.innerMBox}>main
    
        </div>
       
        <div className={styles.innerSBox}>sub</div>
      </div>
    </div>
  )
}

export default Home2
