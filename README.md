# Lambda Starter

Simple starter for AWS Lambda with Serverless Framework. SNS is used to trigger the Lambda, and any failures will be sent to a SQS Dead Letter Queue for retries. The SNS and SQS Dead Letter queue is created automatically when the lambda is deployed.

## Config

Example IAM policy, note that you should avoid `*` in production.
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:*",
                "cloudFormation:*",
                "lambda:*",
                "sqs:*",
                "logs:*",
                "sns:*",
                "iam:DeleteRolePolicy",
                "iam:DeleteRole",
                "iam:GetRole",
                "iam:CreateRole",
                "iam:PutRolePolicy",
                "iam:PassRole"
            ],
            "Resource": [
                "*"
            ]
        }
    ]
}
```

## Installation

First, you have to install [Yarn](https://yarnpkg.com/lang/en/docs/install/). Then:

```bash
# This will install all dependencies from package.json
$ yarn install

# We use foreman to load the environment variables from `.env` file.
# This is important to prevent accidental commit of sensitive data to github
$ yarn global add foreman
```

## Add/Remove packages

```bash
$ yarn add <PACKAGE_NAME>
$ yarn add --dev <PACKAGE_NAME>
$ yarn remove <PACKAGE_NAME>
```

## Environment

For development, store all the environment variable in the `.env` file. This will be included in `.gitignore` so that it will not be commited to github.
Make sure you create the `.env` file or the service will not run.

The `.env` should contain the following:
```bash
SNS_TOPIC=<THE_GENERATED_SNS_TOPIC>
```

## Start

To trigger the lambda locally:

```bash
$ nf start
```

This will execute the example at `scripts/trigger.js`.


## Test

You can use any reporters that are supported by istanbul: `clover`, `cobertura`, `html`, `json-summary`, `json`, `lcov`, `lcovonly`, `none`, `teamcity`, `text-lcov`, `text-summary`, `text`.

```
$ yarn test
```

## Report

```
$ yarn cover
```

## Build

```
$ yarn build
```

## Deploy and Create CloudFormation Stack

Do this for the first time:

```bash
$ make deploy
```

## Deploy the function only

```bash
$ make deploy-function
```

## Remove lambda

This operation will safely remove the lambda from S3 and clear the CloudFormation Stack.
```bash
$ sls remove
```
