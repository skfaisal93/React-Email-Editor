// src/editor/components/Canvas.tsx
import * as React from "react";
import { Box, Paper, Typography, IconButton, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useEditorStore } from "../state/store";
import { SelectableFrame } from "./SelectableFrame";

export function Canvas() {
    const doc = useEditorStore((s) => s.doc);
    const selection = useEditorStore((s) => s.selection);
    const hover = useEditorStore((s) => s.hover);
    const setSelection = useEditorStore((s) => s.setSelection);
    const setHover = useEditorStore((s) => s.setHover);
    const clearInteraction = useEditorStore((s) => s.clearInteraction);

    const surfaceRef = React.useRef<HTMLDivElement | null>(null);

    const onCanvasMouseDownCapture = (e: React.MouseEvent) => {
        const surface = surfaceRef.current;
        if (!surface) return;

        const target = e.target as Node;
        const clickedInside = surface.contains(target);

        if (!clickedInside) {
            clearInteraction();
        }
    };

    const section = doc.sections[0];
    const container = section.containers[0];

    const sectionActive = selection.kind === "section";
    const sectionHover = hover.kind === "section";
    const showSection = sectionActive || sectionHover;

    const containerActive = selection.kind === "container";
    const containerHover = hover.kind === "container";
    const showContainer = containerActive || containerHover;

    return (
        <Box
            onMouseDownCapture={onCanvasMouseDownCapture}
            sx={{
                flex: 1,
                height: "100%",
                overflow: "auto",
                bgcolor: "common.white",
            }}
        >
            <Box
                sx={{
                    py: 4,
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                }}
            >
                <Box sx={{ width: doc.global.bodyWidth, mx: "auto" }}>
                    <Box ref={surfaceRef}>
                        <Paper
                            variant="outlined"
                            sx={{ p: 3, borderRadius: 0, bgcolor: "common.white" }}
                        >
                            {/* LOGO */}
                            <Box
                                sx={{
                                    border: "1px solid",
                                    borderColor: "grey.400",
                                    p: 3,
                                    textAlign: "center",
                                    mb: 3,
                                }}
                            >
                                <Typography variant="h4" fontWeight={700}>
                                    LOGO
                                </Typography>
                            </Box>

                            {/* SECTION */}
                            <SelectableFrame
                                label="SECTION - CONTENT"
                                active={sectionActive}
                                show={showSection}
                                color="success"
                                onPointerEnter={() =>
                                    setHover({ kind: "section", sectionId: section.id })
                                }
                                onPointerLeave={() => setHover({ kind: "none" })}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelection({ kind: "section", sectionId: section.id });
                                }}
                                topRightControls={
                                    <IconButton
                                        size="small"
                                        sx={{
                                            bgcolor: "common.white",
                                            border: "1px solid",
                                            borderColor: "divider",
                                            borderRadius: 1,
                                        }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                        }}
                                    >
                                        <MoreHorizIcon fontSize="small" />
                                    </IconButton>
                                }
                                rightEdgeControls={
                                    <IconButton
                                        size="small"
                                        sx={{
                                            bgcolor: "success.main",
                                            color: "common.white",
                                            borderRadius: 1,
                                            width: 36,
                                            height: 36,
                                            "&:hover": { bgcolor: "success.dark" },
                                        }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                        }}
                                    >
                                        <AddIcon fontSize="small" />
                                    </IconButton>
                                }
                            >
                                <Box sx={{ p: 3, minHeight: 260 }}>
                                    <Typography
                                        variant="h6"
                                        align="center"
                                        sx={{ mt: 1, mb: 2 }}
                                        fontWeight={600}
                                    >
                                        Design your email here!
                                    </Typography>

                                    {/* CONTAINER */}
                                    <SelectableFrame
                                        label="CONTAINER"
                                        active={containerActive}
                                        show={showContainer}
                                        color="info"
                                        onPointerEnter={() =>
                                            setHover({
                                                kind: "container",
                                                sectionId: section.id,
                                                containerId: container.id,
                                            })
                                        }
                                        onPointerLeave={() =>
                                            setHover({ kind: "section", sectionId: section.id })
                                        }
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelection({
                                                kind: "container",
                                                sectionId: section.id,
                                                containerId: container.id,
                                            });
                                        }}
                                        topRightControls={
                                            <IconButton
                                                size="small"
                                                sx={{
                                                    bgcolor: "common.white",
                                                    border: "1px solid",
                                                    borderColor: "divider",
                                                    borderRadius: 1,
                                                }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                }}
                                            >
                                                <MoreHorizIcon fontSize="small" />
                                            </IconButton>
                                        }
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                                gap: 2,
                                                justifyContent: "center",
                                                alignItems: "center",
                                                mt: 2,
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    width: 260,
                                                    height: 160,
                                                    border: "1px solid",
                                                    borderColor: "divider",
                                                    borderRadius: 1,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    color: "text.secondary",
                                                    fontSize: 12,
                                                }}
                                            >
                                                (image)
                                            </Box>

                                            <Box
                                                sx={{
                                                    width: 300,
                                                    border: "1px solid",
                                                    borderColor: "divider",
                                                    p: 2,
                                                    borderRadius: 1,
                                                }}
                                            >
                                                <Typography fontWeight={700}>
                                                    Build the way you want
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                    sx={{ mt: 1 }}
                                                >
                                                    Structures make it easy to create a multi-column look
                                                    without the hassle…
                                                </Typography>

                                                <Box sx={{ mt: 2 }}>
                                                    <Button variant="contained" size="small">
                                                        Add button text
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </SelectableFrame>
                                </Box>
                            </SelectableFrame>
                        </Paper>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
