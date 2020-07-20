import React, { Component } from 'react';
import {Button, Form, Table, Grid, Header, Message, Input, Segment} from 'semantic-ui-react';

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
  const buffer = await Buffer.from(this.state.name + '¦' + this.state.key + '¦' + this.state.email + '¦' + this.state.phone + '¦' + this.state.address);
  this.setState({buffer});
};

onClick = async () => {
  try{
    
  } //try
  
  catch(error){
    console.log(error);
  } //catch

} //onClick

onSubmit = async (event) => {
  event.preventDefault();
}; //onSubmit 





render() {
 
    const createidentity = (
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
                <td>TBD</td>
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

    return (
        createidentity
      );
  }
} 
export default MainBody;  