var argv = require('yargs')
  .command('hello', 'Greets the user', function (yargs) {
    yargs.options({
      name: {
        demand: true,
        alias: 'n',
        description: 'Your first name goes here'
      },
      lastname: {
        demand: true,
        alias: 'l',
        description: 'Your last name goes here'
      }
    }).help('help');
  })
  .help('help')
  .argv;
var command = argv._[0];
var name = argv.name;
var lastName = argv.lastname;

console.log(argv);

if (command === 'hello' && typeof name!== 'undefined' && typeof lastName !== 'undefined') {
  console.log('Hello ' + name + ' ' + lastName);
} else if (command === 'hello' && typeof name!== 'undefined'){
  console.log('Hello ' + name);
} else if (command === 'hello') {
  console.log('Hello World');
};
