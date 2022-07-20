import { Res } from "./types";
import './resource.css'

export default function Resource({ service, region }: Res) {
  return (
    <div className="resource">
      <h1>Service : <span className="value"> {service}</span></h1>
      <h2>Region: <span className="value">{region}</span></h2>
    </div>
  );
}
