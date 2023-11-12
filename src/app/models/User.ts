import { Apartment } from "./Apartment";
import { Search } from "./Search";

export interface User{
    firstName:string,
    lastName:string,
    mail:string,
    phone:string,
    favoriteApartments?:Apartment[]|null
    apartmentsForSelling?:Apartment[]|null
    lastApartmentSearches?:Search[]|null
}