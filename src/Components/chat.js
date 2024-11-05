import React, { Component, useState } from "react";

class KommunicateBot extends Component{
    constructor(props){
        super(props);
    }


componentDidMount(){
    (function(d, m){
        var kommunicateSettings = 
            {"appId":"48b2e6ea77f6f1555224bc43d311de51","popupWidget":true,"automaticChatOpenOnNavigation":true};
        var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
        s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
        var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
        window.kommunicate = m; m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});
}
render(){
    return (
        <div></div>
    )
}
}

export default KommunicateBot;