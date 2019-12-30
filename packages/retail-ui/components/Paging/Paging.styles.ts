import { css } from '../../lib/theming/Emotion';
import styles from './Paging.module.less';
import { ITheme } from '../../lib/theming/Theme';

export const jsStyles = {
  dots(t: ITheme) {
    return css`
      color: ${t.pagingDotsColor};
    `;
  },

  forwardLink(t: ITheme) {
    return css`
      color: ${t.pagingForwardLinkColor};
    `;
  },

  disabled(t: ITheme) {
    return css`
      .${styles.forwardLink}& {
        color: ${t.pagingForwardLinkDisabledColor};
      }
    `;
  },

  pageLink(t: ITheme) {
    return css`
      .${styles.pageLinkWrapper} & {
        color: ${t.pagingForwardLinkColor};
      }
      .${styles.pageLinkWrapper} &:not(.${styles.active}):hover {
        background: ${t.pagingPageLinkHoverBg};
      }
    `;
  },

  active(t: ITheme) {
    return css`
      .${styles.pageLinkWrapper} .${styles.pageLink}& {
        background: ${t.pagingPageLinkActiveBg};
        color: ${t.pagingPageLinkActiveColor};
      }
    `;
  },

  focused(t: ITheme) {
    return css`
      .${styles.pageLinkWrapper} .${styles.pageLink}& {
        border: solid 2px ${t.borderColorFocus};
      }
    `;
  },

  pageLinkHint(t: ITheme) {
    return css`
      .${styles.pageLinkWrapper} & {
        color: ${t.pagingPageLinkHintColor};
      }
    `;
  },
};
