Package.describe({
    name: "CulturalMe:iron-router-ga",
    summary: "Google analytics (universal edition) with some Iron Router sugar for tracking page views. Forked to work with keen-settings",
    version: "0.3.2",
    git: "https://github.com/CulturalMe/meteor-iron-router-ga"
});

Package.onUse(function(api) {
    api.versionsFrom("METEOR@0.9.0");
    api.use(["keen-settings@0.2.1", "iron:router@0.9.4"], "client");

    api.addFiles([ "lib/ga.js", "lib/router.js" ], "client");
});
