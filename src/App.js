import React from 'react';
import GitHubSettings from './GitHubSettings'
import VisualizationContainer from './VisualizationContainer';
import GitHubFetchAPI from './GitHubFetchAPI'
import logo from './logo.svg';
import './App.css';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.handleTokenChange = this.handleTokenChange.bind(this);
        this.handleOrganizationIdChange = this.handleOrganizationIdChange.bind(this);
        this.handleGitHubFetching = this.handleGitHubFetching.bind(this);

        this.state = {
            token: "",
            organizationId: "",
            repos: new Array()
        }
    }

    handleGitHubFetching(repoListChanged) {
        this.setState({ repos: repoListChanged });
    }

    handleTokenChange(tokenChanged) {
        this.setState({ token: tokenChanged });
    }

    handleOrganizationIdChange(organizationIdChanged) {
        this.setState({ organizationId: organizationIdChanged });
    }

    render() {

      return (
          <div className="App">
              <div className="header">
                  <span className="headerElement">
                  <GitHubSettings className="headerElement" label="Github Token" onSettingChange={this.handleTokenChange} />
                  </span>
                  <span className="headerElement">
                      <GitHubSettings className="headerElement" label="Organization Id" onSettingChange={this.handleOrganizationIdChange} />
                  </span>
                  <span className="headerElement">
                      <GitHubFetchAPI className="headerElement" onFetchAPIChange={this.handleGitHubFetching} token={this.state.token} organizationId={this.state.organizationId} />
                  </span>
                </div>
              <div className="body">
                  <VisualizationContainer repos={this.state.repos} token={this.state.token}  />
              </div>
        </div>
      );
    }
}

export default App;
