function getNextPage(header){

    let list=header.split(',');        // spliting the response from Github
    next_page=-1;                      // contains the element holding the address for the next page
    list.forEach((element,index)=>{    // Finding out which one element has the 
        if(element.includes('next')){next_page=index}
    });

    if (next_page===-1){ return null}  // if no more page, exits and returns nothing
    list2=list[next_page].split(';')   // separating link from indicator

    return list2[0].replace('<','').replace('>','').trim();;
}


//******************** */
// Main functionality  */
//******************** */
'use strict';
const axios=require("axios");
let nbrGHstars=0;


(async function(){

try{

    let iterate=false;  // iterate is false.  Won't iterate unless is necessary (most cases don't need iterations)
    let queryUrl = `https://api.github.com/users/sindresorhus/repos?per_page=100`;
    // queryUrl = `https://api.github.com/users/marco-carrillo/repos?per_page=100`;
    let n=0;

    do{
            n++;
            iterate=false;
            console.log(`Processing page ${n} to calculate GitHub stars`);
            let response= await axios.get(queryUrl);   // Calling 
            const data=response.data;

            for(let i=0;i<data.length;i++){
                nbrGHstars=nbrGHstars+data[i].stargazers_count
            }
            if(typeof response.headers.link!=='undefined'){

                queryUrl=getNextPage(response.headers.link);  // interprets the response
                if (queryUrl!==null){iterate=true};
            };
            console.log(`Total Github stars where ${nbrGHstars}`)

        } while (iterate);


} catch (e) {console.log('Error while calling Git-hub API 1 : ',e)}
})();

