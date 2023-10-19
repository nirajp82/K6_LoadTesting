// sharedMemoryManager.js
import { sharedArray } from 'k6/data';

// Initialize shared array (for demonstration purposes)
const sharedArrayName = 'mySharedArray';
const arraySize = 10;
const initialValue = 0;
let initialized = false;

//To avoid race conditions and ensure that shared resources are initialized correctly, use the __VU and __ITER built-in variables provided by K6. __VU represents the current Virtual User number,
//and __ITER represents the current iteration for that Virtual User.

//initialized will be set to true only for the first VU (where __VU === 1) during the first iteration (__ITER === 0).
//This ensures that the initialization logic runs only once for the first VU during the first iteration, preventing race conditions.
if (!initialized && __VU === 1 && __ITER === 0) {
    sharedArray[sharedArrayName] = new Array(arraySize).fill(initialValue);
    initialized = true;
}

export function setSharedValue(key, value) {
    sharedArray[sharedArrayName][key] = value;
}

export function getSharedValue(key) {
    return sharedArray[sharedArrayName][index];
}
