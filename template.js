exports.usrProfile=function(name,work,location,bio,nbrRepos,nbrFollowers,gitStars,nbrFollowing){

return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>${name} profile</title>
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.11.2/css/all.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
</head>
<body style="background-color: blanchedalmond;">

<div class="jumbotron bg-info my-5 text-center" style="z=-2">
    <img src="https://avatars2.githubusercontent.com/u/56275183?v=4" alt="user image" class="rounded-circle" style="height:200px; z=-1">
    <h1>Hi!</h1>
    <h1>My name is ${name}</h1>
    <h3>Currently @ ${work}</h3>
    <div class="row">
        <div class="col-4 text-right">
            <h5><i class="fas fa-location-arrow"></i>${location}</h5>
        </div>

        <div class="col-4 text-center">
            <h5><i class="fab fa-github-alt"></i>Github</h5>
        </div>

        <div class="col-4 text-left">
            <h5><i class="fas fa-rss-square"></i>Blog</h5>
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
    <div class="col-5 text-center bg-danger">
        <div class="row">
            <div class="col text-center">
                 <h3>Public Repositories</h3>
            </div>
        </div>
        <div class="row">
             <div class="col">
                  <h3>${nbrRepos}</h3>
             </div>
        </div>
    </div>

    <div class="col-1"></div>  <!--middle divider-->

    <div class="col-5 text-center bg-danger">
        <div class="row">
            <div class="col text-center">
                 <h3>Followers</h3>
            </div>
        </div>
        <div class="row">
             <div class="col">
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
    <div class="col-5 text-center bg-danger">
        <div class="row">
            <div class="col text-center">
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

    <div class="col-5 text-center bg-danger">
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