import { APIGatewayProxyResult } from "aws-lambda";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import validator from "@middy/validator";
import createError from "http-errors";
import { v4 as uuid } from "uuid";

import commonMiddleware from "src/lib/commonMiddleware";
import { createPlaceSchema } from "src/lib/schemas/createPlaceSchema";
import { MiddyRequest } from "src/types/middy";

const dynamodb = new DocumentClient();

async function deletePlace(
  event: MiddyRequest
): Promise<APIGatewayProxyResult> {
  const { id } = event.pathParameters;

  try {
    const params = {
      TableName: process.env.PLACE_SERVICE_TABLE_NAME,
      Key: { id },
    };
    await dynamodb.delete(params).promise();
    return {
      statusCode: 201,
      body: JSON.stringify({ id }),
    };
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
}

export const handler = commonMiddleware(deletePlace);
