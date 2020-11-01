export class objGitHubContributor {
    constructor(gitHubRawData, globalContributions) {
        this.gitHubRawData = gitHubRawData;
        this._globalContributions = globalContributions;
    }
    getGitHubRawData() {
        return this.gitHubRawData;
    }

    get globalContributions() {
        return this._globalContributions;
    }
    set globalContributions(x) {
        this._globalContributions = x;
    }
}
