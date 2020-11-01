import React from 'react';

class GitHubContributor extends React.Component {
    render() {
        return (
            <div>
                {this.props.name}*{this.props.totContributions}
            </div>
        );
    }
}

export default GitHubContributor