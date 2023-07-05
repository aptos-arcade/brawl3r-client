import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    fonts: {
        heading: `'Press Start 2P', sans-serif`,
        body: `'Press Start 2P', sans-serif`,
    },
    colors: {
        brand: {
            100: "#90CDF4",
            200: "#90CDF4",
            300: "#90CDF4",
            400: "#90CDF4",
            500: "#90CDF4",
            600: "#90CDF4",
            700: "#90CDF4",
            800: "#90CDF4",
            900: "#90CDF4",
        },
        background: {
            100: "#1A202C",
            200: "#1A202C",
            300: "#1A202C",
            400: "#1A202C",
            500: "#1A202C",
            600: "#1A202C",
            700: "#1A202C",
            800: "#1A202C",
            900: "#1A202C",
        }
    },
    config: {
        initialColorMode: "dark",
    }
});

export default theme;