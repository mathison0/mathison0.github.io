import { useEffect } from 'react'

interface SeoProps {
  title: string
  description?: string
}

/** 라우트별로 문서 제목/설명을 갱신한다. */
export default function Seo({ title, description }: SeoProps) {
  useEffect(() => {
    document.title = title
    if (description) {
      const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
      if (meta) meta.content = description
    }
  }, [title, description])

  return null
}
