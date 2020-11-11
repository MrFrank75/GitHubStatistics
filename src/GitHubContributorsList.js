import React from 'react';
import GitHubContributor from './GitHubContributor'
class GitHubContributorsList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log("Contributor list value:" + this.props.contributorsList);
        return (
            <div>
                {
                    this.props.contributorsList.map((contributor) => <GitHubContributor name={contributor.getGitHubRawData().login} key={contributor.getGitHubRawData().id} totContributions={contributor.globalContributions} />)
                }
            </div>
        );
    }
}

export default GitHubContributorsList