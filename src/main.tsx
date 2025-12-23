import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
    typography: {
        fontFamily: `"Roboto", system-ui, -apple-system, "Segoe UI", Arial, sans-serif`,
        fontSize: 14,
        body2: { fontSize: 13 },
        subtitle2: { fontSize: 13, fontWeight: 600 },
    },
    palette: {
        background: { default: "#ffffff", paper: "#ffffff" },
        text: {
            primary: "#1f2937", // deep gray (not pure black)
            secondary: "#6b7280",
        },
        divider: "rgba(31, 41, 55, 0.12)",
    },
    shape: {
        borderRadius: 6,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                    fontWeight: 600,
                    borderRadius: 6,
                    paddingLeft: 12,
                    paddingRight: 12,
                },
                outlined: {
                    borderColor: "rgba(31, 41, 55, 0.25)",
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: "rgba(31, 41, 55, 0.75)",
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: 12,
                    letterSpacing: 0.3,
                },
            },
        },
        MuiAccordionSummary: {
            styleOverrides: {
                content: {
                    margin: "8px 0",
                },
            },
        },
    },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </React.StrictMode>
);
