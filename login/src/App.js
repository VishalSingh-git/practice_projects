


import React from 'react';
import { Button, Checkbox, Input, FormControlLabel } from '@mui/material';
import './Style.css';

const App = () => {
  return (
    <div className='App '>
      <div className='header'>
        <div className='header_logo'>Welcome</div>
      </div>
      <div className='body_container'>
        <div className='image_container'>
          <div className='body_image'>$$$$$$$IMAGE$$$$</div>
          <div>---------------User Login-----------------</div>

        </div>
        <div className='body_input' >
          <Input      sx={{ padding: '10px', border: '1px solid #ccc' }} placeholder='Username' />
          <Input      sx={{ padding: '10px', border: '1px solid #ccc' }} type="password" placeholder='Password' />
        </div>
        <div className='body_details'>
          <FormControlLabel
            control={<Checkbox />}
            label="Remember me"
          />
          <div>Forget Password?</div>
        </div>
        <div className='btn_container'>
          <Button variant="contained" color="primary">
            CREATE ACCOUNT
          </Button>
        </div>
      </div>
      <Button variant="contained" color="primary">
            Hello
          </Button>
      <div className='footer'>Terms & Conditions</div>

    </div>

  );
};

export default App;
