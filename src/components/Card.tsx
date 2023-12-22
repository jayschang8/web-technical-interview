import type { IconDefinition } from "@fortawesome/free-solid-svg-icons"
import {
  faBath,
  faBed,
  faCalendar,
  faHouse,
  faTrash,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { initializeApp } from "firebase/app"
import type { DocumentData } from "firebase/firestore/lite"
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore/lite"
import Image from "next/image"
import config from "../config"

const app = initializeApp(config.firebase)
const db = getFirestore(app)

interface IProps {
  home: DocumentData
  getHomes: () => void
}

const Card = (props: IProps): JSX.Element => {
  // Generates an icon-value pair
  const iconSet = (icon: IconDefinition, value: number): JSX.Element => {
    return (
      <div className="flex justify-center mr-4">
        <div className="w-5 mr-1 justify-center flex">
          <FontAwesomeIcon
            className="text-gray-500 h-4"
            icon={icon}
            size="xs"
          />
        </div>
        <div className="text-xs">{value}</div>
      </div>
    )
  }

  const handleDelete = async () => {
    const q = query(
      collection(db, "homes"),
      where("address", "==", props.home.address)
    )
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach(async (document) => {
      const docRef = doc(db, "homes", document.id)
      await deleteDoc(docRef)
    })
    await props.getHomes()
  }

  return (
    <div className="rounded-xl mx-6 overflow-hidden mb-8">
      <div className="w-fill h-[400px] relative sm:h-[600px] lg:h-[700px] xl:h-[250px]">
        <Image src="/house.jpeg" alt="home" layout="fill" />
      </div>
      <div className="rounded-lg -mt-10 bg-white z-2 relative px-4 pb-6 pt-3">
        <h3 className="text-base font-extrabold text-gray-700">
          {props.home.address}
        </h3>
        <h4 className="text-gray-600 text-sm">{`${props.home.city}, ${props.home.state} ${props.home.zipCode} `}</h4>
        <div className="flex mt-3 justify-evenly">
          {iconSet(faBed, props.home.bedrooms)}
          {iconSet(faCalendar, props.home.yearBuilt)}
          {iconSet(faBath, props.home.bathrooms)}
          {iconSet(faHouse, props.home.sqft)}
        </div>
        <div
          className="absolute z-100 w-4 right-3 top-3 cursor-pointer"
          onClick={handleDelete}
        >
          <FontAwesomeIcon className="text-red-500" icon={faTrash} size="xs" />
        </div>
      </div>
    </div>
  )
}

export default Card
