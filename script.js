const btns = document.querySelectorAll('.keyBtn');
const displayValue = document.querySelector('#displayValue')
const clearBtn = document.querySelector('#clearBtn');
const delBtn = document.querySelector('#delBtn');

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


