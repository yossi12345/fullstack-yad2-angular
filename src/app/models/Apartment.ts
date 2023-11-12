import { Phone } from "./Phone"
import { User } from "./User"
export interface Apartment{
    Id:string,
    ImagesPaths:string[]|null
    StreetNumber:number
    street:string
    city:string
    price:string
    amountOfRooms:number
    amountOfShowerRooms:number
    type:string
    description:string
    condition:string
    View:string|null
    isRearAsset:boolean
    floor:number|null
    amountOfFloorsInBuilding:null|number
    amountOfParkingPlaces:null|number
    amountOfBalcony:null|number 
    features:string[]|null
    builtArea:number|null
    area:number
    entryDate:Date
    isEntryDateFlexible:boolean|null
    phones:Phone[]
    adType:number
    isFrozen:boolean
    advertiser:User
}