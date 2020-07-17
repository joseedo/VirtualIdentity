pragma solidity ^0.5.8;

contract myIdentity{

address public owner;

mapping(address => bytes32) public IdArray;

 constructor() public {
     
      owner = msg.sender;
     
 }
 
 function CreateIdentity(bytes32 Ipfshash) public returns(bool){
  
  IdArray[msg.sender] = Ipfshash;
     
 }
 
 function GetIdentity() public view returns (bytes32 x){
     
    return IdArray[msg.sender];
     
 }
 
 }