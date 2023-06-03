import fs from 'fs';
import path from 'path';
import lodashSetWith from 'lodash/setWith';
import { config } from './config';

async function main() {
    const inputDir = path.join(process.cwd(), config.outDirRaw);
    const outDir = path.join(process.cwd(), config.outDirGenerated);

    if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true });
    }

    const propertiesFiles = config.externalResources
        .filter(url => url.endsWith('.properties'))
        .map(url => path.basename(url));

    for (const filename of propertiesFiles) {
        await propertiesToJson(
            path.join(inputDir, filename),
            path.join(outDir, path.basename(filename, '.properties') + '.json'),
        );
    }
}

async function propertiesToJson(input: string, output: string) {
    return new Promise<void>((resolve, reject) => {
        fs.readFile(input, 'utf8', function (err, data) {
            if (err) {
                reject(err);
                return;
            }

            const result = transform(data);
    
            fs.writeFile(output, result, 'utf8', function (err) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });
    });
}

function transform(rawData: string): string {
    const result = {};

    rawData.replace(/\r?\n/g, '\n').split('\n').forEach((line, index) => {
        const [key, ...valueParts] = line.split('=');
        const value = valueParts.join('=');
        if (key && value) {
            lodashSetWith(result, key, value, Object);
        }
    });

    return JSON.stringify(result, null, 2);
}

main().then(() => {
    console.log('Done');
    process.exit(0); 
}).catch((e) => {
    console.error(e); 
    process.exit(1); 
});
