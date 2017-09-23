import React from "react";

const Train = ({ train }) =>{
 const destination = train.destination[0].locationName
return (
<div>
<div>{destination}</div>
<div>{train.std}</div>
</div>
)}

export default Train;
