# vendor? Shouldn't you just use npm?

Some packages we want to build ourselves instead of the pre-built version from webpack.
Specifically, the official Bootstrap doesn't support an NPM version where webpack can bring in less files and recompile them with project-specific overrides.  For that case, we bring in the source.
