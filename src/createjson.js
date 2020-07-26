const buffer = Buffer.from(
'\{' + 
'        \"publicdata\": \{' +
'        \"firstName\": \"' + this.state.name + ' \"\,' +
'        \"key": \" ' + this.state.key  + ' \"\,' +
'        \"nickname\": \"\"\,' +
'        \"gender\": \"\"\,' +
'        \"age\": \"\"' +
'    \},' +
'    \"privatedata\"\: {' +
'        \"address\": \{' +
'            \"streetAddress\": \"\ ' + this.state.address + ' "\,' +
'            \"city\": \"\"\,' +
'            \"state\": \"\"\,' +
'           \"postalCode\"\: \"\"' +
'       \}\,' +
'       \"email\": \" ' + this.state.email + ' \"' +
'   \}' +
'\}'
);
export default  buffer;