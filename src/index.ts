import config from '../config/config';
import { starServer } from '../server';

(async () => {
  const {url} = await starServer(config.PORT);  
  console.log(`🚀Server ready at ${url}`);  
})()
