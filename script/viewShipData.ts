import _ from 'lodash';
import ships from './data/raw/ships.json';
import i18nEn from './data/generated/i18n_en.json';
import i18nJa from './data/generated/i18n_ja.json';
import { RawEnhancement, RawShips, RawSystem } from './types';

async function main() {
    const shipId = 50603;
    const ship = (ships as RawShips).find(ship => ship.id === shipId);
    if (!ship) {
        throw new Error('Invalid ship id');
    }

    const output = {
        name: `${_.get(i18nJa, ship.shortName)}　${toFullWidth(ship.variante)}${_.get(i18nJa, ship.typeName)}`,
        // longName: _.get(i18nJa, ship.name),
        translatedName: {
            en: `${_.get(i18nEn, ship.shortName)} - ${_.get(i18nEn, ship.typeName)}`,
            // longEn: _.get(i18nEn, ship.name),
        },
        cost: ship.commandPoint,
        row: parseRow(ship.row),
        operationLimit: ship.maxShip > 0 ? ship.maxShip : 'TODO',
        modules: ship.systems.map(system => {
            return {
                id: `${system.id}`,
                name: _.get(i18nJa, system.name),
                translatedName: {
                    en: _.get(i18nEn, system.name),
                },
                // description
                // parts
                category: extractCategory(system),
                categoryNumber: extractCategoryNumber(system),
                // carryFighter?: number;
                // carryCorvette?: number;
                // carryFighterType?: ShipSubType.SMALL_FIGHTER | ShipSubType.MEDIUM_FIGHTER | ShipSubType.LARGE_FIGHTER;
                defaultModule: !system.option,
                mainSystem: system.main,
                effects: system.enhancements.filter(e => !e.flagShip && e.techs.length === 0).map(convertEnhancement),
                skillComplete: true,
                skillSlots: system.enhancementsLimit,
                skills: system.enhancements.filter(e => !e.flagShip && e.techs.length > 0).map(convertEnhancement),
                flagshipEffects: system.enhancements.filter(e => e.flagShip).map(convertEnhancement),
                // dpmShip?: number;
                // dpmAntiAir?: number;
                // dpmSiege?: number;
            };
        }),
    };

    console.log(JSON.stringify(output, null, 2));
}

function convertEnhancement(enhancement: RawEnhancement) {
    return {
        name: _.get(i18nJa, enhancement.name),
        translatedName: {
            en: _.get(i18nEn, enhancement.name),
        },
        description: _.get(i18nJa, enhancement.description),
        translatedDescription: {
            en: _.get(i18nEn, enhancement.description)
        },
        detail: _.get(i18nJa, enhancement.detail),
        translatedDetail: {
            en: _.get(i18nEn, enhancement.detail),
        },
        cost: enhancement.techs.length > 0 ? enhancement.techs.reduce((sum, i) => sum + i, 0) : null,
        isDefault: enhancement.techs.length === 0,
    } as const;
}

function parseRow(raw: string) {
    switch (raw) {
        case 'row.0':
            return '> ShipRow.FRONT';
        case 'row.1':
            return '> ShipRow.MIDDLE';
        case 'row.2':
            return '> ShipRow.BACK';
        default:
            return '> ShipRow.NONE';
    }
}

function extractCategory(system: RawSystem): string {
    return system.optional ? (system.option ? `${system.option}`.match(/[A-Z]/)?.join('') ?? 'TODO' : 'TODO') : 'STATIC';
}

function extractCategoryNumber(system: RawSystem): number | string {
    return system.optional ? (system.option ? `${system.option}`.match(/[0-9]/)?.join('') ?? 'TODO' : 'TODO') : -1;
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
