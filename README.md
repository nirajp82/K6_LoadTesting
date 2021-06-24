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



