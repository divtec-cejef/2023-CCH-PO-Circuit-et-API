import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const getLogFile = () => {
  for (const file of fs.readdirSync('./logs', { withFileTypes: true })) {
    if (file.name.endsWith('.current.log')) { return file.name; }
  }

  const date = new Date(Date.now());
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const milliseconds = date.getMilliseconds();
  return `${year}-${month}-${day}-${hours}-${minutes}-${seconds}-${milliseconds}.current.log`;
};

const prisma = new PrismaClient({
  log: [{
    emit: 'event',
    level: 'query'
  },
  {
    emit: 'event',
    level: 'error'
  },
  {
    emit: 'event',
    level: 'info'
  },
  {
    emit: 'event',
    level: 'warn'
  }]
});

const currentLog = getLogFile();

prisma.$on('query', (e) => {
  fs.appendFileSync(`./logs/${currentLog}`, `[QUERY] ${new Date(Date.now()).toISOString()}\n`);
  fs.appendFileSync(`./logs/${currentLog}`, '\tQuery: ' + e.query + '\n');
  fs.appendFileSync(`./logs/${currentLog}`, '\tParams: ' + e.params + '\n');
  fs.appendFileSync(`./logs/${currentLog}`, '\tDuration: ' + e.duration + 'ms\n\n');
});

prisma.$on('error', (e) => {
  fs.appendFileSync(`./logs/${currentLog}`, `[CRITICAL] ${new Date(Date.now()).toISOString()}\n`);
  fs.appendFileSync(`./logs/${currentLog}`, '\tError: ' + e.message + '\n');
  fs.appendFileSync(`./logs/${currentLog}`, '\tOn: ' + e.target + 'ms\n\n');
});

prisma.$on('info', (e) => {
  fs.appendFileSync(`./logs/${currentLog}`, `[INFO] ${new Date(Date.now()).toISOString()}\n`);
  fs.appendFileSync(`./logs/${currentLog}`, '\tInfo: ' + e.message + '\n');
  fs.appendFileSync(`./logs/${currentLog}`, '\tn: ' + e.target + 'ms\n\n');
});

prisma.$on('warn', (e) => {
  fs.appendFileSync(`./logs/${currentLog}`, `[WARN] ${new Date(Date.now()).toISOString()}\n`);
  fs.appendFileSync(`./logs/${currentLog}`, '\tWarn: ' + e.message + '\n');
  fs.appendFileSync(`./logs/${currentLog}`, '\tOn: ' + e.target + 'ms\n\n');
});

export const xprisma = prisma.$extends({
  result: {
    race: {
      total_time: {
        // the dependencies
        needs: { race_start: true, race_finish: true },
        compute: (race) => {
          // the computation logic
          return new Date(race.race_finish.valueOf() - race.race_start.valueOf());
        }
      }
    }
  }
});

export default xprisma;
