import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        minWidth: 250,
    },
});

function createGitHubData(contributorsList) {
    var gitHubDataRows = new Array();
    contributorsList.map((contributor) => { gitHubDataRows.push(createSingleGitHubDataRow(contributor)) });

    return gitHubDataRows;
}

function createSingleGitHubDataRow(contributor) {
    return { login: contributor.getGitHubRawData().login, globalContributions: contributor.globalContributions};
}


export default function GitHubContributorsList(props) {
    const classes = useStyles();
    const rows = createGitHubData(props.contributorsList);

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Login</TableCell>
                        <TableCell align="right">Contributions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">{row.login}</TableCell>
                            <TableCell align="right">{row.globalContributions}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
