// src/websocket.ts
import axios from 'axios';
import { config } from './config';

let cache: any = null;

const updateCache = async () => {
  try {
    const response = await axios.get(config.targetDomain);
    cache = response.data;
    console.log('Cache updated');
  } catch (error) {
    console.error('Error fetching target site:', error);
  }
};

// Update cache every 10 seconds
setInterval(updateCache, 10000);

// Initial cache update
updateCache();

export const getCache = () => cache;