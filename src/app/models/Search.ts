export interface Search{
    id:string
    city?:string|null
    street?:string|null
    assetType?:string[]|null
    maxPrice?:number|null
    minPrice?:null|number
    minAmoutOfRooms?:number|null
    maxAmoutOfRooms?:number|null
    features?:string[]|null
    minFloor?:number|null
    maxFloor?:number|null
    minArea?:number|null
    maxArea?:number|null
    entryDate?:Date|null
    immediateEntry?:boolean|null
    freeSearch?:string|null
}