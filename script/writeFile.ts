import fs from 'fs';

export async function writeFile(content: string, output: string) {
    return new Promise<void>((resolve, reject) => {
        fs.writeFile(output, content, 'utf8', function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
}

export async function writeDirectory(outDir: string) {
    if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true });
    }
}
