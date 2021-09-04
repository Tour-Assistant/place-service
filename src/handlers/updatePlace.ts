import { APIGatewayProxyResult } from "aws-lambda";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import validator from "@middy/validator";
import createError from "http-errors";
import { v4 as uuid } from "uuid";

import commonMiddleware from "src/lib/commonMiddleware";
import { createPlaceSchema } from "src/lib/schemas/createPlaceSchema";
import { MiddyRequest } from "src/types/middy";

const dynamodb = new DocumentClient();

async function updatePlace(
  event: MiddyRequest
): Promise<APIGatewayProxyResult> {
  const { id } = event.pathParameters;
  const { name } = event.body;

  try {
    const params = {
      TableName: process.env.PLACE_SERVICE_TABLE_NAME,
      Key: { id },
      ExpressionAttributeNames: {
        "#n": "name",
      },
      UpdateExpression: "set #n = :n",
      ExpressionAttributeValues: {
        ":n": name,
      },
      ReturnValues: "ALL_NEW",
    };
    const { Attributes: place } = await dynamodb.update(params).promise();
    return {
      statusCode: 201,
      body: JSON.stringify({ place }),
    };
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
}

export const handler = commonMiddleware(updatePlace).use(
  validator({
    inputSchema: createPlaceSchema,
    ajvOptions: {
      useDefaults: true,
      strict: false,
    },
  })
);
