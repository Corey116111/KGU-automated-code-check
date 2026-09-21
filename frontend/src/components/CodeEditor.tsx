interface Props {
  value: string;
  onChange: (v: string) => void;
  language: string;
}

export default function CodeEditor({ value, onChange, language }: Props) {
  return (
    <div className="card">
      <h3>Решение ({language})</h3>
      <textarea
        className="code"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
      />
    </div>
  );
}
