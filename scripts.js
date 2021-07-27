const inputBill = document.querySelector('#inputBill');
const inputPeople = document.querySelector('#inputPeople');
const btnTips = document.querySelectorAll('.btnTip');
const amountPrice = document.querySelector('#amountPrice');
const totalPrice = document.querySelector('#totalPrice');
const labels = document.querySelectorAll('.label');//Text area where the warning message will be. I selected all of then if I wanted to add warning messages to the other labels eventually.
const btnReset = document.querySelector('#btnReset');
const inputFields = document.querySelectorAll('.inputField');//div area that will have the red border. I selected all of then if I wanted to add warning styles to the other divs eventually.

const warningVerification = (warningMsg)=>{
    //If the People label area not contains the warning <p>, add it.   
    if (!labels[2].contains(warningMsg)) {        
        let p = document.createElement('p');
        p.classList.add('warningMsg');
        p.innerHTML = `Can't be zero`;
        labels[2].appendChild(p);
        inputFields[1].className += ' warning';
    }
};

let prices = {
    set: (obj, prop, value)=>{
        obj[prop] = value;
        return true;
    }
};

let price = new Proxy({}, prices); //Observer for prices
let people = 0;
let optionSelected = -1; //Transformed id of selected button Tip . Starts with -1 and change

const resetOptionSelected = ()=>{
    optionSelected = -1;
}

const setTip = (tipSelected, value=0)=>{
    //Set the tip according to the Tip selected. 5 is the custom Tip.
    switch (tipSelected) {
        case 0:
            //5%
            price.tip = 5;
            break;
        case 1:
            //10%
            price.tip = 10;
            break;
        case 2:
            //15%
            price.tip = 15;
            break;
        case 3:
            //25%
            price.tip = 25;
            break;
        case 4:
            //50%
            price.tip = 50;
            break;
        case 5:
            //Custom
            price.tip = value;
            break;
        default:
            break;
    }
    //console.log(tip);
};

const setTipAmount = ()=>{
    price.tipAmount = ((price.bill*price.tip)/100)/people;
    if(!isNaN(price.tipAmount) && isFinite(price.tipAmount)){
        amountPrice.innerHTML = `$${price.tipAmount.toFixed(2)}`;
    };
    //console.log(price.tipAmount);
};

const setTotal = ()=>{
    if (people != 0 && price.tip !=0) {
        price.total = (((price.bill*price.tip)/100)+price.bill)/people;
        //console.log(price.total);
    } else {
        price.total = price.bill;
    };

    if(!isNaN(price.total) && isFinite(price.total)){
        totalPrice.innerHTML = `$${price.total.toFixed(2)}`;

    };
    //console.log(price.total);
}

inputBill.addEventListener('input', event=>{
    //Changes bill value as the user types
    event.preventDefault();
    const warningMsg = document.querySelector('.warningMsg');
    price.bill = Number(event.target.value);
    setTipAmount();
    setTotal();
    if (people == 0) {
        warningVerification(warningMsg);
    };
    //console.log(price.bill);
});

inputPeople.addEventListener('input', event=>{
    //Changes the value of the number of people as the user types
    event.preventDefault();
    const warningMsg = document.querySelector('.warningMsg');
    people = Number(event.target.value);
    setTipAmount();
    setTotal();
    if (event.target.value != 0) {
        labels[2].removeChild(warningMsg);
        inputFields[1].className += 'inputField';
    } else {
        //prevents the user form re-entering the number 0
        warningVerification(warningMsg);
    };
});

inputPeople.addEventListener('focus', event=>{
    //if the number of people is the first value the user wants to enter
    event.preventDefault();
    const warningMsg = document.querySelector('.warningMsg');
    if (event.target.value == 0) {
        warningVerification(warningMsg);
    };
});

btnTips.forEach(button=>{
    if(button.id != 'btnTip5'){
        button.addEventListener('click', event=>{
            event.preventDefault();
            //console.log(event.target)
            let idSelected = Number(event.target.id.toString().replace('btnTip', ''));//id comes at 'btnTipNumber', so remove the 'btnTip', and tranform the number
            if (optionSelected == idSelected) {
                //if the user selects the same button, deselect it
                event.target.className = 'btnTip';
                resetOptionSelected();
            } else {
                btnTips.forEach(btn=>{
                    btn.className = 'btnTip';
                    if(btn.id == 'btnTip5'){
                        //Remove the custom value
                        btn.value = '';
                    }
                });
                //console.log(event.target.className);
                event.target.className += ' selected';
                optionSelected = idSelected;
                const tipSelected = idSelected;
                setTip(tipSelected);
                setTipAmount();
                setTotal();
                //console.log(tipSelected);                
            }
        });
    } else {
        button.addEventListener('focus', event=>{
            //Focus on input
            event.preventDefault();
            btnTips.forEach(btn=>{
                //Deselect other buttons
                btn.className = 'btnTip';
            });
            event.target.className += ' selected';
            const tipSelected = Number(event.target.id.toString().replace('btnTip', ''));
            setTip(tipSelected, Number(event.target.value));
            //console.log(tipSelected);
        });

        button.addEventListener('input', event=>{
            //Changes the custom value as the user types
            event.preventDefault();            
            setTipAmount();
            setTotal();
            //console.log(Number(event.target.value));
        });
    }
});

btnReset.addEventListener('click', event=>{
    //Reset all states
    event.preventDefault();
    inputBill.value = '';
    btnTips.forEach(button=>{
        button.className = 'btnTip';
        if(button.id == 'btnTip5'){
            button.value = '';
        }
    });
    inputPeople.value = '';
    resetOptionSelected();
})