var gaSettings = {};
Meteor.startup(function () {
    var packageName = "edgee-google-analytics",
        settings = keenSettings && keenSettings.packages[packageName];

    if (!settings) return;

    gaSettings = settings.public || gaSettings;

    if (gaSettings.id) {
        loadAnalyticsScript();
        initTracker();
        applySettings();
        applyRequires();

        Tracker.autorun(function(){
            window.ga("set", 'userId', Meteor.userId());
        });
    } else {
        initFakeTracker();
    }
});


function loadAnalyticsScript() {
    (function(i,s,o,g,r,a,m) {
        i["GoogleAnalyticsObject"]=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments);},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m);
    }(window, document, "script", "//www.google-analytics.com/analytics.js", "ga"));
}

function initTracker() {
    var createOptions = gaSettings.create || "auto";

    window.ga("create", gaSettings.id, createOptions);
}

function applySettings() {
    if (!gaSettings.set) { return; }

    for (var key in gaSettings.set) {
        if (gaSettings.set.hasOwnProperty(key)) {
            window.ga("set", key, gaSettings.set[key]);
        }
    }
}

function applyRequires() {
    var requireValue;

    if (!gaSettings.require) { return; }

    for (var key in gaSettings.require) {
        if (gaSettings.require.hasOwnProperty(key)) {
            requireValue = gaSettings.require[key];
            if (typeof requireValue === "string") {
                window.ga("require", key, requireValue);
            } else {
                window.ga("require", key);
            }
        }
    }
}

function initFakeTracker() {
    var hasRun = false;
    window.ga = function() {
        if (!hasRun) {
            hasRun = true;
            console.log("Analytics settings not found");
        }
    };
}
