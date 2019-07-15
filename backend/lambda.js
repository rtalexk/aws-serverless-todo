const DynamoDB = require('aws-sdk').DynamoDB;
const uuid = require('uuid/v4');

// Create a connection to DynamoDB
const ddb = new DynamoDB.DocumentClient();
const TableName = 'Todos';

exports.handler = async (event, context) => {
  console.log(event);

  if (!event.requestContext.authorizer) {
    return errorResponse('Authorization not configured', context.awsRequestId);
  }

  const username = event.requestContext.authorizer.claims['cognito:username'];
  const body = JSON.parse(event.body);

  switch (event.httpMethod) {
    case 'GET':
      try {
        const todos = await getTodos(username);
        return successResponse({ todos });
      } catch (error) {
        console.log(error);
        return errorResponse(error.message, context.awsRequestId);
      }
    case 'POST':
      if (!body || !body.Todo) {
        return errorResponse('"todo" field is required', context.awsRequestId);
      }

      try {
        const createdTodo = await createTodo(body.Todo, username);
        return successResponse({ todo: createdTodo })
      } catch (err) {
        console.log(err);
        return errorResponse(err.message, context.awsRequestId);
      }
    case 'PUT':
      if (!body || !body.Id) {
        return errorResponse('"todoId" field is required', context.awsRequestId);
      }

      try {
        const updatedTodo = await toggleTodo(username, body.Id);
        return successResponse({ todo: updatedTodo });
      } catch (err) {
        console.log(err);
        return errorResponse(err.message, context.awsRequestId);
      }
    default: return {
      statusCode: 400,
      body: 'Bad Request',
    };
  }
}

/**
 *
 * @param { string } username Partition Key. Owner of Todos
 * @returns { Promise<Array<any>> } Array of Todos
 */
async function getTodos(username) {
  const result = await ddb.query({
    TableName,
    KeyConditionExpression: '#CreatedBy = :CreatedBy',
    ExpressionAttributeNames: {
      '#CreatedBy': 'CreatedBy',
    },
    ExpressionAttributeValues: {
      ':CreatedBy': username,
    },
  }).promise();

  return result.Items;
}

/**
 *
 * @param { string } todo Text of todo
 * @param { string } username owner of todo
 * @returns { Promise<Object> } Created todo
 */
async function createTodo(todo, username) {
  const Item = {
    Id: uuid(),
    CreatedBy: username,
    CreatedAt: new Date().valueOf(),
    Completed: false,
    Text: todo,
  };

  await ddb.put({ TableName, Item }).promise();

  return Item;
}

/**
 *
 * @param { string } username Owner of todo
 * @param { string } todoId ID of todo
 * @returns { Promise<Object> } Todo with `Completed` field inverted
 */
async function toggleTodo(username, todoId) {
  const getParams = {
    TableName,
    Key: {
      CreatedBy: username,
      Id: todoId
    }
  };

  const response = await ddb.get(getParams).promise();
  const currentTodo = response.Item;

  const newTodo = {
    ...currentTodo,
    Completed: !currentTodo.Completed,
  };

  const toggleParams = {
    ...getParams,
    UpdateExpression: 'SET #Completed = :Completed',
    ExpressionAttributeNames: { '#Completed': 'Completed' },
    ExpressionAttributeValues: { ':Completed': newTodo.Completed }
  };

  await ddb.update(toggleParams).promise();

  return newTodo;
}

function successResponse(body) {
  return {
    statusCode: 200,
    body: JSON.stringify(body),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  };
}

function errorResponse(errorMessage, awsRequestId) {
  return {
    statusCode: 500,
    body: JSON.stringify({
      Error: errorMessage,
      Reference: awsRequestId,
    }),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  };
}
