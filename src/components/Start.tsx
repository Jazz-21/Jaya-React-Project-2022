import { useEffect, useState } from 'react'
import { NewHamster } from "../models/NewHamster";
import { fixUrl, picImport } from '../utils';
import styles from "../styles/start.module.css";


const Start = () => {
  const [cutest, setCutest] = useState<NewHamster[] | null>(null)
  useEffect(() => {
    async function getCutest() {
      try {
        const response: Response = await fetch(fixUrl('/hamsters/cutest'))
        const CutestData: NewHamster[] = await response.json()
        console.log(CutestData)
        if (CutestData.length > 1) {
          const randomCutest = []
          randomCutest.push(CutestData[Math.floor(Math.random() * CutestData.length)])
          setCutest(randomCutest)
          return
        } else {
          setCutest(CutestData)
        }
      } catch (error) {
        return error
      }
		}
    getCutest()
  }, [])

  return (
    <><section className={styles.container}>
      <main className={styles.flexbox}>
        <article>
          <h3>Welcome! What all you can do here </h3>
          <p>
            You just landed on the Hamster's tiny universe and here you see the
            most cutest hamsters of the time.<br />
            On the war page you can vote for the
            battle for the cutest Hamsters.<br /> In the Gallery, you get the
            chance to see all hamsters at once.<br /> you also get the chance
            to add or delete a hamsters.
            <br />
            Use the navigationbar at the top to explore the Hamster's universe!
          </p>
        </article>


        {cutest
          ? cutest.map((hamster) => (
            <section className={styles.card} key={Math.random() + hamster.id}>
              <img
                src={picImport(hamster.imgName)}
                alt={hamster.name}
                className="card__img" />

              <div className={styles.card__body}>
                <h2>{hamster.name} is the most cutest hamster!<p> Total Wins: {hamster.wins}!</p> </h2>
                
              </div>
            </section>
          ))
          : "Loading"}
      </main>
    </section>
    <footer className={styles.footer}>
            <p>
              All feedbacks are welcome at jaya.mishra@iths.se
            </p>
      </footer></>
  );
};


export default Start;

