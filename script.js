
//Selectors
const billInput=document.querySelector('.bill-input');
const peopleInput=document.querySelector('.people-input');
const tipPerPerson=document.getElementById('tip-amount');
const totalPerPerson=document.getElementById('total-amount');
const tips=document.querySelectorAll('.tip');
const tipCustom=document.querySelector('.tip-custom');
const reset=document.querySelector('.reset');
const error=document.querySelector('.error');

//default values of tip and total amount
tipPerPerson.innerHTML='$'+ (0.0).toFixed(2);
totalPerPerson.innerHTML='$'+ (0.0).toFixed(2);


billInput.addEventListener('input', billInputNumber);
peopleInput.addEventListener('input', peopleInputNumber);
tipCustom.addEventListener('input', tipCustomNumber);
reset.addEventListener('click', resetApp);


let billValue=0.0;
let peopleValue=1;
let tipValue=0.15;

function billInputNumber(){
billValue=parseFloat(billInput.value);
calculateTip();

}

function peopleInputNumber(){
    peopleValue=parseFloat(peopleInput.value);

    if(peopleValue<1){
        error.style.display='flex';
        peopleInput.style.border='thick solid red';
    } else {
        error.style.display='none';
        peopleInput.style.border='none';
        calculateTip();
    }
    
}

function tipCustomNumber(){
    tipValue=parseFloat(tipCustom.value/100);
    tips.forEach(val=>{
        val.classList.remove('active-tip');
    })
    calculateTip();
}


tips.forEach(tip=>{
    tip.addEventListener('click', clickHandler)
})

function clickHandler(e){
    tips.forEach(tip=>{
        tip.classList.remove('active-tip');
        if(e.target.innerHTML===tip.innerHTML){
            tip.classList.add('active-tip');
            tipValue=parseFloat(tip.innerHTML)/100;
        }
    })
    calculateTip();
}


function calculateTip(){
    if(peopleValue>=1){
        let tipAmount=(billValue*tipValue)/peopleValue;
        let total=(billValue+tipAmount)/peopleValue;
        tipPerPerson.innerHTML='$'+ tipAmount.toFixed(2);
        totalPerPerson.innerHTML='$'+ total.toFixed(2);
    }
}

function resetApp(){
billInput.value='0.0';
billInputNumber();
peopleInput.value='1';
peopleInputNumber();
tipCustom.value='';
tips.forEach(tip=>{
    tip.classList.remove('active-tip');
})
}