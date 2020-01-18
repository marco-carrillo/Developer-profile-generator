const countPersonalStars = require('.')

// use your username, 'ZYSzys' is mine
countPersonalStars('marco-carrillo', (err, total) => {
  console.log(err || total)
});
// =>
// Just a number.