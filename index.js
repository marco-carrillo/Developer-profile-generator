//**************************************************************************************************************/
//  The following function will interpret, parse and return the header information received from Github.
//  Returns null if no more API calls are needed, or returns the next queryURL for the next API call
//**************************************************************************************************************/

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


//*****************************************************/
// Main Program functionality, defining dependencies  */
//****************************************************/

const inquirer=require("inquirer");
const axios=require("axios");
const template=require("./template");
const puppeteer=require("puppeteer");
const fs=require("fs").promises;
const nodemailer=require("nodemailer");

const questions=[{message: 'Background color   : ',type:'list' ,name: 'bgColor', choices: ['blue','red','green','purple','black','orange','yellow','gold','white','silver']},
                 {message: 'Card color         : ',type:'list' ,name: 'color',   choices: ['blue','red','green','purple','black','orange','yellow','gold','white','silver']},
                 {message: 'Github user name   : ',type:'input',name: 'githubP'},
                 {message: 'Email address      : ',type:'input',name: 'emaila'}];

(async function(){
    try {

        //*****************************************/
        //  Calling inquirer to get user's input  */
        //*****************************************/
        answers= await inquirer.prompt(questions);

        //***********************************************************/
        //  Calling the Github API to get user profile information  */
        //***********************************************************/

        let queryUrl = `https://api.github.com/users/${answers.githubP}`;
        console.log('Getting profile information from Github')
        response= await axios.get(queryUrl);
        data=response.data;

        let profile_image=data.avatar_url;
        let user_name=data.login;
        let user_location=data.location;
        let employer=data.company;
        let user_github_prof_link=data.html_url;
        let user_blog_link=data.blog;
        let user_bio=data.bio;
        let nbrPubRep=data.public_repos;
        let nbrFollowers=data.followers;
        let nbrUsrFollowing=data.following;
        let nbrGHstars=0;  // will get this number in the second API call
        let content='';    // will get this number in the second API call
        let Googlel=`https://www.google.com/maps/search/?api=1&query=${user_location}`;
        content=template.usrProfile(profile_image,user_name,employer,user_location,user_bio,nbrPubRep,nbrFollowers,nbrGHstars,nbrUsrFollowing,Googlel,user_github_prof_link,user_blog_link,answers.bgColor,answers.color);
        console.log('Successfully called GitHub API to get basic data');

        //**************************************************************************************************************/
        //  Calling the Github API to get the number of Github stars.  If the user has fewer than 100 repositories
        //  only one call will be needed.  The returned header contains the information whether more calls are needed
        //  to get the full number of repositories and properly count the number of stars
        //**************************************************************************************************************/

        let iterate=false;  
        let n=0;
        queryUrl = `https://api.github.com/users/${answers.githubP}/repos?per_page=100`;

        do{
            n++;
            iterate=false;
            console.log(`Getting data from Github to calculate stars:  Page ${n}.  Total Github stars so far ${nbrGHstars}`);
            let response= await axios.get(queryUrl);
            data=response.data;

            for(let i=0;i<data.length;i++){nbrGHstars=nbrGHstars+data[i].stargazers_count}

            if(typeof response.headers.link!=='undefined'){
                queryUrl=getNextPage(response.headers.link);  // interprets the response
                if (queryUrl!==null){iterate=true};
            };

        } while (iterate);

        Googlel=`https://www.google.com/maps/search/?api=1&query=${user_location}`;
        content=template.usrProfile(profile_image,user_name,employer,user_location,user_bio,nbrPubRep,nbrFollowers,nbrGHstars,nbrUsrFollowing,Googlel,user_github_prof_link,user_blog_link,answers.bgColor,answers.color);
        console.log(`Successfully called GitHub API to get Github stars.  Total stars:  ${nbrGHstars}`);

        //*********************************************/
        //  Calling Pupeteer to create the PDF file   */
        //*********************************************/

        const browser=await puppeteer.launch();
        const page=await browser.newPage();
        await page.setContent(content);
        await page.emulateMedia('screen');
        await page.pdf ({path:'businesscard.pdf', format: 'A4', printBackground: true });
        await browser.close();
        console.log('PDF file has been generated using Puppeteer!!!!');

        //**********************************************************/
        //  Starting e-mail process to send attachment via e-mail  */
        //**********************************************************/

        let transporter=nodemailer.createTransport({
            service: 'gmail',
            auth:{user:'richmondbootcamp.001', pass: 'Rr12345RR'}
        })

        // sending e-mail
        let info=await transporter.sendMail({
            from: '"Homework 9" <richmondbootcamp.001@gmail.com>',
            to: answers.emaila,
            subject:  'Your requested pdf file',
            text:  'See attached document',
            attachments: [{path: 'businesscard.pdf'}]
        })
        console.log(`Email successfully sent to ${answers.emaila}!!!!!`);

        //********************************************************************/
        //  Writing another file with the HTML code, just in case is needed  */
        //********************************************************************/

        await fs.writeFile('businesscard.html',content);
        console.log('HTML file has been generated successfully!!!!')

        //************************/
        //  Exiting the process  */
        //************************/
        process.exit();
    } catch(e) {console.log('Error while writing PDF file:  ', e)}
})();