export const config = {
    outDirRaw: 'build/raw',
    outDirGenerated: 'build/generated',
    externalResources: [
        'https://raw.githubusercontent.com/request-laurent/lagrange-data/main/ships.json',
        'https://raw.githubusercontent.com/request-laurent/lagrange-data/main/i18n_en.properties',
        'https://raw.githubusercontent.com/request-laurent/lagrange-data/main/i18n_ja.properties',
    ],
} as const;
