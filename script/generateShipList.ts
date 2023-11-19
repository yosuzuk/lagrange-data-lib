import path from 'path';
import _ from 'lodash';
import ships from './data/raw/ships.json';
import i18nEn from './data/generated/i18n_en.json';
import i18nJa from './data/generated/i18n_ja.json';
import { RawShips } from './types';
import { writeDirectory, writeFile } from './writeFile';
import { config } from './config';

async function main() {
    const shipId = 80301;
    const output = (ships as RawShips).map(ship => {
        return {
            id: ship.id,
            name: `${_.get(i18nJa, ship.shortName)}　${toFullWidth(ship.variante)}${_.get(i18nJa, ship.typeName)}`,
            translatedName: {
                en: `${_.get(i18nEn, ship.shortName)} - ${_.get(i18nEn, ship.typeName)}`,    
            },
        };
    });

    const fileName = 'index.json';
    const outputDir = path.join(process.cwd(), config.outDirGenerated, 'ships');
    await writeDirectory(outputDir);
    const outputPath = path.join(outputDir, fileName);
    await writeFile(JSON.stringify(output, null, 2), outputPath);
}

function toFullWidth(str: string): string {
    str = str.replace(/[A-Za-z0-9]/g, function(s) {
      return String.fromCharCode(s.charCodeAt(0) + 0xFEE0);
    });
    return str;
}

main().then(() => {
    console.log('Done');
    process.exit(0); 
}).catch((e) => {
    console.error(e);
    process.exit(1); 
});
