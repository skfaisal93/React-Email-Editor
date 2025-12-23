export type Id = string;

export type BlockType =
    | "image"
    | "text"
    | "button"
    | "spacer"
    | "video"
    | "social"
    | "banner"
    | "timer"
    | "menu"
    | "html"
    | "rss";

export type EditorSelection =
    | { kind: "none" }
    | { kind: "section"; sectionId: Id }
    | { kind: "container"; sectionId: Id; containerId: Id }
    | { kind: "block"; sectionId: Id; containerId: Id; columnId: Id; blockId: Id };

export type EmailBlock = {
    id: Id;
    type: BlockType;
    // later: content + style + advanced props
    data: Record<string, unknown>;
};

export type EmailColumn = {
    id: Id;
    blocks: EmailBlock[];
};

export type EmailContainer = {
    id: Id;
    columns: EmailColumn[];
    // later: container styles (padding/bg/border)
    styles: Record<string, unknown>;
};

export type EmailSection = {
    id: Id;
    containers: EmailContainer[];
};

export type EmailGlobalSettings = {
    bodyWidth: number; // e.g., 600
    pageBackground: string; // later: actual color picker
};

export type EmailDocument = {
    id: Id;
    global: EmailGlobalSettings;
    sections: EmailSection[];
};

export type EditorHover =
    | { kind: "none" }
    | { kind: "section"; sectionId: Id }
    | { kind: "container"; sectionId: Id; containerId: Id }
    | { kind: "block"; sectionId: Id; containerId: Id; columnId: Id; blockId: Id };


