var argparse = require("../lib/argparse"),
    assert = require("assert");

opts = [
  { name: 'config',
    string: '-c',
    default: 'c.json' 
  },
  { name: 'debug',
    long: '--debug=BOOL',
    default: true
  },
  { name: "aname",
    default: 'adef',
  },
  { string: "--bname",
    default: 'bdef',
  },
  { long: "--cname",
    default: 'cdef',
  }
];

var parser = new argparse.ArgParser(opts);
var options = parser.parse(["-c", "other.json", "--debug=false"]);

assert.equal(options.config, "other.json");
assert.equal(options.debug, false);

var options = parser.parse(["-c", "--debug"]);

assert.equal(options.config, "c.json");
assert.equal(options.debug, true);
assert.equal(options.aname, "adef");
assert.equal(options.bname, "bdef");
assert.equal(options.cname, "cdef");