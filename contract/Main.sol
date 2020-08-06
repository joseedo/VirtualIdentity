pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

contract Main{
//might be changed, used this for testing
uint BaseFee=1 ether;
 struct User{
uint256 fee;
string nickname;
bytes32 userHash;
address payable wallet;
 }
 
 

mapping(address=>User) dataLords;
mapping(address=>bool) Allowed;
mapping(address=>mapping(address=>bool)) Accessible;
mapping(address=>bool) public dataLordAddress;

//This tracks the no of people who have their data up for sale
address[] public allDataLords;

//this tracks the no of normal users
address[] public allNormalUsers;



modifier theOwner(address _sender){
    require(_sender==msg.sender,"you do not own this address's database");
    _;
}

//checks if you have paid for the data
 modifier hasAccess(address target){
     address _target = target;
     require(Accessible[msg.sender][_target]==true,"you do not have access, buy Access first");
     _;
 }
 
 //makes sure you don't pay twice
 modifier noAccessYet(address target){
      address _target = target;
     require(Accessible[msg.sender][_target]==false,"You already have access!");
     _;
 }
 
 //makes sure you already have data for sale
 modifier isDataLord(address target){
     address _target= target;
       require(dataLordAddress[_target]==true,"this person doesn't have data for sale yet");
       _;
 }
 
 //makes sure you don't register twice
 modifier isNotDataLord(address target){
     address _target= target;
       require(dataLordAddress[_target]==false,"You are already a data Lord");
       _;
 }
 
 function becomeADataLord(address _target,uint256 _fee,string memory nick,bytes32 hash) public isNotDataLord(_target) theOwner(_target) returns(uint,string memory){
dataLords[_target].nickname=nick;
dataLords[_target].fee=_fee *BaseFee;
dataLords[_target].userHash=hash;
dataLords[_target].wallet=msg.sender;
dataLordAddress[_target]=true;
allDataLords.push(_target);
 Accessible[msg.sender][_target]=true; //you have access to your own data
return (_fee,nick);
 }

function setFee(uint _fee,address _toSet) public theOwner(_toSet) returns(uint256){
    User memory userBase= dataLords[_toSet];
    dataLords[_toSet].fee=_fee*BaseFee;
    return userBase.fee;
    
} 

function buyAccess(address _target) public payable noAccessYet(_target) returns(bool){
      User memory userBase=dataLords[_target];
    uint userFee=userBase.fee;
    require(msg.value>=userFee,"The data owner charged more than that");
  address payable recipient=userBase.wallet;
  
  //returns extra payment back
  if(msg.value>userFee){
      uint _change=msg.value-userFee;
      uint _toPay=msg.value-_change;
      recipient.transfer(_toPay);
     msg.sender.transfer(_change);
  }
  else{
      recipient.transfer(msg.value);
  }
  //gives you access
    Accessible[msg.sender][_target] =true;
    return Accessible[msg.sender][_target];
  
    
}

//check current fee of the data owner
function checkFee(address _Target) public view returns(uint){
    User memory userBase=dataLords[_Target];
    uint Fee=userBase.fee;
    return Fee;
    
}

//this returns the ipfs data hash of the target 
function viewData(address _target) public view isDataLord(_target) hasAccess(_target) returns(bytes32) {
  return dataLords[_target].userHash;
    
}

//this updates the ipfs hash of the target in case of data change
function updateHash(address _target,bytes32 newhash) public theOwner(_target){
    require(dataLordAddress[_target]==true,"you are not a data Lord yet,register first");
    dataLords[_target].userHash=newhash;
    
}

//this returns the number of people who currently have data up for sale
function getNoOfDatalords() public view returns(uint){
    return allDataLords.length;
}


}
