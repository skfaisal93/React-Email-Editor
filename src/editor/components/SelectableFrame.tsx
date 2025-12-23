import * as React from "react";
import { Box, Typography } from "@mui/material";

type Props = {
    label: string; // e.g. "SECTION - CONTENT", "CONTAINER"
    active: boolean;
    show: boolean; // show on hover OR active
    color: "success" | "info";
    children: React.ReactNode;
    onPointerEnter?: () => void;
    onPointerLeave?: () => void;
    onClick?: (e: React.MouseEvent) => void;
    topRightControls?: React.ReactNode; // the "..." button
    rightEdgeControls?: React.ReactNode; // green "+"
};

export function SelectableFrame({
                                    label,
                                    active,
                                    show,
                                    color,
                                    children,
                                    onPointerEnter,
                                    onPointerLeave,
                                    onClick,
                                    topRightControls,
                                    rightEdgeControls,
                                }: Props) {
    const borderColor =
        color === "success" ? "success.main" : "info.main";

    return (
        <Box
            onPointerEnter={onPointerEnter}
            onPointerLeave={onPointerLeave}
            onClick={onClick}
            sx={{
                position: "relative",
                outline: show ? `2px solid` : "none",
                outlineColor: show ? borderColor : "transparent",
                outlineOffset: 0,
                cursor: "default",
            }}
        >
            {show && (
                <Typography
                    variant="caption"
                    sx={{
                        position: "absolute",
                        top: -10,
                        right: 10,
                        px: 1,
                        bgcolor: "common.white",
                        border: "1px solid",
                        borderColor: "divider",
                        fontSize: 11,
                        letterSpacing: 1,
                        textTransform: "uppercase",
                        userSelect: "none",
                        zIndex: 3,
                    }}
                >
                    {label}
                </Typography>
            )}

            {show && topRightControls && (
                <Box sx={{ position: "absolute", top: 6, right: 6, zIndex: 3 }}>
                    {topRightControls}
                </Box>
            )}

            {show && rightEdgeControls && (
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        right: -18,
                        transform: "translateY(-50%)",
                        zIndex: 3,
                    }}
                >
                    {rightEdgeControls}
                </Box>
            )}

            <Box sx={{ position: "relative", zIndex: 1 }}>{children}</Box>

            {/* click shield: ensures click feels like selecting the frame */}
            {show && (
                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        zIndex: 2,
                        pointerEvents: "none",
                        boxShadow: active ? `0 0 0 1px rgba(0,0,0,0.02)` : "none",
                    }}
                />
            )}
        </Box>
    );
}
