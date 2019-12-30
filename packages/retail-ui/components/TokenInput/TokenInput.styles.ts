import { css } from '../../lib/theming/Emotion';
import styles from './TokenInput.module.less';
import { Theme } from '../../lib/theming/Theme';

export const jsStyles = {
  label(t: Theme) {
    return css`
      .${styles.root} & {
        background-color: ${t.inputBg};
        box-shadow: ${t.inputShadow};
        border: ${t.inputBorderWidth} solid ${t.borderColorGrayLight};
        border-top-color: ${t.inputBorderTopColor};
      }
    `;
  },

  warning(t: Theme) {
    return css`
      .${styles.root} & {
        border: 1px solid ${t.borderColorWarning};
        box-shadow: 0 0 0 1px ${t.borderColorWarning};
      }
    `;
  },

  error(t: Theme) {
    return css`
      .${styles.root} & {
        border: 1px solid ${t.borderColorError};
        box-shadow: 0 0 0 1px ${t.borderColorError};
      }
    `;
  },

  labelFocused(t: Theme) {
    return css`
      .${styles.root} & {
        border: 1px solid ${t.borderColorFocus};
        box-shadow: 0 0 0 1px ${t.borderColorFocus};
      }
    `;
  },

  labelDisabled(t: Theme) {
    return css`
      .${styles.root} & {
        background: ${t.inputDisabledBg};
        border-color: ${t.inputDisabledBorderColor};
        box-shadow: none;
      }
    `;
  },

  input(t: Theme) {
    return css`
      .${styles.root} &::placeholder {
        color: ${t.placeholderColor};
        -webkit-text-fill-color: ${t.placeholderColor};
      }
      .${styles.root} &:focus::placeholder {
        color: ${t.placeholderColorLight};
        -webkit-text-fill-color: ${t.placeholderColorLight};
      }
    `;
  },

  inputDisabled(t: Theme) {
    return css`
      .${styles.root} & {
        color: ${t.textColorDisabled};
      }
    `;
  },
};
