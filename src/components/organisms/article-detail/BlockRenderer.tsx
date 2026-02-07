'use client'

import { ContentBlock } from '@/lib/api/articles'
import {
    HeaderBlock,
    ParagraphBlock,
    ImageBlock,
    ListBlock,
    CodeBlock,
    QuoteBlock
} from './blocks'

interface BlockRendererProps {
    block: ContentBlock
}

/**
 * BlockRenderer - Renders different block types based on Editor.js format
 */
export function BlockRenderer({ block }: BlockRendererProps) {
    switch (block.type) {
        case 'header':
            return <HeaderBlock data={block.data} />
        case 'paragraph':
            return <ParagraphBlock data={block.data} />
        case 'image':
            return <ImageBlock data={block.data} />
        case 'list':
            return <ListBlock data={block.data} />
        case 'code':
            return <CodeBlock data={block.data} />
        case 'quote':
            return <QuoteBlock data={block.data} />
        default:
            // Unknown block type - render nothing
            console.warn('Unknown block type:', (block as { type: string }).type)
            return null
    }
}
