import * as React from "react";
import {
    Box,
    Tabs,
    Tab,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ImageIcon from "@mui/icons-material/Image";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import SmartButtonIcon from "@mui/icons-material/SmartButton";
import SpaceBarIcon from "@mui/icons-material/SpaceBar";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import ShareIcon from "@mui/icons-material/Share";
import FlagIcon from "@mui/icons-material/Flag";
import TimerIcon from "@mui/icons-material/Timer";
import MenuIcon from "@mui/icons-material/Menu";
import CodeIcon from "@mui/icons-material/Code";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import { useEditorStore } from "../state/store";

function SidebarTabPanel(props: { value: string; name: string; children: React.ReactNode }) {
    const { value, name, children } = props;
    if (value !== name) return null;
    return <Box sx={{ p: 1 }}>{children}</Box>;
}

function StructureTile(props: {
    label: string;
    columns: 1 | 2 | 3 | 4;
    onClick: () => void;
}) {
    const { label, columns, onClick } = props;

    return (
        <Box
            role="button"
            onClick={onClick}
            sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 1,
                p: 1,
                cursor: "pointer",
                userSelect: "none",
                "&:hover": {
                    borderColor: "primary.main",
                    bgcolor: "action.hover",
                },
            }}
        >
            <Box sx={{ display: "flex", gap: 0.5, height: 26, mb: 0.5 }}>
                {Array.from({ length: columns }).map((_, idx) => (
                    <Box
                        key={idx}
                        sx={{
                            flex: 1,
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: 0.5,
                            bgcolor: "background.paper",
                        }}
                    />
                ))}
            </Box>
            <Typography variant="caption" color="text.secondary">
                {label}
            </Typography>
        </Box>
    );
}

export function RightSidebar() {
    const tab = useEditorStore((s) => s.activeRightTab);
    const setTab = useEditorStore((s) => s.setRightTab);
    const doc = useEditorStore((s) => s.doc);
    const selection = useEditorStore((s) => s.selection);
    const insertContainerAfter = useEditorStore((s) => s.insertContainerAfter);

    const handleInsertStructure = (columnsCount: 1 | 2 | 3 | 4) => {
        if (doc.sections.length === 0) return;

        const isContainerSelected = selection.kind === "container";
        const sectionId = isContainerSelected
            ? selection.sectionId
            : doc.sections[0].id;
        const afterContainerId = isContainerSelected
            ? selection.containerId
            : undefined;

        insertContainerAfter({ sectionId, afterContainerId, columnsCount });
    };

    return (
        <Box
            sx={{
                width: 340,
                borderLeft: "1px solid",
                borderColor: "divider",
                height: "100%",
                bgcolor: "background.paper",
                overflow: "auto",
            }}
        >
            <Tabs
                value={tab}
                onChange={(_, v) => setTab(v)}
                variant="fullWidth"
                sx={{ borderBottom: "1px solid", borderColor: "divider" }}
            >
                <Tab value="content" label="Content" />
                <Tab value="global" label="Global Settings" />
            </Tabs>

            <SidebarTabPanel value={tab} name="content">
                <Accordion defaultExpanded disableGutters elevation={0}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="subtitle2">Structures</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box sx={{ display: "grid", gap: 1, gridTemplateColumns: "1fr 1fr" }}>
                            <StructureTile
                                label="1 column"
                                columns={1}
                                onClick={() => handleInsertStructure(1)}
                            />
                            <StructureTile
                                label="2 columns"
                                columns={2}
                                onClick={() => handleInsertStructure(2)}
                            />
                            <StructureTile
                                label="3 columns"
                                columns={3}
                                onClick={() => handleInsertStructure(3)}
                            />
                            <StructureTile
                                label="4 columns"
                                columns={4}
                                onClick={() => handleInsertStructure(4)}
                            />
                        </Box>
                    </AccordionDetails>
                </Accordion>

                <Accordion defaultExpanded disableGutters elevation={0}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="subtitle2">Blocks</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 0 }}>
                        <List dense>
                            <ListItemButton>
                                <ListItemIcon><ImageIcon fontSize="small" /></ListItemIcon>
                                <ListItemText primary="Image" />
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon><TextFieldsIcon fontSize="small" /></ListItemIcon>
                                <ListItemText primary="Text" />
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon><SmartButtonIcon fontSize="small" /></ListItemIcon>
                                <ListItemText primary="Button" />
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon><SpaceBarIcon fontSize="small" /></ListItemIcon>
                                <ListItemText primary="Spacer" />
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon><PlayCircleOutlineIcon fontSize="small" /></ListItemIcon>
                                <ListItemText primary="Video" />
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon><ShareIcon fontSize="small" /></ListItemIcon>
                                <ListItemText primary="Social" />
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon><FlagIcon fontSize="small" /></ListItemIcon>
                                <ListItemText primary="Banner" />
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon><TimerIcon fontSize="small" /></ListItemIcon>
                                <ListItemText primary="Timer" />
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon><MenuIcon fontSize="small" /></ListItemIcon>
                                <ListItemText primary="Menu" />
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon><CodeIcon fontSize="small" /></ListItemIcon>
                                <ListItemText primary="HTML" />
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon><RssFeedIcon fontSize="small" /></ListItemIcon>
                                <ListItemText primary="RSS" />
                            </ListItemButton>
                        </List>
                    </AccordionDetails>
                </Accordion>

                <Accordion disableGutters elevation={0}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="subtitle2">Saved Modules</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant="body2" color="text.secondary">
                            (Next step) Save reusable sections/containers here.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </SidebarTabPanel>

            <SidebarTabPanel value={tab} name="global">
                <Box sx={{ p: 1 }}>
                    <Typography variant="subtitle2">Global settings (coming next)</Typography>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                        Body width, backgrounds, default fonts, mobile settings, link colors.
                    </Typography>
                </Box>
            </SidebarTabPanel>
        </Box>
    );
}
