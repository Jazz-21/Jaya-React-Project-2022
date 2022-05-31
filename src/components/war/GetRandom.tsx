import { useEffect, useState } from "react";
import { NewHamster } from "../../models/NewHamster";
import { fixUrl, picImport } from "../../utils";
import styles from "../../styles/getrandom.module.css";

const GetRandom = () => {

  const [hamsOne, sethamsOne] = useState<null | NewHamster>(null)
  const [hamsTwo, sethamsTwo] = useState<null | NewHamster>(null)
  const [wins, setwins] = useState<null | NewHamster>(null)
  const [lost, setlost] = useState<null | NewHamster>(null)
  const [wellPlayed, setwellPlayed] = useState<boolean>(false)
  const [wellPlayed1, setwellPlayed1] = useState<boolean>(false)

  
  const winningHamsOne = () => {
 
    if (hamsOne != null) {
      let newWins = hamsOne.wins + 1 
      let newGames = hamsOne.games + 1
      let newResult = hamsOne.wins - hamsOne.defeats

      const bringwins = {
        ...hamsOne,
        wins: newWins,
        games: newGames,
        result: newResult
      }
     
      setwins(bringwins)
      setwellPlayed(true) 

      fetch(fixUrl(`/hamsters/${hamsOne.id}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bringwins),
      })
    
    }
    
    if (hamsTwo != null) {
      let newDefeats = hamsTwo.defeats + 1 
      let newGames = hamsTwo.games + 1
      let newResult = hamsTwo.wins - hamsTwo.defeats

      const bringLost = {
        ...hamsTwo,
        defeats: newDefeats,
        games: newGames,
        result: newResult
      }
      setlost(bringLost)

      fetch(fixUrl(`/hamsters/${hamsTwo.id}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bringLost),
      })
    
    }
  }
  
  const winningHamsTwo = () => {
    console.log('second wins')

    if (hamsTwo != null) {
      let newWins = hamsTwo.wins + 1
      let newGames = hamsTwo.games + 1
      let newResult = hamsTwo.wins - hamsTwo.defeats

      const bringwins = {
        ...hamsTwo,
        wins: newWins,
        games: newGames,
        result: newResult
      }
      setwins(bringwins)
      setwellPlayed1(true) 

      fetch(fixUrl(`/hamsters/${hamsTwo.id}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bringwins),

      })
     
    }
    if (hamsOne != null) {
      let newDefeats = hamsOne.defeats + 1 
      let newGames = hamsOne.games + 1
      let newResult = hamsOne.wins - hamsOne.defeats

      const bringLost = {
        ...hamsOne,
        defeats: newDefeats,
        games: newGames,
        result: newResult
      }
      setlost(bringLost)

      fetch(fixUrl(`/hamsters/${hamsOne.id}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bringLost),

      })
    }
  }
  
  const NewBattle = () => {
    window.location.reload();
  }
  useEffect(() => {
    async function getData() {
      const response: Response = await fetch(fixUrl('/hamsters/random'))
      const apiData: any = await response.json()

      sethamsOne(apiData as NewHamster)
    }
    getData()

  }, [])
  useEffect(() => {
    async function getData() {
      const response: Response = await fetch(fixUrl('/hamsters/random'))
      const apiData: any = await response.json()

      sethamsTwo(apiData as NewHamster)
    }
    getData()

  }, [])

  return (
    <div className={styles.battle}>
      <p className={styles.message}>Choose the cutest hamster by clicking on 
      the vote button</p>
      <div className={styles.voting}>
        
        {hamsOne && hamsTwo ? 
          <div className={styles.hamster1}>
            <img className={styles.size} src={picImport(hamsTwo.imgName)} />
            <h3 className={styles.text}>My name is {hamsTwo.name} and I'm {hamsTwo.age}yrs old</h3>
            {wellPlayed1 ? <div>
              <p>wins {wins?.wins} losts {wins?.defeats}</p> </div> : null}
            {wellPlayed ? <div>
              <p>wins {lost?.wins} losts {lost?.defeats}</p> </div> : null}
               
            <button className={styles.vote} disabled={wellPlayed || wellPlayed1}
             onClick={winningHamsTwo}>Vote for me!</button>
          </div> : <p>waiting for next</p>
        }

{hamsOne && hamsTwo ? 
          <div className={styles.hamster2}>
            <img className={styles.size} src={picImport(hamsOne.imgName)} />
            <h3 className={styles.text}>My name is {hamsOne.name} and I'm {hamsOne.age}yrs old</h3>
            {wellPlayed ? <div>
              <p>Wins {wins?.wins} Losts {wins?.defeats}</p> </div> : null}
            {wellPlayed1 ? <div>
              <p>Wins {lost?.wins} Losts {lost?.defeats}</p> </div> : null}
             
            <button className={styles.vote} disabled={wellPlayed || wellPlayed1} onClick={winningHamsOne}>Vote for me!</button>
          </div> : <p>waiting for the next</p>
        }
      </div>

      {wins != null ? 
        <div className={styles.winninghamster}>
          <p> 🏆The winner is {wins.name} 🏆
          <br /> Total victory-{wins.wins} <br />Total defeats-{wins.defeats} <br />Total matches-{wins.games} </p>
          <button className={styles.newbattle}onClick={NewBattle}>Start a new match</button>
        </div>
        : <p></p>}
    </div>
  )
}
export default GetRandom;








  
