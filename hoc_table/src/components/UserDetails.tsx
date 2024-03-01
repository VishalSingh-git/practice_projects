import React from 'react'
import HocTable from './HocTable'


const details:any=[
    {
        "Index":1,
        "Role":"Operations",
        "Name":"Waylon Dalton",
        "ID":"A1873",
        "Start Date":"May-11"
    },
    {
        "Index":2,
        "Role":"Operations",
        "Name":"Justine Henderson",
        "ID":"B56",
        "Start Date":"Jan-10"
    },
    {
        "Index":3,
        "Role":"Operations",
        "Name":"Abdullah Lang",
        "ID":"J5867",
        "Start Date":"Jan-14"
    },
    {
        "Index":4,
        "Role":"Operations",
        "Name":"Marcu Cruz",
        "ID":"B395",
        "Start Date":"Dec-13"
    }, {
        "Index":5,
        "Role":"Research",
        "Name":"Thalia Cobb",
        "ID":"C346",
        "Start Date":"Apr-13"
    }, {
        "Index":6,
        "Role":"Research",
        "Name":"Mathias Little",
        "ID":"D401",
        "Start Date":"Mar-11"
    },
    {
        "Index":7,
        "Role":"Research",
        "Name":"Eddie Randolph",
        "ID":"A576",
        "Start Date":"Jul-18"
    }, {
        "Index":8,
        "Role":"Contracts",
        "Name":"Angela Walker",
        "ID":"B31",
        "Start Date":"Feb-18"
    }, {
        "Index":9,
        "Role":"Contracts",
        "Name":"Lia Shelton",
        "ID":"C840",
        "Start Date":"Jan-16"
    } ,{
        "Index":10,
        "Role":"Contracts",
        "Name":"Hadassah Hartman",
        "ID":"D411",
        "Start Date":"Nov-15"
    }
]
type DetailItems={
    Index:number;
    Role:string;
    Name:string;
    ID:string;
    "Start Date":string
}

type UserDtailsProps={
    details:DetailItems[]
}

const UserDetails:React.FC<UserDtailsProps> = ({details}) => {
  return (
    <div>UserDetails</div>
  )
}

export default HocTable(UserDetails,details)
