import React from 'react';
import './App.css';
import Cookies from 'universal-cookie';

class GitHubSettings extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.cookies = new Cookies();
    }

    handleChange(event) {
        this.props.onSettingChange(event.target.value)
        this.cookies.set(this.props.label, event.target.value, { path: '/' });
    }

    componentDidMount() {
        //i need to propagate the state that could be stored in the cookie
        var storedValue = this.readCookie();
        this.props.onSettingChange(storedValue);
    }

    readCookie() {
        var storedValue = this.cookies.get(this.props.label);
        if (storedValue == null) {
            storedValue = "";
        }
        return storedValue;
    }

    render() {
        var storedValue = this.readCookie();
        return (
            <fieldset>
                <label>
                    {this.props.label}: <input style={{ width: "350px" }} value={storedValue} onChange={this.handleChange} />
                </label>
            </fieldset>
        );
    }
}

export default GitHubSettings