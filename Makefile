.PHONY: test
all: build run
build:
	npm run build
install:
	npm install
clean:	
	rm -rf node_modules .out package-lock.json
run:
	node .out/main.js
test:
	npm run test
test-ffmpeg:
	npm run test test/ffmpeg.test.ts
clean-test:
	rm -rf .tmp/vid0.mp3
	rm -rf .tmp/vid0.info