import myCurrentLocation1 from './myModule'; // also acceptable
import myCurrentLocation2, { getGreeting, message, name } from './myModule';
import addNumber, {subtract} from './math' 


console.log('------------------------------------------------myModule.js');
console.log(myCurrentLocation1, myCurrentLocation2);
console.log(message, name);
console.log(getGreeting('Joe Ydoan Rauzes'));
console.log('------------------------------------------------math.js');
console.log('Add (a, b): ', addNumber(1, -2));
console.log('Subtract (a, b): ', subtract(10, 5));
console.log('------------------------------------------------END');