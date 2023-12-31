
export class SubItem{
    name:string
    icon?:string
    url?:string
    constructor(name:string,icon?:string,url?:string){
        this.name=name
        this.icon=icon
        this.url=url
    }
}
export const PHONE_NUMBER_REGEX=/^(050|052|053|054|057|058)-\d{7}$/ 
export const itemsForHeader=[
    {
        url:'/search-apartment',
        iconName:'home',
        itemName:'נדל"ן',
        groupLinks1:  [
            new SubItem("דירות למכירה",undefined,'/search-apartment'),
            new SubItem("דירות להשכרה"),
            new SubItem('נדל"ן מסחרי'),
            new SubItem("בתים מארחים"),
        ],
        groupLinks2:[  
            new SubItem("יד1 דירות חדשות",'building'),
            new SubItem("כונס נכסים","hammer"),
            new SubItem("הערכת שווי נכס","calculator"),
            new SubItem("משרדי תיווך בישראל","home"), 
        ]
    },
    {
        iconName:'car',
        itemName:'רכב',
        groupLinks1:[
            new SubItem("כל הרכבים"),
            new SubItem("מסחרי"),
            new SubItem("ג'פים"),
            new SubItem("אופנועים"),
            new SubItem("קטנועים"),
            new SubItem("מיוחדים"),
            new SubItem("אביזרים"),
            new SubItem("משאיות"),
            new SubItem("כלי שייט"),
        ],
        groupLinks2:[
            new SubItem("קטלוג רכבים","car2"),
            new SubItem("מחירון רכב","car3"),
            new SubItem("מימון רכב","calculator"),
        ]
        
    },
    {
        iconName:'sofa',
        itemName:'יד שנייה',
        groupLinks1:[
            new SubItem("כל המוצרים"),
            new SubItem("מוצרי חשמל"),
            new SubItem("ריהוט"),
            new SubItem("עסקים למכירה"),
            new SubItem("ספורט"),
            new SubItem("סלולרי"),
            new SubItem("לתינוק ולילד"),
            new SubItem("הכל בחינם!"),
        ],
        groupLinks2:[
            new SubItem("קונסולות משחק"),
            new SubItem("מחשבים וציוד נלווה"),
            new SubItem("לגינה"),
            new SubItem("אופנה וטיפוח"),
        ],
        
    },
    {
        iconName:'bag',
        itemName:'דרושים IL',
        groupLinks1:[
            new SubItem("כלבים"),
            new SubItem("חתולים"),
            new SubItem("תוכים ובעלי כנף"),
            new SubItem("דגים"),
            new SubItem("זוחלים"),
            new SubItem("מכרסמים"),
            new SubItem("סוסים"),
            new SubItem("תרנגולים"),
            new SubItem("חיות משק"),
            new SubItem("חמוסים"),
        ],
        groupLinks2:[]
        
    },
    {
        iconName:'bag2',
        itemName:'עסקים למכירה',
        groupLinks1:[
            new SubItem("כלבים"),
            new SubItem("חתולים"),
            new SubItem("תוכים ובעלי כנף"),
            new SubItem("דגים"),
            new SubItem("זוחלים"),
            new SubItem("מכרסמים"),
            new SubItem("סוסים"),
            new SubItem("תרנגולים"),
            new SubItem("חיות משק"),
            new SubItem("חמוסים"),
        ],
        groupLinks2:[]
        
    },
    {
        iconName:'dog',
        itemName:'חיות מחמד',
        groupLinks1:[
            new SubItem("כלבים"),
            new SubItem("חתולים"),
            new SubItem("תוכים ובעלי כנף"),
            new SubItem("דגים"),
            new SubItem("זוחלים"),
            new SubItem("מכרסמים"),
            new SubItem("סוסים"),
            new SubItem("תרנגולים"),
            new SubItem("חיות משק"),
            new SubItem("חמוסים"),
        ],
        groupLinks2:[]
        
    },
    {
        iconName:'wrench',
        itemName:'בעלי מקצוע',
        groupLinks1:[  
            new SubItem("כלבים"),
            new SubItem("חתולים"),
            new SubItem("תוכים ובעלי כנף"),
            new SubItem("דגים"),
            new SubItem("זוחלים"),
            new SubItem("מכרסמים"),
            new SubItem("סוסים"),
            new SubItem("תרנגולים"),
            new SubItem("חיות משק"),
            new SubItem("חמוסים"),
        ],
        groupLinks2:[]
    },
    {
        iconName:'open-book',
        itemName:"מגזין יד2",
        groupLinks1:[],
        groupLinks2:[]
    }
]
