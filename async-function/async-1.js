// penggunaan timeout 

// console.log('Selamat datang!');
 
// setTimeout(() => {
//   console.log('Terima kasih sudah mampir, silakan datang kembali!');
// }, 3000)
 
// console.log('Ada yang bisa dibantu?');

// penggunaan callback

// function getUsers(callback) {
//  // simulate network delay
//  setTimeout(() => {
//    const users = ['John', 'Jack', 'Abigail'];

//    callback(users);
//  }, 3000);
// }

// function usersCallback(users) {
//  console.log(users);
// }

// getUsers(usersCallback);

// penggunaan callback 2
// function getUsers(isOffline, callback) {
//  // simulate network delay
//  setTimeout(() => {
//    const users = ['John', 'Jack', 'Abigail'];

//    if (isOffline) {
//      callback(new Error('cannot retrieve users due offline'), null);
//      return;
//    }

//    callback(null, users);
//  }, 3000);
// }

// function usersCallback(error, users) {
//  if (error) {
//    console.log('process failed:', error.message);
//    return;
//  }
//  console.log('process success:', users);
// }

// getUsers(false, usersCallback); // process success: ['John', 'Jack', 'Abigail']
// getUsers(true, usersCallback); // process failed: cannot retrieve users due offline

// syncronous process

// function getUserWeather(userId) {
//  try {
//    const user = getUser(userId);
//    const weather = getWeather(user.location);
//    return { ...user, ...weather };
//  } catch (error) {
//    console.log(error.message);
//    return null;
//  }
// }

// const userWeather = getUserWeather(1);
// console.log(userWeather); // { id: 1, name: 'John Doe', location: 'Jakarta', weather: 'Sunny', temperature: 30 }

// asyncronous process with promises
function getUsers(isOffline) {
 // return a promise object
 return new Promise((resolve, reject) => {

   // simulate network delay
   setTimeout(() => {
     const users = ['John', 'Jack', 'Abigail'];
   
     if (isOffline) {
       reject(new Error('cannot retrieve users due offline'));
       return;
     }

     resolve(users);
   }, 3000);
 });
}

getUsers(true)
 .then(users => console.log(users))
 .catch(err => console.log(err.message));