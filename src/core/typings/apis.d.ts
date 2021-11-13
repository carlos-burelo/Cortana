// declare module GitHubApiResponse {
export interface Owner {
  login: string;
  avatar_url: string;
  url: string;
  html_url: string;
  type: string;
}

export interface License {
  key: string;
  name: string;
  spdx_id: string;
  url: string;
}

export interface RootObject {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: Owner;
  html_url: string;
  description: string;
  fork: boolean;
  url: string;
  created_at: Date;
  updated_at: Date;
  pushed_at: Date;
  homepage: string;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  has_issues: boolean;
  has_projects: boolean;
  has_downloads: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  forks_count: number;
  mirror_url?: any;
  archived: boolean;
  disabled: boolean;
  open_issues_count: number;
  license: License;
  allow_forking: boolean;
  is_template: boolean;
  topics: string[];
  visibility: string;
  forks: number;
  open_issues: number;
  watchers: number;
  default_branch: string;
  temp_clone_token?: any;
  network_count: number;
  subscribers_count: number;
}
// }
export interface GitHubApiResponse extends RootObject {
  owner: Owner;
  license: License;
}
