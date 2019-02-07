# Sample - Send AWS X-Ray Traces locally with NodeJS

## Starting the X-Ray Daemon

Install the AWS X-Ray daemon as documented [here](https://docs.aws.amazon.com/xray/latest/devguide/xray-daemon.html#xray-daemon-downloading).

Run the X-Ray daemon using the following arguments:

```bash
$ ./xray -b 0.0.0.0:2000 -t 0.0.0.0:2000 -o -l dev -n <your region>
```

## Testing X-Ray traces via NodeJS

Ensure that you have an IAM environment that allows sending to X-Ray. Configure via the AWS CLI by running `aws configure`.

Run the test as follows:

```bash
$ npm i
$ npm run test
```
