import React from "react";
import Button from "@atlaskit/button";
import styled from "styled-components";
import CheckIcon from "@atlaskit/icon/glyph/check";
import { css } from "styled-components";

const ButtonStyled = styled(Button)`
  margin-top: 5px;
  text-align: left;

  &:hover {
    .check-icon {
      display: inline-block;
    }
  }
  &,
  &:hover {
    ${(p) =>
      p.isCompleted &&
      css`
        text-decoration: line-through;
      `}
  }
  //   .check-icon {
  //     display: none;
  //   }
`;

export default function Todo({ todo, onCheckButtonClick }) {
  return (
    <div>
      <ButtonStyled
        isCompleted={todo.isCompleted}
        shouldFitContainer
        iconAfter={
          !todo.isCompleted && (
            <span
              className="check-icon"
              onClick={() => onCheckButtonClick(todo.id)}
            >
              <CheckIcon primaryColor="#4fff4f" />
            </span>
          )
        }
      >
        {todo.name}
      </ButtonStyled>
    </div>
  );
}
