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

const accounts = [];

for(let i=0;i<accountsQuantity;i++){
    accounts.push( 
        accountCreator(
            getAccountType().name,
            getAccountName(),
            getAccountBalance()
        ) 
    )
}

module.exports = {
    accounts
};