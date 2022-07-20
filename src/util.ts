import { Document } from './types'

const DEFAULT_URL = "https://ip-ranges.amazonaws.com/ip-ranges.json";

async function fetchDocument(url = DEFAULT_URL): Promise<Document> {
  const resp = await fetch(url);
  const data = await resp.json();
  return data;
}
export {
  fetchDocument
}