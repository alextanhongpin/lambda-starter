include .env

deploy:
	API_KEY=${API_KEY} TEMPLATE=${TEMPLATE} sls deploy

deploy-function:
	yarn install --production
	API_KEY=${API_KEY} sls deploy function -f email -s prod -r ap-southeast-1