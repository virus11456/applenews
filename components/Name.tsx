/**
 * 產品名稱排版：括號內（例如「（M5 Pro／Max）」）不在字中間斷行。
 * 只允許在括號前（<wbr>）、或「／」之後（零寬空白）換行；每一段以 nowrap 包住。
 * 括號內不用 <wbr>：Chrome 在 nowrap 範圍內仍會在 <wbr> 換行。
 */
export function Name({ text }: { text: string }) {
  const i = text.indexOf("（");
  if (i < 0) return <>{text}</>;
  const base = text.slice(0, i);
  const segs = text.slice(i).split("／");
  return (
    <>
      {base}
      <wbr />
      <span className="name-paren">
        {segs.map((s, k) => (
          <span key={k} className="nw">
            {s}
            {k < segs.length - 1 && "／\u200b"}
          </span>
        ))}
      </span>
    </>
  );
}
