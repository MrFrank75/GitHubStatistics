import React from 'react';
import './App.css';

class GitHubSettings extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.onSettingChange(event.target.value)
    }

    render() {
        const settingValue = this.props.setting;
        return (
            <fieldset>
                <label>
                    {this.props.label}: <input style={{ width: "350px" }} value={settingValue} onChange={this.handleChange} />
                </label>
            </fieldset>
        );
    }
}

export default GitHubSettings