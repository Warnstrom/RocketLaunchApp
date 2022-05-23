import axios, { AxiosResponse } from "axios";
import { LaunchType } from "../interfaces/LaunchType";
import { NewsType } from "../interfaces/NewsType";

const instance = axios.create({
  baseURL: "https://ll.thespacedevs.com/2.2.0/",
  timeout: 15000,
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => instance.get(url).then(responseBody),
};

export const mission = {
  next: async (spaceAgency: string | null): Promise<LaunchType> => {
    const result = (await requests.get(!spaceAgency ? "launch/upcoming/?limit=1&offset=1%22" : "launch/upcoming/?search=" + `${spaceAgency}`))
      .results;
    return result[0];
  },
  week: async (spaceAgency: string | null): Promise<LaunchType[]> => {
    return (await requests.get(!spaceAgency ? "launch/upcoming/?limit=7&offset=7%22" : "launch/upcoming/?search=" + `${spaceAgency}`)).results;
  },
  all: async (spaceAgency: string): Promise<LaunchType[]> => {
    const result: Promise<LaunchType[]> = (await requests.get(!spaceAgency ? "launch/upcoming/" : "launch/upcoming/?search=" + `${spaceAgency}`))
      .results;
    return result;
  },
  news: async (): Promise<NewsType[]> => {
    const result: Promise<NewsType[]> = (await requests.get("event/upcoming/")).results;
    return result;
  },
};
