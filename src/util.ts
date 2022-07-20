import { Document } from './types'

function ip4ToInt(ip: string) {
  const [a, b, c, d] = ip.split('.').map(Number)

  return (
    a << 24 +
    b << 16 +
    c << 8 +
    d
  )
}

const DEFAULT_URL = "https://ip-ranges.amazonaws.com/ip-ranges.json";

async function fetchDocument(url = DEFAULT_URL): Promise<Document> {
  const resp = await fetch(url);
  const data = await resp.json();
  return data;
}
export {
  ip4ToInt,
  fetchDocument
}