import { atom } from "recoil";
import { NewHams } from "../models/NewHamster";

//Gallery State
const allHams = atom<NewHams[]>({
	key: 'allHams',
	default: []
})



export default allHams