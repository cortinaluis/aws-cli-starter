#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { AwsStarterProjectStack } from "../lib/aws-starter-project-stack";

const app = new cdk.App();
new AwsStarterProjectStack(app, "MyStackLuisCortina", {
  stackName: "MyStackLuisCortina",
});
