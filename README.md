#http-share
##v.0.1.6
###by: ok 2013

Share a directory over http with one command.

##Usage

Install globally with `npm install -g http-share`

Then create a new share from anywhere with `http-share [options]`

  Options _(all are optional)_ :

    -h, --help                      output usage information
    -V, --version                   output the version number
    -p, --port <port>               Port for server to run on (default: 8080)
    -d, --dir <dir>                 Shared directory (default: current working directory)
    -a, --auth <username:password>  Basic auth, separate username & password with a colon
    -l, --log [level]               Enable access-log. Levels: default, short, tiny, dev
    -n, --nodirlists                Disable automatic directory listings
    -s, --ssl <key.pem>,<cert.pem>  Enable ssl encryption, separate filenames with a comma

Press 'esc', 'q', 'x' or 'ctrl' + 'c' to stop the server.

Directory listings are created automatically, unless an index is found.

##License

MIT
