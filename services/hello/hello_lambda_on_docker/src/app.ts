// eslint-disable-next-line import/no-extraneous-dependencies
import {
  APIGatewayEventRequestContext,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from 'aws-lambda';

export async function handler(
  event: APIGatewayProxyEvent,
  _c: APIGatewayEventRequestContext,
): Promise<APIGatewayProxyResult> {
  const payload = event.body ? JSON.parse(event.body) : null;
  // eslint-disable-next-line no-console
  console.log(payload, event.body);
  const name = payload?.name;
  return {
    statusCode: 201,
    body: JSON.stringify({
      greeting: `hello ${name}!!`,
    }),
  };
}
