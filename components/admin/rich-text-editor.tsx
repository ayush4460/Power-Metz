"use client"

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import { Bold, Italic, Heading1, Heading2, List, ListOrdered, ImageIcon, Loader2 } from 'lucide-react'
import { useState } from 'react'

interface RichTextEditorProps {
  content: string
  onChange: (html: string) => void
  slug: string
}

import { Editor } from '@tiptap/core'

const MenuBar = ({ editor, slug }: { editor: Editor | null, slug: string }) => {
  const [isUploading, setIsUploading] = useState(false)

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
      >
        <Bold className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`p-2 rounded-md hover:bg-muted ${editor.isActive('italic') ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}
      >
        <Italic className="w-4 h-4" />
      </button>
      
      <div className="w-px h-6 bg-border mx-1" />

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`p-2 rounded-md hover:bg-muted ${editor.isActive('heading', { level: 1 }) ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}
      >
        <Heading1 className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-2 rounded-md hover:bg-muted ${editor.isActive('heading', { level: 2 }) ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}
      >
        <Heading2 className="w-4 h-4" />
      </button>

      <div className="w-px h-6 bg-border mx-1" />

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded-md hover:bg-muted ${editor.isActive('bulletList') ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}
      >
        <List className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded-md hover:bg-muted ${editor.isActive('orderedList') ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}
      >
        <ListOrdered className="w-4 h-4" />
      </button>

      <div className="w-px h-6 bg-border mx-1" />

      <label className={`p-2 rounded-md hover:bg-muted text-muted-foreground cursor-pointer flex items-center gap-2 ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}>
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
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg max-w-full h-auto my-4',
        },
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base dark:prose-invert prose-orange max-w-none focus:outline-none min-h-[400px] p-4 bg-background rounded-b-lg',
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
