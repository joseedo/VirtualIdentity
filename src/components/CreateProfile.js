//import React from 'react'
// import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import React, { useState } from 'react'
import ethereum from './web3/ethereum'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'  
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))



export default function Create () {

  const classes = useStyles();

  const [sendingAccount, setSendingAccount] = useState('');
  const [ethAddress,setEthAddress] = useState('');
  const [user,setUser] = useState({ fullName: '', aliasName: '', email: '', phone: ''  });
  
  function captureChange (event) {
    event.stopPropagation()
    event.preventDefault()
    setUser({ ...user, 
              [event.target.name]: event.target.value.trim()
            });
  } 

   async function onSubmit(event) {
      event.preventDefault();
      await ethereum.eth.getAccounts((error, accounts) => {
        if (error) {
          console.log(error)
        } else {
          setSendingAccount(accounts[0]);
          console.log (user);
          console.log('Sending from Metamask account: ' + sendingAccount);
          const encryptedData = signMsg(JSON.stringify(user),accounts[0]);
          const decryptedData = unsignMsg(encryptedData);
        } 
      });
    }; //onSubmit 

    function signMsg(userData, from) {

      const msgParams = [
        {
        type: 'string',
        name: 'UserData',
        value: userData
        }
        ]
      
      web3.currentProvider.sendAsync({
        method: 'eth_signTypedData',
        params: [msgParams, from],
        from: from,
      }, function (err, result) {
        if (err) return console.error(err)
        if (result.error) {
          return console.error(result.error.message)
        }
        console.log("signed message:" + result.result)
        return result.result
      })
    }

    function unsignMsg(encryptedMsg){
      const sigUtil = require('eth-sig-util');
        const recovered = sigUtil.recoverTypedSignature({
          //data: msgParams,
          sig: result.result
        })
        if (recovered === from ) {
          alert('Recovered signer: ' + from)
        } else {
          alert('Failed to verify signer, got: ' + result)
        }

    }

   /* async function sigMsg (msgParams,from) {

      ethereum.currentProvider.sendAsync({
        method: 'eth_signTypedData',
        params: [msgParams, from],
        from: from,
      }, function (err, result) {
        if (err) return console.error(err)
        if (result.error) {
          return console.error(result.error.message)
        }
      },
      setAddress({address:result})
      const recovered = sigUtil.recoverTypedSignature({
        data: msgParams,
        sig: result.result
      })
      if (recovered === from ) {
        alert('Recovered signer: ' + from)
      } else {
        alert('Failed to verify signer, got: ' + result)
      })
    } */

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        {/* <Avatar className={classes.avatar}> */}
        <LockOutlinedIcon style={{ fontSize: 50 }} /> ``
        {/* </Avatar> */}
        <Typography component='h1' variant='h5'>
          Create your owned Identity Profile
        </Typography>``
        <form className={classes.form} onSubmit={onSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={9}>
              <TextField
                autoComplete='fname'
                name='fullName'
                variant='outlined'
                required
                fullWidth
                id='fullName'
                label='Full Name'
                autoFocus
                onChange = {captureChange}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='aliasName'
                label='Alias'
                name='aliasName'
                autoComplete='lname'
                onChange = {captureChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                onChange = {captureChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='phone'
                label='Phone Number'
                type='phone'
                id='phone'
                autoComplete='current-password'
                onChange = {captureChange}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value='allowExtraEmails' color='primary' />}
                label='am aware this profile are saved on decentralized platform'
              />
            </Grid> */}
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Create Identity
          </Button>
          <Grid container justify='flex-end'>
            <Grid item>
              <Link href='#' variant='body2'>
                Already have an Identity ? Prove it
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}
