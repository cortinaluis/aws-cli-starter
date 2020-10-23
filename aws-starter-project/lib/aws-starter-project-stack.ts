import { join } from "path";
import * as cdk from "@aws-cdk/core";
import { Function, Code, Runtime } from "@aws-cdk/aws-lambda";
import { SqsEventSource } from "@aws-cdk/aws-lambda-event-sources";
import { Queue } from "@aws-cdk/aws-sqs";
import { Topic } from "@aws-cdk/aws-sns";
import { SqsSubscription } from "@aws-cdk/aws-sns-subscriptions";

export class AwsStarterProjectStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const myLambda = new Function(this, "my-lambda", {
      code: Code.fromAsset(join(__dirname, "./my-lambda-folder")),
      handler: "my-lambda-code.myFunction",
      runtime: Runtime.NODEJS_12_X,
    });
    const myQueue = new Queue(this, "MyBeautifulQueue");

    const topic = new Topic(this, "MyBeatifulTopic");

    const topicSubscription = new SqsSubscription(myQueue);

    topic.addSubscription(topicSubscription);

    myLambda.addEventSource(new SqsEventSource(myQueue));
  }
}
