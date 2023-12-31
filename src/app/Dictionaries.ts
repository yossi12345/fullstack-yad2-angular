type Dictionary={
    [key:string]:string|null|number
}
export function getKeyByValue(dict: Dictionary, value: string | null | number): string | undefined {
    return Object.keys(dict).find(key => dict[key] === value);
}
export const APARTMENT_CONDITIONS:Dictionary={
    "חדש מקבלן(לא גרו בו בכלל)":1,
    "חדש (נכס בן עד 10 שנים)":2,
    "משופץ (שופץ ב5 השנים האחרונות)":3,
    "במצב שמור(במצב טוב, לא שופץ)":4,
    "דרוש שיפוץ(זקוק לעבודת שיפוץ)":5
}
export const APARTMENT_AMOUNT_OF_SHOWER_ROOMS:Dictionary={
    "1":1,
    "2":2,
    "3":3,
    "4+":4
}
export const APARTMENT_AMOUNT_OF_PARKING_PLACES:Dictionary={
    "ללא":0,
    "1":1,
    "2":2,
    "3":3,
}
export const APARTMENT_AMOUNT_OF_BALCONY:Dictionary={
    "ללא":0,
    "1":1,
    "2":2,
    "3":3,
    "4":4,
}
export const SEARCH_ORDER_BY:Dictionary={
    "לפי תאריך":"date",
    "מחיר - מהזול ליקר":"price",
    "מחיר - מהיקר לזול":"price descending"
}
export const SEARCH_FILTERS:Dictionary={
    "עם מחיר":"price",
    "עם תמונה":"image"
}
export const APARTMENT_VIEWS:Dictionary={
    "ללא":null,
    "לים":"לים",
    "לפארק":"לפארק",
    "לעיר":"לעיר"
}
export const APARTMENT_ADS_TYPES:Dictionary={
    "אפורה":1,
    "צהובה":2,
    "VIP צהובה":3
}