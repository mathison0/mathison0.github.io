export default function TagList({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null
  return (
    <ul className="tags" aria-label="기술 태그">
      {tags.map((tag) => (
        <li key={tag}>
          <span className="tag">{tag}</span>
        </li>
      ))}
    </ul>
  )
}
