module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!

 networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,//7545,
      network_id: "2" // Match any network id
    },
     live: {
     network_id: "1",
     host: "localhost",
     port: 8546
   }
  }

};
