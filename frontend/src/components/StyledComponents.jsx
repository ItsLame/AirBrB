import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import { BsFillStarFill } from 'react-icons/bs';

export const StyledStar = styled(BsFillStarFill)`
  & {
    transition: all 100ms ease-in-out;
  }

  &:hover {
    height: 45px;
    width: 45px;
  }
`;

export const StyledStarRating = styled(Card.Text)`
  & {
    transition: all 100ms ease-in-out;
  }

  &:hover {
    color: #ffc107;
    cursor: pointer;
  }
`;

export const StyledSearchToggle = styled(Button)`
  & {
    color: #6c757d;
    background: #1c1c1c;
    box-shadow: inset 0 0 8px black, 0 0 0px black;
    transition: box-shadow 150ms ease-in-out;
  }

  &:hover {
    color: #89959f;
    background: #1c1c1c;
    box-shadow: inset 0 0 0px black, 0 0 8px black;
  }

  &:active:focus {
    color: #89959f;
    background: #1c1c1c;
    transform: scale(0.98);
  }
`;
