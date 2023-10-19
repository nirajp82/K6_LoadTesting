import { setSharedValue, getSharedValue } from './sharedMemoryManager.js';
import { MY_VARIABLE, ANOTHER_VARIABLE } from './env.js';


export default function () {
    // Set a value in the shared memory array
    let indexToSet = 3;
    let valueToSet = 42;
    setSharedValue(indexToSet, valueToSet);

    // Get a value from the shared memory array
    let indexToGet = 3;
    let retrievedValue = getSharedValue(indexToGet);
    console.log('Retrieved Value:', retrievedValue);

      console.log('MY_VARIABLE:', MY_VARIABLE);
    console.log('ANOTHER_VARIABLE:', ANOTHER_VARIABLE);

}
