#http-share
##v.0.1.0
###by: ok 2013

Share a directory over http with one command.

##Usage

Install globally with `npm install -g http-share`

Then create a new share from anywhere with `http-share`

You can set a specific port with `-p port` and a specific directory with `-d /dir/to/share`

Help is printed out with `http-share -h` or `http-share --help`

By default the port is 8080 and the directory is the current working directory (where you called `http-share`)

If no index is found in the shared dir, a directory-listing is created automagically (with connect.directory)

##License

MIT
