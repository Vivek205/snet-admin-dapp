/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/aria-role */
import React, { Component, ReactNode } from "react";

class ConnectWallet extends Component {
  public render(): ReactNode {
    return (
      <React.Fragment>
        <div className="inner">
          <span className="gradientnav" />
          <div
            id="roadmap-row"
            data-midnight="light"
            data-bg-mobile-hidden=""
            className="wpb_row vc_row-fluid vc_row full-width-section standard_section"
            style={{ visibility: "visible" }}
            data-top-percent="4%"
            data-bottom-percent="4%"
          >
            <div className="header">
              <div className="col-xs-6 col-sm-4 col-md-6 col-lg-6 logo">
                <h1>
                  <a href="#" title="SingularityNET">
                    <span className="icon-logo"></span>
                  </a>
                </h1>
              </div>
            </div>
            <main role="content">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <div className="welcome-to">
                    Welcome to SingularityNET Admin Dapp
                  </div>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 overview-text">
                  SingularityNET Admin Dapp is an open and decentralized
                  application for monitoring Daemon configuration.
                  <br />
                  It is a a one stop place to remotely monitor and configure the
                  Daemon in a secure way.
                  <br />
                  <br />
                  <br />
                </div>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 ">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 overview-text">
                    This Dapp allows you to browse the list of daemon
                    configurations of a service published in the SingularityNET
                    Dapp.
                    <br />
                    You need a Metamask wallet to authenticate your blockchain
                    account
                    <br />
                    <br />
                    <a
                      target="_blank"
                      href="https://metamask.io/"
                      rel="noopener noreferrer"
                    >
                      <button className="let-get-started-btn">
                        Install Metamask
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ConnectWallet;
