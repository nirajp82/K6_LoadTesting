# K6_LoadTesting

## What is k6?
k6 is a developer-centric, free and open-source load testing tool built for making performance testing a productive and enjoyable experience.

## Key features
* k6 is packed with features, which you can learn all about in the documentation. Key features include:
** CLI tool with developer-friendly APIs.
** Scripting in JavaScript ES2015/ES6 - with support for local and remote modules
** Checks and Thresholds - for goal-oriented, automation-friendly load testing

## Use cases
k6 users are typically Developers, QA Engineers, and DevOps. They use k6 for testing the performance of APIs, microservices, and websites. Common k6 use cases are:
* **Load testing**: 
k6 is optimized for minimal consumption of system resources. It’s a high-performance tool designed for running tests with high load (spike, stress, soak tests) in pre-production and QA environments.
* **Performance monitoring**: 
k6 provides great primitives for performance testing automation. You could run tests with a small amount of load to continuously monitor the performance of your production environment.

## Options
Options allow you to configure how k6 will behave during test execution.

Options can be a part of the script code so that they can be version controlled. They can also be specified with command-line flags, environment variables or via a config file. The order of precedence is as follows:

command-line flags > environment variables > exported script options > config file > defaults

Options from each level will overwrite the options from the next level, with the command-line flags having the highest precedence.

* **Stages: ** A list of VU { target: ..., duration: ... } objects that specify the target number of VUs to ramp up or down to for a specific period. Available in k6 run and k6 cloud commands.

// The following config would have k6 ramping up from 1 to 10 VUs for 3 minutes, 
 then staying flat at 10 VUs for 5 minutes, then ramping up from 10 to 35 VUs 
 over the next 10 minutes before finally ramping down to 0 VUs for another 
3 minutes. 
```
export let options = { 
     stages: [ 
              { duration: '3m', target: 10 }, 
              { duration: '5m', target: 10 }, 
              { duration: '10m', target: 35 }, 
              { duration: '3m', target: 0 } ] 
};
```
	
 * **Iterations:** An integer value, specifying the total number of iterations of the default function to execute in the test run, as opposed to specifying a duration of time during which the script would run in a loop.
	     Together with the vus option, iterations is a shortcut for a single scenario with a shared iterations executor.
	    By default, the maximum duration of a shared-iterations scenario is 10 minutes. You can adjust that time via the maxDuration option of the scenario, or by also specifying the duration global shortcut option.
	    Note that iterations aren't fairly distributed with this option, and a VU that executes faster will complete more iterations than others. Each VU will try to complete as many iterations as possible, "stealing" them from the total number of iterations for the test. So, depending on iteration times, some VUs may complete more iterations than others. If you want guarantees that every VU will complete a specific, fixed number of iterations, use the per-VU iterations executor.
	
	* **Vus (Virtual User):** An integer value specifying the number of VUs to run concurrently, used together with the iterations or duration options. If you'd like more control look at the stages option or scenarios.
	
	* **RPS:** The maximum number of requests to make per second, in total across all VUs. 
	
	* **Scenarios:**  Scenarios allow us to make in-depth configurations to how VUs and iterations are scheduled. This makes it possible to model diverse traffic patterns in load tests. Benefits of using scenarios include:
	** Multiple scenarios can be declared in the same script, and each one can independently execute a different JavaScript function, which makes organizing tests easier and more flexible.
	** Every scenario can use a distinct VU and iteration scheduling pattern, powered by a purpose-built executor. This enables modeling of advanced execution patterns which can better simulate real-world traffic.
	** They can be configured to run in sequence or parallel, or in any mix of the two.
	** Different environment variables and metric tags can be set per scenario.
		
  ```
		export let options = {
		  scenarios: {
		    example_scenario: {
			  // name of the executor to use 
		      executor: 'shared-iterations',
		
		      // common scenario configuration
		      startTime: '10s',
		      gracefulStop: '5s',
		      env: { EXAMPLEVAR: 'testing' },
		      tags: { example_tag: 'testing' },
		
		      // executor-specific configuration
		      vus: 10,
		      iterations: 200,
		      maxDuration: '10s',
		    },
		    another_scenario: { ... }
		   }
		}
``` 
* **Metrics:** 
	* Custom Metrics

	* Checks: Checks are like asserts but differ in that they don't halt the execution, instead, they just store the result of the check, pass or fail, and let the script execution continue. Take a look at thresholds for a way to halt the execution. Checks are great for codifying assertions relating to HTTP requests/responses, making sure the response code is 2xx for example:
	```
		import { check } from 'k6';
		import http from 'k6/http';
		
		export default function () {
		  let res = http.get('http://test.k6.io/');
		  check(res, {
		    'is status 200': (r) => r.status === 200,
		    'body size is 1176 bytes': (r) => r.body.length == 1176,
		  });
		}
```
* **Threadhold:** Thresholds are a pass/fail criteria used to specify the performance expectations of the system under test.
	Example expectations (Thresholds):
	System doesn't produce more than 1% errors.
** Response time for 95% of requests should be below 200ms.
** Response time for 99% of requests should be below 400ms.
** Specific endpoint must always respond within 300ms.
** Any conditions on any Custom metric.
	     Thresholds analyze the performance metrics and determine the final test result (pass/fail). Thresholds are a essential for load-testing automation.
	     Here is a sample script that specifies two thresholds, one evaluating the rate of http errors (http_req_failed metric) and one using the 95 percentile of all the response durations (the http_req_duration metric).
	
 ```
	import http from 'k6/http';
	
	export let options = {
	  thresholds: {
	    // http errors should be less than 1% 
	    http_req_failed: ['rate<0.01'],   
	    
	    // 95% of requests should be below 200ms
	    http_req_duration: ['p(95)<200'], 
	  },
	};
	
	export default function () {
	  http.get('https://test-api.k6.io/public/crocodiles/1/');
	}
``` 

In other words, you specify the pass criteria when defining your threshold, and if that expression evaluates to false at the end of the test, the whole test will be considered a fail.
![image](https://user-images.githubusercontent.com/61636643/123272320-a36bc580-d4cf-11eb-996f-87c1b5797305.png)


Reference: 
https://github.com/cajames/performance-testing-with-k6

Performance Testing your web app with k6![image](https://user-images.githubusercontent.com/61636643/123273184-69e78a00-d4d0-11eb-91da-8d37c387d75a.png)



