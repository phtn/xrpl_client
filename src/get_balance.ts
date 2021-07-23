// const RippleAPI = require('../../src').RippleAPI; // require('ripple-lib')
const RippleAPI = require('ripple-lib').RippleAPI;

const api = new RippleAPI({server: 'wss://s1.ripple.com:443'});
const address = 'rwc4hhcJ5FYt8fFvN5PQj9by5Rbna8smJ1';



const get_balances = () => {
    console.log(api)
    // api.connect().then(() => {
    //     api.getBalances(address).then((balances: String) => {
    //       console.log(JSON.stringify(balances, null, 2));
    //       process.exit();
    //     });
    //   });
}

export {
    get_balances
}