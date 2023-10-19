// sharedMemoryManager.js
import { sharedArray } from 'k6/data';

// Initialize shared array (for demonstration purposes)
const sharedArrayName = 'mySharedArray';
const arraySize = 10;
const initialValue = 0;
let initialized = false;

if (!initialized) {
    sharedArray[sharedArrayName] = new Array(arraySize).fill(initialValue);
    initialized = true;
}

export function setSharedValue(index, value) {
    sharedArray[sharedArrayName][index] = value;
}

export function getSharedValue(index) {
    return sharedArray[sharedArrayName][index];
}
