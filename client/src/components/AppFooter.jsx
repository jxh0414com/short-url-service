const AppFooter = () => {
    return (
        <div style={styles.footer}>
            Juhuang Xue &copy; 2021
        </div>
    )
}

const styles = {
    footer: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "15px 0",
        backgroundColor: "#343a40",
        color: "white"
    }
}

export default AppFooter
