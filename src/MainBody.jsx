import React, { Component } from 'react';
import web3 from './web3';
import ipfs from './ipfs';
import storehash from './storehash';
//import createjson from './createjson'
import {Button, Form, Table, Grid, Header, Message, Input, Segment} from 'semantic-ui-react';
//import { web } from 'webpack';

class MainBody extends Component {

  state = {
    ipfsHash:null,
    buffer:'',
    ethAddress:'',
    blockNumber:'',
    transactionHash:'',
    gasUsed:'',
    txReceipt:'',
    sendingAccount:'',
    name: '',
    key: '',
    email: '',
    phone: '',
    address: '',
    isLoggedIn:false
  };

captureName =(event) => {
  event.stopPropagation()
  event.preventDefault()
  this.state.name = event.target.value;
};

captureKey =(event) => {
  event.stopPropagation()
  event.preventDefault()
  this.state.key = event.target.value;
};

captureEmail =(event) => {
  event.stopPropagation()
  event.preventDefault()
  this.state.email = event.target.value;
};

capturePhone =(event) => {
  event.stopPropagation()
  event.preventDefault()
  this.state.phone = event.target.value;
};

captureAddress =(event) => {
  event.stopPropagation()
  event.preventDefault()
  this.state.address = event.target.value;
};

convertToBuffer = async() => {
  //data is converted to a buffer for upload to IPFS
  //const buffer = await Buffer.from(this.state.name + '¦' + this.state.key + '¦' + this.state.email + '¦' + this.state.phone + '¦' + this.state.address);
  const buffer = await Buffer.from(
    `{
        "publicdata": {
        "firstName": "${this.state.name} ",
        "key": " ${this.state.key} ",
        "nickname": "",
        "gender": "",
        "age": ""
    },
    "privatedata": {
        "address": {
            "streetAddress": " ${this.state.address} ",
            "city": "",
            "state": "",
           "postalCode": ""
       },
       "email": " ${this.state.email} "
   }
}`
  );
  this.setState({buffer});
};

onClick = async () => {
  try{
    this.setState({blockNumber:"waiting.."});
    this.setState({gasUsed:"waiting..."});
      await web3.eth.getTransactionReceipt(this.state.transactionHash, (err, txReceipt)=>{
        console.log(err,txReceipt);
        this.setState({txReceipt});
      }); //await for getTransactionReceipt
    
        await this.setState({blockNumber: this.state.txReceipt.blockNumber});
        await this.setState({gasUsed: this.state.txReceipt.gasUsed});    
  } //try
  
  catch(error){
    console.log(error);
  } //catch

} //onClick

onSubmit = async (event) => {
  event.preventDefault();
  web3.eth.getAccounts((error, accounts) => {
    if (error) {
      console.log(error)
    } else {
      this.setState({ sendingAccount:accounts[0] });
      console.log('Sending from Metamask account: ' + accounts[0]);
      const msgParams = [
        {
          type: 'string',
          name: 'address',
          value: this.state.address 
        },
        {
          type: 'string',
          name: 'email',
          value: this.state.email 
        }
      ]
    //var toencrypt = signMsg(msgParams,accounts[0])
    //this.setState({address: toencrypt})
    this.setState({ address:signMsg(msgParams,accounts[0]) })
    console.log("direccion:" + this.state.address)
    } 


    function signMsg(msgParams, from) {
      web3.currentProvider.sendAsync({
        method: 'eth_signTypedData',
        params: [msgParams, from],
        from: from,
      }, function (err, result) {
        if (err) return console.error(err)
        if (result.error) {
          return console.error(result.error.message)
        }
        console.log("mensaje encriptado:" + result.result)
        return result.result
        //this.setState({ email:result[1] })
        const recovered = sigUtil.recoverTypedSignature({
          data: msgParams,
          sig: result.result
        })
        if (recovered === from ) {
          alert('Recovered signer: ' + from)
        } else {
          alert('Failed to verify signer, got: ' + result)
        }
      })
    }
  });
  //console.log('Sending from Metamask account: ' + accounts[0]);
  //obtain contract address from storehash.js
  const ethAddress= await storehash.options.address;
  this.setState({ethAddress});
  await this.convertToBuffer(); 
  await ipfs.add(this.state.buffer, (err, ipfsHash) => {
  console.log(err,ipfsHash);
    //setState by setting ipfsHash to ipfsHash[0].hash 
    this.setState({ ipfsHash:ipfsHash[0].hash });
    const ipfsHashHex = Buffer.from(this.state.ipfsHash.substr(2),'hex')
        
    storehash.methods.CreateIdentity(ipfsHashHex).send({
      from: this.state.sendingAccount 
      }, (error, transactionHash) => {
          console.log(transactionHash);
          this.setState({transactionHash});
    }); //storehash 
  }) //await ipfs.add 
}; //onSubmit 

render() {

    return (
      <div class="ui celled grid">
      <div class="row">
          <div class="three wide column">
          Menu
          </div>      
           <div class="thirteen wide column">
      <Header as="h2" textAlign="center">
        Create New identity
      </Header>
      <Form size="large" onSubmit={this.onSubmit}>
      <Segment padded>
          <h3>Show identity</h3>
          <Form.Input fluid icon="user" iconPosition="left" placeholder="name" onChange = {this.captureName} />
      </Segment>
      <Segment>
          <h3>Key:</h3>
          <Form.Input fluid icon="user" iconPosition="left" placeholder={this.state.key} onChange = {this.captureKey} />
      </Segment>
      <Segment>
          <h3>Email:</h3>
          <Form.Input fluid icon="e-mail" iconPosition="left" placeholder={this.state.email} onChange = {this.captureEmail} />
      </Segment>
      <Segment>
          <h3>Phone:</h3>
          <Form.Input fluid icon="phone" iconPosition="left" placeholder={this.state.phone} onChange = {this.capturePhone} />
      </Segment>
      <Segment>
          <h3>Address:</h3>
          <Form.Input fluid icon="address" iconPosition="left" placeholder={this.state.address} onChange = {this.captureAddress} />
      </Segment>
      <Segment>
        <Button type="submit" bsStyle="primary" color="blue" fluid size="large">
          Create Indentity
        </Button>
      </Segment>
      </Form>
      <hr/>
      <Button onClick = {this.onClick}> Get Transaction Receipt </Button>
      <Table bordered responsive>
              <thead>
                <tr>
                  <th>Tx Receipt Category</th>
                  <th>Values</th>
                </tr>
              </thead>
             
              <tbody>
                <tr>
                  <td>IPFS Hash # stored on Eth Contract</td>
                  <td><a ref={'https://gateway.ipfs.io/ipfs/' + this.state.ipfsHash}>{this.state.ipfsHash}</a></td>
                </tr>
                <tr>
                  <td>Ethereum Contract Address</td>
                  <td>{this.state.ethAddress}</td>
                </tr>
                <tr>
                  <td>Tx Hash # </td>
                  <td>{this.state.transactionHash}</td>
                </tr>
                <tr>
                  <td>Block Number # </td>
                  <td>{this.state.blockNumber}</td>
                </tr>
                <tr>
                  <td>Gas Used</td>
                  <td>{this.state.gasUsed}</td>
                </tr>
              
              </tbody>
          </Table>
      </div>
      </div> 
      </div>  
      );
  }
} 
export default MainBody;  