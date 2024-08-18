.PHONY: test
all: build run
build:
	npm run build
install:
	npm install
clean:	
	rm -rf node_modules .out package-lock.json
	rm -rf .tmp/*
run:
	node .out/main.js
test:
	npm run test
test-ffmpeg:
	npm run test test/ffmpeg.test.ts
clean-test:
	rm -rf .tmp/vid0.mp3
	rm -rf .tmp/vid0.info
setup:
	mkdir -p .tmp
	lux -o .tmp -f 136 https://www.youtube.com/watch?v=RQ6i00rTILk