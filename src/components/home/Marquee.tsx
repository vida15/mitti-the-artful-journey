const items = [
  "Handmade",
  "Authentic",
  "Artist-direct",
  "94 makers",
  "28 origins",
  "Zero mass production",
];

export function Marquee() {
  return (
    <div
      className="relative h-[64px] overflow-hidden"
      style={{
        backgroundColor: "#F3EEE7",
        borderTop: "1px solid #E6DED2",
        borderBottom: "1px solid #E6DED2",
      }}
    >
      <div
        className="absolute inset-y-0 flex items-center whitespace-nowrap"
        style={{ animation: "marquee 180s linear infinite" }}
      >
        {[...Array(2)].map((_, dup) => (
          <div key={dup} className="flex items-center">
            {items.map((t, i) => (
              <span
                key={`${dup}-${i}`}
                className="font-editorial"
                style={{ color: "#6B5E52", fontSize: "1.1rem", fontWeight: 400 }}
              >
                <span className="mx-10">{t}</span>
                <span style={{ color: "#BEBD95" }}>·</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}