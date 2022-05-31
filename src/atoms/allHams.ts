import { atom } from "recoil";
import { NewHamster } from "../models/NewHamster";

//Gallery State
const allHams = atom<NewHamster[]>({
	key: 'allHams',
	default: []
})



export default allHams