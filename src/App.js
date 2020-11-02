import React from 'react';
import GitHubSettings from './GitHubSettings'
import GitHubCallsHandler from './GitHubCallsHandler'
import logo from './logo.svg';
import './App.css';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.handleTokenChange = this.handleTokenChange.bind(this);
        this.handleOrganizationIdChange = this.handleOrganizationIdChange.bind(this);

        this.state = {
            token: "",
            organizationId: ""
        }
    }

    handleTokenChange(tokenChanged) {
        this.setState({ token: tokenChanged });
    }

    handleOrganizationIdChange(organizationIdChanged) {
        this.setState({ organizationId: organizationIdChanged });
    }

    render() {
      const organizationId = this.state.organizationId;

      return (
          <div className="App">
              <div className="header">
                  <span className="headerElement">
                  <GitHubSettings className="headerElement" label="Github Token" onSettingChange={this.handleTokenChange} />
                  </span>
                  <span className="headerElement">
                      <GitHubSettings className="headerElement" label="Organization Id" onSettingChange={this.handleOrganizationIdChange} />
                    </span>
                </div>
              <div className="body">
                  <GitHubCallsHandler token={this.state.token} organizationId={this.state.organizationId} />
              </div>
        </div>
      );
    }
}

export default App;
