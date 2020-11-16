import React from 'react';
import GitHubRepo from './GitHubRepo'
import './index.css';

class GitHubReposList extends React.Component {
    constructor(props) {
        super(props);
     
    }

    render() {
        return (
                <span class="gitHubRepoTable">
                    {
                        this.props.repos.map((repo) => <GitHubRepo
                            token={this.props.token}
                            name={repo.name}
                            key={repo.id}
                            gitHubRawJson={repo}
                            onSingleRepoContributorListChange={this.props.onSingleRepoContributorListChange} />)
                    }
                </span>
        );
    }
}

export default GitHubReposList