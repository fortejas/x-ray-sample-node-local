#!/usr/bin/env node
process.env["AWS_XRAY_DEBUG_MODE"] = "TRUE"

const AWSXRay = require('aws-xray-sdk');

// Enable manual mode - only express supports automatic mode.
AWSXRay.enableManualMode();


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function telemetry(ms, i) {
    console.log(`Task ${i} - Sleep for ${ms} ms ...`);
    await sleep(ms);
}


async function runOperations(n) {
    console.log(`Running ${n} operations sequentially...`)

    const segment = new AWSXRay.Segment("my-segment");

    for (let i = 0; i < n; ++i) {
        AWSXRay.captureAsyncFunc(`my-subsegment-${i}`, (subsegment) => {
            telemetry(1000, i);
            subsegment.close()
        }, segment);
    }

    segment.close();

    console.log("Done!")
}

runOperations(5);