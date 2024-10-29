import Pages from "./pages/Pages";
import { BrowserRouter } from "react-router-dom";
import Search from "./components/Search";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { GiKnifeFork } from "react-icons/gi";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Nav>
          <LogoContainer>
            <GiKnifeFork />
            <Logo to={"/"}>Deliciousssss</Logo>
          </LogoContainer>
          <NavLinks>
            <StyledLink to={"/All_Cuisines"}>
              <span>Cuisines</span>
            </StyledLink>
          </NavLinks>
        </Nav>
        <Search />
        <Pages />
      </BrowserRouter>
    </div>
  );
}

const Logo = styled(Link)`
  text-decoration: none;
  font-size: 3.5rem;
  font-weight: 400;
  font-family: "Lobster Two", cursive;
`;

const Nav = styled.div`
  padding: 4rem 0rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 2rem;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    font-size: 4rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: #313131;
  font-size: 3.2rem;
  font-weight: 500;
  transition: all 0.3s ease;

  span {
    font-family: "Fira Spring", sans-serif;
  }

  svg {
    font-size: 1.5rem;
  }

  &:hover {
    color: #f27121;
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    span {
      display: none;
    }

    svg {
      font-size: 1.8rem;
    }
  }
`;

export default App;
