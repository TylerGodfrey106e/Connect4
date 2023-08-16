import React, { useEffect, useState } from "react";
//import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
 
const Record = (props) => (
 <tr>
   <td>{props.record.name}</td>
   <td>{props.record.moves}</td>
 </tr>
);
 
export default function RecordList() {
 const [records, setRecords] = useState([]);
 console.log("got here")
 // This method fetches the records from the database.
 useEffect(() => {
   async function getRecords() {
     const response = await fetch(`http://localhost:5050/record/`);
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }

     let records = await response.json();
     const sorted = await records.sort(sortByScore);
     setRecords(sorted);
   }
 
   getRecords();
 
   return;
 }, [records.length]);
 

 function sortByScore(a, b) {
  return a.moves - b.moves;
}
 

 // This method will map out the records on the table
 function recordList() {
   return records.map((record) => {
     return (
       <Record
         record={record}
         key={record._id}
       />
     );
   });
 }
 
 // This following section will display the table with the records of individuals.
 return (
  <>
   <div className="highScoreList">
     <h3>High Score List</h3>
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th>Name</th>
           <th>Moves</th>
         </tr>
       </thead>
       <tbody>{recordList()}</tbody>
     </table>
   </div>
   <div>
      <NavLink className="nav-link" to="/">
        <button>
          Back to Game
        </button> 
       </NavLink>
   </div>
  </>
 );
}