import styled, { keyframes } from 'styled-components';
import BaseAnimation from 'Styles/BaseAnimations';

const bounceInLeftAnimation = keyframes`
  from, 60%, 75%, 90%, to {
   animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
  }

  0% {
   opacity: 0;
   transform: translate3d(-3000px, 0, 0);
  }

  60% {
   opacity: 1;
   transform: translate3d(25px, 0, 0);
  }

  75% {
   transform: translate3d(-10px, 0, 0);
  }

  90% {
   transform: translate3d(5px, 0, 0);
  }

  to {
   transform: none;
  }
`;

const BounceInLeft = styled(BaseAnimation)`
  animation-name: ${bounceInLeftAnimation};
`;

export default BounceInLeft;