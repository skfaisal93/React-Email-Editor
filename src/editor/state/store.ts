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
    insertContainerAfter: (params: {
        sectionId: string;
        afterContainerId?: string;
        columnsCount: 1 | 2 | 3 | 4;
    }) => void;
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
    insertContainerAfter: ({ sectionId, afterContainerId, columnsCount }) =>
        set((state) => {
            if (state.doc.sections.length === 0) return state;

            const foundIndex = state.doc.sections.findIndex(
                (section) => section.id === sectionId
            );
            const sectionIndex = foundIndex >= 0 ? foundIndex : 0;
            const targetSection = state.doc.sections[sectionIndex];
            if (!targetSection) return state;

            const newContainerId = nanoid();
            const newContainer = {
                id: newContainerId,
                styles: {},
                columns: Array.from({ length: columnsCount }, () => ({
                    id: nanoid(),
                    blocks: [],
                })),
            };

            const nextContainers = [...targetSection.containers];
            let insertIndex = nextContainers.length;

            if (afterContainerId) {
                const afterIndex = nextContainers.findIndex(
                    (container) => container.id === afterContainerId
                );
                if (afterIndex >= 0) {
                    insertIndex = afterIndex + 1;
                }
            }

            nextContainers.splice(insertIndex, 0, newContainer);

            const nextSections = state.doc.sections.map((section, index) =>
                index === sectionIndex
                    ? { ...section, containers: nextContainers }
                    : section
            );

            return {
                doc: { ...state.doc, sections: nextSections },
                selection: {
                    kind: "container",
                    sectionId: targetSection.id,
                    containerId: newContainerId,
                },
                hover: {
                    kind: "container",
                    sectionId: targetSection.id,
                    containerId: newContainerId,
                },
            };
        }),
}));
