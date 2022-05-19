interface agency {
    id: number;
    url: string;
    name: string;
    type: string;
}
export interface ProgramType {
  id: number | null;
  url: string | null;
  name: string | null;
  description: string | null;
  agencies: agency[];
  image_url: string | null;
  start_date: string | null;
  end_date: string | null;
  info_url: string | null;
  wiki_url: string | null;
  mission_patches: Array<any>;
}
