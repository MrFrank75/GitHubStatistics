import React from 'react';
import GitHubReposList from './GitHubReposList'
import GitHubContributorsList from './GitHubContributorsList'

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function VisualizationContainer(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [currentContributorsList, setContributors] = React.useState([]);
   
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleSingleRepoContributorListChange = (objGitHubContributorListFromARepo) => {

        //checking for each contributor if it is already present before adding it to the pool
        for (var i = 0; i < objGitHubContributorListFromARepo.length; i++) {
            var gitHubContributorFromRepo = objGitHubContributorListFromARepo[i].getGitHubRawData();
            var found = false;

            currentContributorsList.forEach((item, index) => {
                if (item.getGitHubRawData().login == gitHubContributorFromRepo.login) {
                    found = true;
                    item.globalContributions = parseInt(item.globalContributions, 10) + parseInt(gitHubContributorFromRepo.contributions, 10);
                }
            })

            if (!found) {
                setContributors(contributors => [...contributors, objGitHubContributorListFromARepo[i]]);
            }
        }
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Repositories" {...a11yProps(0)} />
                    <Tab label="Contributors" {...a11yProps(1)} />
                    <Tab label="Item Three" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <GitHubReposList repos={props.repos} token={props.token} onSingleRepoContributorListChange={handleSingleRepoContributorListChange} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <GitHubContributorsList contributorsList={currentContributorsList} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                Item Three
      </TabPanel>
        </div>
    );
}
