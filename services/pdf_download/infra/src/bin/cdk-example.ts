#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';

import {CdkExampleStack} from './lib/cdk-example-stack';

const app = new cdk.App();
// eslint-disable-next-line no-new
new CdkExampleStack(app, 'CdkExampleStack');
