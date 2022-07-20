import { Res } from "./types";

export default function Resource({ service, region }: Res) {
  return (
    <div>
      <h1>Service : {service}</h1>
      <h2>Region: {region}</h2>
    </div>
  );
}
