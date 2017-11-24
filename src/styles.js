// Function that returns app styles given a config

export const styles = config => ({
    app: {
        fontFamily: config.customFontFamily || config.googleFontFamily
    },
    appLogo: {
        height: "80px"
    },
    appHeader: {
        textAlign: "center",
        backgroundColor: "#222",
        height: "auto",
        padding: "20px",
        color: "white"
    },
    appTitle: {
        fontSize: `${config.headerFontSize}`,
        fontWeight: `${config.fontWeights[2]}`
    },
    appHeading: {
        fontWeight: `${config.fontWeights[1]}`
    },
    appIntro: {
        padding: "40px",
        fontSize: `${config.bodyFontSize}`,
        fontWeight: `${config.fontWeights[0]}`
    }
})