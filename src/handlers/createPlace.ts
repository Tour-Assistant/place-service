import { APIGatewayProxyResult } from "aws-lambda";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import validator from "@middy/validator";
import createError from "http-errors";
import { v4 as uuid } from "uuid";

import commonMiddleware from "src/lib/commonMiddleware";
import { createPlaceSchema } from "src/lib/schemas/createPlaceSchema";
import { MiddyRequest } from "src/types/middy";

const dynamodb = new DocumentClient();

async function createTour(event: MiddyRequest): Promise<APIGatewayProxyResult> {
  const { name } = event.body;
  const place = {
    id: uuid(),
    name,
  };

  try {
    const params = {
      TableName: process.env.PLACE_SERVICE_TABLE_NAME,
      Item: place,
    };
    await dynamodb.put(params).promise();
    return {
      statusCode: 201,
      body: JSON.stringify({ place }),
    };
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
}

export const handler = commonMiddleware(createTour).use(
  validator({
    inputSchema: createPlaceSchema,
    ajvOptions: {
      useDefaults: true,
      strict: false,
    },
  })
);
