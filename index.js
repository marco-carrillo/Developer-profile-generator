const fs=require("fs");
const inquirer=require("inquirer");
const axios=require("axios");

//****************************************************** */
// Here we are asking a lot of questions from the user
//****************************************************** */

const questions=[{message: "What is your favorite color:",type: "input", name:  "name"},
                 {message:  "What is your Github user name:",type:"input",name: "githubP"}];   // asking for color and portfolio name

inquirer.prompt(questions).then(answers=>{

    const queryUrl = `https://api.github.com/users/${answers.githubP}`;  //  Building the API query
    console.log(queryUrl);

    axios.get(queryUrl).then(({data})=> {  // Getting user profile via API call to Github

        let profile_image=data.avatar_url;
        let user_name=data.login;
        let user_location=data.location;
        let user_github_prof_link=data.html_url;
        let user_blog_link=data.blog;
        let user_bio=data.bio;
        let NbrPubRep=data.public_repos;
        let NbrFollowers=data.followers;
        let NbrUsrFollowing=data.following;

        // let NbrGHstars=

        console.log("image: ",profile_image);
        console.log(user_name);
        console.log(user_location);
        console.log(user_github_prof_link);
        console.log(user_blog_link);
        console.log(user_bio);
        console.log(NbrFollowers);
        console.log(NbrUsrFollowing);


    });


});
