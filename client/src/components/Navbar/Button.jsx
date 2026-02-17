import React from 'react';
import styled from 'styled-components';

const Button = () => {
  return (
    <StyledWrapper>
      <button>
        <span>Button</span>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  button {
   display: inline-block;
   width: 150px;
   height: 50px;
   border-radius: 10px;
   border: 1px solid #5e67e5;
   position: relative;
   overflow: hidden;
   background: #5e67e5;
   cursor: pointer;
   transition: background 0.5s ease-out;
  }

  button span {
   color: #ffffff;
   font-size: 18px;
   font-weight: 500;
   position: relative;
  }`;

export default Button;
