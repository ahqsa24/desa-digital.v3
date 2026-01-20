import styled from 'styled-components'
import { marginStyle } from "Consts/sizing";

export const Background = styled.div`
  background-image: url('/images/header-innovator-txt.svg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position:left top;
  display: flex;
  width: 100%;
  height: 145px;
  position: relative;
`

export const Icon = styled.img`
  cursor: pointer;
  justify-content: center;
  border-radius: 0px;
  ${marginStyle}
`;