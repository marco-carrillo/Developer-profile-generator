//******************** */
// Main functionality  */
//******************** */
const fs=require("fs");
const inquirer=require("inquirer");
const axios=require("axios");
const template=require("./template");
const pdf = require('html-pdf');
const options = { format: 'Letter' };


// asking for color and portfolio name
const questions=[{message: "What is your favorite color:",type: "input", name:  "name"},
                 {message:  "What is your Github user name:",type:"input",name: "githubP"}];

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
        let nbrGHstars=0;  // will get this number in the next call

        //  Now, it will make a second call to get the number of Github stars
        const queryUrl = `https://api.github.com/users/${answers.githubP}/repos?per_page=100`;
        axios.get(queryUrl).then(({data})=> {  // Getting user profile via API call to Github
            for(let i=0;i<data.length;i++){nbrGHstars=nbrGHstars+data[i].stargazers_count}

            console.log("image link:  ",profile_image);
            console.log("User name:   ",user_name);
            console.log("Location:    ",user_location);
            console.log("Employer:    ",employer);
            console.log("Github link: ",user_github_prof_link);
            console.log("Blog link:   ",user_blog_link);
            console.log("User bio:    ",user_bio);
            console.log("# followers: ",nbrFollowers);
            console.log("# following: ",nbrUsrFollowing);
            console.log("stargazers:  ",nbrGHstars);

            // This is the call to the pdf generator

            const html=template.usrProfile(profile_image,user_name,employer,user_location,user_bio,nbrPubRep,nbrFollowers,nbrGHstars,nbrUsrFollowing);
            pdf.create(html, options).toFile('./businesscard.pdf', function(err, res) {
                if (err) return console.log(err);
                console.log(res); // { filename: '/businesscard.pdf' }
            });

        }); // Second Axious call to get repos 
    });     // Axios first call to get basic information from Github
});         // Inquirer call to ask for favorite color plus Git repository
