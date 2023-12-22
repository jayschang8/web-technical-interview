import type { IconDefinition } from "@fortawesome/free-solid-svg-icons"
import {
  faBath,
  faBed,
  faCalendar,
  faHouse,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import type { Home } from "../types/home"

interface IProps {
  home: Home
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
      </div>
    </div>
  )
}

export default Card
