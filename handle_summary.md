In k6, the `handleSummary` function is a special function that allows you to define custom logic for summarizing the test results after the test execution is complete. This function is typically used to calculate and display custom metrics, aggregate data, and generate reports based on the test run. You can use the `summary` object within the `handleSummary` function to access various metrics and customize the way the test results are presented.

Here's an example of how you can use `handleSummary` along with custom metrics in k6:

```javascript
import http from 'k6/http';
import { sleep, check } from 'k6';

// Custom metrics to store response times
let responseTimes = [];

// Custom metric for counting successful responses
export let successfulResponses = new Counter('successful_responses');

export let options = {
    thresholds: {
        // Define your performance thresholds here if needed
    },
};

export default function () {
    const startTime = new Date();

    // Send an HTTP GET request to the specified endpoint
    const response = http.get('https://example.com/api/resource');

    // Calculate response time and store it in the custom metric
    const endTime = new Date();
    const responseTime = endTime - startTime;
    responseTimes.push(responseTime);

    // Check if the response is successful and increment the custom counter
    check(response, {
        'is status 200': (r) => r.status === 200,
    });
    if (response.status === 200) {
        successfulResponses.add(1); // Increment the successfulResponses counter by 1
    }

    // Sleep for a short duration to simulate realistic user behavior
    sleep(1);
}

export function handleSummary(data) {
    // Calculate and print custom metrics when the test is completed
    const totalRequests = data.metrics.http_reqs;
    const totalResponseTime = responseTimes.reduce((a, b) => a + b, 0);
    const averageResponseTime = totalResponseTime / totalRequests;

    console.log(`Total requests sent: ${totalRequests}`);
    console.log(`Total time taken to process requests: ${totalResponseTime} ms`);
    console.log(`Average response time: ${averageResponseTime} ms`);
    console.log(`Number of successful responses: ${successfulResponses.value}`);
}
```

In this example, the `responseTimes` array stores individual response times for each request, and the `successfulResponses` counter keeps track of the number of successful responses (HTTP status code 200). The `handleSummary` function is used to calculate and print custom metrics like total requests sent, total time taken, average response time, and the number of successful responses after the test execution is complete.

You can customize the `handleSummary` function to calculate and display other custom metrics based on your specific testing requirements. The `summary` object provides access to various metrics such as response times, request rates, error rates, and custom metrics, allowing you to create detailed reports and analysis based on your load tests.
