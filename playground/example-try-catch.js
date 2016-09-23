function doWork () {
  throw  new Error('Unable to do work!!');
};

try {
  doWork();
} catch (e) {
  // ONLY EXECUTED IF ERROR THROWN
  console.log(e.message);
} finally {
  // NO MATTER WHAT HAPPENS IN TRY, THIS GETS EXECUTED
  console.log('Finally block');
};

console.log('try catch ended');
