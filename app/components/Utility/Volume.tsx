import * as React from "react"; import * as PropTypes from "prop-types";
import { VolumnStore } from "stores/VolumeStore";
import { VolumnActions } from "actions/VolumeActions";

let VolumnContainer = class extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // VolumnActions.subMarket("JADE.ETH", "CYB");
  }
  render() {
    return <h4>Vol</h4>;
  }
};

export { VolumnContainer };
