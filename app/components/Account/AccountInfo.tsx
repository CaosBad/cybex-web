import * as React from "react";
import AccountImage from "./AccountImage";
import ChainTypes from "../Utility/ChainTypes";
import BindToChainState from "../Utility/BindToChainState";
import Translate from "react-translate-component";
import QRCode from "qrcode.react";
import { getClassName } from "utils";
import counterpart from "counterpart";
import GameModal from "components/Modal/GameModal";
import ModalActions from "actions/ModalActions";

const insiders = require("assets/insiders.json");

class AccountInfo extends React.Component<any, any> {

    static propTypes = {
        account: ChainTypes.ChainAccount.isRequired,
        title: React.PropTypes.string,
        image_size: React.PropTypes.object.isRequired,
        my_account: React.PropTypes.bool
    }

    static defaultProps = {
        title: null,
        image_size: { height: 120, width: 120 },
        showQR: false,
        titleClass: "account-title"
    }

    constructor() {
        super();

        this.state = {
            hover: false
        };
    }

    showThanks = (name) => {
        let { account, image_size } = this.props;        
        ModalActions.showModal("thanks_" + account.get("name"));
    }

    render() {
        let { account, image_size } = this.props;

        let isLTM = account.get("lifetime_referrer_name") === account.get("name");

        let QR = <div className="account-image"><QRCode size={image_size.width} value={account.get("name")} /></div>;

        let qrState = !this.state.hover ? this.props.showQR : !this.props.showQR;

        return (
            <div style={{ maxWidth: image_size.width }} className={"account-info" + (this.props.my_account ? " my-account" : "")}>
                {this.props.title ? <h4>{this.props.title}</h4> : null}
                <AccountImage size={image_size} account={account.get("name")} custom_image={null} />
                {/* <p><Translate content="account.deposit_address" />!</p> hidden for CYB temp */}
                <p className={this.props.titleClass}>
                    <span title={counterpart.translate("account.member.lifetime")} className={getClassName("", { "lifetime": isLTM })}>
                        {account.get("name")}
                        {
                            account.get("name") in insiders &&
                            <span onClick={() => this.showThanks(account.get("name"))} title={counterpart.translate("cybex.insider")} className="cybex-rainbow"></span>
                        }
                    </span>
                </p>
                <GameModal modalId={"thanks_" + account.get("name")} accountName={account.get("name")} />
                {/* <div className="secondary">
                    <span className="subheader">#{display_id}</span>
                    {this.props.my_account ? <span className="my-account-label"><Translate content="account.mine" /></span> : null}
                </div> */}
            </div>
        );
    }
}

export default BindToChainState(AccountInfo);
