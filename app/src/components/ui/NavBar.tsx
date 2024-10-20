import React from 'react';
import { Container, Navbar } from 'react-bootstrap';

export default function NavBar(): React.JSX.Element {
  return (
    <Navbar className="bg-white">
      <Container className="d-flex align-items-center justify-content-center my-2">
        <Navbar.Brand className="cursor-pointer">
          <img
            alt="Todoshka logo"
            src="https://avatars.mds.yandex.net/i?id=5a060d52aac94f46d93b84ec77450d026210716e-4450965-images-thumbs&n=13"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          Todoshka
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}
