import * as React from "react";
import * as PropTypes from "prop-types";
import Radium from "Radium";
import Colors from "./Colors";
import { getIcon } from "./IconMap";

let Icon = class extends React.Component<
  {
    disabled?: boolean;
    active?: boolean;
    icon: string;
    type?: string;
    style?: any;
    onClick?;
  },
  any
> {
  static defaultProps = {
    icon: "add",
    active: false,
    type: "base",
    style: {}
  };

  static propTypes = {
    active: PropTypes.bool,
    style: PropTypes.object,
    type: PropTypes.string,
    icon: PropTypes.string
  };

  getStyles = (icon, type = "base") => {
    let url = getIcon(icon, type);
    return {
      base: {
        display: "inline-block",
        width: "1em",
        minWidth: "1em",
        height: "1em",
        minHeight: "1em",
        backgroundImage: `url(${url})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover"
      }
    };
  };

  render() {
    let { icon, active, style, type } = this.props;
    let styles = this.getStyles(icon, active ? "active" : type);
    return <i style={[styles.base, style] as any} />;
  }
};

Icon = Radium(Icon);

export { Icon };
export default Icon;
