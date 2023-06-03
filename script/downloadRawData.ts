import fs from 'fs';
import path from 'path';
import wget from 'wget-improved';
import ProgressBar from 'progress';
import { config } from './config';

async function main() {
    const outDir = path.join(process.cwd(), config.outDirRaw);

    if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true });
    }

    let done = 1;
    for (const url of config.externalResources) {
        const filename = path.basename(url);
        console.log(`Loading ${filename} (${done++}/${config.externalResources.length})`);
        await download(
            url,
            path.join(outDir, filename),
        );
    }
}

function download(url: string, outputPath: string): Promise<void> {
    const bar = new ProgressBar(':bar', { total: 10 });

    return new Promise((resolve, reject) => {
        const download = wget.download(url, outputPath);
        download.on('error', (err: Error) => {
            reject(err);
        });
        download.on('end', function () {
            try {
                fs.readFile(outputPath, 'utf8', err => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve();
                });
            } catch (e) {
                reject(e);
            }
        });
        download.on('progress', function (progress) {
            bar.update(progress);
        });
    });
}

main().then(() => {
    console.log('Done');
    process.exit(0); 
}).catch((e) => {
    console.error(e); 
    process.exit(1); 
});
