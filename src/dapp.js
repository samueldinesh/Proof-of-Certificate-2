var Web3 = require("web3");
var contract = require("truffle-contract");
var Cert = contract(require("../build/contracts/Certificate.json"));
//var IronPromise = contract(require("../build/contracts/IronPromise.json"));
require("bootstrap");

var account;

window.Dapp = {
  start: function() {
    this.certificateCount();
    this.issueDocEvent();
  },

  setAlert: function(message, type) {
    type = type || "info";
    var element = document.getElementById("alerts");
    //element.innerHTML = "<div class='alert alert-" + type + "'>" + message + "</div>";
    console.log(message);
  },

  throwError: function(message, err) {
    err = err || message;
    this.setAlert("<strong>Error!</strong> " + message, "danger");
    throw err;
  },

  certificateCount: function() {//Doc Count
    console.log("certificateCounted...");
    Cert.deployed().then(function(instance) {
      return instance.totalDocument();
    }).then(function(value) {
      var element = document.getElementById("total");
      element.innerHTML = "Total Issued Certificate: " +value.valueOf();
    }).catch(function(err) {
      console.log(err);
    });
  },

  issueDocEvent: function() {//Event
    Cert.deployed().then(function(instance) {
      var DocumentIssuedEvent = instance.DocumentIssued({fromBlock: 0, toBlock: 'latest',address:account})
      DocumentIssuedEvent.watch(function(err,result){
        if(!err){
          console.log('event trigger',result.args.valueOf())
        }else{
          console.log('event not triggered')
        }
      })
    });
    console.log("Watcher instantiated")
  },

  issueCert: function() {//issue doc
    var self = this;
    var documentId = document.getElementById("documentId").value;
    var certificateType = document.getElementById("certificateType").value;
    var recipient = document.getElementById("recipient").value;
    var certifier = document.getElementById("_certifier").value;
    Cert.deployed().then(function(instance) {
      self.setAlert("issusing certificate...");
      return instance.issueDocument(documentId,recipient,certificateType,certifier,{from: account});
    }).then(function() {
      //self.setDoerCount();
      self.setAlert("certificate was added!", "success");
    }).catch(function(err) {
      console.log(err);
    });
    this.certificateCount();

  },
  revokeCert: function() { //revoke doc
    var self = this;
    var documentId = document.getElementById("documentId").value;
    var recipient = document.getElementById("recipient").value;
    Cert.deployed().then(function(instance) {
      self.setAlert("revoke certificate...");
      return instance.revokeDocument(documentId,recipient,{from: account});
    }).then(function(value) {
      console.log(value);
      var element = document.getElementById("Statement");
      element.innerHTML = "The person "+value.valueOf()[1]+ " certified as "+ value.valueOf()[2] + " issued by "+value.valueOf()[0];
      //self.setDoerCount();
      self.setAlert("certificate was revoked!", "success");
    }).catch(function(err) {
      console.log(err);
    });
  },
  verifyCert: function() { //verify doc
    var self = this;
    var documentId = document.getElementById("documentId").value;
    var certificateType = document.getElementById("certificateType").value;
    var recipient = document.getElementById("recipient").value;
    Cert.deployed().then(function(instance) {
      self.setAlert("verifing certificate...");
      return instance.verifyDocument(documentId,recipient,certificateType);
    }).then(function(value) {

      var element = document.getElementById("Instant");
      element.innerHTML = value.valueOf();
      //self.setDoerCount();
      self.setAlert("certificate was verified!", "success");
    }).catch(function(err) {
      console.log(err);
    });
  },
  fulfill: function() {
    var self = this;
    var proof = document.getElementById("fulfillment-proof").value;
    IronPromise.deployed().then(function(instance) {
      self.setAlert("Submitting fulfillment proof...");
      return instance.fulfill(proof, {from: account});
    }).then(function() {
      self.setFulfillmentCount();
      self.setAlert("Fulfillment proof was submitted!", "success");
    }).catch(function(err) {
      console.log(err);
    });
  }
};

window.addEventListener("load", function() {
  if (typeof web3 !== "undefined") {
    window.web3 = new Web3(web3.currentProvider);
  } else {
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }
  Cert.setProvider(web3.currentProvider);
console.log(Cert);

  web3.eth.getAccounts(function(err, accounts) {
    if (err) {
      Dapp.throwError("Your browser can't see the decentralized web!", err);
    }
    if (accounts.length == 0) {
      Dapp.throwError("Connect an account!");
    }
    account = accounts[0];
    Dapp.start();
  });
});

/*

/*
//var Cert = contract(Certificate_artifacts);
// Our future code here..
        //web3.eth.defaultAccount = web3.eth.accounts[0];
        //var CertificateContract = web3.eth.contract();
        //var Cert = CertificateContract.at('0x82d50ad3c1091866e258fd0f1a7cc9674609d254');
        console.log(Cert);
    $("#loader").hide();
        
var documentIssuedEvent = Cert.DocumentIssued({},'latest');

documentIssuedEvent.watch(function (err, result) {
    console.log('event trigger')
            if (!err) {
                if (result.blockHash != $("#instrans").html()) 
                    $("#loader").hide();
                    
                $("#insTrans").html('Block hash: ' +result.blockHash);
                $("#instructor").html('The person ' +result.args.recipient + ' is certified as ' + result.args.certificate + 'signed by' + result.args.certifier);
            } else {
                $("#loader").hide();
            }
});

        /*Coursetro.verifyDocument((err,res)=> {
            if(res)
                $("#countIns").html(res.c + ' Instructors');
        });*/
/*
$("#issuebutton").click(function() {
            $("#loader").show();
            Cert.issueDocument( $("#recipient").val(), $("#certificateType").val(),$("#_certifier").val(), (err, res) => {
                if(err){
                    $("#loader").hide();
                    console.log('false')
                }
                $("#loader").hide();
                //$("#countIns").html('issue==>' +res+' block[0] ==>'+res[0]+res[1]+res[2]+res[3]+res[4]+res[5]);
                //console.log(res)
            });
});

$("#revokebutton").click(function() {
            $("#loader").show();
            Cert.revokeDocument( web3.eth.defaultAccount,$("#recipient").val(), (err, res) => {
                if(err){
                    $("#loader").hide();
                    console.log('false')
                }
                $("#instructor").html('At Block '+res[3]+' The Person ' +res[1]+' certified as '+res[2]+' issued by '+res[0]);
                console.log(res)

            });
});

$("#verifybutton").click(function() {
            $("#loader").show();
            Cert.verifyDocument( web3.eth.defaultAccount,$("#recipient").val(), $("#certificateType").val(), (err, res) => {
                if(err){
                    $("#loader").hide();
                    console.log('false')
                }
                $("#insTrans").html('Document Verification is ' +res);
                console.log(res)
            });
});

$( document ).ready(function() {
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source like Metamask");
    // Use Mist/MetaMask's provider
    web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  Cert.setProvider(web3.currentProvider);

});*/