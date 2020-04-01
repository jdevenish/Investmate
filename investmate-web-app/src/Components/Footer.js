import React from 'react';
import "../App.css"

function Footer() {

    return (
        <div className="footer">
            <h4>Built by Justin Devenish</h4>
            <p>Stock data provided by <a style={{textDecoration: "none", color: "white"}} href="https://iexcloud.io/" >IEX Cloud</a></p>
        </div>
    );
}

export default Footer;
