const uuidv4 = require('uuid/v4');

const accountTypes = [
    {id: 0, name: 'Cuenta Corriente'},
    {id: 1, name: 'Caja Ahorro'}
];

const nameFactory = (min=0) => ()=>{
    return 'Account '+ (min++);
}

const accountCreator = (type,name,balance)=>({
    id: uuidv4(),
    type,
    name,
    balance
});

const randomElementFactory = (array) => () => { 
    let i = Math.floor(Math.random() * array.length);
    return array[i];
}

const randomNumberFactory = (min,max) => () => { 
    return Math.floor(min + Math.random() * max);
}

const getAccountType = randomElementFactory(accountTypes);
const getAccountName = nameFactory();
const getAccountBalance = randomNumberFactory(1,10000);

let accountsQuantity = 80;

let splitArray = 3;

let accountArrays = (new Array(splitArray)).fill(1).map(e=>[]);

let accounts = [];

const completeArray = (arr)=>{
    return arr.map(a=>{a.balance=getAccountBalance()});
}

const assignItems = (mainArr, arrays)=>{
    mainArr.forEach((e,i)=>{
        arrays[i%splitArray].push(e); 
    })
}

let init = 0;

const bootstrap = ()=>{
    accounts = [];
    init = 0;
    for(let i=0;i<accountsQuantity;i++){
        accounts.push( 
            accountCreator(
                getAccountType().name,
                getAccountName(),
                null
            ) 
        )
    }
    assignItems(accounts,accountArrays);
}
bootstrap();

const getAccounts = (reset)=>{
    if(reset){ 
        bootstrap();
        console.log(accounts.filter(a=>a.balance).length);
        return 
    }
    if(accountArrays[init]){
        completeArray(accountArrays[init]);
        console.log(accounts.filter(a=>a.balance).length);
    }
    init++;
    
    return accounts;
}

module.exports = {
    getAccounts
};