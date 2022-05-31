import PostHamster from "./PostHams";
import GalleryCard from "./GalleryCard";
import { fixUrl} from "../../utils"
import styles from "../../styles/gallery.module.css";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import allHams from "../../atoms/allHams";
import { NewHamster } from "../../models/NewHamster";


const Gallery = () => {
  const [data, setData] = useRecoilState<NewHamster[]>(allHams);
  const [toggle, setToggle] = useState<boolean>(false);
  useEffect(() => {
    async function getData() {
      const response: Response = await fetch(fixUrl('/hamsters/'))
      const apiData: any = await response.json()

      setData(apiData as NewHamster [])
    }
    getData()
    console.log(data)
  }, [])
  return (
    <div className={styles.container}>
      <header>
        <h3>Would you like to add more Hamsters of you choice? 
        <button className={styles.add}onClick={() => setToggle(!toggle)}> Click here</button>
        </h3>
        
        {toggle && <PostHamster />}
      </header>
      <main>
        <div>
          {data
            ? data.map((hamster) => (
                <GalleryCard
                  hamster={hamster}
                  key={Math.floor(Math.random() * 100) + hamster.id}
                />
              ))
            : "Loading"}
        </div>
      </main>
    </div>
  );
};


export default Gallery;