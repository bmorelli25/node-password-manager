console.log('Starting Password Manager...');

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
      }
    }).help('help');
  })
  .help('help')
  .argv;

var command = argv._[0];

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

if (command === 'create') {
  var createdAccount = createAccount({
    name: argv.name,
    username: argv.username,
    password: argv.password
  });
  console.log('Account created!');
  console.log(createdAccount);
} else if (command === 'get') {
  var fetchedAccount = getAccount(argv.name);

  if (typeof fetchedAccount === 'undefined') {
    console.log('Account not found');
  } else {
    console.log('Account found!');
    console.log(fetchedAccount);
  };
};
