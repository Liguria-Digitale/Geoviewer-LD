import axios from 'axios';

export default async function getEnv() {
  let url = '/geoservices/apps/viewer/pages/env.json';
  let response = await axios.get(url);
  return response.data.ENV;
}
