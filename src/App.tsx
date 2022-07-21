import { fetchDocument } from "./util";
import { useEffect, useState } from "react";
import Resource from "./Resource";
import { Document } from "./types";
import { isInSubnet, isIP, isIPv4, isIPv6 } from "is-in-subnet";
import "./App.css";

export default function App() {
  const [document, setDocument] = useState<Document | null>(null);
  const [ip, setIp] = useState("");
  const [error, setError] = useState(false);

  const findResources = function (ip: string) {
    if (isIPv4(ip)) {
      return document?.prefixes.filter((o) => isInSubnet(ip, o.ip_prefix));
    } else if (isIPv6(ip)) {
      return document?.ipv6_prefixes.filter((o) =>
        isInSubnet(ip, o.ipv6_prefix)
      );
    } else {
      return null;
    }
  };

  useEffect(() => {
    fetchDocument()
      .then(setDocument)
      .catch(() => setError(true));
  }, []);

  const resources = findResources(ip)?.map((e, i) => (
    <Resource {...e} key={i} />
  ));

  return (
    <main className="app">
      <div className="create-date">{document?.createDate}</div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          onChange={(e) => setIp(e.target.value.replaceAll(" ", ""))}
          placeholder="Enter an IP"
          className={ip.includes(":") ? "ipv6" : ""}
        />
      </form>
      {error && "Can not fetch message"}
      <div className="resource-container">
        {!error && !!isIP(ip) && resources}
      </div>
      {!error && isIP(ip) && resources && resources.length == 0 ? (
        <div className="not-error">Not an AWS IP</div>
      ) : (
        ""
      )}
    </main>
  );
}
