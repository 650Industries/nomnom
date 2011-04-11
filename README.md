# nomnom
nomnom is a small option parser for node and CommonJS. It just parses your args and gives them back to you in a hash.

	var nomnom = require("nomnom");
	
	var opts = {
	  config: {
	    string: '-c PATH, --config=PATH',
	    default: 'config.json',
	    help: 'JSON file with tests to run'
	  },
	  debug: {
	    string: '-d',
	    help: 'Use debug mode'
	  }
	};
	
	var options = nomnom.parseArgs(opts);

	if(options.debug)
	  // do stuff
	
You don't even have to specify anything if you don't want to:
	var options = nomnom.parseArgs();

	var url = options[0]; // get the first positional arg
	var debug = options.debug // see if --debug was specified
	var verbose = options.v // see if -v was specified

# Install
for [node.js](http://nodejs.org/) and [npm](http://github.com/isaacs/npm):
	npm install nomnom

# More Details
By default, nomnom parses [node](http://nodejs.org/)'s `process.argv`. You can also pass in the args:
	var options = nomnom.parseArgs(opts, { argv: ["-xvf", "--atomic=true"] })
	
Values are JSON parsed, so `--debug=true --count=3 --file=log.txt` would give you:
	{ debug: true,
	  count: 3,
	  file: "log.txt"
	}
	
### positional args
All parsed arguments that don't fit the `-a` or `--atomic` format and aren't attached to an option are positional and can be matched on via the `position`:
	var opts = {
	  filename: {
	    position: 0,
	    help: 'file to edit'
	  }
	};
	var options = nomnom.parseArgs(opts);
	
	sys.puts(options.filename);

### printing usage
Nomnom prints out a usage message if `--help` or `-h` is an argument. You can disable this with the `printHelp` flag and specify the printing function with `printFunc` if you're not using node:

	nomnom.parseArgs(opts, { printHelp: false });

Usage for these options in `test.js`:
	var options = {
	  command: {
	    position: 0,
	    help: "either 'test', 'run', or 'xpi'" 
	  },
	  config: {
	    string: '-c FILE, --config=FILE',
	    help: 'json file with tests to run',
	  },
	  debug: {
	    string: '-d, --debug',
	    help: 'use debug mode'
	  }
	}

...would look like this:
	Usage: node test.js <command> [options]
	
	<command>		either 'test', 'run', or 'xpi'
	
	options:
	-c FILE, --config=FILE		json file with tests to run
	-d, --debug		use debug mode
	
Nomnom can't detect the alias used to run your script. You can use the `script` option to print the correct name instead of e.g. `node test.js`:
	nomnom.parseArgs(opts, { script : "test" });



	
	

