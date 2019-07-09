import React from 'react';
import SVG from 'react-inlinesvg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faChevronRight, faChevronDown } from '@fortawesome/free-solid-svg-icons';
 

export class Header extends React.Component {

  constructor(props){
    super(props);
    this.showBox = this.showBox.bind(this);

    this.state = {
      box: false,
    }
  }

  showBox() {
      if(this.state.box) {
        this.setState({box: false});
      } else {
        this.setState({box: true});
      }
  }

render() {
    return (
      <React.Fragment>
        <header className="header">
            <div className="nav">
                <SVG src={require(`../../media/logo-venturus.svg`)} className="logo" />
                <ul className={`login ${(this.state.box) ? "on" : "off"}`} onClick={(e) => this.showBox()}>
                  <li><span className="circle">RC</span></li>
                  <li>
                    <h1 className="text-perfil">Ricardo Comino</h1>
                    <ul className="options">
                      <li>Friends List</li>
                      <li>Saved Items</li>
                      <li>Notications</li>
                      <li>User Preferences</li>
                      <li>Log out</li>
                    </ul>
                  </li>
                  <li><FontAwesomeIcon icon={faChevronDown} className="icon-arrow" /></li>
                </ul>
            </div>

            <div className="breadcrumb" >
                <div className="grid">
                  <ul className="wrap-breadcrumb">
                    <li className="icon-home"><a href="#home"><FontAwesomeIcon icon={faHome} /></a></li>
                    <li className="icon-arrow"><FontAwesomeIcon icon={faChevronRight} /></li>
                    <li><a href="#page-name">Page Name</a></li>
                    <li className="icon-arrow"><FontAwesomeIcon icon={faChevronRight} /></li>
                    <li><a href="#page-name">...</a></li>
                    <li className="icon-arrow"><FontAwesomeIcon icon={faChevronRight} /></li>
                    <li>Current Page</li>
                  </ul>
                </div>
            </div>
        </header>
      </React.Fragment>
    );
  }
}

export default Header;