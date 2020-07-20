import React from 'react';
import { Header, Image, Segment } from 'semantic-ui-react';
import ToyanosPic from './toyanos-200px.jpeg';
      const NavBar = () => (
        <Segment inverted>
          <header as='h1'>
          <Image circular src={ToyanosPic} />
          </header>
        </Segment>
      );
export default NavBar;


