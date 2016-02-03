#!/bin/bash

if [ -n "$(git diff --stat --cached -- src)" ]; then
	git stash -q --keep-index
	node_modules/.bin/gulp
	git stash pop -q
	git add dist/wrap-client.js -f
	git add dist/wrap-client.min.js -f
fi

exit 0
