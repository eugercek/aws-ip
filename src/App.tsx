import { fetchDocument } from "./util";
import { useEffect, useState } from "react";
import Resource from "./Resource";
import { Document, Res } from "./types";
import { isInSubnet, isIP } from "is-in-subnet";

export default function App() {
  const [document, setDocument] = useState<Document | null>(null);
  const [ip, setIp] = useState("");
  const [error, setError] = useState(false);

  // TODO Optimize it
  const findResource = (ip: string): Res | null =>
    document?.prefixes.find((o) => isInSubnet(ip, o.ip_prefix)) ||
    document?.ipv6_prefixes.find((o) => isInSubnet(ip, o.ip_prefix)) ||
    null;

  useEffect(() => {
    fetchDocument()
      .then(setDocument)
      .catch(() => setError(true));
  }, []);

  return (
    <>
      <form>
        <input type="text" value={ip} onChange={(e) => setIp(e.target.value)} />
      </form>
      {error && "Can not fetch message"}
      {!error && !!isIP(ip) && (
        <Resource {...(findResource(ip) || { region: "", service: "" })} />
      )}
    </>
  );
}
