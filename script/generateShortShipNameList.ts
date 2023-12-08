import path from 'path';
import _ from 'lodash';
import ships from './data/raw/ships.json';
import i18nEn from './data/generated/i18n_en.json';
import i18nJa from './data/generated/i18n_ja.json';
import { RawShips } from './types';
import { writeDirectory, writeFile } from './writeFile';
import { config } from './config';

async function main() {
    const records: Record<string, string> = {};
    (ships as RawShips).forEach(ship => {
        records[ship.shortName] = `${_.get(i18nEn, ship.shortName)},${_.get(i18nJa, ship.shortName)}`;
    });
    const fileContent = Object.values(records).join('\n');

    const fileName = 'shortNames.csv';
    const outputDir = path.join(process.cwd(), config.outDirGenerated, 'wiki');
    await writeDirectory(outputDir);
    const outputPath = path.join(outputDir, fileName);
    await writeFile(fileContent, outputPath);
}

main().then(() => {
    console.log('Done');
    process.exit(0); 
}).catch((e) => {
    console.error(e);
    process.exit(1); 
});
