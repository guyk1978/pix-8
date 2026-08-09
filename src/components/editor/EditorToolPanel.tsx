"use client";

import { useLanguage } from "@/components/i18n/LanguageProvider";
import { useEditor } from "@/hooks/useEditorState";
import { EditorLayerParams } from "@/components/editor/EditorLayerParams";
import { SupportingArticleLink } from "@/components/tools/SupportingArticleLink";
import { EDITOR_LAYER_ARTICLE_SLUGS } from "@/lib/editor/layerArticleSlugs";

export function EditorToolPanel() {
  const { t } = useLanguage();
  const { activeLayer, source } = useEditor();

  if (!source || !activeLayer || activeLayer.type === "source") {
    return (
      <section
        key="params-empty"
        className="contextual-panel contextual-panel--params unified-editor-divider-top editor-ui-enter"
      >
        <header className="unified-editor-panel-header contextual-panel-header">
          <h2 className="unified-editor-panel-title">{t("editor.params.title")}</h2>
        </header>
        <p className="unified-editor-params-empty contextual-panel-body">
          {t("editor.params.empty")}
        </p>
      </section>
    );
  }

  const article = EDITOR_LAYER_ARTICLE_SLUGS[activeLayer.type];

  return (
    <section
      key={activeLayer.id}
      className="contextual-panel contextual-panel--params unified-editor-divider-top editor-ui-enter"
    >
      <header className="unified-editor-panel-header contextual-panel-header">
        <h2 className="unified-editor-panel-title">{t("editor.params.title")}</h2>
        <span className="unified-editor-panel-meta">{t(activeLayer.nameKey)}</span>
      </header>
      <div className="unified-editor-params-body contextual-panel-body">
        <EditorLayerParams layer={activeLayer} />
        {article ? (
          <SupportingArticleLink
            slug={article.slug}
            label={t("blog.relatedArticles")}
            title={t(article.titleKey)}
          />
        ) : null}
      </div>
    </section>
  );
}
