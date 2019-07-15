## Cognito

1. Create user pool:
   - **User Pool**: `ServerlessTodos`
2. Step through settings
3. Add **UserPoolId** and **ClientId** to app's config
   - **UserPoolId**: `us-east-1_iP0JKqEmJ`
   - **ClientId**: `214olqv8arq3ipgscljpueins5`
4. Build react app
5. Create user
   - **user**: `rtalex`
   - **password**: `Laruta53`

## S3

1. Create S3: `prefix-serverlesstodosapp`
2. Upload build fields
3. Disable public access using **Bucket Policies**
4. Attach **Bucket Policy** for public access
```JSON
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::prefix-serverlesstodosapp/*"
        }
    ]
}
```
5. Configure as web hosting
   - http://prefix-serverlesstodosapp.s3-website-us-east-1.amazonaws.com

## Lambda

1. Create execution role: `ServerlessTodosLambda`
   - Attach Managed Policy: `AWSLambdaBasicExecutionRole`
2. Create Lambda `handleTodos`
3. Update basic code
```JS
exports.handler = async (event) => {
    const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          todos: [{
            CreatedBy: 'userName',
            Id: 1,
            Completed: false,
            CreatedAt: (new Date()).valueOf(),
            Text: 'Present ServerlessWorkshop',
          }]
        }),
    };
    return response;
};
```

## API Gateway

1. Create API `ServerlessTodos`
  - Edge optimized are best for public services being accessed from the Internet. Regional endpoints are typically used for APIs that are accessed primarily from within the same AWS Region.
2. Select **Edge Optimized** for **Endpoint Type**
3. Create **Authorizer** `ServerlessTodos` -> `Authorization`
   - Amazon API Gateway can use the JWT tokens returned by Cognito User Pools to authenticate API calls
4. Create **Resource** `/todos`
5. Create **Method** `any` with **LambdaProxyIntegration**
6. Attach **Authorizer** to `any` Endpoint
7. Deploy API
8. Update React config with URL:
   - `https://bnzdggzqfa.execute-api.us-east-1.amazonaws.com/prod`
9. Build React app

## DynamoDB

1. Create `Todos` table
2. Set `CreatedBy` as **Partition Key**
3. Set `Id` as **Sort Key**
4. Save NRN for reference:
   - `arn:aws:dynamodb:us-east-1:436887685341:table/Todos`

## Lambda - Handle HTTP Requests and DynamoDB ops

1. Update ZIP code
2. Test app
3. Add **Inline Policy** to `Lambda Execution Role` to add permissions over **DynamoDB** `Todos` table: `DynamoDBCrudAccess`
4. Test app

##
