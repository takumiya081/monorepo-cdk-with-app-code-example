#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';

import {CdkAnotherStack} from './lib/cdk-another-stack';

const app = new cdk.App();
// eslint-disable-next-line no-new
new CdkAnotherStack(app, 'CdkAnotherStack');
