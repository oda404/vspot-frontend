
export const product_trail_translations = [
    {
        parent: "disposable",
        translation: "Disposable",
        children: [
            {
                name: "cartridge",
                translation: "Poduri"
            },
            {
                name: "reusable",
                translation: "Dispozitiv poduri"
            },
        ]
    },
    {
        parent: "pouch",
        translation: "Pouch-uri",
        children: [
            {
                name: "weak",
                translation: "Slabe",
            },
            {
                name: "mid",
                translation: "Moderate",
            },
            {
                name: "strong",
                translation: "Tari",
            }
        ]
    },
    {
        parent: "liquid",
        translation: "E-lichide",
        children: [
            {
                name: "nicotine",
                translation: "Nicotinizare"
            },
        ]
    },
    {
        parent: "kit",
        translation: "Kit",
        children: [
            {
                name: "entry",
                translation: "Incepatori"
            },
            {
                name: "resistor",
                translation: "Rezistente"
            }
        ]
    },
    {
        parent: "smoking",
        translation: "Tutungerie",
        children: [
            {
                name: "filter",
                translation: "Filtre"
            },
            {
                name: "rollingpaper",
                translation: "Foite"
            },
            {
                name: "grinder",
                translation: "Grinder"
            },
            {
                name: "capsules",
                translation: "Capsule"
            },
            {
                name: "lighter",
                translation: "Brichete"
            },
        ]
    }
]

export function product_trail_translate(parent: string, children: string[]) {
    const parent_obj = product_trail_translations.find(t => t.parent === parent);
    if (!parent_obj)
        return [];

    let ret = [];
    ret.push(parent_obj.translation);

    for (let i = 0; i < children.length; ++i) {
        const children_obj = parent_obj.children.find(c => c.name === children[i]);
        if (!children_obj)
            return [];

        ret.push(children_obj.translation);
    }

    return ret;
}
