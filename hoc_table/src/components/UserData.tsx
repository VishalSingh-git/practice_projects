import React from "react";
import HocTable from "./HocTable";
const data = [
  {
    " Index": 1,
    ID: 121,
    "FIRST NAME": "Phyllis",
    "LAST NAME": "Berry",
  },
  {
    Index: 2,
    ID: 122,
    "FIRST NAME": "Benjamin",
    "LAST NAME": "Baker",
  },
  {
    Index: 3,
    ID: 123,
    "FIRST NAME": "Laura",
    "LAST NAME": "Castillo",
  },
  {
    Index: 4,
    ID: 124,
    "FIRST NAME": "Phillip",
    "LAST NAME": "Burton",
  },
  {
    Index: 5,
    ID: 125,
    "FIRST NAME": "Brent",
    "LAST NAME": "Gonzales",
  },
  {
    Index: 6,
    ID: 126,
    "FIRST NAME": "jessie",
    "LAST NAME": "Henry",
  },
  {
    Index: 7,
    ID: 127,
    "FIRST NAME": "Beatrice",
    "LAST NAME": "Ruiz",
  },
];

type DataItems = {
  Index: number;
  ID: number;
  "FIRST NAME": string;
  "LAST NAME": string;
}[];

type UserDataProps ={
    data:DataItems[];
}


const UserData: React.FC <UserDataProps>= ({data}) => {
  return <div>UserData</div>;
};

export default HocTable(UserData, data);
