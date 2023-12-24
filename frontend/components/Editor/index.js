"use client";
import Quill from "quill";
import ReactQuill from "react-quill";
import { QuillBinding } from "y-quill";
import * as Y from "yjs";
import LiveblocksProvider from "@liveblocks/yjs";
import { useRoom } from "@/liveblocks.config";
import { useEffect, useRef, useState } from "react";
import styles from "./Editor.module.css";

// Collaborative text editor with simple rich text, live cursors, and live avatars
export function CollaborativeEditor()
{
    const room = useRoom();
    const [text, setText] = useState();
    const [provider, setProvider] = useState();

    // Set up Liveblocks Yjs provider
    useEffect(() =>
    {
        const yDoc = new Y.Doc();
        const yText = yDoc.getText("quill");
        const yProvider = new LiveblocksProvider(room, yDoc);
        setText(yText);
        setProvider(yProvider);

        return () =>
        {
            yDoc?.destroy();
            yProvider?.destroy();
        };
    }, [room]);

    if (!text || !provider)
    {
        return null;
    }

    return <QuillEditor yText={text} provider={provider} />;
}

function QuillEditor({ yText, provider })
{
    const reactQuillRef = useRef < ReactQuill > (null);

    // Set up Yjs and Quill
    useEffect(() =>
    {
        let quill;
        let binding;

        if (!reactQuillRef.current)
        {
            return;
        }

        quill = reactQuillRef.current.getEditor();
        binding = new QuillBinding(yText, quill, provider.awareness);
        return () =>
        {
            binding?.destroy?.();
        };
    }, [yText, provider]);

    return (
        <div className={styles.container}>
            <div className={styles.editorContainer}>
                <ReactQuill
                    className={styles.editor}
                    placeholder="Start typing here…"
                    ref={reactQuillRef}
                    theme="snow"
                    modules={{
                        cursors: true,
                        toolbar: false,
                        history: {
                            // Local undo shouldn't undo changes from remote users
                            userOnly: true,
                        },
                    }}
                />
            </div>
        </div>
    );
}