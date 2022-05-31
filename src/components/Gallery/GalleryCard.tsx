import { useRecoilState } from 'recoil';
import allHams from '../../atoms/allHams';
import styles from "../../styles/gallerycard.module.css";
import { NewHamster } from "../../models/NewHamster";
import { fixUrl, picImport } from '../../utils';


interface Props {
	hamster: NewHamster
}
const HamsterCard = ({ hamster }: Props) => {
	const [, setData] = useRecoilState<NewHamster[]>(allHams);

	const hamsterCard = async () => {
	const response: Response = await fetch(fixUrl(`/hamsters/${hamster.id}`), {
		method: 'DELETE',
		headers: {
		  'Content-Type': 'application/json'
		},
		body: null
	  })
	  if (response.status === 200) {
		
  
		async function getData() {
		  const response: Response = await fetch(fixUrl('/hamsters/'))
		  const apiData: any = await response.json()
  
		  setData(apiData as NewHamster[])
		}
		getData()
	  }
  
	}
	return (
		<div className={styles.gallery}>
			<div className={styles.gallerycard}>
		  <img className={styles.allimages} src={picImport(hamster.imgName)} />
		  		<p><b>{hamster.name}</b> loves to {hamster.loves}<br />
				 and <br />{hamster.favFood} is his favourite food<br />
				<button className={styles.delete} onClick={() => hamsterCard()}>Delete Hamster</button></p>
			</div>
		</div>
	  );
  }
export default HamsterCard