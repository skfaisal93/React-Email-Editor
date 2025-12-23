import * as React from "react";
import {
    AppBar,
    Toolbar,
    Button,
    Box,
    IconButton,
    Typography,
    Divider,
} from "@mui/material";

import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SettingsIcon from "@mui/icons-material/Settings";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import CodeIcon from "@mui/icons-material/Code";

export function TopBar() {
    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                bgcolor: "common.white",
                color: "text.primary",
                borderBottom: "1px solid",
                borderColor: "divider",
            }}
        >
            {/* ROW 1: Previous | Save and exit | Next */}
            <Toolbar
                disableGutters
                sx={{
                    px: 2,
                    minHeight: 52,
                    borderBottom: "1px solid",
                    borderColor: "divider",
                }}
            >
                <Button
                    variant="outlined"
                    size="small"
                    sx={{ textTransform: "none", borderRadius: 1 }}
                >
                    Previous
                </Button>

                <Box sx={{ flex: 1 }} />

                <Button
                    variant="outlined"
                    size="small"
                    sx={{ textTransform: "none", borderRadius: 1, mr: 1 }}
                >
                    Save and exit
                </Button>

                <Button
                    variant="contained"
                    size="small"
                    sx={{ textTransform: "none", borderRadius: 1 }}
                >
                    Next
                </Button>
            </Toolbar>

            {/* ROW 2: Breadcrumbs left | Icons right */}
            <Toolbar
                disableGutters
                sx={{
                    px: 2,
                    minHeight: 56,
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        Campaign
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        /
                    </Typography>
                    <Typography variant="body2">New Campaign</Typography>

                    {/* small edit icon placeholder (matches pencil feel) */}
                    <Typography
                        variant="body2"
                        sx={{
                            ml: 0.5,
                            color: "text.secondary",
                            userSelect: "none",
                            cursor: "default",
                        }}
                        title="Rename"
                    >
                        ✎
                    </Typography>
                </Box>

                <Box sx={{ flex: 1 }} />

                {/* Right icon group (like screenshot) */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <IconButton size="small" aria-label="help">
                        <HeadphonesIcon fontSize="small" />
                    </IconButton>

                    <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

                    <IconButton size="small" aria-label="undo">
                        <UndoIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" aria-label="redo">
                        <RedoIcon fontSize="small" />
                    </IconButton>

                    <IconButton size="small" aria-label="preview">
                        <VisibilityIcon fontSize="small" />
                    </IconButton>

                    {/* these two mimic the “extra tools” icons you see in the bar */}
                    <IconButton size="small" aria-label="images">
                        <PhotoSizeSelectActualIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" aria-label="code">
                        <CodeIcon fontSize="small" />
                    </IconButton>

                    <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

                    <IconButton size="small" aria-label="settings">
                        <SettingsIcon fontSize="small" />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
