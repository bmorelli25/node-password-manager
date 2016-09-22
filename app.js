console.log('Starting Password Manager...');

var storage = require('node-persist');
storage.initSync();

//account.name Facebook
//account.username User123
//account.password pass123

function createAccount (account) {
  var accounts = storage.getItemSync('accounts') || []; // default []

  accounts.push(account);
  storage.setItemSync('accounts', accounts);

  return account;
};

function getAccount (accountName) {
  var accounts = storage.getItemSync('accounts');
  var matchedAccount;

  accounts.forEach(function (account) {
    if (account.name === accountName) {
      matchedAccount = account;
    };
  });

  return matchedAccount;
};

// //TEST IT OUT
// createAccount({
//   name: 'Facebook',
//   username: 'User123',
//   password: 'pass123'
// });
//
// var facebookAcct = getAccount('Facebook');
// console.log(facebookAcct);
