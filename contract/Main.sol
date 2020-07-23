pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

contract Main{
//might be changed, used this for testing
uint BaseFee=1 ether;
 struct User{
uint256 fee;
string nickname;
bytes32 userHash;
 }
 //User[] fanbase;
mapping(address=>User) dataLords;
mapping(address=>bool) Allowed;
mapping(address=>mapping(address=>bool)) Accessible;
mapping(address=>bool) public dataLordAddress;



modifier theOwner(address _sender){
    require(_sender==msg.sender,"you do not own this address's database");
    _;
}

 modifier hasAccess(address target){
     address _target = target;
     require(Accessible[msg.sender][_target]==true,"you do not have access, buy Access first");
     _;
 }
 
 modifier isDataLord(address target){
     address _target= target;
       require(dataLordAddress[_target]==true,"this person doesn't have data for sale yet");
       _;
 }
 
 function becomeADataLord(address _target,uint256 _fee,string memory nick,bytes32 hash) public theOwner(_target) returns(uint,string memory){
//User memory userBase= dataLords[_target];
dataLords[_target].nickname=nick;
dataLords[_target].fee=_fee *BaseFee;
dataLords[_target].userHash=hash;
dataLordAddress[_target]=true;
 Accessible[msg.sender][_target]=true;//you have access to your own data
return (_fee,nick);
 }

function setFee(uint _fee,address _toSet) public theOwner(_toSet) returns(uint256){
    User memory userBase= dataLords[_toSet];
    dataLords[_toSet].fee=_fee*BaseFee;
 
    return userBase.fee;
    
} 

function buyAccess(address _target) public payable returns(bool){
      User memory userBase=dataLords[_target];
    uint userFee=userBase.fee;
    require(msg.value>=userFee,"The data owner charged more than that");
    Accessible[msg.sender][_target]=true;
    return Accessible[msg.sender][_target];
  
    
}

function checkFee(address _Target) public view returns(uint){
    User memory userBase=dataLords[_Target];
    uint Fee=userBase.fee;
    return Fee;
    
}

//function hasaccess(address _target) public view returns(bool){
//    return Accessible[msg.sender][_target];
//}

function viewData(address _target) public view isDataLord(_target) hasAccess(_target) returns(bytes32) {
  return dataLords[_target].userHash;
    
}

function updateHash(address _target,bytes32 newhash) public theOwner(_target){
    require(dataLordAddress[_target]==true,"you are not a data Lord yet,register first");
    dataLords[_target].userHash=newhash;
    
}



}
