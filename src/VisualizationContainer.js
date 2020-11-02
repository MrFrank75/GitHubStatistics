import React from 'react';
import GitHubReposList from './GitHubReposList'

class VisualizationContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div>
                    Total repos: {this.props.repos.length}
                </div>
                <div>
                    <GitHubReposList repos={this.props.repos} token={this.props.token}/>
                </div>
            </div>
        );
    }
}

export default VisualizationContainer