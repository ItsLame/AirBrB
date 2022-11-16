import Card from 'react-bootstrap/Card';
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
