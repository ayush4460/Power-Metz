"use client"

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import { Bold, Italic, Strikethrough, Underline as UnderlineIcon, Heading1, Heading2, Heading3, List, ListOrdered, Quote, Code, Terminal, Minus, Undo2, Redo2, ImageIcon, Loader2, Link as LinkIcon, Unlink, AlignLeft, AlignCenter, AlignRight, AlignJustify } from 'lucide-react'
import { useState, useCallback } from 'react'

interface RichTextEditorProps {
  content: string
  onChange: (html: string) => void
  slug: string
}

import { Editor } from '@tiptap/core'

const MenuBar = ({ editor, slug }: { editor: Editor | null, slug: string }) => {
  const [isUploading, setIsUploading] = useState(false)

  const setLink = useCallback(() => {
    if (!editor) return

    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    // cancelled
    if (url === null) {
      return
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

  if (!editor) {
    return null
  }

  const addImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', `powermetz/blogs/${slug || 'drafts'}`)

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      
      if (data.url) {
        editor.chain().focus().setImage({ src: data.url }).run()
      } else {
        alert(data.error || 'Upload failed')
      }
    } catch {
      alert('Upload failed')
    } finally {
      setIsUploading(false)
      if (e.target) e.target.value = ''
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-border p-2 bg-muted/20 rounded-t-lg">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`p-2 rounded-md hover:bg-muted ${editor.isActive('bold') ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}
        title="Bold"
      >
        <Bold className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`p-2 rounded-md hover:bg-muted ${editor.isActive('italic') ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}
        title="Italic"
      >
        <Italic className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={`p-2 rounded-md hover:bg-muted ${editor.isActive('strike') ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}
        title="Strikethrough"
      >
        <Strikethrough className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        className={`p-2 rounded-md hover:bg-muted ${editor.isActive('underline') ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}
        title="Underline"
      >
        <UnderlineIcon className="w-4 h-4" />
      </button>
      
      <div className="w-px h-6 bg-border mx-1" />

      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={`p-2 rounded-md hover:bg-muted ${editor.isActive({ textAlign: 'left' }) ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}
        title="Align Left"
      >
        <AlignLeft className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={`p-2 rounded-md hover:bg-muted ${editor.isActive({ textAlign: 'center' }) ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}
        title="Align Center"
      >
        <AlignCenter className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={`p-2 rounded-md hover:bg-muted ${editor.isActive({ textAlign: 'right' }) ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}
        title="Align Right"
      >
        <AlignRight className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        className={`p-2 rounded-md hover:bg-muted ${editor.isActive({ textAlign: 'justify' }) ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}
        title="Align Justify"
      >
        <AlignJustify className="w-4 h-4" />
      </button>

      <div className="w-px h-6 bg-border mx-1" />

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`p-2 rounded-md hover:bg-muted ${editor.isActive('heading', { level: 1 }) ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}
        title="Heading 1"
      >
        <Heading1 className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-2 rounded-md hover:bg-muted ${editor.isActive('heading', { level: 2 }) ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}
        title="Heading 2"
      >
        <Heading2 className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`p-2 rounded-md hover:bg-muted ${editor.isActive('heading', { level: 3 }) ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}
        title="Heading 3"
      >
        <Heading3 className="w-4 h-4" />
      </button>

      <div className="w-px h-6 bg-border mx-1" />

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded-md hover:bg-muted ${editor.isActive('bulletList') ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}
        title="Bullet List"
      >
        <List className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded-md hover:bg-muted ${editor.isActive('orderedList') ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}
        title="Ordered List"
      >
        <ListOrdered className="w-4 h-4" />
      </button>

      <div className="w-px h-6 bg-border mx-1" />

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`p-2 rounded-md hover:bg-muted ${editor.isActive('blockquote') ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}
        title="Blockquote"
      >
        <Quote className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={`p-2 rounded-md hover:bg-muted ${editor.isActive('code') ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}
        title="Code"
      >
        <Code className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`p-2 rounded-md hover:bg-muted ${editor.isActive('codeBlock') ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}
        title="Code Block"
      >
        <Terminal className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className={`p-2 rounded-md hover:bg-muted text-muted-foreground`}
        title="Horizontal Rule"
      >
        <Minus className="w-4 h-4" />
      </button>

      <div className="w-px h-6 bg-border mx-1" />

      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className={`p-2 rounded-md hover:bg-muted text-muted-foreground disabled:opacity-50`}
        title="Undo"
      >
        <Undo2 className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className={`p-2 rounded-md hover:bg-muted text-muted-foreground disabled:opacity-50`}
        title="Redo"
      >
        <Redo2 className="w-4 h-4" />
      </button>

      <div className="w-px h-6 bg-border mx-1" />

      <button
        type="button"
        onClick={setLink}
        className={`p-2 rounded-md hover:bg-muted ${editor.isActive('link') ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}
        title="Set Link"
      >
        <LinkIcon className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().unsetLink().run()}
        disabled={!editor.isActive('link')}
        className={`p-2 rounded-md hover:bg-muted text-muted-foreground disabled:opacity-50`}
        title="Unset Link"
      >
        <Unlink className="w-4 h-4" />
      </button>

      <div className="w-px h-6 bg-border mx-1" />

      <label className={`p-2 rounded-md hover:bg-muted text-muted-foreground cursor-pointer flex items-center gap-2 ${isUploading ? 'opacity-50 pointer-events-none' : ''}`} title="Upload Image">
        {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImageIcon className="w-4 h-4" />}
        <input type="file" accept="image/*" className="hidden" onChange={addImage} />
      </label>
    </div>
  )
}

export function RichTextEditor({ content, onChange, slug }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
        HTMLAttributes: {
          class: 'text-primary underline cursor-pointer',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg max-w-full h-auto my-4',
        },
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base prose-orange max-w-none focus:outline-none min-h-[400px] p-4 bg-background rounded-b-lg',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  return (
    <div className="border border-border rounded-lg shadow-sm flex flex-col">
      <MenuBar editor={editor} slug={slug} />
      <EditorContent editor={editor} className="flex-1 overflow-y-auto" />
    </div>
  )
}
