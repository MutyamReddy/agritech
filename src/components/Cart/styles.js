import { makeStyles } from "@material-ui/core/styles";
export default makeStyles((theme) => ({
    root: {
        justifyContent: "center",
    },
    toolbar: theme.mixins.toolbar,
    title: {
        marginTop: "1%",
    },
    emptyButton: {
        minWidth: "150px",
        [theme.breakpoints.down("xs")]: {
            marginBottom: "5px",
        },
        [theme.breakpoints.up("xs")]: {
            marginRight: "20px",
        },
    },
    checkoutButton: {
        minWidth: "150px",
    },
    link: {
        textDecoration: "none",
        color: "#000",
    },
    cardDetails: {
        display: "flex",
        marginTop: "10%",
        width: "100%",
        justifyContent: "space-evenly",
    },
}));
