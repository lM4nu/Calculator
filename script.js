const btns = document.querySelectorAll('.keyBtn');
const displayValue = document.querySelector('#displayValue')
const clearBtn = document.querySelector('#clearBtn');
const delBtn = document.querySelector('#delBtn');
const eqBtn = document.querySelector('.equalBtn');
let displayStr = [];

const checktype = (value) => /\d/.test(value) ;
const checkConsecutiveOp = (value) => /\D{2}/.test(value) ;


const updateDisplay = (e) => {
const value = e.target.value;


//makes imposible to enter an operator as a first input
if( !displayStr.join('') ){
	if( !checktype(value) ) return;
}

displayStr.push(value);
//removes the last operator so there can not be two consecutives ones before displaying it
if( checkConsecutiveOp( displayStr.join('') ))	displayStr.splice(-1,1); 

displayValue.innerText = displayStr.join('');

}



btns.forEach( btn => btn.addEventListener( 'click', updateDisplay ) );

// clears the whole display and the str containing the info displayed
clearBtn.addEventListener('click', () => {
displayValue.innerText = '' ;
displayStr = [];
});

// clears the last entrie from both the display and the str containing it
delBtn.addEventListener('click', () => {
displayStr.splice(-1,1);
displayValue.innerText = displayStr.join('');
});


//split the whole string by + and -
eqBtn.addEventListener('click', () =>{
const result = splitter(displayStr.join(''),'\\+|\\-') //splits by + and - for example "2x2x2+5" returns [2x2x2,+,5] 
.map( el => {
if( el.search(/×|%/) != -1 ) return multiDivSolver(el);//if the elements is a multiplication solves it else return the number
return el } )
.join('')

displayStr = [];
displayValue.innerText = multiDivSolver(result) ;


});


//receives a string and a second string that will be converted to regex to split the str wihtout deleting the regex
const splitter = (str,reg) => {
const regex = new RegExp(reg); 
let auxStr = str.slice().split("");
let aux = [];

let count = 0;


// if didnt found the regex just return the str
if(auxStr.join('').search(regex) == -1) {
aux.push(auxStr.join(''));
return aux;
}

//push to aux from the begining of the str passed to where is the first match of the regex 
//for example 23*2
for(let i=0;i<10;i++){
 
aux.push( auxStr.splice( 0,auxStr.join("").search(regex)).join('') );// push 23
aux.push(auxStr.splice(0,1).join('')); //push * (if matches the regex)

if( auxStr.join("").search(regex) == -1  ){

aux.push(auxStr.splice(0,10).join(''))//if any regex is found then pushes the rest (2 in the example);
i = 11;
}


}


return aux; // returns an array with [23,*,2]
}

//receives a string with numbers and an operators ex: 2x2x2
const multiDivSolver = (str) => {
if(str.toString().search(/×|%|\+|\-/) == -1 ) {
return str;
}

let auxStr = splitter(str,'×|%|\\+|\\-'); //calls split to split the two numbers from the operator [2,x,2,x,2]
let aux ;
while (auxStr.length > 2) {
aux = solver(auxStr.splice(0,3));//pass the str first 3 items [2,x,2] to solver while also removinig it from the arr
auxStr.unshift(aux);  //and adding the result to where it was the operation before [2,x,2,x,2] -> [4,x,2] and repeats til its solved 


}

return aux;

}

//receives an array with a number in its 0 and 2 index and an operator in the 2 index
const solver = (arr) => {
const fnum = arr[0];
const op = arr[1];
const snum = arr[2];
if(op == '×') return parseFloat(fnum) * parseFloat(snum);
if(op == '%') return parseFloat(fnum) / parseFloat(snum);
if(op == '+') return parseFloat(fnum) + parseFloat(snum);
if(op == '-') return parseFloat(fnum) - parseFloat(snum);


}




