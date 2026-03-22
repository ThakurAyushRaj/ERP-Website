// const {add} = require('./add');
// const subtract = require('./add');
const { add, subtract } = require('./add');
console.log("Hello, World! This is the backend server.");

function greet(){
    let a = 20;
    let b= 30
    return add(a,b)+subtract(a,b);
}

const sum = greet();
console.log("The result of the greet function is: ", sum);