import * as React from "react";
import * as PropTypes from "prop-types";
import Radium from "radium";
import Colors from "./Colors";
import { Button, ButtonSize, ButtonType } from "./Button";

let LabelOption = class extends React.Component<
  {
    children?;
    disabled?: boolean;
    active?: boolean;
    size?: ButtonSize;
    type?: ButtonType;
    style?: React.CSSProperties;
    onClick?;
  },
  any
> {
  static defaultProps = {
    type: "secondary",
    size: "normal",
    disabled: false,
    active: false
  };

  static propTypes = {
    disabled: PropTypes.bool,
    active: PropTypes.bool,
    onClick: PropTypes.func,
    type: PropTypes.oneOf(["primary", "secondary"]).isRequired,
    size: PropTypes.oneOf(["normal", "small", "xsmall", "big"]).isRequired
  };

  render() {
    let { children, size, type, disabled, active, style } = this.props;
    let styles = Button.Styles;
    return (
      <span
        className="clickable"
        style={
          [
            styles.base,
            styles[type],
            styles[size],
            active && styles[type][":active"],
            style
          ] as any
        }
        onClick={this.props.onClick ? this.props.onClick : () => void 0}
      >
        {children}
      </span>
    );
  }
};
LabelOption = Radium(LabelOption);

export { LabelOption };
export default LabelOption;