import React from 'react';
import GitHubContributor from './GitHubContributor';
import './index.css';
import { objGitHubContributor } from './objGitHubContributor';

export default function GitHubRepoStatsCalculator(props, row) {

    function getContributorsList(urlContributors, repoName) {
        var contributorsList = new Array();
        contributorsList.push("fakestuff")
        fetch(
            urlContributors,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + props.token
                }
            }
        )
        .then(res => res.json())
        .then((data) => {
            console.log("Contributors data fetched for url:" + urlContributors)
            console.log(data)
            for (let i = 0; i < data.length; i++) {
                let gitHubContributor = new objGitHubContributor(data[i], data[i].contributions);
                contributorsList.push(gitHubContributor);
            }
        })
        .catch((error) => console.log("Error in getContributorsList:" + error))

        //this is currently returning a value before the fetch is done
        return contributorsList;
    }

    return (getContributorsList(row.repoRawJson.contributors_url, props.name).length);
}