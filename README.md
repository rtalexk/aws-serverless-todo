# Serverless Todo App Example

Example of Serverless App using the following AWS Services:

* **AWS Cognito** for authentication and authorization
* **AWS S3** to host frontend React app
* **AWS Api** Gateway to handle HTTP requests
* **AWS Lambda** to process HTTP requests
* **AWS DynamoDB** for persistence

## Disclaimer

This app was developed as demonstration purposes for an AWS study group. You're free to copy sections or the whole project without any explicit authorization under your own responsibility.

This application was developed without any concern of security on mind. Quality of code is not guaranteed and it can be improved without any effort, even by a kitten.

<a name="content"></a>

## Table of content

1) [Architecture](#architecture)
2) [Example](#example)
3) [Requirements](#requirements)
4) [Setting up Cognito](#cognito)
5) [Static web hosting in S3](#s3)
6) [Creating a Lambda Function](#lambda_01)
7) [Setting up a REST Api with Api Gateway](#api_gateway)
8) [Create DynamoDB table](#dynamodb)
9) [Handling HTTP Requests with Lambda](#lambda_02)
10) [Summary](#summary)

<a name="architecture"></a>

## Architecture Overview

The following architecture describes an application hosted in S3 that makes an authentication request to Cognito which retrieve a JWT Token if credentials are valid. This token is used for subsecuent requests to API Gateway to perform CRUD operations in DynamoDB thorough a Lambda Function.

![alt text](/assets/01-architecture.png "Serverless Todo App architecture")

[Go to table of content](#content)

<a name="example"></a>

## Example

Todo App with two todos, one of them completed.

![alt text](/assets/02-example.png "Serverless Todo App example")

[Go to table of content](#content)

<a name="requirements"></a>

## Requirements

1) AWS account with administrative access
2) Node.js v8+
3) NPM v5+ (used to build React app)

[Go to table of content](#content)

<a name="cognito"></a>

## Setting up Cognito

In this section you'll create an Amazon Cognito user pool to manage your users' accounts.

### Architecture overview

![alt text](/assets/04-cognito.png "Setting up Cognito")

[Go to table of content](#content)

<a name="s3"></a>

## Static web hosting in S3

WIP

### Architecture overview

![alt text](/assets/05-s3.png "Static web hosting in S3")

[Go to table of content](#content)

<a name="lambda_01"></a>

## Creating a Lambda Function

WIP

### Architecture overview

![alt text](/assets/06-lambda_01.png "Creating a Lambda Function")

[Go to table of content](#content)

<a name="api_gateway"></a>

## Setting up a REST Api with Api Gateway

WIP

### Architecture overview

![alt text](/assets/07-api_gateway.png "Setting up a REST Api with Api Gateway")

[Go to table of content](#content)

<a name="dynamodb"></a>

## Create DynamoDB table

WIP

### Architecture overview

![alt text](/assets/08-dynamodb.png "Create DynamoDB table")

[Go to table of content](#content)

<a name="lambda_02"></a>

## Handling HTTP Requests with Lambda

WIP

### Architecture overview

![alt text](/assets/09-lambda_02.png "Handling HTTP Requests with Lambda")

[Go to table of content](#content)

<a name="summary"></a>

## Summary

WIP

[Go to table of content](#content)
