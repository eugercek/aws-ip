export interface Document {
  syncToken: string;
  createDate: string; // Could improve
  prefixes: IP4Object[];
  ipv6_prefixes: IP6Object[];
}

export interface IP4Object {
  ip_prefix: string;
  region: string;
  network_border_group: string;
  service: string;
}

export interface IP6Object {
  ipv6_prefix: string;
  region: string;
  network_border_group: string;
  service: string;
}

export interface Res {
  service: string;
  region: string;
}
