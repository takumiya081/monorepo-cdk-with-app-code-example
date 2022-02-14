import appRoot from 'app-root-path';
import {IgnoreMode, Stack, StackProps} from 'aws-cdk-lib';
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import {Construct} from 'constructs';

export class HelloStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    const helloOnDockerFunction = new lambda.DockerImageFunction(this, 'helloOnDocker', {
      functionName: 'helloOnDocker',
      code: lambda.DockerImageCode.fromImageAsset(appRoot.toString(), {
        file: 'services/hello/hello_lambda_on_docker/Dockerfile',
        // > https://github.com/aws/aws-cdk/issues/3899#issuecomment-888349479
        ignoreMode: IgnoreMode.DOCKER,
        exclude: ['infra/cdk.out', 'infra/cdk*'],
      }),
      architecture: lambda.Architecture.ARM_64,
    });

    // eslint-disable-next-line no-new
    new apigw.LambdaRestApi(this, 'Endpoint', {
      handler: helloOnDockerFunction,
    });
  }
}
