include .env

deploy:
	yarn install
	yarn build
	yarn install --production
	sls deploy

deploy-function:
	yarn install
	yarn build
	yarn install --production
	sls deploy function -f greet -s prod -r ap-southeast-1