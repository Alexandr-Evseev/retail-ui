import React from 'react';
import cn from 'classnames';

import { isIE11 } from '../../lib/utils';
import {
  SpinnerFallbackAnimationRunner,
  createOffsetAnimation,
  createLengthAnimation,
  createColorAnimation,
  createRotationAnimation,
} from '../../components/Spinner/SpinnerFallbackAnimation';
import { isTestEnv } from '../../lib/currentEnvironment';
import { ThemeContext } from '../../lib/theming/ThemeContext';

import { jsStyles } from './SpinnerIcon.styles';

export interface SpinnerIconProps {
  className: string;
  size: 'mini' | 'normal' | 'big';
  dimmed?: boolean;
}

export const sizes = {
  big: {
    size: 96,
    width: 4,
    radius: 32,
  },
  normal: {
    size: 48,
    width: 2,
    radius: 16,
  },
  mini: {
    size: 16,
    width: 1.5,
    radius: 6,
  },
};

export const SpinnerIcon = ({ size, className, dimmed }: SpinnerIconProps) => {
  const currentSize = sizes[size];
  const svgRef = React.useRef<SVGSVGElement>(null);
  const fallbackAnimationRef = React.useRef<SpinnerFallbackAnimationRunner | null>(null);
  const theme = React.useContext(ThemeContext);

  React.useEffect(() => {
    if (isIE11 && !isTestEnv) {
      const setStyleProperty: CSSStyleDeclaration['setProperty'] = (...args) => {
        const svg = svgRef.current;
        if (svg) {
          svg.style.setProperty(...args);
        }
      };

      const { red, yellow, green, brand } = theme;

      fallbackAnimationRef.current = new SpinnerFallbackAnimationRunner(
        [
          createOffsetAnimation(0, -230, 1000, setStyleProperty, '%'),
          createLengthAnimation([62, 168], [187, 43], 2000, setStyleProperty, '%'),
          createRotationAnimation(0, 360, 2000, setStyleProperty),
          ...(dimmed ? [] : [createColorAnimation([red, yellow, green, brand], 1500, setStyleProperty)]),
        ],
        1000 / 60,
      );

      return () => {
        const fallbackAnimation = fallbackAnimationRef.current;
        const svg = svgRef.current;
        if (fallbackAnimation) {
          fallbackAnimation.stop();
        }
        if (svg) {
          svg.removeAttribute('style');
        }
      };
    }
  });

  return (
    <span className={jsStyles.root()}>
      <svg
        viewBox={`0 0 ${currentSize.size} ${currentSize.size}`}
        className={cn(jsStyles.icon(), className)}
        width={currentSize.size}
        height={currentSize.size}
        fill="none"
        strokeDasharray={`${(10 * currentSize.radius) / 6}, ${(27 * currentSize.radius) / 6}`}
        strokeDashoffset="0"
        strokeWidth={currentSize.width}
        ref={svgRef}
      >
        <circle cx={currentSize.size / 2} cy={currentSize.size / 2} r={currentSize.radius} />
      </svg>
    </span>
  );
};
