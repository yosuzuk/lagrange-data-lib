import fs from 'fs';
import path from 'path';
import { config } from './config';
import { RawJsonSchema } from './schema/RawShipsSchema';

const INPUT_JSON_FILE = 'ships.json';

async function main() {
    const filePath = path.join(process.cwd(), config.outDirRaw, INPUT_JSON_FILE);
    const parsedJson = await openAndParseJson(filePath);
    RawJsonSchema.parse(parsedJson);
}

async function openAndParseJson(filePath: string): Promise<unknown> {
    return new Promise<void>((resolve, reject) => {
        fs.readFile(filePath, 'utf8', function (err, data) {
            if (err) {
                reject(err);
                return;
            }

            try {
                resolve(JSON.parse(data));
            } catch (e) {
                reject(e);
            }
        });
    });
}

main().then(() => {
    console.log(`Done, schema matches ${INPUT_JSON_FILE}`);
    process.exit(0); 
}).catch((e) => {
    if ('issues' in e) {
        const firstTenIssues = [...e.issues].splice(0, 10);
        console.log(JSON.stringify(firstTenIssues, null, 2));
        console.error('Schema validation failed');
    } else {
        console.error(e); 
    }
    process.exit(1); 
});
