export default function EloBadge({ elo }: { elo: number }) {
  return <span className="badge elo">Рейтинг: {elo}</span>;
}
