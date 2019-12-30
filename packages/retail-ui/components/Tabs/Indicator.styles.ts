import { css } from '../../lib/theming/Emotion';
import { ITheme } from '../../lib/theming/Theme';

export const jsStyles = {
  root(t: ITheme) {
    return css`
      background: ${t.tabColorFocus};
    `;
  },

  primary(t: ITheme) {
    return css`
      background: ${t.tabColorPrimary};
    `;
  },

  success(t: ITheme) {
    return css`
      background: ${t.tabColorSuccess};
    `;
  },

  warning(t: ITheme) {
    return css`
      background: ${t.tabColorWarning};
    `;
  },

  error(t: ITheme) {
    return css`
      background: ${t.tabColorError};
    `;
  },
};
