import React from 'react';
import GitHubContributor from './GitHubContributor';
import './index.css';
import { objGitHubContributor } from './objGitHubContributor';


const GitHubRepoContributorList = ({ gitHubContributors }) => (
    <div>
        {
            gitHubContributors.map((contributor) => <GitHubContributor name={contributor.getGitHubRawData().login} key={contributor.getGitHubRawData().id} totContributions={contributor.getGitHubRawData().contributions} />)
        }
    </div>
)

class GitHubRepo extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            gitHubContributors: new Array(),
            isContributorsListHidden: true
        }
    }

    getContributorsList(urlContributors, repoName) {

        console.log("Called the BuildContributorList:" + urlContributors)
        var contributorsList = this.state.gitHubContributors;
        fetch(
            urlContributors,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.props.token
                }
            }
        )
            .then(res => res.json())
            .then((data) => {
                console.log("Contributors data fetched for url:" + urlContributors)
                console.log(data)
                for (let i = 0; i < data.length; i++)
                {
                    let gitHubContributor = new objGitHubContributor(data[i], data[i].contributions);
                    contributorsList.push(gitHubContributor);
                }
                
                this.setState({
                    gitHubContributors: contributorsList
                })

                //passing the updated contributor list to the parent
                this.handleContributorListChange(contributorsList);
            })
            .catch((error) => console.log("Error in BuildContributorsList:" + error))
    }

    toggleHidden() {
        this.setState({
            isContributorsListHidden: !this.state.isContributorsListHidden
        })
    }

    handleContributorListChange(singleRepoContributorList) {
        this.props.onGlobalContributorsListChange(singleRepoContributorList)
    }

    componentDidMount() {
        this.getContributorsList(this.props.gitHubRawJson.contributors_url, this.props.name);
    }

    render() {
        return (
            <div class="gitHubRepoRow" >
                    <div class="gitHubRepoCell">
                        {this.props.name}
                    </div>
                    <div class="gitHubRepoCell">
                    <div>
                        <div>Contributors:{this.state.gitHubContributors.length}
                        </div>
                    </div>
                </div>
                    <div class="gitHubRepoCell">
                        <div>
                        <button onClick={this.toggleHidden.bind(this)} >+</button>
                        {!this.state.isContributorsListHidden && <GitHubRepoContributorList gitHubContributors={this.state.gitHubContributors} />}
                        </div>
                    </div>
            </div>
        );
    }
}

export default GitHubRepo