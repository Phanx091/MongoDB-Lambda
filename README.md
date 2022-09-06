# Springboard Lambda Example
An example of a Lambda connected to Springboard [Mongo DB](https://www.npmjs.com/package/mongodb) using sample data


## Getting started

To get started you'll need to npm install and build

```
npm install
npm run build
```
Then you'll need to use a few different terminal windows to run local, docker build, and a send event
```
npm run dev
docker build -t js-lambda . (In a different terminal) 
./send_lambda_event.sh (In a different terminal) 
```

## Requirement

You'll need to add your credentials for AdministratorAcess via AWS in your terminal

```
export AWS_ACCESS_KEY_ID=""
AWS_SECRET_ACCESS_KEY=""
AWS_SESSION_TOKEN=""
```

## Test

Use the built-in continuous npm watch package.

```
npm run watch 
```
Use the tail command to watch the output logs via terminal
```
tail -f dist/logs/out.log 
```

***

