"use client";

import { useId, useState } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { useEditor } from "@/hooks/useEditorState";
import { ImageUploadDropzone } from "@/components/ui/ImageUploadDropzone";
import { ExampleImageStrip } from "@/components/ui/ExampleImageStrip";
import { EditorCanvasDrag, useEditorCanvasDragHandlers } from "@/components/editor/EditorCanvasDrag";

export function EditorCanvas() {
  const { t } = useLanguage();
  const { source, previewCanvasRef, isComposing, loadFile, magnifierZoom } = useEditor();
  const [isDragging, setIsDragging] = useState(false);
  const inputId = useId();
  const drag = useEditorCanvasDragHandlers();

  if (!source) {
    return (
      <div className="unified-editor-canvas unified-editor-canvas--empty flex min-h-0 flex-1 flex-col items-center justify-center p-6">
        <div className="unified-editor-upload-wrap w-full max-w-lg space-y-4">
          <ImageUploadDropzone
            inputId={inputId}
            isDragging={isDragging}
            onDraggingChange={setIsDragging}
            onFileChange={(file) => {
              if (file) void loadFile(file);
            }}
            title={t("editor.upload.title")}
            hint={t("editor.upload.hint")}
            className="unified-editor-dropzone"
          />
          <ExampleImageStrip
            onFileSelect={(file) => void loadFile(file)}
            disabled={isDragging}
            className="unified-editor-examples"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="unified-editor-canvas flex min-h-0 flex-1 flex-col">
      <div className="unified-editor-canvas-frame flex min-h-0 flex-1 items-center justify-center overflow-auto p-4 sm:p-6">
        <div
          className="unified-editor-canvas-inner relative"
          style={
            magnifierZoom > 1
              ? { transform: `scale(${magnifierZoom})`, transformOrigin: "center center" }
              : undefined
          }
        >
          <div className="unified-editor-hologram" aria-hidden />
          <canvas
            ref={previewCanvasRef}
            className={`unified-editor-preview-canvas max-h-[calc(100vh-14rem)] max-w-full object-contain shadow-2xl ${
              drag.canDrag ? "unified-editor-preview-canvas--draggable" : ""
            }`}
            onPointerDown={drag.onPointerDown}
            onPointerMove={drag.onPointerMove}
            onPointerUp={drag.onPointerUp}
            onPointerCancel={drag.onPointerUp}
          />
          <EditorCanvasDrag />
          {isComposing ? (
            <div className="unified-editor-processing" role="status">
              <span className="unified-editor-processing-dot" />
              {t("editor.processing")}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
