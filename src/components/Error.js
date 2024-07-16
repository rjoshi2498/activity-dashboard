import React from 'react';
export default function Error({message}) {
    return(
<div class="error-container"> 
        <h1> {message} </h1> 
        <p> 
            Oops! The page you're 
            looking for is not here. 
        </p> 
    </div> 
    )
}
