// src/editor/components/Canvas.tsx
import * as React from "react";
import { Box, Paper, Typography, IconButton } from "@mui/material";
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
    if (!section) {
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
                                <Typography variant="body2" color="text.secondary">
                                    No sections yet.
                                </Typography>
                            </Paper>
                        </Box>
                    </Box>
                </Box>
            </Box>
        );
    }

    const sectionActive =
        selection.kind === "section" && selection.sectionId === section.id;
    const sectionHover =
        hover.kind === "section" && hover.sectionId === section.id;
    const showSection = sectionActive || sectionHover;

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
                                <Box
                                    sx={{
                                        p: 3,
                                        minHeight: 260,
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 3,
                                    }}
                                >
                                    {section.containers.map((container) => {
                                        const containerActive =
                                            selection.kind === "container" &&
                                            selection.containerId === container.id &&
                                            selection.sectionId === section.id;
                                        const containerHover =
                                            hover.kind === "container" &&
                                            hover.containerId === container.id &&
                                            hover.sectionId === section.id;
                                        const showContainer = containerActive || containerHover;

                                        return (
                                            <SelectableFrame
                                                key={container.id}
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
                                                    setHover({
                                                        kind: "section",
                                                        sectionId: section.id,
                                                    })
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
                                                        alignItems: "stretch",
                                                    }}
                                                >
                                                    {container.columns.map((column) => (
                                                        <Box
                                                            key={column.id}
                                                            sx={{
                                                                flex: 1,
                                                                minWidth: 0,
                                                                border: "1px solid",
                                                                borderColor: "divider",
                                                                borderRadius: 1,
                                                                p: 2,
                                                            }}
                                                        >
                                                            {column.blocks.length === 0 ? (
                                                                <Typography
                                                                    variant="caption"
                                                                    color="text.secondary"
                                                                >
                                                                    Drop blocks here
                                                                </Typography>
                                                            ) : (
                                                                <Box
                                                                    sx={{
                                                                        display: "flex",
                                                                        flexDirection: "column",
                                                                        gap: 1,
                                                                    }}
                                                                >
                                                                    {column.blocks.map((block) => {
                                                                        const text =
                                                                            block.type === "text" &&
                                                                            typeof block.data.text ===
                                                                                "string"
                                                                                ? block.data.text
                                                                                : block.type;
                                                                        return (
                                                                            <Typography
                                                                                key={block.id}
                                                                                variant="body2"
                                                                                sx={{ wordBreak: "break-word" }}
                                                                            >
                                                                                {text}
                                                                            </Typography>
                                                                        );
                                                                    })}
                                                                </Box>
                                                            )}
                                                        </Box>
                                                    ))}
                                                </Box>
                                            </SelectableFrame>
                                        );
                                    })}
                                </Box>
                            </SelectableFrame>
                        </Paper>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
