import { fetchDocument } from "./util";
import { useEffect, useState } from "react";
import Resource from "./Resource";
import { Document, Res } from "./types";
import { isInSubnet, isIP } from "is-in-subnet";
import './App.css'

export default function App() {
  const [document, setDocument] = useState<Document | null>(null);
  const [ip, setIp] = useState("");
  const [error, setError] = useState(false);

  // TODO Optimize it
  const findResources = function (ip: string): Res[] | null {
    if (!isIP(ip)) return null;

    return document?.prefixes.filter((o) => isInSubnet(ip, o.ip_prefix)) ||
      document?.ipv6_prefixes.filter((o) => isInSubnet(ip, o.ipv6_prefix)) ||
      null;
  }

  useEffect(() => {
    fetchDocument()
      .then(setDocument)
      .catch(() => setError(true));
  }, []);

  const resources = findResources(ip)?.map(e => <Resource {...e} />)

  return (
    <main className="app">
      <form>
        <input type="text" value={ip} onChange={(e) => setIp(e.target.value)} />
      </form>
      {error && "Can not fetch message"}
      <div className="resource-container">
        {!error && !!isIP(ip) && resources}
      </div>
    </main>
  );
}
