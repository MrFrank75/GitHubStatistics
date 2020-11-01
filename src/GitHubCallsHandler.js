import React from 'react';
import GitHubReposList from './GitHubReposList'

class GitHubCallsHandler extends React.Component {
    constructor(props) {
        super(props);
        this.handleGetRepos = this.handleGetRepos.bind(this);

        this.state = {
            repos: new Array(),
        }
    }

    buildRepoList(gitHubResponse) {

        var newRepos = this.state.repos;
        for (var i = 0; i < gitHubResponse.length; i++) {
            newRepos.push(gitHubResponse[i]);
        }

        this.setState({
            repos: newRepos
        })
    }

    parseNextPageLink(responseHeaders) {
        var nextPageLink = "";
        responseHeaders.forEach(function (val, key) {
            if (key === "link") {
                var linksArray = val.split(',');
                linksArray.forEach(function (singleLink) {
                    var singleLinkValues = singleLink.split(';');
                    var nextLinkRaw = singleLinkValues[0].trim();
                    var relation = singleLinkValues[1];
                    console.log("LinksArray nextLinkRaw:" + nextLinkRaw);
                    console.log("LinksArray Relation: " + relation);
                    if (relation.includes("next")) {
                        nextPageLink = nextLinkRaw.substring(1, nextLinkRaw.length - 1);
                    }
                })
            }
        });
        console.log("Returning nextPageLink: " + nextPageLink);
        return nextPageLink;
    }

    fetchPageRepoList(url, currentPageNumber,maxPageNumber) {
        var nextPageLink = "";
        fetch(
                url,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + this.props.token
                    }
                }
            )
            .then(res => {
                console.log("Response Header:" + res.headers);
                nextPageLink = this.parseNextPageLink(res.headers);
                console.log("This is the next page link: " + nextPageLink);
                return res.json()
            })
            .then((data) => {
                console.log("Data fetched")
                console.log(data)
                this.buildRepoList(data);
            })
            .then(() => {
                console.log("Next Page link:" + nextPageLink);
                if ((nextPageLink != "") && (currentPageNumber < maxPageNumber))
                    this.fetchPageRepoList(nextPageLink, currentPageNumber + 1, maxPageNumber);
            })
            .catch((error) => console.log(error))
    }

    handleGetRepos(event) {
        var url = 'https://api.github.com/orgs/XXX/repos';
        this.fetchPageRepoList(url,0,1) //change the maxPageNumber to 100 if you want to fetch all the repos
    }



    render() {
        return (
            <div>
                <div>
                    <button onClick={this.handleGetRepos}>Get Repos</button>
                    Total repos: {this.state.repos.length}
                </div>
                <div>
                    <GitHubReposList repos={this.state.repos} token={this.props.token}/>
                </div>
            </div>
        );
    }
}

export default GitHubCallsHandler