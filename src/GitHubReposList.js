import React from 'react';
import GitHubRepo from './GitHubRepo'
import './index.css';
import GitHubContributorsList from './GitHubContributorsList'
import { objGitHubContributor } from './objGitHubContributor';

class GitHubReposList extends React.Component {
    constructor(props) {
        super(props);

        this.handleGlobalContributorsListChange = this.handleGlobalContributorsListChange.bind(this);
        this.state = {
            contributors: new Array() //array of objGitHubContributor
        }
    }

    handleGlobalContributorsListChange(objGitHubContributorListFromARepo) {

        var currentContributorsList = this.state.contributors;
        
        //checking for each contributor if it is already present before adding it to the pool
        for (var i = 0; i < objGitHubContributorListFromARepo.length; i++) {
            var gitHubContributorFromRepo = objGitHubContributorListFromARepo[i].getGitHubRawData();
            console.log("Veryfing Contributor Login:" + gitHubContributorFromRepo.login);

            var found = false;
            console.log("Current contributor list contains n.elements:" + currentContributorsList.length);

            currentContributorsList.forEach((item, index) => {
                if (item.getGitHubRawData().login == gitHubContributorFromRepo.login) {
                    found = true;
                    item.globalContributions = parseInt(item.globalContributions,10) + parseInt(gitHubContributorFromRepo.contributions,10);
                    console.log("Updated contributor" + item.getGitHubRawData().login + " with total contribution:" + item.globalContributions);
                }
            })

            if (!found) {
                currentContributorsList.push(objGitHubContributorListFromARepo[i]);
            }
        }

        this.setState({ contributors: currentContributorsList });
    }

    render() {
        return (
            <div>
                <div class="gitHubRepoTable">
                    {
                        this.props.repos.map((repo) => <GitHubRepo
                            token={this.props.token}
                            name={repo.name}
                            key={repo.id}
                            gitHubRawJson={repo}
                            onGlobalContributorsListChange={this.handleGlobalContributorsListChange} />)
                    }
                </div>
                <div>
                    ===============================
                </div>
                <div>
                    Total Contributors: {this.state.contributors.length}
                    <GitHubContributorsList contributorsList={this.state.contributors} />
                </div>
            </div>
        );
    }
}

export default GitHubReposList