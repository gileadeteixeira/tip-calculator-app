const inputBill = document.querySelector('#inputBill');
const inputPeople = document.querySelector('#inputPeople');
const amountPrice = document.querySelector('#amountPrice');
const totalPrice = document.querySelector('#totalPrice');
const area2 = document.querySelector('.area2');
const btnReset = document.querySelector('#btnReset');
const btnTips = document.querySelectorAll('.btnTip');
const labels = document.querySelectorAll('.label');//Text area where the warning message will be. I selected all of then if I wanted to add warning messages to the other labels eventually.
const inputFields = document.querySelectorAll('.inputField');//div area that will have the red border. I selected all of then if I wanted to add warning styles to the other divs eventually.

const commaRegex = /(\d)(?=(\d{3})+(?!\d))/g; //1000.00 => 1,000.00 for example

const decimalsRegex = /(\,|\.)\d{3,}/g; //12.123 => 12.12 for example

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

let price = {
    bill: -1,
    tipAmount: -1,
    tip: -1,
    total: -1
}

let people = -1;

let optionSelected = -1; //Transformed id of selected button Tip . Starts with -1 and change

const resetOptionSelected = ()=>{
    optionSelected = -1;
};

const resetData = ()=>{//Reset prices an people values
    price.bill = -1;
    price.tipAmount = -1;
    price.tip = -1;
    price.total = -1;
    people = -1;
};

const resetQuery = ()=>{//Reset props of elements
    inputBill.value = '';
    inputPeople.value = '';
    btnTips.forEach(button=>{
        button.className = 'btnTip';
        if(button.id == 'btnTip5'){
            button.value = '';
        }
    });
    const warningMsg = document.querySelector('.warningMsg');
    if (labels[2].contains(warningMsg)) {
        labels[2].removeChild(warningMsg);
        inputFields[1].className = 'inputField';        
    };
    disableBtnReset();
};

const resetAll = ()=>{
    resetQuery();    
    resetData();
    resetOptionSelected();
    setTipAmount();
    setTotal();
};

const checkData = ()=>{//Boolean to set button activation
    if (price.bill >= 0 || price.tipAmount >= 0 || price.tip >= 0 || price.total >= 0 || people > 0) return true;
};

const activateBtnReset = ()=>{
    btnReset.className = "btnReset active";
    btnReset.addEventListener('click', event => resetAll(event));
    //console.log(price.bill, price.tipAmount, price.tip, price.total, optionSelected, people)
};

const disableBtnReset = ()=>{
    btnReset.className = "btnReset inactive";
    btnReset.removeEventListener('click', event => resetAll(event));
}

const checkReset = ()=>{
    if (checkData()) {
        activateBtnReset();
    } else {
        disableBtnReset();
    }
};

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
            price.tip = Number(value);
            break;
        default:
            break;
    }
    //console.log(price.tip);
    //console.log(typeof(price.tip));
};

const resetTip = ()=>{//If user selects custom, reset tipAmount
    price.tip = -1;
    price.tipAmount = -1;
    optionSelected = -1;
    amountPrice.innerHTML = `$0.00`;
}

const setTipAmount = ()=>{
    if (people > 0 && price.tip >= 0 && price.bill >= 0) {
        price.tipAmount = ((price.bill*price.tip)/100)/people;
        //console.log(typeof(price.total));
        amountPrice.innerHTML = `$${price.tipAmount.toFixed(2)}`;
        amountPrice.innerHTML = amountPrice.innerHTML.replace(commaRegex, "$1,");//6000.00 => 6,000.00 for example; In this example, the $1 refers to number 6, So add a comma after
    } else {//prevents NaN and Infinity strings from being displayed
        amountPrice.innerHTML = `$0.00`;
    }
    //console.log(price.tipAmount);
};

const setTotal = ()=>{
    if (people > 0 && price.tip >= 0 && price.bill >= 0) {
        price.total = (((price.bill*price.tip)/100)+price.bill)/people;
        //console.log(typeof(price.total));
    } else if(people > 0 && price.tip == -1 && price.bill > 0){
        price.total = price.bill/people;
        //console.log(typeof(price.total));
    } else if (price.bill >= 0){
        price.total = price.bill;
        //console.log(typeof(price.total));
    };

    if(price.total > -1){//prevents NaN and Infinity strings from being displayed
        totalPrice.innerHTML = `$${price.total.toFixed(2)}`;
        totalPrice.innerHTML = totalPrice.innerHTML.replace(commaRegex, "$1,");//7000.00 => 7,000.00 for example; In this example, the $1 refers to number 7, So add a comma after

    } else{
        totalPrice.innerHTML = `$0.00`;
    }
    //console.log(price.total);
};

const resetTotal = ()=>{
    price.bill = -1;
    price.total = -1;
    totalPrice.innerHTML = `$0.00`;
}

const hasComma = (event)=>{
    return event.target.value.match(/\,|\./) ? true : false;
};

const replaceComma = (event, end)=>{// When 
    let string = event.target.value;
    let pop = string.slice(0, end);
    //console.log(pop);
    if(string.charAt(3) == ',' || string.charAt(3) == '.'){
        pop = pop.substring(0,(end-3)) + '.' + pop.substring((end-3)).replace(".","");
        //console.log(pop);
    }
    return pop;
};

const fixDecimals = (event) =>{
    if(event.target.value.match(decimalsRegex)){
        //console.log('yes')
        event.target.value = Number(event.target.value).toFixed(2);
    }
};

inputBill.addEventListener('keyup', event=>{
    //Changes bill value as the user types
    event.preventDefault();
    const warningMsg = document.querySelector('.warningMsg');
    let keyCode = event.keyCode;//Key pressed code
    let number = event.target.valueAsNumber;
    let max = parseInt(event.target.max);//MaxBill $1000000 or $1000000.00-> I chose to allow decimals, like $560.48
    let min = parseInt(event.target.min);//MinBill $0 or $0.00-> Negative values are not allowed, like $-6; The user can enter 0
    let length = event.target.value.length;//Current length
    if (keyCode == 189 || keyCode == 109) {// - (Minus) or - (NumPadSubtract)
        event.target.value = '';//if the user types -  the input value will reset
    } else if (event.target.value == ''){
        //console.log('hello')
        resetTotal();
    } 
    const setBill = (maxLength)=>{
        if (length>maxLength) {// 999999 (length = 6) or 999,999.00 (length = 9)
            let string = replaceComma(event, maxLength);
            //console.log(string)                
            event.target.value = string;            
        } else if(number>=min && number<max){
            //console.log('yes');
            fixDecimals(event);
            price.bill = number;
            if (people <= 0) {
                warningVerification(warningMsg);
            };
        } else if(number>=max){
            //console.log(number)
            event.target.value = event.target.value.slice(0, -1);//remove the last char to fit maxLength
        }
    }
    if(hasComma(event)){
        //console.log('tem');
        setBill(9);
    }
    else{
        setBill(6);
    }
    setTipAmount();
    setTotal();            
    checkReset();
    console.log(area2.clientWidth)
});

inputPeople.addEventListener('keyup', event=>{
    //Changes the value of the number of people as the user types
    event.preventDefault();
    const warningMsg = document.querySelector('.warningMsg');
    let keyCode = event.keyCode;//Key pressed code
    let number = event.target.valueAsNumber;
    let max = parseInt(event.target.max);//MaxPeople 1000000 people -> Integer only
    let min = parseInt(event.target.min);//MinPeople 0 -> Negative values are not allowed, like -12; The user can enter 0 but will be warned
    let length = event.target.value.length;//Current length
    if (keyCode == 189 || keyCode == 109) {// - (Minus) or - (NumPadSubtract)
        event.target.value = '';//if the user types -  the input value will reset
    } else if(keyCode == 188 || keyCode == 190){// , (Comma) or . (Dot/Period)
        event.target.value = event.target.value.slice(0, -1);//Commas or periods/dots are not allowed, so erase then; Input value resets immediately
    } else if(isNaN(number)|| number == 0) {
        //if the user enters or re-enters 0, or leave empty , the warning display is triggered
        warningVerification(warningMsg);
        event.target.value = isNaN(number) ? '' : '0';
        if (event.target.value == '') {
            people = -1;
        }
    }
    const setPeople = (maxLength)=>{
        if (length>maxLength) {// 999999 (length = 6)
            let string = replaceComma(event, maxLength);
            //console.log(string)                
            event.target.value = string;            
        } else if(number>min && number<max){
            //console.log('yes')
            people = number;
            if (number != 0 && labels[2].contains(warningMsg)) {
                labels[2].removeChild(warningMsg);
                inputFields[1].className = 'inputField';
            };
        } else if(number>=max){
            //console.log(number)
            event.target.value = event.target.value.slice(0, -1);//remove the last char to fit maxLength
        }
    }
    setPeople(6);
    setTipAmount();
    setTotal();          
    checkReset();
});

inputPeople.addEventListener('focus', event=>{
    //if the number of people is the first value the user wants to enter
    event.preventDefault();
    const warningMsg = document.querySelector('.warningMsg');
    if (Number(event.target.value) == 0 || event.target.value == '') {
        warningVerification(warningMsg);
    }
    checkReset();
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
                resetTip();
                resetOptionSelected();
            } else {
                resetTip();
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
                //console.log(tipSelected);                
            }
            setTotal();
            checkReset();
        });
    } else {
        button.addEventListener('focus', event=>{
            //Focus on input
            event.preventDefault();
            if (Number(amountPrice.innerHTML) != Number(event.target.value)) {//When Custom is selected, it resets only if the values are different (if the user enters a value, blurs the custom, and focuses it again, the value will not be reset)
                //console.log('yes')
                resetTip();
                setTotal();
            }
            btnTips.forEach(btn=>{
                //Deselect other buttons
                btn.className = 'btnTip';
            });
            event.target.className += ' selected';
            const idSelected = Number(event.target.id.toString().replace('btnTip', ''));
            optionSelected = idSelected;
            //console.log(Number(event.target.value));
            checkReset();
        });

        button.addEventListener('blur', event=>{
            //Focus on input
            event.preventDefault();
            if (event.target.value == '') {//When Custom is selected, it resets only if the values are different (if the user enters a value, blurs the custom, and focuses it again, the value will not be reset)
                //console.log('yes')
                resetTip();
                checkReset();
            }
        });

        button.addEventListener('keyup', event=>{
            //Changes the custom value as the user types
            event.preventDefault();
            //console.log(event);
            const tipSelected = Number(event.target.id.toString().replace('btnTip', ''));
            let keyCode = event.keyCode;//Key pressed code
            let number = event.target.valueAsNumber;
            let max = parseInt(event.target.max);//MaxTip 100% -> I chose to allow decimals, like 56.45%
            let min = parseInt(event.target.min);//MinTip 0% -> Negative values are not allowed, like -6%; The user can enter 0
            let length = event.target.value.length;//Current length
            if (keyCode == 189 || keyCode == 109) {// - (Minus) or - (NumPadSubtract)
                event.target.value = '';//if the user types -  the input value will reset
            } else if (event.target.value == ''){
                //console.log('hello')
                resetTip();
            }         
            const customTip = (maxLength)=>{
                if (length>maxLength) {// 100 (length = 3) or 100.00 (length = 5)
                    let string = replaceComma(event, maxLength);
                    //console.log(string)                
                    event.target.value = string;
                } else if(number>=min && number<=max){
                    //console.log('yes');
                    fixDecimals(event);
                    setTip(tipSelected, number);
                    setTipAmount();
                    //console.log(number);
                } else if(number>max){
                    //console.log(number)
                    event.target.value = event.target.value.slice(0, -1);//remove the last char to fit maxLength
                }
            }
            if(hasComma(event)){//if the number has a comma or a period/dot, the maximum allowed length changes
                //console.log('has');
                customTip(5);
            }
            else{
                customTip(3);
            }
            setTotal();
            checkReset();
        });
    }
});