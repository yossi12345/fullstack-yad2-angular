import { ApartmentType } from "./ApartmentType"
import { Feature } from "./Feature"
import { Image } from "./Image"
import { Phone } from "./Phone"
import { User } from "./User"
export interface Apartment{
    id:string,
    imagesPaths:Image[]|null
    streetNumber:number
    street:string
    city:string
    price:string
    amountOfRooms:number
    amountOfShowerRooms:number
    type:ApartmentType
    description:string
    condition:number
    View:string|null
    isRearAsset:boolean
    floor:number|null
    amountOfFloorsInBuilding:null|number
    amountOfParkingPlaces:null|number
    amountOfBalcony:null|number 
    features:Feature[]|null
    builtArea:number|null
    area:number
    entryDate:Date
    isEntryDateFlexible:boolean|null
    phones:Phone[]
    adType:number
    isFrozen:boolean
    advertiser:User
}