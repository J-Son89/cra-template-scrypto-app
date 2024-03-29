

xrdMainnet = "resource_xrd_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc"
xrdStokenet = "resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc"

const constants = {
    xrdAddress: process.env.REACT_APP_MAINNET === "1" ? xrdMainnet : xrdStokenet

}

export default constants
