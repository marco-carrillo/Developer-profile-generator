//******************** */
// Main functionality  */
//******************** */

const inquirer=require("inquirer");
const axios=require("axios");
const template=require("./template");
const puppeteer=require("puppeteer");
const fs=require("fs").promises;
const nodemailer=require("nodemailer");

// asking for color and portfolio name
const questions=[{message: 'Background color      : ',type:'list' ,name: 'bgColor', choices: ['blue','red','green','purple','black','orange','yellow','gold','white','silver']},
                 {message: 'Card color            : ',type:'list' ,name: 'color',   choices: ['blue','red','green','purple','black','orange','yellow','gold','white','silver']},
                 {message: 'Your Github user name : ',type:'input',name: 'githubP'},
                 {message: 'Email address         : ',type:'input',name: 'emaila'}];

inquirer.prompt(questions).then(answers=>{

    const queryUrl = `https://api.github.com/users/${answers.githubP}`;   //  Building the API query to get user information from github
    axios.get(queryUrl).then(({data})=> {  // Getting user profile via API call to Github

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
        let nbrGHstars=0;  // will get this number in the next API call

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

        // Getting googleLink
        let Googlel=`https://www.google.com/maps/search/?api=1&query=${user_location}`

        // This is the call to the pdf generator
        const content=template.usrProfile(profile_image,user_name,employer,user_location,user_bio,nbrPubRep,nbrFollowers,nbrGHstars,nbrUsrFollowing,Googlel,user_github_prof_link,user_blog_link,answers.bgColor,answers.color);

        // Calling Puppeteer to change the 
        (async function(){
            try {
                const browser=await puppeteer.launch();
                const page=await browser.newPage();
                await page.setContent(content);
                await page.emulateMedia('screen');
                await page.pdf ({path:'businesscard.pdf', format: 'A4', printBackground: true });
                await browser.close();
                console.log('PDF file has been generated using Puppeteer!!!!');

                // specifying transport for e-mail
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
                // exiting process
                process.exit();
            } catch(e) {console.log('Error while writing PDF file:  ', e)}
        })();

        //***********************/
        // Writing HTML code    */
        //***********************/
        (async function(){
            try{
                await fs.writeFile('businesscard.html',content);
                console.log('HTML file has been generated successfully!!!!')
            }catch(e){console.log('Error while writing HTML file : ',e)}
        })();

       

    });          // Axios first call to get basic information from Github
});              // Inquirer call to ask for favorite color plus Git repository
