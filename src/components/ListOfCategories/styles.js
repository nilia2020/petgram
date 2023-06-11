import styled, { css } from "styled-components";
import { bounceDown } from "../../styles/animation";

export const List = styled.ul`
  display: flex;
  overflow: auto;
  width: 100%;
  margin-bottom: 8px;
  ${(props) =>
    props.fixed &&
    css`
      ${bounceDown({ time: "0.5s" })}
      background: #fff;
      border-radius: 60px;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
      justify-content: center;
      max-width: 600px;
      padding: 5px;
      top: -10px;
      position: fixed;
      transform: scale(0.7);
      z-index: 1;
    `}
`;

export const Item = styled.li`
  padding: 8px 8px;
`;
