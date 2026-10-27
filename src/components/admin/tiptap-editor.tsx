'use client';

import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  Quote,
  List,
  ListOrdered,
  Code,
  Undo,
  Redo,
} from 'lucide-react';
import { clsx } from 'clsx';

interface TiptapEditorProps {
  content: any;
  onChange: (content: any) => void;
  placeholder?: string;
}

export const TiptapEditor: React.FC<TiptapEditorProps> = ({
  content,
  onChange,
  placeholder,
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3],
        },
      }),
    ],
    content: content || {
      type: 'doc',
      content: [{ type: 'paragraph', content: [{ type: 'text', text: '' }] }],
    },
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          'min-h-[280px] p-4 focus:outline-none font-sans text-ink dark:text-paper leading-relaxed text-base [&>h2]:font-serif [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:mt-6 [&>h2]:mb-2 [&>h3]:font-serif [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:mt-4 [&>blockquote]:border-l-2 [&>blockquote]:border-coral-500 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:my-4 [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:list-decimal [&>ol]:pl-5',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },
  });

  if (!editor) {
    return (
      <div className="min-h-[280px] border border-rule rounded-md p-4 bg-paper-elevated animate-pulse text-muted text-sm font-mono">
        Loading Editorial Tiptap Editor...
      </div>
    );
  }

  return (
    <div className="w-full border border-rule rounded-md overflow-hidden bg-paper-elevated dark:bg-paper-card">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-rule bg-paper-card dark:bg-sea-900/40 text-muted">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={clsx(
            'p-1.5 rounded hover:bg-ink/10 dark:hover:bg-paper/10 transition-colors',
            editor.isActive('bold') && 'bg-sea-900 text-paper dark:bg-paper dark:text-sea-900'
          )}
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={clsx(
            'p-1.5 rounded hover:bg-ink/10 dark:hover:bg-paper/10 transition-colors',
            editor.isActive('italic') && 'bg-sea-900 text-paper dark:bg-paper dark:text-sea-900'
          )}
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>

        <div className="h-4 w-px bg-rule mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={clsx(
            'p-1.5 rounded hover:bg-ink/10 dark:hover:bg-paper/10 transition-colors',
            editor.isActive('heading', { level: 2 }) && 'bg-sea-900 text-paper dark:bg-paper dark:text-sea-900'
          )}
          title="Heading 2"
        >
          <Heading2 className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={clsx(
            'p-1.5 rounded hover:bg-ink/10 dark:hover:bg-paper/10 transition-colors',
            editor.isActive('heading', { level: 3 }) && 'bg-sea-900 text-paper dark:bg-paper dark:text-sea-900'
          )}
          title="Heading 3"
        >
          <Heading3 className="w-4 h-4" />
        </button>

        <div className="h-4 w-px bg-rule mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={clsx(
            'p-1.5 rounded hover:bg-ink/10 dark:hover:bg-paper/10 transition-colors',
            editor.isActive('blockquote') && 'bg-sea-900 text-paper dark:bg-paper dark:text-sea-900'
          )}
          title="Pull Quote"
        >
          <Quote className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={clsx(
            'p-1.5 rounded hover:bg-ink/10 dark:hover:bg-paper/10 transition-colors',
            editor.isActive('bulletList') && 'bg-sea-900 text-paper dark:bg-paper dark:text-sea-900'
          )}
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={clsx(
            'p-1.5 rounded hover:bg-ink/10 dark:hover:bg-paper/10 transition-colors',
            editor.isActive('orderedList') && 'bg-sea-900 text-paper dark:bg-paper dark:text-sea-900'
          )}
          title="Numbered List"
        >
          <ListOrdered className="w-4 h-4" />
        </button>

        <div className="h-4 w-px bg-rule mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="p-1.5 rounded hover:bg-ink/10 disabled:opacity-30"
          title="Undo"
        >
          <Undo className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="p-1.5 rounded hover:bg-ink/10 disabled:opacity-30"
          title="Redo"
        >
          <Redo className="w-4 h-4" />
        </button>
      </div>

      {/* Editor Content Area */}
      <EditorContent editor={editor} />
    </div>
  );
};
