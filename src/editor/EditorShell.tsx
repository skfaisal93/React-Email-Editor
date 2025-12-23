import { Box } from "@mui/material";
import { TopBar } from "./components/TopBar";
import { Canvas } from "./components/Canvas";
import { RightSidebar } from "./components/RightSidebar";

export function EditorShell() {
    return (
        <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
            <TopBar />

            {/* IMPORTANT: minHeight:0 lets children scroll properly in flex layouts */}
            <Box sx={{ flex: 1, display: "flex", minHeight: 0 }}>
                <Canvas />
                <RightSidebar />
            </Box>
        </Box>
    );
}
