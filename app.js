console.log('Starting Password Manager...');

var crypto = require('crypto-js');
var storage = require('node-persist');
storage.initSync();

var argv = require('yargs')
  .command('create', 'Create an account username and password', function (yargs) {
    yargs.options({
      name: {
        demand: true,
        alias: 'n',
        description: 'Account Name',
        type: 'string'
      },
      username: {
        demand: true,
        alias: 'u',
        description: 'Account Username',
        type: 'string'
      },
      password: {
        demand: true,
        alias: 'p',
        description: 'Account Password',
        type: 'string'
      },
      masterPassword: {
        demand: true,
        alias: 'm',
        description: 'Master Password',
        type: 'string'
      }
    }).help('help');
  })
  .command('get', 'Get an accound username and password', function (yargs) {
    yargs.options({
      name: {
        demand: true,
        alias: 'n',
        description: 'Account Name',
        type: 'string'
      },
      masterPassword: {
        demand: true,
        alias: 'm',
        description: 'Master Password',
        type: 'string'
      }
    }).help('help');
  })
  .help('help')
  .argv;

var command = argv._[0];
var masterPassword = argv.masterPassword;

function getAccounts (masterPassword) {
  // use getItemSync to fetch accounts
  var encryptedAccounts = storage.getItemSync('accounts');
  var accounts = []; //set accounts default

  // decrypt
  if (typeof encryptedAccounts !== 'undefined') {
    var bytes = crypto.AES.decrypt(encryptedAccounts, masterPassword);
    var accounts = JSON.parse(bytes.toString(crypto.enc.Utf8));
  }

  // return accounts array
  return accounts
};

function saveAccounts (accounts, masterPassword) {
  // encrypt accounts
  var encryptedAccounts = crypto.AES.encrypt(JSON.stringify(accounts), masterPassword);

  // Save it to local storage
  storage.setItemSync('accounts', encryptedAccounts.toString());

  //return accounts
  return accounts;
};

function createAccount (account, masterPassword) {
  var accounts = getAccounts(masterPassword);
  accounts.push(account);

  saveAccounts(accounts, masterPassword);

  return account;
};

function getAccount (accountName, masterPassword) {
  var accounts = getAccounts(masterPassword);
  var matchedAccount;

  accounts.forEach(function (account) {
    if (account.name === accountName) {
      matchedAccount = account;
    };
  });

  return matchedAccount;
};

if (command === 'create') {
  var createdAccount = createAccount({
    name: argv.name,
    username: argv.username,
    password: argv.password
  }, masterPassword);
  console.log('Account created!');
  console.log(createdAccount);
} else if (command === 'get') {
  var fetchedAccount = getAccount(argv.name, masterPassword);

  if (typeof fetchedAccount === 'undefined') {
    console.log('Account not found');
  } else {
    console.log('Account found!');
    console.log(fetchedAccount);
  };
};
