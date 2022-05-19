import axios, { AxiosResponse } from "axios";
import { LaunchType } from "../interfaces/LaunchType";

const instance = axios.create({
  baseURL: "https://lldev.thespacedevs.com/2.2.0/",
  timeout: 15000,
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  getMission: (url: string) => instance.get(url).then(responseBody),
};

export const mission = {
  next: async (spaceAgency: string | null) => {
    const result = (await requests.getMission(!spaceAgency ? "launch/upcoming/?limit=1&offset=1%22" : "launch/upcoming/?search=" + `${spaceAgency}`)).results;
    console.log(result)
    return result[0];
  },
  week: async (spaceAgency: string | null): Promise<LaunchType[]> => {
    return (await requests.getMission(!spaceAgency ? "launch/upcoming/?limit=7&offset=7%22" : "launch/upcoming/?search=" + `${spaceAgency}`)).results;
  },
  all: async (spaceAgency: string): Promise<LaunchType[]> => {
    return (await requests.getMission(!spaceAgency ? "launch/upcoming/" : "launch/upcoming/?search=" + `${spaceAgency}`)).results;
  },
};
