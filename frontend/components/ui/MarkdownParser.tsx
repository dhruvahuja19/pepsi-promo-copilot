import React, { useEffect, useState } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

interface MarkdownRendererProps {
    content: string;
}

const parseMarkdown = async (markdownText: string): Promise<string> => {
    if (!markdownText) return '';

    try {
        marked.setOptions({
            gfm: true,
            breaks: true,
        });

        const rawHtml = await marked(markdownText);

        const sanitizedHtml = DOMPurify.sanitize(rawHtml);

        return sanitizedHtml;
    } catch (error) {
        console.error('Error parsing markdown:', error);
        return markdownText;
    }
};


const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const [parsedContent, setParsedContent] = useState<string>('');

  useEffect(() => {
    const parseContent = async () => {
      const result = await parseMarkdown(content);
      setParsedContent(result);
    };

    parseContent();
  }, [content]);

  return (
    <div 
      className="markdown-content"
      dangerouslySetInnerHTML={{ __html: parsedContent }}
    />
  );
};
export { MarkdownRenderer };
const markdownStyles = `
.markdown-content {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  line-height: 1.6;
  color: #333;
}

.markdown-content h1,
.markdown-content h2,
.markdown-content h3,
.markdown-content h4,
.markdown-content h5,
.markdown-content h6 {
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
  line-height: 1.25;
}

.markdown-content p {
  margin-bottom: 16px;
}

.markdown-content ul,
.markdown-content ol {
  margin-bottom: 16px;
  padding-left: 24px;
}

.markdown-content li {
  margin: 8px 0;
}

.markdown-content code {
  padding: 0.2em 0.4em;
  background-color: rgba(27, 31, 35, 0.05);
  border-radius: 3px;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
}

.markdown-content pre {
  padding: 16px;
  overflow: auto;
  background-color: #f6f8fa;
  border-radius: 3px;
  margin-bottom: 16px;
}

.markdown-content pre code {
  padding: 0;
  background-color: transparent;
}

.markdown-content blockquote {
  padding: 0 1em;
  color: #6a737d;
  border-left: 0.25em solid #dfe2e5;
  margin: 0 0 16px 0;
}
`;