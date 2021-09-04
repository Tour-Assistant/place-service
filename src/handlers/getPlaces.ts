import { APIGatewayProxyResult } from "aws-lambda";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import createError from "http-errors";

import commonMiddleware from "src/lib/commonMiddleware";
import { MiddyRequest } from "src/types/middy";

const dynamodb = new DocumentClient();

async function getPlaces(event: MiddyRequest): Promise<APIGatewayProxyResult> {
  const params = {
    TableName: process.env.PLACE_SERVICE_TABLE_NAME,
  };
  try {
    const { Items } = await dynamodb.scan(params).promise();
    return {
      statusCode: 201,
      body: JSON.stringify(Items),
    };
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
}

export const handler = commonMiddleware(getPlaces);
