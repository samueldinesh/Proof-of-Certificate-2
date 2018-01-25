pragma solidity ^0.4.18;

contract Certificate{

    address owner;
    uint256 CertificateIssued;

    function Certificate() public{
        owner = msg.sender;
        CertificateIssued = 0;
    }
    
    modifier onlyOwner{
        require(msg.sender == owner);
        _;
    }
    
    struct DocumentBody{
        //address issuerAddress;
        string issuerName; //bytes16
        string recipientName; //bytes16
        //bytes16 date;
        string certificate;//bytes32
        uint256 blockNumber;

    }

    mapping (address => DocumentBody) documents;


    event DocumentIssued(
        string recipient, 
        string certificate, 
        string certifier
    );
    
     /**
     * @dev Issues document.
     */
    function issueDocument(string recipient, string certificateType, string _certifier)onlyOwner payable public{//} returns (bool) {
        //require(documents[document].issuerAddress == address(0));
        var certificate = documents[msg.sender]; 
        //documents[document].issuerAddress = msg.sender;
        certificate.issuerName = _certifier;
        certificate.recipientName = recipient;
        certificate.certificate = certificateType;
        certificate.blockNumber = block.number;

        CertificateIssued +=1;
        DocumentIssued(recipient, certificateType, _certifier);

        //return true;
    }

   //event DocumentRevoked(bytes16 recipient);

    /**
     * @dev Revokes existing document and sets the recipient to 0x0.
     */
    function revokeDocument(address _address,string recipient)view public returns (string,string,string,uint256) {
        require(keccak256(documents[_address].recipientName) == keccak256(recipient));//keccak256 gas cost is low than string comparision
        //documents[document].recipient = address(0);

        //DocumentRevoked(recipient);

        return(documents[_address].issuerName,documents[_address].recipientName,documents[_address].certificate,documents[_address].blockNumber) ;
    }

    function verifyDocument(address _address, string recipient,string certificateType)view public returns(bool){
        if(keccak256(documents[_address].recipientName) == keccak256(recipient) &&
        keccak256(documents[_address].certificate) == keccak256(certificateType)){
            return true;
        }else{
            return false;
        }
    }

    function totalDocument() view public returns(uint256){
        return CertificateIssued;
    }

}