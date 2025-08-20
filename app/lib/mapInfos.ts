const archaeologicalSites = [
    {
        id: 'carthage',
        name: { en: 'Ancient Carthage', fr: 'Carthage Antique' },
        coordinates: [36.8528, 10.3294], // Real coordinates
        description: {
            en: 'Ancient Phoenician city-state and UNESCO World Heritage Site. Explore the remains of this once-mighty empire.',
            fr: 'Ancienne cité-état phénicienne et site du patrimoine mondial de l\'UNESCO. Explorez les vestiges de cet empire autrefois puissant.'
        },
        type: 'unesco'
    },
    {
        id: 'dougga',
        name: { en: 'Dougga', fr: 'Dougga' },
        coordinates: [36.4222, 9.2194],
        description: {
            en: 'Best-preserved Roman small town in North Africa. Marvel at the stunning Capitol and Roman theater.',
            fr: 'Petite ville romaine la mieux préservée d\'Afrique du Nord. Admirez le magnifique Capitole et le théâtre romain.'
        },
        type: 'unesco'
    },
    {
        id: 'el-jem',
        name: { en: 'El Jem Amphitheatre', fr: 'Amphithéâtre d\'El Jem' },
        coordinates: [35.2981, 10.7061],
        description: {
            en: 'One of the largest Roman amphitheatres in the world. Experience the grandeur of ancient gladiatorial games.',
            fr: 'L\'un des plus grands amphithéâtres romains au monde. Vivez la grandeur des anciens jeux de gladiateurs.'
        },
        type: 'unesco'
    },
    {
        id: 'kairouan',
        name: { en: 'Kairouan', fr: 'Kairouan' },
        coordinates: [35.6781, 10.0963],
        description: {
            en: 'First capital of Islamic Tunisia and holy city. Visit the Great Mosque and explore Islamic architecture.',
            fr: 'Première capitale de la Tunisie islamique et ville sainte. Visitez la Grande Mosquée et explorez l\'architecture islamique.'
        },
        type: 'unesco'
    },
    {
        id: 'sousse',
        name: { en: 'Sousse Medina', fr: 'Médina de Sousse' },
        coordinates: [35.8256, 10.6369],
        description: {
            en: 'Historic medina and UNESCO World Heritage Site. Wander through ancient streets and traditional markets.',
            fr: 'Médina historique et site du patrimoine mondial de l\'UNESCO. Promenez-vous dans les rues anciennes et les marchés traditionnels.'
        },
        type: 'unesco'
    },
    {
        id: 'sbeitla',
        name: { en: 'Sbeitla', fr: 'Sbeïtla' },
        coordinates: [35.2372, 9.1133],
        description: {
            en: 'Ancient Roman city of Sufetula. Discover well-preserved temples and Byzantine churches.',
            fr: 'Ancienne ville romaine de Sufetula. Découvrez des temples bien préservés et des églises byzantines.'
        },
        type: 'historical'
    },
    {
        id: 'bulla-regia',
        name: { en: 'Bulla Regia', fr: 'Bulla Regia' },
        coordinates: [36.5561, 8.7553],
        description: {
            en: 'Roman archaeological site with unique underground villas. Explore subterranean mosaics and architecture.',
            fr: 'Site archéologique romain avec des villas souterraines uniques. Explorez les mosaïques et l\'architecture souterraines.'
        },
        type: 'historical'
    }
];

const agencyLocation = {
    name: { en: 'Odyssee travel agency', fr: 'Agence de Voyage Odyssee' },
    coordinates: [36.847127, 10.175902], // Tunis center
    description: {
        en: 'Your trusted partner for exploring Tunisia\'s archaeological treasures. Contact us for personalized tours!',
        fr: 'Votre partenaire de confiance pour explorer les trésors archéologiques de la Tunisie. Contactez-nous pour des circuits personnalisés !'
    }
};

export { archaeologicalSites, agencyLocation };