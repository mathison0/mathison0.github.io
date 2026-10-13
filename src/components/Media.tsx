import { useState } from 'react'
import type { MediaSource } from '../types'

interface MediaProps {
  source: MediaSource
  /** 접근성용 제목. 예: "Shatterline 플레이 영상" */
  title: string
  /** 카드 내부에 들어가면 'card', 단독 배치면 'standalone' */
  variant?: 'card' | 'standalone'
}

/**
 * 프로젝트 영상·이미지 표시.
 * YouTube는 클릭 전까지 iframe을 만들지 않는 파사드 패턴으로,
 * 목록 페이지에서 임베드 여러 개가 초기 로딩을 잡아먹는 것을 막는다.
 */
export default function Media({ source, title, variant = 'standalone' }: MediaProps) {
  // 그래프는 16:9 상자에 넣으면 잘리거나 여백이 생기므로 원본 비율 그대로 두고 캡션을 단다.
  if (source.kind === 'figure') {
    return (
      <figure className="figure" style={{ maxWidth: source.maxWidth }}>
        <img
          src={source.src}
          alt={source.alt}
          width={source.width}
          height={source.height}
          loading="lazy"
          decoding="async"
        />
        {source.caption ? <figcaption>{source.caption}</figcaption> : null}
      </figure>
    )
  }

  const className = `media media--${variant}`

  return (
    <figure style={{ margin: 0 }}>
      <div className={className}>
        <MediaInner source={source} title={title} />
      </div>
    </figure>
  )
}

function MediaInner({
  source,
  title,
}: {
  source: Exclude<MediaSource, { kind: 'figure' }>
  title: string
}) {
  switch (source.kind) {
    case 'youtube':
      return <YouTubeFacade id={source.id} start={source.start} title={title} />
    case 'file':
      return (
        <video controls preload="metadata" poster={source.poster} aria-label={title}>
          <source src={source.src} />
          브라우저가 video 태그를 지원하지 않습니다.
        </video>
      )
    case 'image':
      return (
        <img
          src={source.src}
          alt={source.alt ?? title}
          loading="lazy"
          decoding="async"
          style={{ objectFit: source.fit ?? 'cover' }}
        />
      )
    case 'placeholder':
      return (
        <div className="media__placeholder" role="img" aria-label={`${title} (영상 준비 중)`}>
          <PlayIcon />
          <span>영상 준비 중</span>
        </div>
      )
  }
}

// 큰 것부터 시도. maxresdefault는 업로드 해상도가 낮으면 없고(404), hq·sd는 4:3 레터박스라 흐리다.
const THUMB_QUALITIES = ['maxresdefault', 'sddefault', 'hqdefault'] as const

function YouTubeFacade({ id, start, title }: { id: string; start?: number; title: string }) {
  const [activated, setActivated] = useState(false)
  const [thumbIndex, setThumbIndex] = useState(0)
  const nextThumb = () => setThumbIndex((i) => Math.min(i + 1, THUMB_QUALITIES.length - 1))

  if (activated) {
    const params = new URLSearchParams({ autoplay: '1', rel: '0' })
    if (start) params.set('start', String(start))
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    )
  }

  return (
    <button
      type="button"
      className="media__facade"
      onClick={() => setActivated(true)}
      aria-label={`${title} 재생`}
    >
      <img
        src={`https://i.ytimg.com/vi/${id}/${THUMB_QUALITIES[thumbIndex]}.jpg`}
        alt=""
        loading="lazy"
        onError={nextThumb}
        // 없는 해상도는 404와 함께 120×90 회색 이미지를 주는데, 브라우저가 이를 정상 로드로 볼 수 있다.
        onLoad={(e) => {
          if (e.currentTarget.naturalWidth <= 120) nextThumb()
        }}
      />
      <span className="media__play">
        <PlayIcon />
      </span>
    </button>
  )
}

function PlayIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5.5v13l11-6.5-11-6.5z" />
    </svg>
  )
}
