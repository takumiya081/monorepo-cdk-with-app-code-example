import {CdkAnotherStack} from '@service-another/infra';
import {CdkExampleStack} from '@service-pdf-download/infra';
import * as cdk from 'aws-cdk-lib';

const app = new cdk.App();
// eslint-disable-next-line no-new
new CdkExampleStack(app, 'CdkExampleStack');
// eslint-disable-next-line no-new
new CdkAnotherStack(app, 'CdkAnotherStack');
