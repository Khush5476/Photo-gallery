import { useRouter } from 'next/router';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import Link from 'next/link';
import { useContext, useState, useEffect } from 'react';
import BarsIcon from './Bars';
import Center from './Center';

// Global style to lock body scroll
const GlobalStyle = createGlobalStyle`
  body.locked {
    overflow: hidden;
  }
`;

const hoverAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

const StyledHeader = styled.header`
  background-color: ${(props) => (props.scrolled ? 'rgba(34, 34, 34, 0.8)' : '#222')};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: background-color 0.3s ease;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
  position: relative;
  z-index: 3;
  padding: 10px 0;

  @media screen and (min-width: 768px) {
    padding: 0;
  }

  &:hover {
    animation: ${hoverAnimation} 0.3s ease;
  }
`;

const StyledNav = styled.nav`
  position: fixed;
  top: 60px; /* Gap from the top, adjust if necessary */
  left: 0;
  right: 0;
  bottom: 0; /* Full height */
  background-color: #222;
  opacity: ${props => (props.navActive ? 1 : 0)};
  transform: translateX(${props => (props.navActive ? '0' : '-100%')});
  transition: opacity 0.3s ease, transform 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 10px; /* Reduced gap between links */
  padding: 20px;
  z-index: 1001; /* Ensure nav is above other content */

  @media screen and (min-width: 768px) {
    position: static;
    opacity: 1;
    transform: translateY(0);
    display: flex;
    flex-direction: row;
    gap: 15px; /* Space between links in horizontal layout */
    padding: 0;
  }
`;

const NavLink = styled(Link)`
  display: block;
  color: ${({ isActive }) => (isActive ? 'white' : '#aaa')};
  text-decoration: none;
  padding: 5px 0; /* Adjust padding for mobile view */

  &:hover {
    animation: ${hoverAnimation} 0.3s ease;
    color: white;
  }

  @media screen and (min-width: 768px) {
    padding: 0;
    transition: opacity 0.3s ease, transform 0.3s ease;
  }
`;

const NavButton = styled.button`
  background-color: transparent;
  width: 40px;
  height: 40px;
  border: 0;
  color: white;
  cursor: pointer;
  position: relative;
  z-index: 100;
  transition: opacity 0.3s ease, transform 0.3s ease;

  @media screen and (min-width: 768px) {
    display: none; /* Hide button on larger screens */
  }
`;

export default function Header() {
  const [navActive, setNavActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  // Lock/unlock body scroll based on navActive state
  useEffect(() => {
    document.body.classList.toggle('locked', navActive);
  }, [navActive]);

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <GlobalStyle />
      <StyledHeader scrolled={scrolled}>
        <Wrapper>
          <Logo href="/">Photo Gallery</Logo>
          <StyledNav navActive={navActive}>
            <NavLink href={'/'} isActive={router.pathname === '/'}>
              Home
            </NavLink>
          </StyledNav>
          <NavButton onClick={() => setNavActive(prev => !prev)}>
            <BarsIcon />
          </NavButton>
        </Wrapper>
      </StyledHeader>
    </>
  );
}
