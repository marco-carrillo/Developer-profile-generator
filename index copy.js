//******************** */
// Main functionality  */
//******************** */

const fs=require("fs-extra");
const inquirer=require("inquirer");
const axios=require("axios");
const template=require("./template");
const puppeteer=require("puppeteer");

//************************************************************/
//  Asking for background color, foreground color and names  *
//************************************************************/

const questions=[{message: 'Background color      : ',type:'list' ,name: 'bgColor', choices: ['blue','red','green','purple','black','orange','yellow','gold','white','silver']},
                 {message: 'Card color            : ',type:'list' ,name: 'color',   choices: ['blue','red','green','purple','black','orange','yellow','gold','white','silver']},
                 {message: 'Your Github user name : ',type:'input',name: 'githubP'}];

(async function(){
    try{
        const answers=await inquirer.prompt(questions);
    } catch(e){console.log('Error while asking questions :',e)}
})();

//**********************************************************************************/
//  First call to GitHub API, will get user informatin minus nuber of GitHub stars  *
//**********************************************************************************/

(async function(){
    try{
        const queryUrl = `https://api.github.com/users/${answers.githubP}`;   //  Building the API query to get user information from github
        const data=await axios.get(queryUrl);
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
        let nbrGHstars=0;  // zero for now, will get this number in the next call
    } catch (e) {console.log('Error while making first call to Git-hub API : ',e)}
})();

//********************************************************************** */
//  Now, it will make a second call to get the number of Github stars
//********************************************************************** */

(async function(){

    try{
        const queryUrl = `https://api.github.com/users/${answers.githubP}/repos?per_page=100`;
        const data= await axios.get(queryUrl);
        for(let i=0;i<data.length;i++){nbrGHstars=nbrGHstars+data[i].stargazers_count}
    } catch (e) {console.log('Error while calling Git-hub API 2 : ',e)}
})();

// Google link
let Googlel=`https://www.google.com/maps/search/?api=1&query=${user_location}`

// Generating HTML code
const content=template.usrProfile(profile_image,user_name,employer,user_location,user_bio,nbrPubRep,nbrFollowers,nbrGHstars,nbrUsrFollowing,Googlel,user_github_prof_link,user_blog_link);

//******************************************************** */
// This is the call to Puppeteer to transform HTML to PDF  *
//******************************************************** */

(async function(){
    try {
        const browser=await puppeteer.launch();
        const page=await browser.newPage();
        await page.setContent(content);
        await page.emulateMedia('screen');
        await page.pdf ({path:'businesscard.pdf', format: 'A4', printBackground: true });
        await browser.close();
        console.log('PDF has been generated using Puppeteer!!!!')
        process.exit();
    } catch(e) {console.log('Our error', e)}
})();
