import { LaunchType } from "./LaunchType";
import { ProgramType } from "./ProgramType";

export interface NewsType {
  id: number;
  url: string;
  slug: string;
  name: string;
  updates: [];
  type: {
    id: number;
    name: string;
  };
  description: string | null;
  location: string | null;
  news_url: string | null;
  video_url: string | null;
  feature_image: string | null;
  date: string | null;
  webcast_live: boolean | string;
  launches: Array<LaunchType>;
  expeditions: Array<any>;
  spacestations: Array<any>;
  program: Array<ProgramType> | []
}
