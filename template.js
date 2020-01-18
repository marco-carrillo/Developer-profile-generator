exports.usrProfile=function(image,name,work,location,bio,nbrRepos,nbrFollowers,gitStars,nbrFollowing,Googlelink,GHlink,BLlink,bgcolor,frcolor){

return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>${name} profile</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">  
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.11.2/css/all.css">
    <style>
       .mcard {
           background-color: ${frcolor}
       }
    </style>
</head>
<body style="background-color: ${bgcolor};">

<div class="jumbotron mcard my-5 text-center">
    <img src="${image}" alt="user image" class="rounded-circle" style="height:200px">
    <h1>Hi!</h1>
    <h1>My name is ${name}</h1>
    <h3>Currently @ ${work}</h3>
    <div class="row">
        <div class="col-4 text-right">
            <a href="${Googlelink}">
               <h5><i class="fas fa-location-arrow"></i>${location}</h5>
            </a>
        </div>

        <div class="col-4 text-center">
            <a href="${GHlink}">
                <h5><i class="fab fa-github-alt"></i>Github</h5>
            </a>
        </div>

        <div class="col-4 text-left">
            <a href="${BLlink}">
                <h5><i class="fas fa-rss-square"></i>Blog</h5>
            </a>
        </div>
    </div>

</div>  <!--end of Jumbotron-->

<div class="row">
    <div class="col-12 text-center">
        <h3>${bio}</h3>
    </div>
</div>  <!--End of Bio-->

<div class="row" style="height:50px"></div>  <!--card divider row-->

<!--Two cards, one for Public repositories and another one for Followers-->

<div class="row">
    <div class="col"></div>
    <div class="col-5 text-center mcard">
        <div class="row">
            <div class="col-12 text-center">
                 <h3>Public Repositories</h3>
            </div>
        </div>
        <div class="row">
             <div class="col-12">
                  <h3>${nbrRepos}</h3>
             </div>
        </div>
    </div>

    <div class="col-1"></div>  <!--middle divider-->

    <div class="col-5 text-center mcard">
        <div class="row">
            <div class="col-12 text-center">
                 <h3>Followers</h3>
            </div>
        </div>
        <div class="row">
             <div class="col-12">
                  <h3>${nbrFollowers}</h3>
             </div>
        </div>
    </div>
    <div class="col"></div>

</div>

<div class="row" style="height:50px"></div>  <!--card divider row-->

<!--Two cards, one for GitHub stars and Following-->

<div class="row">
    <div class="col"></div>
    <div class="col-5 text-center mcard">
        <div class="row">
            <div class="col-12 text-center">
                 <h3>GitHub stars</h3>
            </div>
        </div>
        <div class="row">
             <div class="col">
                  <h3>${gitStars}</h3>
             </div>
        </div>
    </div>

    <div class="col-1"></div>  <!--middle divider-->

    <div class="col-5 text-center mcard">
        <div class="row">
            <div class="col text-center">
                 <h3>Following</h3>
            </div>
        </div>
        <div class="row">
             <div class="col">
                  <h3>${nbrFollowing}</h3>
             </div>
        </div>
    </div>
    <div class="col"></div>

</div>

</body>
</html>`
}