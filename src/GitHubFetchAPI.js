import React from 'react';
import './App.css';

class GitHubFetchAPI extends React.Component {
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
                //updating the parent with the changed Repo list
                this.props.onFetchAPIChange(this.state.repos);
            })
            .then(() => {
                console.log("Next Page link:" + nextPageLink);
                if ((nextPageLink != "") && (currentPageNumber < maxPageNumber))
                    this.fetchPageRepoList(nextPageLink, currentPageNumber + 1, maxPageNumber);
            })
            .catch((error) => console.log(error))
    }

    handleGetRepos(event) {
        var url = 'https://api.github.com/orgs/' + this.props.organizationId + '/repos';
        this.fetchPageRepoList(url, 0, 1) //change the maxPageNumber to 100 if you want to fetch all the repos
        
    }


    render() {
        return (
            <div>
                <button className="headerElement" onClick={this.handleGetRepos}>Fetch!</button>
            </div>
        );
    }
}

export default GitHubFetchAPI