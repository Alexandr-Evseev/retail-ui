var React = require('react');

var PropTypes = React.PropTypes;

require('./Link.less');
var cx = require('ui/cx')('RTLink');

/**
 * Стандартная ссылка.
 */
var Link = React.createClass({
  propTypes: {
    href: PropTypes.string,

    disabled: PropTypes.bool,

    onClick: PropTypes.func,
  },

  getDefaultProps() {
    return {
      href: 'javascript:',
    };
  },

  render() {
    var props = {
      className: cx(''),
      href: this.props.href,
    };
    if (this.props.disabled) {
      props.className += ' ' + cx('disabled');
      props.tabIndex = '-1';
    }
    return <a {...this.props} {...props}>{this.props.children}</a>;
  },
});

module.exports = Link;
