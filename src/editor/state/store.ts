import { create } from "zustand";
import { nanoid } from "nanoid";
import type { EmailDocument, EditorSelection, EditorHover } from "./types";

type EditorState = {
    doc: EmailDocument;
    selection: EditorSelection;
    hover: EditorHover;

    activeRightTab: "content" | "global";

    setSelection: (sel: EditorSelection) => void;
    setHover: (hover: EditorHover) => void;
    clearInteraction: () => void;
    setRightTab: (tab: "content" | "global") => void;
};

const createInitialDoc = (): EmailDocument => ({
    id: nanoid(),
    global: { bodyWidth: 600, pageBackground: "#ffffff" },
    sections: [
        {
            id: nanoid(),
            containers: [
                {
                    id: nanoid(),
                    styles: {},
                    columns: [
                        {
                            id: nanoid(),
                            blocks: [
                                {
                                    id: nanoid(),
                                    type: "text",
                                    data: { text: "Design your email here!" },
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
});

export const useEditorStore = create<EditorState>((set) => ({
    doc: createInitialDoc(),
    selection: { kind: "none" },
    hover: { kind: "none" },
    activeRightTab: "content",

    setSelection: (sel) => set({ selection: sel }),
    setHover: (hover) => set({ hover }),
    clearInteraction: () =>
        set({ selection: { kind: "none" }, hover: { kind: "none" } }),

    setRightTab: (tab) => set({ activeRightTab: tab }),
}));
