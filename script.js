const btns = document.querySelectorAll('.keyBtn');
const displayValue = document.querySelector('#displayValue')
const clearBtn = document.querySelector('#clearBtn');
const delBtn = document.querySelector('#delBtn');
const eqBtn = document.querySelector('.equalBtn');
let displayStr = [];

const checktype = (value) => /\d/.test(value) ? true : false;
const checkConsecutiveOp = (value) => /\D{2}/.test(value) ? true : false;


const updateDisplay = (e) => {
const value = e.target.value;

if( !displayStr.join('') ){
	if( !checktype(value) ) return;
}

displayStr.push(value);

if( checkConsecutiveOp( displayStr.join('') ))	displayStr.splice(-1,1); 

displayValue.innerText = displayStr.join('');

}



btns.forEach( btn => btn.addEventListener( 'click', updateDisplay ) );

clearBtn.addEventListener('click', () => {
displayValue.innerText = '' ;
displayStr = [];
});

delBtn.addEventListener('click', () => {
displayStr.splice(-1,1);
displayValue.innerText = displayStr.join('');
});

eqBtn.addEventListener('click', () =>{
const result = splitter(displayStr.join(''),'\\+|\\-').map( el => {
if( el.search(/×|%/) != -1 ) return multiDivSolver(el);
return el;


} ).join('')
console.log(result);
displayStr = [];
displayValue.innerText = multiDivSolver(result);


});

const splitter = (str,reg) => {
const regex = new RegExp(reg); 
let auxStr = str.slice().split("");
let aux = [];

let count = 0;

if(auxStr.join('').search(regex) == -1) {
aux.push(auxStr.join(''));
return aux;
}

for(let i=0;i<10;i++){
 
aux.push( auxStr.splice( 0,auxStr.join("").search(regex)).join('') );
aux.push(auxStr.splice(0,1).join(''));

if( auxStr.join("").search(regex) == -1  ){

aux.push(auxStr.splice(0,10).join(''))
i = 11;
}


}


return aux;
}

const multiDivSolver = (str) => {
if(str.toString().search(/×|%|\+|\-/) == -1 ) {
return str;
}

let auxStr = splitter(str,'×|%|\\+|\\-');
let aux ;
while (auxStr.length > 2) {
aux = solver(auxStr.splice(0,3));
auxStr.unshift(aux);


}

return aux;

}


const solver = (str) => {
const fnum = str[0];
const op = str[1];
const snum = str[2];
if(op == '×') return parseInt(fnum) * parseInt(snum);
if(op == '%') return parseInt(fnum) / parseInt(snum);
if(op == '+') return parseInt(fnum) + parseInt(snum);
if(op == '-') return parseInt(fnum) - parseInt(snum);


}




