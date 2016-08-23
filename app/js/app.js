function onFocus() {
    screenFocus = !0,
        screenFocusReal = !0,
        inactive__popup.style.display = "none",
        planetOne.trail = []
}
function onBlur() {
    screenFocusReal = !1,
    thingdrawVis || (screenFocus = !1,
        inactive__popup.style.display = "flex")
}
function bigNumber(e) {
    for (var t = "", a = e.toString(10), s = -1 === a.indexOf("e") ? a.length : parseInt(a.substr(a.indexOf("e") + 1)) + 1, n = 1; s >= n; n++) {
        var i = (e % Math.pow(10, n)).toString(10)
            , o = -1 === i.indexOf("e") ? 0 : parseInt(i.substr(i.indexOf("e") + 1));
        t = 0 === o && i.length !== n || o > 0 && o !== n - 1 ? "0" + t : i.charAt(0) + t
    }
    return t
}
function easeOutQuart(e, t, a, s) {
    return e /= s,
        e--,
    -a * (e * e * e * e - 1) + t
}
function easeInOutExpo(e, t, a, s) {
    return e /= s / 2,
        1 > e ? a / 2 * Math.pow(2, 10 * (e - 1)) + t : (e--,
        a / 2 * (-Math.pow(2, -10 * e) + 2) + t)
}
function easeOutExpo(e, t, a, s) {
    return a * (-Math.pow(2, -10 * e / s) + 1) + t
}
function numberWithCommas(e) {
    return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}
function getRandomInt(e, t) {
    return Math.floor(Math.random() * (t - e + 1)) + e
}
function getRndBias(e, t, a, s) {
    var n = Math.random() * (t - e) + e
        , i = Math.random() * s;
    return n * (1 - i) + a * i
}
function calculateGravity(e, t) {
    var a = [0, 0]
        , s = [t.pos[0] - e.pos[0], t.pos[1] - e.pos[1]]
        , n = Math.pow(Math.sqrt(Math.pow(s[0], 2) + Math.pow(s[1], 2)), 2)
        , i = bigG * t.mass * e.mass / n
        , o = [i * (s[0] / Math.sqrt(Math.pow(s[0], 2) + Math.pow(s[1], 2))), i * (s[1] / Math.sqrt(Math.pow(s[0], 2) + Math.pow(s[1], 2)))];
    a[0] += o[0],
        a[1] += o[1];
    var r = [a[0] / e.mass, a[1] / e.mass];
    e.vel[0] += r[0],
        e.vel[1] += r[1],
        e.pos[0] += e.vel[0],
        e.pos[1] += e.vel[1]
}
function checkItems() {
    for (var e = 0; e < lockedItems.length; e++)
        if (power >= .8 * lockedItems[e].currentCost) {
            switch (lockedItems[e].el.id) {
                case "item__potato":
                    itemProbe = new ItemConstruct("item__probe",probeCost,"Probetato","*********","power",probePower,probeBlurb,!0,0,probeSound,icon__probe),
                        lockedItems.push(itemProbe);
                    break;
                case "item__probe":
                    itemSpudnik = new ItemConstruct("item__spudnik",spudnikCost,"Spudnik","*******","power",spudnikPower,spudnikBlurb,!0,0,spudnikSound,icon__spudnik),
                        lockedItems.push(itemSpudnik);
                    break;
                case "item__spudnik":
                    var t = landedProbes.length > 0;
                    itemPotatoPlant = new ItemConstruct("item__potatoPlant",potatoPlantCost,"Potato Plant","****** *****","power",potatoPlantPower,potatoPlantBlurb,t,0,potatoPlantSound,icon__potatoplant),
                    t || (itemPotatoPlant.costLineSpan.innerHTML = "<span id='cost' style='display:none;'></span>Requires landed probetato"),
                        lockedItems.push(itemPotatoPlant);
                    break;
                case "item__potatoPlant":
                    var t = !1;
                    1 == shipLanded && (t = !0),
                        itemTaterTower = new ItemConstruct("item__taterTower",taterTowerCost,"Tater Tower","***** *****","power",taterTowerPower,taterTowerBlurb,t,0,taterTowerSound,icon__tatertower),
                    t || (itemTaterTower.costLineSpan.innerHTML = "<span id='cost' style='display:none;'></span>Requires landed pod"),
                        lockedItems.push(itemTaterTower);
                    break;
                case "item__taterTower":
                    var t = !1;
                    1 == gotPlanetBoosters && (t = !0),
                        itemSpudGun = new ItemConstruct("item__spudGun",spudGunCost,"Spud Gun","**** ***","power",spudGunPower,spudGunBlurb,t,0,spudGunSound,icon__spudgun),
                    t || (itemSpudGun.costLineSpan.innerHTML = "<span id='cost' style='display:none;'></span>Requires planet boosters"),
                        lockedItems.push(itemSpudGun);
                    break;
                case "item__spudGun":
                    var t = !1;
                    1 == gotPlanetBoosters && (t = !0),
                        itemPotatoLauncher = new ItemConstruct("item__potatoLauncher",potatoLauncherCost,"Potato Launcher","****** ********","power",potatoLauncherPower,potatoLauncherBlurb,t,0,potatoLauncherSound,icon__potatolauncher),
                    t || (itemPotatoLauncher.costLineSpan.innerHTML = "<span id='cost' style='display:none;'></span>Requires planet boosters"),
                        lockedItems.push(itemPotatoLauncher)
            }
            lockedItems[e].reveal()
        }
    for (var e = 0; e < availableItems.length; e++)
        power >= availableItems[e].currentCost && 1 == availableItems[e].conditions ? ("item__potatoPlant" != availableItems[e].el.id || potatoPlantUnlock || (availableItems[e].el.addEventListener("click", buildItem),
            potatoPlantUnlock = !0),
        "item__taterTower" != availableItems[e].el.id || taterTowerUnlock || (availableItems[e].el.addEventListener("click", buildItem),
            taterTowerUnlock = !0),
        "item__spudGun" != availableItems[e].el.id || spudGunUnlock || (availableItems[e].el.addEventListener("click", buildItem),
            spudGunUnlock = !0),
        "item__potatoLauncher" != availableItems[e].el.id || potatoLauncherUnlock || (availableItems[e].el.addEventListener("click", buildItem),
            potatoLauncherUnlock = !0),
            availableItems[e].el.className = "manufacture__item",
            availableItems[e].costLineSpan.style.color = "#00ffc2") : (availableItems[e].el.className = "manufacture__item--locked",
            availableItems[e].costLineSpan.style.color = "#ff3e3e")
}
function checkResearch() {
    for (var e = 0; e < availableResearch.length; e++)
        power >= availableResearch[e].cost ? (availableResearch[e].el.className = "manufacture__item",
            availableResearch[e].costLineSpan.style.color = "#00ffc2") : (availableResearch[e].el.className = "manufacture__item--locked",
            availableResearch[e].costLineSpan.style.color = "#ff3e3e");
    inhabitants__dataNeeded > inhabitants__data && inhabitants__started && (inhabitants__data += powerGain,
        inhabitantsProgress.value = inhabitants__data,
        status__inhabitants.innerHTML = numberWithCommas(inhabitants__data.toFixed(0)) + "/" + numberWithCommas(inhabitants__dataNeeded.toFixed(0)) + " <span class='status__container__span'>(" + (inhabitants__data / inhabitants__dataNeeded * 100).toFixed(0) + "%) until we work out what this thing is.</span>",
    inhabitants__data >= inhabitants__dataNeeded && (status__gravSrc.innerHTML = "Orbiting mass: <span class='status__container__span'>Earth</span>",
        status__gravSrc.style.background = statusNotificationCol,
        status__inhabitants.innerHTML = "Inhabitants: <span>all dead</span>",
        status__inhabitants.style.background = statusNotificationCol,
        inhabitantsProgress.style.display = "none",
        queueLog(132, "Comparing the data to what little info I have on file, it looks like we're on our home planet Terra, which can't be right as it's meant to not be dead..."),
        queueLog(132, "If that's correct, it must be the year " + realDate.getFullYear() + ". I've updated our date records."),
        queueLog(132, "Develop landing technology - I want to get a closer look at this thing."),
        inhabitants__discovered = !0,
        createResearch("hopperHeatshields"),
        setTimeout(statusNotification, notificationDelay)))
}
function createResearch(e) {
    switch (e) {
        case "cleanPanels":
            cleanPanels = new ResearchConstruct("cleanPanels",cleanPanels__cost,"Clean Solar Panels","power","The solar panels are covered in red dust.<br/>Clean them for 3w / 10 seconds.",icon__cleanPanels),
                availableResearch.push(cleanPanels);
            break;
        case "polishedPanels":
            polishedPanels = new ResearchConstruct("polishedPanels",polishedPanels__cost,"Polished Solar Panels","power","Get some Mr.Sheen on those bad boys<br/>for 1watt per second.",icon__polishedPanels),
                availableResearch.push(polishedPanels);
            break;
        case "goldenPanels":
            goldenPanels = new ResearchConstruct("goldenPanels",goldenPanels__cost,"Golden Solar Panels","power","We can afford a bit of luxury.<br/>Panels will produce 4w / second.",icon__goldenPanels),
                availableResearch.push(goldenPanels);
            break;
        case "heatshields":
            heatshields = new ResearchConstruct("heatshields",heatShields__cost,"Probetato Foil","power","Wrap them in foil to stop them burning.<br/>Perhaps add some Lea & Perrins?",icon__probetatoFoil),
                availableResearch.push(heatshields);
            break;
        case "solarAmbience":
            solarAmbience = new ResearchConstruct("solarAmbience",solarAmbience__cost,"Solar Ambience","power","Upgraded solar panels will produce<br/>0.25x in shadow through ambient light.",icon__solarAmbience),
                availableResearch.push(solarAmbience);
            break;
        case "hopperHeatshields":
            hopperHeatshields = new ResearchConstruct("hopperHeatshields",hopperHeatshields__cost,"Pod Module","power","Prepare escape pod for a harsh landing.<br/>Ship will remain in orbit producing things.",icon__podModule),
                availableResearch.push(hopperHeatshields);
            break;
        case "landship":
            landship = new ResearchConstruct("landship",landship__cost,"Return to Earth.","power","Eject from your hopper and return to Earth.",icon__landship),
                availableResearch.push(landship);
            break;
        case "systView":
            systView = new ResearchConstruct("systView",systView__cost,"System Peeker","power","Upgrade the radar thing. <br/>See the local system",icon__systemView),
                availableResearch.push(systView);
            break;
        case "planetBoosters":
            planetBoosters = new ResearchConstruct("planetBoosters",planetBoosters__cost,"Planet Boosters","power","We'll need to increase our velocity to remain in orbit as Sol's mass is increased.",icon__planetBoosters),
                availableResearch.push(planetBoosters);
            break;
        case "approachEventHorizon":
            approachEventHorizon = new ResearchConstruct("approachEventHorizon",approachEventHorizon__cost,"Approach Hole","power","Time will become infinite.<br/>Or you'll full-on die? This is just silly.",icon__approachEventHorizon),
                availableResearch.push(approachEventHorizon);
            break;
        case "kinetigen01":
            kinetigen01 = new ResearchConstruct("kinetigen01",kinetigen01__cost,"Kinetigen Tweak","power","Messing with the kinetic generator's internals will get us 3 watts per cycle.",icon__kinetigen01),
                availableResearch.push(kinetigen01);
            break;
        case "kinetigen02":
            kinetigen02 = new ResearchConstruct("kinetigen02",kinetigen02__cost,"Kinetigen Overclock","power","Upgrade the Kinetigen to produce 100 watts per click.",icon__kinetigen02),
                availableResearch.push(kinetigen02);
            break;
        case "kinetigen03":
            kinetigen03 = new ResearchConstruct("kinetigen03",kinetigen03__cost,"Atomic Kinetigen","power","Each Kinetigen press could power a small town - 500watts per click.",icon__kinetigen03),
                availableResearch.push(kinetigen03);
            break;
        case "kinetigen04":
            kinetigen04 = new ResearchConstruct("kinetigen04",kinetigen04__cost,"Super Kinetigen","power","Each Kinetigen press is enough to make the galaxy wince - 10,000watts per click.",icon__kinetigen04),
                availableResearch.push(kinetigen04);
            break;
        case "landshipAgain":
            landshipAgain = new ResearchConstruct("landshipAgain",landshipAgain__cost,"Return to ReEarth.","power","Return to Earth for the first time in &infin; years again.",icon__landshipAgain),
                availableResearch.push(landshipAgain);
            break;
        case "spudnikUpgrade":
            spudnikUpgrade = new ResearchConstruct("spudnikUpgrade",spudnikUpgrade__cost,"Golden Spudnik Foil","power","Reflect power back to your ship efficiently.<br/>Spudnik power-gain x3",icon__spudnikUpgrade),
                availableResearch.push(spudnikUpgrade);
            break;
        case "potatoUpgrade":
            potatoUpgrade = new ResearchConstruct("potatoUpgrade",potatoUpgrade__cost,"Maris Pipers","power","Quality mash.<br/>Potato power-gain x3",icon__potatoUpgrade),
                availableResearch.push(potatoUpgrade);
            break;
        case "probetatoUpgrade":
            probetatoUpgrade = new ResearchConstruct("probetatoUpgrade",probetatoUpgrade__cost,"Probetato Roots","power","Bore further into the surface for more gains.<br/>Probetato power-gain x4",icon__probetatoUpgrade),
                availableResearch.push(probetatoUpgrade);
            break;
        case "potatoPlantUpgrade":
            potatoPlantUpgrade = new ResearchConstruct("potatoPlantUpgrade",potatoPlantUpgrade__cost,"PotatoPlant Roots","power","Suck the nutrients out of the surface.<br/>PotatoPlant power-gain x3",icon__potatoplantUpgrade),
                availableResearch.push(potatoPlantUpgrade);
            break;
        case "taterTowerUpgrade":
            taterTowerUpgrade = new ResearchConstruct("taterTowerUpgrade",taterTowerUpgrade__cost,"Monolithic Hashies","power","Unhealthier they must be good right?<br/>TaterTower power-gain x2",icon__taterUpgrade),
                availableResearch.push(taterTowerUpgrade);
            break;
        case "spudGunUpgrade":
            spudGunUpgrade = new ResearchConstruct("spudGunUpgrade",spudGunUpgrade__cost,"SolarSpuds","power","Line the spudguns with solar panels<br/>Spudgun power-gain x2",icon__spudgunUpgrade),
                availableResearch.push(spudGunUpgrade);
            break;
        case "potatoLauncherUpgrade":
            potatoLauncherUpgrade = new ResearchConstruct("potatoLauncherUpgrade",potatoLauncherUpgrade__cost,"Plated Launchers","power","Cover the launchers in reflective panels.<br/>Potato Launcher power-gain x2",icon__potatoLauncherUpgrade),
                availableResearch.push(potatoLauncherUpgrade);
            break;
        case "irishPride":
            irishPride = new ResearchConstruct("irishPride",irishPride__cost,"Irish Pride","power","All potato things produce twice the power.",icon__irishPride),
                availableResearch.push(irishPride)
    }
}
function createCORSRequest(e, t) {
    var a = new XMLHttpRequest;
    return "withCredentials"in a ? a.open(e, t, !0) : "undefined" != typeof XDomainRequest ? (a = new XDomainRequest,
        a.open(e, t)) : a = null ,
        a
}
function toggleAbout() {
    thingMuted || (about__sound[about__soundInt].play(),
        about__soundInt++,
    about__soundInt >= about__sound.length && (about__soundInt = 0)),
        clearInterval(optionsInterval),
    "none" == options.style.display && (optionsInterval = setInterval(optionsCog, 30)),
        options.style.display = "none",
        "none" == about.style.display ? (about__button.style.opacity = 0,
            about__button.style.right = "30px",
            about.style.display = "flex",
            ga("set", {
                userId: USER_ID,
                dimension1: shipName,
                dimension2: USER_ID,
                metric14: 1
            }),
            ga("send", "pageview"),
            ga("set", {
                metric14: 0
            }),
            getGivers()) : (about__button.style.cssText = "",
            about.style.display = "none",
            about__button.style.opacity = 1)
}
function toggleOptions() {
    clearInterval(optionsInterval),
        "none" != about.style.display ? (thingMuted || ("block" == oCanvas.style.display ? (planetView__sound[planetView__soundInt].play(),
            planetView__soundInt++,
        planetView__soundInt >= planetView__sound.length && (planetView__soundInt = 0)) : (systemView__sound[systemView__soundInt].play(),
            systemView__soundInt++,
        systemView__soundInt >= systemView__sound.length && (systemView__soundInt = 0))),
            about__button.style.cssText = "",
            about.style.display = "none",
            optionsInterval = setInterval(optionsCog, 30),
            about__button.style.opacity = 1) : "none" == options.style.display ? (thingMuted || (options__sound[options__soundInt].play(),
            options__soundInt++,
        options__soundInt >= options__sound.length && (options__soundInt = 0)),
            options.style.display = "flex",
            optionsInterval = setInterval(optionsCog, 30),
            ga("set", {
                userId: USER_ID,
                dimension1: shipName,
                dimension2: USER_ID,
                metric15: 1
            }),
            ga("send", "pageview"),
            ga("set", {
                metric15: 0
            })) : (options.style.display = "none",
            optionsInterval = setInterval(optionsCog, 30),
        thingMuted || ("block" == oCanvas.style.display ? (planetView__sound[planetView__soundInt].play(),
            planetView__soundInt++,
        planetView__soundInt >= planetView__sound.length && (planetView__soundInt = 0)) : (systemView__sound[systemView__soundInt].play(),
            systemView__soundInt++,
        systemView__soundInt >= systemView__sound.length && (systemView__soundInt = 0))))
}
function optionsCog() {
    optctx.clearRect(0, 0, options__button.width, options__button.height);
    var e, t;
    "flex" == options.style.display || "flex" == about.style.display ? (e = easeInOutExpo(optionsTime, optionsImg.cogMaxSize, -optionsImg.cogMaxSize, optionsTimer),
        t = easeInOutExpo(optionsTime, 0, options__button.width / 2, optionsTimer)) : (e = easeInOutExpo(optionsTime, 0, optionsImg.cogMaxSize, optionsTimer),
        t = easeInOutExpo(optionsTime, options__button.width / 2, -options__button.width / 2, optionsTimer)),
        optionsImg.cogPos = t,
        optionsImg.cogSize = e,
        optctx.drawImage(optionsImg.close, 0, 0, 20, 20),
        optctx.drawImage(optionsImg.cog, optionsImg.cogPos, optionsImg.cogPos, optionsImg.cogSize, optionsImg.cogSize),
        optionsTime++,
    optionsTime >= optionsTimer && (clearInterval(optionsInterval),
        optionsTime = 0)
}
function autoSave(e) {
    if (!gotApproachEventHorizon) {
        if ("options__autosave--y" == e.id) {
            switch (thingAutoSave = !0,
                thingSaveFreq) {
                case "30s":
                    clearInterval(saveInter),
                        saveInter = setInterval(saveState, 3e4);
                    break;
                case "60s":
                    clearInterval(saveInter),
                        saveInter = setInterval(saveState, 6e4);
                    break;
                case "5m":
                    clearInterval(saveInter),
                        saveInter = setInterval(saveState, 3e5);
                    break;
                case "30m":
                    clearInterval(saveInter),
                        saveInter = setInterval(saveState, 18e5)
            }
            console.log("autosave on")
        } else
            "options__autosave--n" == e.id && (thingAutoSave = !1,
                clearInterval(saveInter),
                console.log("autosave off"));
        options__autosaveY.classList.remove("options__toggle--selected"),
            options__autosaveN.classList.remove("options__toggle--selected"),
            e.classList.add("options__toggle--selected")
    }
}
function saveFreq(e) {
    if (!gotApproachEventHorizon) {
        switch (e.id) {
            case "options__savefreq--30s":
                thingSaveFreq = "30s",
                    clearInterval(saveInter),
                    saveInter = setInterval(saveState, 3e4),
                    console.log("save frequency 30s");
                break;
            case "options__savefreq--60s":
                thingSaveFreq = "60s",
                    clearInterval(saveInter),
                    saveInter = setInterval(saveState, 6e4),
                    console.log("save frequency 60s");
                break;
            case "options__savefreq--5m":
                thingSaveFreq = "5m",
                    clearInterval(saveInter),
                    saveInter = setInterval(saveState, 3e5),
                    console.log("save frequency 5m");
                break;
            case "options__savefreq--30m":
                thingSaveFreq = "30m",
                    clearInterval(saveInter),
                    saveInter = setInterval(saveState, 18e5),
                    console.log("save frequency 30m")
        }
        options__savefreq30s.classList.remove("options__toggle--selected"),
            options__savefreq60s.classList.remove("options__toggle--selected"),
            options__savefreq5m.classList.remove("options__toggle--selected"),
            options__savefreq30m.classList.remove("options__toggle--selected"),
            e.classList.add("options__toggle--selected")
    }
}
function muteSound(e) {
    if ("options__sound--y" == e.id) {
        thingMuted = !1,
            console.log("sound on"),
        0 == globalVolume && (globalVolume = .2,
            optionsSlider.value = globalVolume,
            adjustVolume());
        for (var t = 0; t < soundArray.length; t++)
            soundArray[t].volume = globalVolume
    } else if ("options__sound--n" == e.id) {
        thingMuted = !0,
            console.log("sound off");
        for (var t = 0; t < soundArray.length; t++)
            soundArray[t].volume = 0
    }
    options__soundY.classList.remove("options__toggle--selected"),
        options__soundN.classList.remove("options__toggle--selected"),
        e.classList.add("options__toggle--selected")
}
function drawVis(e) {
    "options__drawvis--y" == e.id ? (thingdrawVis = !0,
        console.log("draw vis")) : "options__drawvis--n" == e.id && (thingdrawVis = !1,
        console.log("don't draw vis")),
        options__drawvisY.classList.remove("options__toggle--selected"),
        options__drawvisN.classList.remove("options__toggle--selected"),
        e.classList.add("options__toggle--selected")
}
function adjustVolume() {
    globalVolume = optionsSlider.value;
    for (var e = 0; e < soundArray.length; e++)
        soundArray[e].volume = globalVolume;
    globalVolume > 0 && thingMuted ? (thingMuted = !1,
        console.log("sound on"),
        options__soundY.classList.remove("options__toggle--selected"),
        options__soundN.classList.remove("options__toggle--selected"),
        options__soundY.classList.add("options__toggle--selected")) : 0 == globalVolume && (thingMuted = !0,
        console.log("sound off"),
        options__soundY.classList.remove("options__toggle--selected"),
        options__soundN.classList.remove("options__toggle--selected"),
        options__soundN.classList.add("options__toggle--selected"))
}
function saveState() {
    if (!gotApproachEventHorizon) {
        saveExists = !0,
            localStorage.setItem("saveExists", saveExists),
            localStorage.setItem("shipName", shipName),
            localStorage.setItem("prevAngle", prevAngle);
        var e = initDate.getFullYear()
            , t = initDate.getMonth()
            , a = initDate.getDate()
            , s = e
            , n = n || "0";
        s += "";
        var e = s.length >= 4 ? s : new Array(4 - s.length + 1).join(n) + s
            , s = t + 1
            , n = n || "0";
        s += "";
        var t = s.length >= 2 ? s : new Array(2 - s.length + 1).join(n) + s
            , s = a
            , n = n || "0";
        s += "";
        var a = s.length >= 2 ? s : new Array(2 - s.length + 1).join(n) + s
            , i = e + "-" + t + "-" + a;
        localStorage.setItem("initDate", i);
        var e = realDate.getFullYear()
            , t = realDate.getMonth()
            , a = realDate.getDate()
            , s = e
            , n = n || "0";
        s += "";
        var e = s.length >= 4 ? s : new Array(4 - s.length + 1).join(n) + s
            , s = t + 1
            , n = n || "0";
        s += "";
        var t = s.length >= 2 ? s : new Array(2 - s.length + 1).join(n) + s
            , s = a
            , n = n || "0";
        s += "";
        var a = s.length >= 2 ? s : new Array(2 - s.length + 1).join(n) + s
            , o = e + "-" + t + "-" + a;
        localStorage.setItem("realDate", o),
            Object.keys(planetOne).forEach(function(e, t) {
                localStorage.setItem("planetOne_" + e, planetOne[e])
            }),
            Object.keys(userBody).forEach(function(e, t) {
                localStorage.setItem("userBody_" + e, userBody[e])
            });
        for (var r = !1, l = !1, d = 0; d < physicsBodies.length; d++)
            "ship" == physicsBodies[d].type && (r = !0),
            "pod" == physicsBodies[d].type && (l = !0);
        localStorage.setItem("userBodyinArray", r),
            localStorage.setItem("userPodinArray", l),
        gotLandship && Object.keys(userPod).forEach(function(e, t) {
            localStorage.setItem("userPod_" + e, userPod[e])
        });
        for (var c = [], p = !1, d = 0; d < physicsBodies2.length; d++)
            switch (c.push(physicsBodies2[d].planetActualName),
                physicsBodies2[d].planetActualName) {
                case "sol":
                    Object.keys(physicsBodies2[d]).forEach(function(e, t) {
                        localStorage.setItem("sol_" + e, physicsBodies2[d][e])
                    });
                    break;
                case "earth":
                    Object.keys(physicsBodies2[d]).forEach(function(e, t) {
                        localStorage.setItem("earth_" + e, physicsBodies2[d][e])
                    }),
                        p = !0;
                    break;
                case "mercury":
                    Object.keys(physicsBodies2[d]).forEach(function(e, t) {
                        localStorage.setItem("mercury_" + e, physicsBodies2[d][e])
                    });
                    break;
                case "venus":
                    Object.keys(physicsBodies2[d]).forEach(function(e, t) {
                        localStorage.setItem("venus_" + e, physicsBodies2[d][e])
                    });
                    break;
                case "mars":
                    Object.keys(physicsBodies2[d]).forEach(function(e, t) {
                        localStorage.setItem("mars_" + e, physicsBodies2[d][e])
                    });
                    break;
                case "jupiter":
                    Object.keys(physicsBodies2[d]).forEach(function(e, t) {
                        localStorage.setItem("jupiter_" + e, physicsBodies2[d][e])
                    });
                    break;
                case "saturn":
                    Object.keys(physicsBodies2[d]).forEach(function(e, t) {
                        localStorage.setItem("saturn_" + e, physicsBodies2[d][e])
                    });
                    break;
                case "uranus":
                    Object.keys(physicsBodies2[d]).forEach(function(e, t) {
                        localStorage.setItem("uranus_" + e, physicsBodies2[d][e])
                    });
                    break;
                case "neptune":
                    Object.keys(physicsBodies2[d]).forEach(function(e, t) {
                        localStorage.setItem("neptune_" + e, physicsBodies2[d][e])
                    });
                    break;
                case "pluto":
                    Object.keys(physicsBodies2[d]).forEach(function(e, t) {
                        localStorage.setItem("pluto_" + e, physicsBodies2[d][e])
                    })
            }
        localStorage.setItem("sunCanvasPhysBods", c),
        p || Object.keys(sPlanetOne).forEach(function(e, t) {
            localStorage.setItem("sEarth_" + e, sPlanetOne[e])
        }),
            localStorage.setItem("power", power),
            localStorage.setItem("totalPowerProduced", totalPowerProduced),
            localStorage.setItem("powerLastTurn", powerLastTurn),
            localStorage.setItem("panelCount", itemSolar.currentCount);
        for (var u = [], h = 0; h < availableResearch.length; h++)
            u.push(availableResearch[h].el.id);
        localStorage.setItem("availableResearch", u);
        for (var g = [], h = 0; h < researchedStuff.length; h++)
            g.push(researchedStuff[h].el.id);
        localStorage.setItem("researchedStuff", g);
        for (var m = [], v = 0; v < probes.length; v++)
            Object.keys(probes[v]).forEach(function(e, t) {
                localStorage.setItem("probe" + v + "_" + e, probes[v][e])
            }),
                m.push("probe" + v);
        localStorage.setItem("probesSave", m);
        for (var S = [], v = 0; v < landedProbes.length; v++)
            Object.keys(landedProbes[v]).forEach(function(e, t) {
                localStorage.setItem("landedProbe" + v + "_" + e, landedProbes[v][e])
            }),
                S.push("landedProbe" + v);
        localStorage.setItem("landedProbesSave", S);
        for (var f = [], v = 0; v < spudniks.length; v++)
            Object.keys(spudniks[v]).forEach(function(e, t) {
                localStorage.setItem("spudnik" + v + "_" + e, spudniks[v][e])
            }),
                f.push("spudnik" + v);
        localStorage.setItem("spudniksSave", f);
        for (var _ = [], v = 0; v < potatoPlants.length; v++)
            Object.keys(potatoPlants[v]).forEach(function(e, t) {
                localStorage.setItem("potatoPlant" + v + "_" + e, potatoPlants[v][e])
            }),
                _.push("potatoPlant" + v);
        localStorage.setItem("potatoPlantsSave", _);
        for (var w = [], v = 0; v < landedPotatoPlants.length; v++)
            Object.keys(landedPotatoPlants[v]).forEach(function(e, t) {
                localStorage.setItem("landedPotatoPlant" + v + "_" + e, landedPotatoPlants[v][e])
            }),
                w.push("landedPotatoPlant" + v);
        localStorage.setItem("landedPotatoPlantsSave", w);
        for (var y = [], v = 0; v < taterTowers.length; v++)
            Object.keys(taterTowers[v]).forEach(function(e, t) {
                localStorage.setItem("taterTower" + v + "_" + e, taterTowers[v][e])
            }),
                y.push("taterTower" + v);
        localStorage.setItem("taterTowersSave", y);
        for (var k = [], v = 0; v < landedTaterTowers.length; v++)
            Object.keys(landedTaterTowers[v]).forEach(function(e, t) {
                localStorage.setItem("landedTaterTower" + v + "_" + e, landedTaterTowers[v][e])
            }),
                k.push("landedTaterTower" + v);
        localStorage.setItem("landedTaterTowersSave", k);
        for (var P = [], v = 0; v < spudguns.length; v++)
            Object.keys(spudguns[v]).forEach(function(e, t) {
                localStorage.setItem("spudgun" + v + "_" + e, spudguns[v][e])
            }),
                P.push("spudgun" + v);
        localStorage.setItem("spudgunsSave", P);
        for (var b = [], v = 0; v < launchers.length; v++)
            Object.keys(launchers[v]).forEach(function(e, t) {
                localStorage.setItem("launcher" + v + "_" + e, launchers[v][e])
            }),
                b.push("launcher" + v);
        localStorage.setItem("launchersSave", b);
        for (var I = [], h = 0; h < lockedItems.length; h++)
            I.push(lockedItems[h].el.id);
        localStorage.setItem("lockedItems", I);
        for (var x = [], B = [], C = [], h = 0; h < availableItems.length; h++)
            x.push(availableItems[h].el.id),
                B.push(availableItems[h].currentCost),
                C.push(availableItems[h].currentCount);
        localStorage.setItem("availableItems", x),
            localStorage.setItem("availableItemsCost", B),
            localStorage.setItem("availableItemsCount", C);
        for (var L = 0; L < eventLogMessages.length; L++)
            localStorage.setItem("eventLogMessages_" + L, eventLogMessages[L]);
        localStorage.setItem("queuedLogs", queuedLogs.length);
        for (var q = 0; q < queuedLogs.length; q++)
            localStorage.setItem("queuedLog_" + q, queuedLogs[q][0]),
                localStorage.setItem("queuedLogT_" + q, queuedLogs[q][1]);
        localStorage.setItem("status__gravSrc--disp", document.getElementById("status__gravSrc").style.display),
            localStorage.setItem("status__atmosphere--disp", document.getElementById("status__atmosphere").style.display),
            localStorage.setItem("status__inhabitantsBar--disp", document.getElementById("status__inhabitantsBar").style.display),
            localStorage.setItem("status__inhabitants--disp", document.getElementById("status__inhabitants").style.display),
            localStorage.setItem("status__sunMassBar--disp", document.getElementById("status__sunMassBar").style.display),
            localStorage.setItem("status__sunMass--disp", document.getElementById("status__sunMass").style.display),
            localStorage.setItem("status__gravSrc--cont", document.getElementById("status__gravSrc").innerHTML),
            localStorage.setItem("status__atmosphere--cont", document.getElementById("status__atmosphere").innerHTML),
            localStorage.setItem("status__inhabitantsBar--cont", document.getElementById("status__inhabitantsBar").innerHTML),
            localStorage.setItem("status__inhabitants--cont", document.getElementById("status__inhabitants").innerHTML),
            localStorage.setItem("status__sunMassBar--cont", document.getElementById("status__sunMassBar").innerHTML),
            localStorage.setItem("status__sunMass--cont", document.getElementById("status__sunMass").innerHTML),
            localStorage.setItem("atmosphere__data", atmosphere__data),
            localStorage.setItem("inhabitants__data", inhabitants__data),
            localStorage.setItem("inhabitants__started", inhabitants__started),
            localStorage.setItem("inhabitants__discovered", inhabitants__discovered),
            localStorage.setItem("blackHoleShrunk", blackHoleShrunk),
            localStorage.setItem("blackHoleMade", blackHoleMade),
            localStorage.setItem("solShrinkT", solShrinkT),
            localStorage.setItem("solShrinkB", solShrinkB),
            localStorage.setItem("solShrinkC", solShrinkC),
            localStorage.setItem("solShrinkD", solShrinkD),
            localStorage.setItem("tmBootLog", tmBootLog),
            localStorage.setItem("deBootLog", deBootLog),
            localStorage.setItem("inBootLog", inBootLog),
            localStorage.setItem("cpBootLog", cpBootLog),
            localStorage.setItem("hintDone", hintDone),
            localStorage.setItem("planetOneRad", planetOneRad),
            localStorage.setItem("solStartRad", solStartRad),
            localStorage.setItem("totalSolarProduced", totalSolarProduced),
            localStorage.setItem("walkerSolarTracker", walkerSolarTracker),
            localStorage.setItem("landingStage", landingStage),
            localStorage.setItem("boughtSpudGuns", boughtSpudGuns),
            localStorage.setItem("boughtPotatoLaunchers", boughtPotatoLaunchers),
            localStorage.setItem("shipLanded", shipLanded),
            localStorage.setItem("storySaid", storySaid),
            localStorage.setItem("shipStatusSpan", shipStatusSpan.innerHTML),
            localStorage.setItem("planetBoostersNeedCreate", planetBoostersNeedCreate),
            localStorage.setItem("potatoPlantUnlock", potatoPlantUnlock),
            localStorage.setItem("taterTowerUnlock", taterTowerUnlock),
            localStorage.setItem("spudGunUnlock", spudGunUnlock),
            localStorage.setItem("potatoLauncherUnlock", potatoLauncherUnlock),
            localStorage.setItem("shipReleaseFailSafe", shipReleaseFailSafe),
            localStorage.setItem("shipLandFailSafe", shipLandFailSafe),
            localStorage.setItem("thingMuted", thingMuted),
            localStorage.setItem("thingAutoSave", thingAutoSave),
            localStorage.setItem("thingSaveFreq", thingSaveFreq),
            localStorage.setItem("thingdrawVis", thingdrawVis),
            localStorage.setItem("globalVolume", globalVolume),
            localStorage.setItem("user_id", USER_ID),
            lastSavedDate = new Date,
            lastSavedSpan.innerHTML = " on " + lastSavedDate.getFullYear() + "-" + lastSavedDate.getMonth() + "-" + lastSavedDate.getDate() + " at " + lastSavedDate.getHours() + ":" + lastSavedDate.getMinutes() + ":" + lastSavedDate.getSeconds(),
            localStorage.setItem("lastSavedDate", lastSavedDate),
            console.log("saved at " + lastSavedSpan.innerHTML)
    }
}
function deleteSave() {
    saveExists = !1,
        localStorage.clear(),
        lastSavedSpan.innerHTML = " never",
        console.log("deleted")
}
!function(e) {
    function t() {
        do
            o == r ? o = 0 : o++;
        while (i.hasOwnProperty(o));return o
    }
    try {
        var a = new Blob(["var fakeIdToId = {};onmessage = function (event) {	var data = event.data,		name = data.name,		fakeId = data.fakeId,		time;	if(data.hasOwnProperty('time')) {		time = data.time;	}	switch (name) {		case 'setInterval':			fakeIdToId[fakeId] = setInterval(function () {				postMessage({fakeId: fakeId});			}, time);			break;		case 'clearInterval':			if (fakeIdToId.hasOwnProperty (fakeId)) {				clearInterval(fakeIdToId[fakeId]);				delete fakeIdToId[fakeId];			}			break;		case 'setTimeout':			fakeIdToId[fakeId] = setTimeout(function () {				postMessage({fakeId: fakeId});				if (fakeIdToId.hasOwnProperty (fakeId)) {					delete fakeIdToId[fakeId];				}			}, time);			break;		case 'clearTimeout':			if (fakeIdToId.hasOwnProperty (fakeId)) {				clearTimeout(fakeIdToId[fakeId]);				delete fakeIdToId[fakeId];			}			break;	}}"]);
        e = window.URL.createObjectURL(a)
    } catch (s) {}
    var n, i = {}, o = 0, r = 2147483647, l = "HackTimer.js by turuslan: ";
    if ("undefined" != typeof Worker)
        try {
            n = new Worker(e),
                window.setInterval = function(e, a) {
                    var s = t();
                    return i[s] = {
                        callback: e,
                        parameters: Array.prototype.slice.call(arguments, 2)
                    },
                        n.postMessage({
                            name: "setInterval",
                            fakeId: s,
                            time: a
                        }),
                        s
                }
                ,
                window.clearInterval = function(e) {
                    i.hasOwnProperty(e) && (delete i[e],
                        n.postMessage({
                            name: "clearInterval",
                            fakeId: e
                        }))
                }
                ,
                window.setTimeout = function(e, a) {
                    var s = t();
                    return i[s] = {
                        callback: e,
                        parameters: Array.prototype.slice.call(arguments, 2),
                        isTimeout: !0
                    },
                        n.postMessage({
                            name: "setTimeout",
                            fakeId: s,
                            time: a
                        }),
                        s
                }
                ,
                window.clearTimeout = function(e) {
                    i.hasOwnProperty(e) && (delete i[e],
                        n.postMessage({
                            name: "clearTimeout",
                            fakeId: e
                        }))
                }
                ,
                n.onmessage = function(e) {
                    var t, a, s, n = e.data, o = n.fakeId;
                    if (i.hasOwnProperty(o) && (t = i[o],
                            s = t.callback,
                            a = t.parameters,
                        t.hasOwnProperty("isTimeout") && t.isTimeout && delete i[o]),
                        "string" == typeof s)
                        try {
                            s = new Function(s)
                        } catch (r) {
                            console.log(l + "Error parsing callback code string: ", r)
                        }
                    "function" == typeof s && s.apply(window, a)
                }
                ,
                n.onerror = function(e) {
                    console.log(e)
                }
        } catch (s) {
            console.log(l + "Initialisation failed"),
                console.error(s)
        }
    else
        console.log(l + "Initialisation failed - HTML5 Web Worker is not supported")
}("HackTimerWorker.js");
var isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1
    , isEdge = !1
    , isIE = !window.ActiveXObject && "ActiveXObject"in window;
"Netscape" == navigator.appName && (isEdge = navigator.appVersion.indexOf("Edge") > -1);
var logContainer = document.getElementById("eventLog__container")
    , manufactureContainer = document.getElementById("manufacture__container")
    , developContainer = document.getElementById("develop__container")
    , shipNameSpan = document.getElementById("ship__name")
    , shipStatusSpan = document.getElementById("ship__status")
    , shipName = shipNameSpan.value
    , editIcon = document.getElementById("edit__icon")
    , updateShipName = function() {
    shipName = shipNameSpan.value
}
    , soundArray = []
    , globalVolume = .3;
shipNameSpan.oninput = updateShipName,
    editIcon.onclick = function() {
        shipNameSpan.select()
    }
;
var confirmText = function(e) {
        13 == e.keyCode && shipNameSpan.blur()
    }
    ;
shipNameSpan.addEventListener("keyup", confirmText),
    ga("create", "UA-43853280-4", "auto");
var mobDisc = document.getElementById("mobile-disclaimer");
window.innerWidth < 769 ? (mobDisc.style.display = "flex",
    addEventListener("resize", function() {
        window.innerWidth > 769 && null != mobDisc && (mobDisc.parentNode.removeChild(mobDisc),
            mobDisc = null )
    })) : mobDisc.parentNode.removeChild(mobDisc);
var oldLogcontainer;
if ((isFirefox || isEdge) && (!function(e, t) {
        function a(e) {
            e.hasOwnProperty("data-simple-scrollbar") || Object.defineProperty(e, "data-simple-scrollbar", new SimpleScrollbar(e))
        }
        function s(e, a) {
            function s(e) {
                var t = e.pageY - i;
                i = e.pageY,
                    o(function() {
                        a.el.scrollTop += t / a.scrollRatio
                    })
            }
            function n() {
                e.classList.remove("ss-grabbed"),
                    t.body.classList.remove("ss-grabbed"),
                    t.removeEventListener("mousemove", s),
                    t.removeEventListener("mouseup", n)
            }
            var i;
            e.addEventListener("mousedown", function(a) {
                return i = a.pageY,
                    e.classList.add("ss-grabbed"),
                    t.body.classList.add("ss-grabbed"),
                    t.addEventListener("mousemove", s),
                    t.addEventListener("mouseup", n),
                    !1
            })
        }
        function n(e) {
            for (this.target = e,
                     this.bar = '<div class="ss-scroll">',
                     this.wrapper = t.createElement("div"),
                     this.wrapper.setAttribute("class", "ss-wrapper"),
                     this.el = t.createElement("div"),
                     this.el.setAttribute("class", "ss-content"),
                     this.wrapper.appendChild(this.el); this.target.firstChild; )
                this.el.appendChild(this.target.firstChild);
            this.target.appendChild(this.wrapper),
                this.target.insertAdjacentHTML("beforeend", this.bar),
                this.bar = this.target.lastChild,
                s(this.bar, this),
                this.moveBar(),
                this.el.addEventListener("scroll", this.moveBar.bind(this)),
                this.el.addEventListener("mouseenter", this.moveBar.bind(this)),
                this.target.classList.add("ss-container");
            var a = window.getComputedStyle(e);
            "0px" === a.height && "0px" !== a["max-height"] && (e.style.height = a["max-height"])
        }
        function i() {
            for (var e = t.querySelectorAll("*[ss-container]"), s = 0; s < e.length; s++)
                a(e[s])
        }
        var o = e.requestAnimationFrame || e.setImmediate || function(e) {
                    return setTimeout(e, 0)
                }
            ;
        n.prototype = {
            moveBar: function(e) {
                var t = this.el.scrollHeight
                    , a = this.el.clientHeight
                    , s = this;
                this.scrollRatio = a / t,
                    o(function() {
                        1 === s.scrollRatio ? s.bar.classList.add("ss-hidden") : (s.bar.classList.remove("ss-hidden"),
                            s.bar.style.cssText = "height:" + 100 * s.scrollRatio + "%; top:" + s.el.scrollTop / t * 100 + "%;right:-" + (s.target.clientWidth - s.bar.clientWidth) + "px;")
                    })
            }
        },
            t.addEventListener("DOMContentLoaded", i),
            n.initEl = a,
            n.initAll = i,
            e.SimpleScrollbar = n
    }(window, document),
        SimpleScrollbar.initEl(logContainer),
        SimpleScrollbar.initEl(manufactureContainer),
        SimpleScrollbar.initEl(developContainer),
        oldLogcontainer = logContainer,
        logContainer.childNodes[0].childNodes[0].id = "eventLog__container",
        logContainer.style.paddingTop = "0px",
        logContainer.style.paddingBottom = "0px",
        logContainer.style.height = "245px",
        logContainer.id = "",
        logContainer.style.overflowY = "hidden",
        logContainer = document.getElementById("eventLog__container"),
        logContainer.style.paddingBottom = "35px",
        manufactureContainer.childNodes[0].childNodes[0].id = "manufacture__container",
        manufactureContainer.id = "",
        manufactureContainer.style.overflowY = "hidden",
        manufactureContainer = document.getElementById("manufacture__container"),
        developContainer.childNodes[0].childNodes[0].id = "develop__container",
        developContainer.id = "",
        developContainer.style.overflowY = "hidden",
        developContainer = document.getElementById("develop__container"),
        window.innerHeight < 721 ? oldLogcontainer.style.height = "229px" : oldLogcontainer.style.height = "245px"),
        isIE) {
    var vidDisc = document.createElement("div");
    vidDisc.classList.add("mobile-disclaimer"),
        document.body.appendChild(vidDisc),
        vidDisc.style.display = "flex";
    var vidDiscInner = document.createElement("div");
    vidDiscInner.classList.add("mobile-disclaimer__inner"),
        vidDisc.appendChild(vidDiscInner);
    var vidDiscP = document.createElement("div");
    thingMuted = !0,
        vidDiscP.innerHTML = "Looks like you're using Internet Explorer, which isn't great for flying spaceships.<br/>Come back in a different browser aye?",
        vidDiscInner.appendChild(vidDiscP)
}
var inactive__popup = document.getElementById("inactive-tab")
    , screenFocus = !0
    , screenFocusReal = !0;
window.onfocus = onFocus,
    window.onblur = onBlur,
    document.addEventListener("touchstart", function(e) {
        e.preventDefault()
    }, !1);
for (var angleBetweenPoints = function(e, t) {
    return Math.abs(Math.atan2(e[1], e[0]) - Math.atan2(t[1], t[0]))
}
         , inShadow = function(e, t, a, s, n) {
        var i = ((a[1] - t[1]) * e[0] - (a[0] - t[0]) * e[1] + a[0] * t[1] - a[1] * t[0]) / (((a[1] - t[1]) * (a[1] - t[1]) + (a[0] - t[0]) * (a[0] - t[0])) / ((a[1] - t[1]) * (a[1] - t[1]) + (a[0] - t[0]) * (a[0] - t[0])))
            , o = angleBetweenPoints([n.pos[0], n.pos[1]], [a[0], a[1]]);
        return 2 * s > i / 1e3 && i / 1e3 > -(2 * s) && 1 > o
    }
         , manufactureTooltip = document.getElementById("manufacture__tooltip"), wrapperMain = document.getElementById("wrapper__main"), lockedItems = [], availableItems = [], spudMass = 3, taterMass = 9, spudMassMultiplier = 1, taterMassMultiplier = 1, solarCost = 15, potatoCost = 100, probeCost = 600, spudnikCost = 9700, potatoPlantCost = 144e3, taterTowerCost = 23e5, spudGunCost = 21e6, potatoLauncherCost = 11e7, solarPower = .01, potatoPower = .1, probePower = .8, spudnikPower = 4.2, potatoPlantPower = 23, taterTowerPower = 160, spudGunPower = 800, potatoLauncherPower = 4200, solarBlurb = "They need a bit of love.<br/><span id='powerGain'>1w/10secs</span> while in sunlight", potatoBlurb = "Genetically modified for more power output.<br/><span id='powerGain'>1</span>w/sec", probeBlurb = "Modified spud for planetary harvesting.<br/><span id='powerGain'>8</span>w/sec | 1.5x production in free fall", spudnikBlurb = "The first potato satellite.<br/><span id='powerGain'>42</span>w/sec", potatoPlantBlurb = "Harvests power from the planet surface.<br/><span id='powerGain'>230</span>w/sec", taterTowerBlurb = "Mass-produce power potatoes.<br/><span id='powerGain'>1,400</span>w/sec", spudGunBlurb = "Spud mass is based on TOTAL item count<br/><span id='powerGain'>8</span>Kw/sec | 1 spud with <span id='spudGain'>" + spudMass * spudMassMultiplier + "</span> mass/10secs", potatoLauncherBlurb = "Tater mass is based on TOTAL item count<br/><span id='powerGain'>42</span>Kw/sec | 1 tater with <span id='spudGain'>" + taterMass * taterMassMultiplier + "</span> mass/12secs", solarSound = [], ks = 0; 5 > ks; ks++)
    solarSound[ks] = new Audio("audio/items/solarpanel.mp3"),
        solarSound[ks].volume = .5,
        soundArray.push(solarSound[ks]);
for (var potatoSound = [], ks = 0; 5 > ks; ks++)
    potatoSound[ks] = new Audio("audio/items/potato.mp3"),
        potatoSound[ks].volume = .5,
        soundArray.push(potatoSound[ks]);
for (var probeSound = [], ks = 0; 5 > ks; ks++)
    probeSound[ks] = new Audio("audio/items/probetato.mp3"),
        probeSound[ks].volume = .5,
        soundArray.push(probeSound[ks]);
for (var spudnikSound = [], ks = 0; 5 > ks; ks++)
    spudnikSound[ks] = new Audio("audio/items/spudnik.mp3"),
        spudnikSound[ks].volume = .5,
        soundArray.push(spudnikSound[ks]);
for (var potatoPlantSound = [], ks = 0; 5 > ks; ks++)
    potatoPlantSound[ks] = new Audio("audio/items/plant.mp3"),
        potatoPlantSound[ks].volume = .5,
        soundArray.push(potatoPlantSound[ks]);
for (var taterTowerSound = [], ks = 0; 5 > ks; ks++)
    taterTowerSound[ks] = new Audio("audio/items/tower.mp3"),
        taterTowerSound[ks].volume = .5,
        soundArray.push(taterTowerSound[ks]);
for (var spudGunSound = [], ks = 0; 5 > ks; ks++)
    spudGunSound[ks] = new Audio("audio/items/gun.mp3"),
        spudGunSound[ks].volume = .5,
        soundArray.push(spudGunSound[ks]);
for (var potatoLauncherSound = [], ks = 0; 5 > ks; ks++)
    potatoLauncherSound[ks] = new Audio("audio/items/launcher.mp3"),
        potatoLauncherSound[ks].volume = .5,
        soundArray.push(potatoLauncherSound[ks]);
for (var icon__solar = document.getElementById("icon__solar"), icon__potato = document.getElementById("icon__potato"), icon__probe = document.getElementById("icon__probe"), icon__spudnik = document.getElementById("icon__spudnik"), icon__potatoplant = document.getElementById("icon__potatoplant"), icon__tatertower = document.getElementById("icon__tatertower"), icon__spudgun = document.getElementById("icon__spudgun"), icon__potatolauncher = document.getElementById("icon__potatolauncher"), icon__cleanPanels = document.getElementById("icon__cleanPanels"), icon__polishedPanels = document.getElementById("icon__polishedPanels"), icon__goldenPanels = document.getElementById("icon__goldenPanels"), icon__probetatoFoil = document.getElementById("icon__probetatoFoil"), icon__solarAmbience = document.getElementById("icon__solarAmbience"), icon__podModule = document.getElementById("icon__podModule"), icon__landship = document.getElementById("icon__landship"), icon__systemView = document.getElementById("icon__systemView"), icon__planetBoosters = document.getElementById("icon__planetBoosters"), icon__approachEventHorizon = document.getElementById("icon__approachEventHorizon"), icon__kinetigen01 = document.getElementById("icon__kinetigen01"), icon__kinetigen02 = document.getElementById("icon__kinetigen02"), icon__kinetigen03 = document.getElementById("icon__kinetigen03"), icon__kinetigen04 = document.getElementById("icon__kinetigen04"), icon__landshipAgain = document.getElementById("icon__landshipAgain"), icon__spudnikUpgrade = document.getElementById("icon__spudnikUpgrade"), icon__potatoUpgrade = document.getElementById("icon__potatoUpgrade"), icon__probetatoUpgrade = document.getElementById("icon__probetatoUpgrade"), icon__potatoplantUpgrade = document.getElementById("icon__potatoplantUpgrade"), icon__taterUpgrade = document.getElementById("icon__taterUpgrade"), icon__spudgunUpgrade = document.getElementById("icon__spudgunUpgrade"), icon__potatoLauncherUpgrade = document.getElementById("icon__potatoLauncherUpgrade"), icon__irishPride = document.getElementById("icon__irishPride"), spudGunRate = .01, taterGunRate = .008, boughtSpudGuns = !1, boughtPotatoLaunchers = !1, ItemConstruct = function(e, t, a, s, n, i, o, r, l, d, c) {
    this.el = document.createElement("div"),
        this.el.id = e,
        this.el.className += "manufacture__item--locked",
        manufactureContainer.appendChild(this.el),
        this.el.appendChild(c),
        c.style.display = "block",
        this.headerSpan = document.createElement("div"),
        this.headerSpan.id = "name",
        this.headerSpan.className += "manufacture__name",
        this.el.appendChild(this.headerSpan),
        this.headerSpan.innerHTML = s,
        this.costLineSpan = document.createElement("div"),
        this.costLineSpan.id = "costLine",
        this.costLineSpan.className += "manufacture__cost",
        this.el.appendChild(this.costLineSpan),
        this.costLineSpan.innerHTML = "<span id='cost'>" + numberWithCommas(t) + "</span> power",
        this.costSpan = this.el.querySelector("#cost"),
        this.countSpan = document.createElement("div"),
        this.countSpan.id = "count",
        this.countSpan.className += "manufacture__count",
        this.el.appendChild(this.countSpan),
        this.countSpan.innerHTML = l,
        this.sound = d,
        this.soundInt = 0,
        this.playSound = function() {
            thingMuted || (this.sound[this.soundInt].currentTime = 0,
                this.sound[this.soundInt].play(),
                this.soundInt++,
            this.soundInt >= this.sound.length && (this.soundInt = 0))
        }
        ,
        this.header = a,
        this.initialCost = t,
        this.currentCost = t,
        this.currentCount = l,
        this.resource = n,
        this.gain = i,
        this.tooltip = o,
        this.conditions = r,
        this.revealed = !1,
        this.reveal = function() {
            if (this.headerSpan.innerHTML = this.header,
                    this.countSpan.style.display = "inline",
                1 == this.conditions && this.el.addEventListener("click", buildItem),
                    this.el.className = "manufacture__item",
                    this.costLineSpan.style.color = "#00ffc2",
                    this.revealed = !0,
                    this.tooltipSpan = document.createElement("div"),
                    this.tooltipSpan.id = "tooltip",
                    this.tooltipSpan.classList.add("manufacture__tooltip"),
                    this.el.insertBefore(this.tooltipSpan, this.el.childNodes[0]),
                    this.tooltipSpan.innerHTML = this.tooltip,
                    this.powerSpan = this.el.querySelector("#powerGain"),
                    this.spudSpan = this.el.querySelector("#spudGain"),
                "item__solar" == this.el.id)
                if (gotIrishPride)
                    if (20 * this.gain < 1) {
                        var e = 1 / (20 * this.gain);
                        this.powerSpan.innerHTML = "1w/" + e.toFixed(1) + "secs"
                    } else
                        this.powerSpan.innerHTML = 20 * this.gain + "w/sec";
                else if (10 * this.gain < 1) {
                    var e = 1 / (10 * this.gain);
                    this.powerSpan.innerHTML = "1w/" + e.toFixed(1) + "secs"
                } else
                    this.powerSpan.innerHTML = 10 * this.gain + "w/sec";
            else
                "item__spudGun" == this.el.id || "item__potatoLauncher" == this.el.id ? gotIrishPride ? this.powerSpan.innerHTML = (20 * this.gain / 1e3).toFixed(0) : this.powerSpan.innerHTML = (10 * this.gain / 1e3).toFixed(0) : gotIrishPride ? this.powerSpan.innerHTML = numberWithCommas(20 * this.gain) : this.powerSpan.innerHTML = numberWithCommas(10 * this.gain);
            this.tooltipBg = document.createElement("div"),
                this.tooltipBg.className += "manufacture__tooltip--bg",
                this.el.insertBefore(this.tooltipBg, this.tooltipSpan.nextSibling),
                this.costLineSpan.classList.add("manufacture__cost--animate");
            lockedItems.shift();
            availableItems.push(this)
        }
}
         , buildItem = function() {
        for (var e = 0; e < availableItems.length; e++)
            if (availableItems[e].el.id == this.id) {
                availableItems[e].el.id;
                var t = availableItems[e]
            }
        if (power >= t.currentCost && 1 == t.conditions) {
            if (gotPlanetBoosters) {
                for (var a = 0, s = 0; s < availableItems.length; s++)
                    "item__spudGun" != availableItems[s].el.id && "item__potatoLauncher" != availableItems[s].el.id && (a += availableItems[s].currentCount);
                void 0 != itemSpudGun && 1 == itemSpudGun.revealed && (spudMassMultiplier = (6 * a).toFixed(0),
                    itemSpudGun.spudSpan.innerHTML = spudMass * spudMassMultiplier),
                void 0 != itemPotatoLauncher && 1 == itemPotatoLauncher.revealed && (taterMassMultiplier = (6 * a).toFixed(0),
                    itemPotatoLauncher.spudSpan.innerHTML = taterMass * taterMassMultiplier)
            }
            power -= t.currentCost,
                t.playSound(),
                t.currentCount++;
            var n = 1.15;
            switch (t.currentCost >= 2e3 * t.initialCost && (n = 1.1),
            t.currentCost >= 3e4 * t.initialCost && (n = 1.05),
            t.currentCost >= 1e5 * t.initialCost && (n = 1.02),
            t.currentCost >= 15e4 * t.initialCost && (n = 1.01),
                t.currentCost = (t.currentCost * n).toFixed(0),
                t.costSpan.innerHTML = numberWithCommas(t.currentCost),
                t.countSpan.innerHTML = numberWithCommas(t.currentCount),
                updateResources(),
                updateResourceGain(),
                t.el.id) {
                case "item__solar":
                    kinetigenAddPanel(),
                    null == cleanPanels && itemSolar.currentCount >= 3 && createResearch("cleanPanels"),
                    1 == itemSolar.currentCount && (ga("set", {
                        userId: USER_ID,
                        dimension1: shipName,
                        dimension2: USER_ID,
                        metric4: 1
                    }),
                        ga("send", "pageview"),
                        ga("set", {
                            metric4: 0
                        }));
                    break;
                case "item__potato":
                    null == potatoUpgrade && itemPotato.currentCount >= 3 && createResearch("potatoUpgrade"),
                    1 == itemPotato.currentCount && (ga("set", {
                        userId: USER_ID,
                        dimension1: shipName,
                        dimension2: USER_ID,
                        metric5: 1
                    }),
                        ga("send", "pageview"),
                        ga("set", {
                            metric5: 0
                        }));
                    break;
                case "item__probe":
                    createProbe(),
                    1 == itemProbe.currentCount && 0 == atmosphere__data && (ga("set", {
                        userId: USER_ID,
                        dimension1: shipName,
                        dimension2: USER_ID,
                        metric6: 1
                    }),
                        ga("send", "pageview"),
                        ga("set", {
                            metric6: 0
                        }));
                    break;
                case "item__spudnik":
                    null == spudnikUpgrade && itemSpudnik.currentCount >= 2 && createResearch("spudnikUpgrade"),
                        createSpudnik(),
                    1 == itemSpudnik.currentCount && (ga("set", {
                        userId: USER_ID,
                        dimension1: shipName,
                        dimension2: USER_ID,
                        metric7: 1
                    }),
                        ga("send", "pageview"),
                        ga("set", {
                            metric7: 0
                        }));
                    break;
                case "item__potatoPlant":
                    null == potatoPlantUpgrade && itemPotatoPlant.currentCount >= 2 && createResearch("potatoPlantUpgrade"),
                        createPotatoPlant(),
                    1 == itemPotatoPlant.currentCount && (ga("set", {
                        userId: USER_ID,
                        dimension1: shipName,
                        dimension2: USER_ID,
                        metric8: 1
                    }),
                        ga("send", "pageview"),
                        ga("set", {
                            metric8: 0
                        }));
                    break;
                case "item__taterTower":
                    null == taterTowerUpgrade && itemTaterTower.currentCount >= 2 && createResearch("taterTowerUpgrade"),
                        createTaterTower(),
                    1 == itemTaterTower.currentCount && (ga("set", {
                        userId: USER_ID,
                        dimension1: shipName,
                        dimension2: USER_ID,
                        metric18: 1
                    }),
                        ga("send", "pageview"),
                        ga("set", {
                            metric18: 0
                        }));
                    break;
                case "item__spudGun":
                    null == spudGunUpgrade && itemSpudGun.currentCount >= 2 && createResearch("spudGunUpgrade"),
                        createSpudgun(),
                    1 == itemSpudGun.currentCount && (ga("set", {
                        userId: USER_ID,
                        dimension1: shipName,
                        dimension2: USER_ID,
                        metric9: 1
                    }),
                        ga("send", "pageview"),
                        ga("set", {
                            metric9: 0
                        }));
                    break;
                case "item__potatoLauncher":
                    null == potatoLauncherUpgrade && itemPotatoLauncher.currentCount >= 2 && createResearch("potatoLauncherUpgrade"),
                        createLauncher(),
                    1 == itemPotatoLauncher.currentCount && (ga("set", {
                        userId: USER_ID,
                        dimension1: shipName,
                        dimension2: USER_ID,
                        metric10: 1
                    }),
                        ga("send", "pageview"),
                        ga("set", {
                            metric10: 0
                        }))
            }
        }
        checkItems(),
            checkResearch()
    }
         , potatoPlantUnlock = !1, taterTowerUnlock = !1, spudGunUnlock = !1, potatoLauncherUnlock = !1, itemSolar, itemProbe, itemSpudnik, itemPotatoPlant, itemTaterTower, itemSpudGun, itemPotatoLauncher, developmentTooltip = document.getElementById("development__tooltip"), systViewButton = document.getElementById("center__header--syst"), planViewButton = document.getElementById("center__header--plan"), researchSound = [], researchNo = 1, researchInt = 0, ks = 0; 6 > ks; ks++)
    researchSound[ks] = new Audio("audio/research" + researchNo + ".mp3"),
        researchSound[ks].volume = .5,
        soundArray.push(researchSound[ks]),
        researchNo++,
    researchNo > 3 && (researchNo = 1);
var podLaunch__sound = new Audio("audio/pod/launch.mp3");
soundArray.push(podLaunch__sound);
var gotKinetigen01 = !1, gotKinetigen02 = !1, gotKinetigen03 = !1, gotKinetigen04 = !1, gotHeatshields = !1, gotParachutes = !1, gotSystView = !1, gotHopperHeatshields = !1, gotHopperLanding = !1, gotLandship = !1, gotLandshipAgain = !1, gotPlanetBoosters = !1, gotApproachEventHorizon = !1, gotCleanPanels = !1, gotPolishedPanels = !1, gotGoldenPanels = !1, gotSolarAmbience = !1, gotPotatoUpgrade = !1, gotProbetatoUpgrade = !1, gotSpudnikUpgrade = !1, gotPotatoPlantUpgrade = !1, gotTaterTowerUpgrade = !1, gotSpudGunUpgrade = !1, gotPotatoLauncherUpgrade = !1, gotIrishPride = !1, kinetigen01__cost = 200, kinetigen02__cost = 6e4, kinetigen03__cost = 2e5, kinetigen04__cost = 15e6, heatShields__cost = 500, parachutes__cost = 700, hopperHeatshields__cost = 3e6, hopperLanding__cost = 3e6, landship__cost = 1e6, systView__cost = 1e7, planetBoosters__cost = 15e6, approachEventHorizon__cost = 5e8, landshipAgain__cost = 10, cleanPanels__cost = 100, polishedPanels__cost = 1e4, goldenPanels__cost = 25e4, solarAmbience__cost = 2e3, potatoUpgrade__cost = 6e3, probetatoUpgrade__cost = 9e4, spudnikUpgrade__cost = 3e5, potatoPlantUpgrade__cost = 15e5, taterTowerUpgrade__cost = 103e5, spudGunUpgrade__cost = 1e8, potatoLauncherUpgrade__cost = 21e7, irishPride__cost = 15e7, cleanPanels = null , polishedPanels = null , goldenPanels = null , kinetigen01 = null , kinetigen02 = null , kinetigen03 = null , kinetigen04 = null , heatshields = null , parachutes = null , solarAmbience = null , systView = null , hopperHeatshields = null , hopperLanding = null , landship = null , landshipAgain = null , planetBoosters = null , approachEventHorizon = null , potatoUpgrade = null , probetatoUpgrade = null , spudnikUpgrade = null , potatoPlantUpgrade = null , taterTowerUpgrade = null , spudGunUpgrade = null , potatoLauncherUpgrade = null , irishPride = null , dataNeeded = 0, availableResearch = [], researchedStuff = [], shipReleaseFailSafe = !1, shipLandFailSafe = !1, ResearchConstruct = function(e, t, a, s, n, i) {
        this.el = document.createElement("div"),
            this.el.id = e,
            this.el.className += "manufacture__item--locked";
        for (var o = 999999999999, r = 0; r < availableResearch.length; r++)
            availableResearch[r].cost > t && availableResearch[r].cost < o && (o = availableResearch[r].el);
        999999999999 != o && developContainer.insertBefore(this.el, o),
        999999999999 == o && developContainer.appendChild(this.el),
            this.el.appendChild(i),
            i.style.display = "block",
            this.headerSpan = document.createElement("div"),
            this.headerSpan.id = "name",
            this.headerSpan.className += "manufacture__name",
            this.el.appendChild(this.headerSpan),
            this.headerSpan.innerHTML = a,
            this.costLineSpan = document.createElement("div"),
            this.costLineSpan.id = "costLine",
            this.costLineSpan.className += "manufacture__cost",
            this.costLineSpan.classList.add("manufacture__cost--animate"),
            this.el.appendChild(this.costLineSpan),
            this.costLineSpan.innerHTML = numberWithCommas(t) + " power",
            this.tooltipSpan = document.createElement("div"),
            this.tooltipSpan.id = "tooltip",
            this.tooltipSpan.classList.add("manufacture__tooltip"),
            this.el.insertBefore(this.tooltipSpan, this.el.childNodes[0]),
            this.tooltipSpan.innerHTML = n,
            this.tooltipBg = document.createElement("div"),
            this.tooltipBg.className += "manufacture__tooltip--bg",
            this.el.insertBefore(this.tooltipBg, this.tooltipSpan.nextSibling),
            this.header = a,
            this.cost = t,
            this.resource = s,
            this.tooltip = n,
            this.el.addEventListener("click", researchThing)
    }
    , researchThing = function(e, t) {
        for (var a, s = 0; s < availableResearch.length; s++)
            if (availableResearch[s].el.id == this.id || availableResearch[s].el.id == e) {
                availableResearch[s].el.id;
                var n = availableResearch[s];
                a = s
            }
        if (power >= n.cost || t) {
            switch (t || (power -= n.cost,
            thingMuted || (researchSound[researchInt].play(),
                researchInt++,
            researchInt >= researchSound.length && (researchInt = 0))),
                n.el.id) {
                case "cleanPanels":
                    if (gotCleanPanels = !0,
                            researchedStuff.push(cleanPanels),
                        t || (pushLog("Panels are looking presentable.<br/>3 watts every 10 seconds!"),
                            createResearch("solarAmbience"),
                            createResearch("polishedPanels")),
                            itemSolar.gain = .03,
                            gotIrishPride)
                        if (20 * itemSolar.gain < 1) {
                            var i = 1 / (20 * itemSolar.gain);
                            itemSolar.powerSpan.innerHTML = "1w/" + i.toFixed(1) + "secs"
                        } else
                            itemSolar.powerSpan.innerHTML = 20 * itemSolar.gain + "w/sec";
                    else if (10 * itemSolar.gain < 1) {
                        var i = 1 / (10 * itemSolar.gain);
                        itemSolar.powerSpan.innerHTML = "1w/" + i.toFixed(1) + "secs"
                    } else
                        itemSolar.powerSpan.innerHTML = 10 * itemSolar.gain + "w/sec";
                    availableResearch.splice(a, 1);
                    break;
                case "polishedPanels":
                    if (gotPolishedPanels = !0,
                            researchedStuff.push(polishedPanels),
                        t || (pushLog("Panels are looking dashing.<br/>Double the efficiency."),
                            createResearch("goldenPanels")),
                            itemSolar.gain = .1,
                            gotIrishPride)
                        if (20 * itemSolar.gain < 1) {
                            var i = 1 / (20 * itemSolar.gain);
                            itemSolar.powerSpan.innerHTML = "1w/" + i.toFixed(1) + "secs"
                        } else
                            itemSolar.powerSpan.innerHTML = 20 * itemSolar.gain + "w/sec";
                    else if (10 * itemSolar.gain < 1) {
                        var i = 1 / (10 * itemSolar.gain);
                        itemSolar.powerSpan.innerHTML = "1w/" + i.toFixed(1) + "secs"
                    } else
                        itemSolar.powerSpan.innerHTML = 10 * itemSolar.gain + "w/sec";
                    availableResearch.splice(a, 1);
                    break;
                case "goldenPanels":
                    if (gotGoldenPanels = !0,
                            researchedStuff.push(goldenPanels),
                        t || pushLog("Oh yes, check out dem panels.<br/>4watts per second per panel!"),
                            itemSolar.gain = .4,
                            gotIrishPride)
                        if (20 * itemSolar.gain < 1) {
                            var i = 1 / (20 * itemSolar.gain);
                            itemSolar.powerSpan.innerHTML = "1w/" + i.toFixed(1) + "secs"
                        } else
                            itemSolar.powerSpan.innerHTML = 20 * itemSolar.gain + "w/sec";
                    else if (10 * itemSolar.gain < 1) {
                        var i = 1 / (10 * itemSolar.gain);
                        itemSolar.powerSpan.innerHTML = "1w/" + i.toFixed(1) + "secs"
                    } else
                        itemSolar.powerSpan.innerHTML = 10 * itemSolar.gain + "w/sec";
                    availableResearch.splice(a, 1);
                    break;
                case "potatoUpgrade":
                    gotPotatoUpgrade = !0,
                        researchedStuff.push(potatoUpgrade),
                    t || pushLog("Yes that's much better — no idea what kinda potato we had before. Not even sure it was a potato if I'm honest."),
                        itemPotato.gain = (3 * itemPotato.gain).toFixed(1),
                        gotIrishPride ? itemPotato.powerSpan.innerHTML = numberWithCommas(20 * itemPotato.gain) : itemPotato.powerSpan.innerHTML = numberWithCommas(10 * itemPotato.gain),
                        availableResearch.splice(a, 1);
                    break;
                case "probetatoUpgrade":
                    gotProbetatoUpgrade = !0,
                        researchedStuff.push(probetatoUpgrade),
                    t || pushLog("Probetato are all rooted in."),
                        itemProbe.gain = (4 * itemProbe.gain).toFixed(1),
                        gotIrishPride ? itemProbe.powerSpan.innerHTML = numberWithCommas(20 * itemProbe.gain) : itemProbe.powerSpan.innerHTML = numberWithCommas(10 * itemProbe.gain),
                        availableResearch.splice(a, 1);
                    break;
                case "spudnikUpgrade":
                    gotSpudnikUpgrade = !0,
                        researchedStuff.push(spudnikUpgrade),
                    t || pushLog("<span style='font-family:sans-serif'>Неплохо, товарищ</span>"),
                        itemSpudnik.gain = (3 * itemSpudnik.gain).toFixed(1),
                        gotIrishPride ? itemSpudnik.powerSpan.innerHTML = numberWithCommas(20 * itemSpudnik.gain) : itemSpudnik.powerSpan.innerHTML = numberWithCommas(10 * itemSpudnik.gain),
                        availableResearch.splice(a, 1);
                    break;
                case "potatoPlantUpgrade":
                    gotPotatoPlantUpgrade = !0,
                        researchedStuff.push(potatoPlantUpgrade),
                    t || pushLog("If we keep up these tater upgrades the bloody planet will be a King Edward soon."),
                        itemPotatoPlant.gain = (3 * itemPotatoPlant.gain).toFixed(1),
                        gotIrishPride ? itemPotatoPlant.powerSpan.innerHTML = numberWithCommas(20 * itemPotatoPlant.gain) : itemPotatoPlant.powerSpan.innerHTML = numberWithCommas(10 * itemPotatoPlant.gain),
                        availableResearch.splice(a, 1);
                    break;
                case "taterTowerUpgrade":
                    gotTaterTowerUpgrade = !0,
                        researchedStuff.push(taterTowerUpgrade),
                    t || pushLog("Ahh I do love a good hashie. Tater Towers production x2 &mdash; greasy stuff."),
                        itemTaterTower.gain = (2 * itemTaterTower.gain).toFixed(1),
                        gotIrishPride ? itemTaterTower.powerSpan.innerHTML = numberWithCommas(20 * itemTaterTower.gain) : itemTaterTower.powerSpan.innerHTML = numberWithCommas(10 * itemTaterTower.gain),
                        availableResearch.splice(a, 1);
                    break;
                case "spudGunUpgrade":
                    gotSpudGunUpgrade = !0,
                        researchedStuff.push(spudGunUpgrade),
                    t || pushLog("Solar Spuds activated &mdash; full circle!"),
                        itemSpudGun.gain = (2 * itemSpudGun.gain).toFixed(1),
                        gotIrishPride ? itemSpudGun.powerSpan.innerHTML = (20 * itemSpudGun.gain / 1e3).toFixed(0) : itemSpudGun.powerSpan.innerHTML = (10 * itemSpudGun.gain / 1e3).toFixed(0),
                        availableResearch.splice(a, 1);
                    break;
                case "potatoLauncherUpgrade":
                    gotPotatoLauncherUpgrade = !0,
                        researchedStuff.push(potatoLauncherUpgrade),
                    t || pushLog("Potato Launchers covered in plates, as requested. Not sure how that helps to gain power but I'll run with it!"),
                        itemPotatoLauncher.gain = (2 * itemPotatoLauncher.gain).toFixed(1),
                        gotIrishPride ? itemPotatoLauncher.powerSpan.innerHTML = (20 * itemPotatoLauncher.gain / 1e3).toFixed(0) : itemPotatoLauncher.powerSpan.innerHTML = (10 * itemPotatoLauncher.gain / 1e3).toFixed(0),
                        availableResearch.splice(a, 1);
                    break;
                case "irishPride":
                    gotIrishPride = !0,
                        researchedStuff.push(irishPride),
                    t || pushLog("Aye ya fookin' git'em lad."),
                        availableResearch.splice(a, 1);
                    for (var o = 0; o < availableItems.length; o++)
                        if ("item__solar" == availableItems[o].el.id)
                            if (20 * availableItems[o].gain < 1) {
                                var i = 1 / (20 * availableItems[o].gain);
                                availableItems[o].powerSpan.innerHTML = "1w/" + i.toFixed(1) + "secs"
                            } else
                                availableItems[o].powerSpan.innerHTML = (20 * availableItems[o].gain).toFixed(0);
                        else
                            "item__spudGun" == availableItems[o].el.id || "item__potatoLauncher" == availableItems[o].el.id ? availableItems[o].powerSpan.innerHTML = (20 * availableItems[o].gain / 1e3).toFixed(0) : availableItems[o].powerSpan.innerHTML = numberWithCommas(20 * availableItems[o].gain);
                    break;
                case "kinetigen01":
                    gotKinetigen01 = !0,
                        researchedStuff.push(kinetigen01),
                    t || (pushLog("The kinetic generator now gives you 3 watts every time you press it.<br/>Welcome to value town!"),
                        createResearch("kinetigen02")),
                        kinetigenGain = 3;
                    var r = {
                        maxHeight: .8 * walkerCanal,
                        height: 0,
                        strokeHeight: 0,
                        dir: 1,
                        width: 4,
                        maxSpeed: 6,
                        speed: 0,
                        speedRamp: .3,
                        color: "#ff3e3e",
                        xpos: kinetigenScreen.width / 2 - 8,
                        ypos: walkerCanal
                    };
                    kinetigenHiFiBars.push(r);
                    var r = {
                        maxHeight: .8 * walkerCanal,
                        height: 0,
                        strokeHeight: 0,
                        dir: 1,
                        width: 4,
                        maxSpeed: 6,
                        speed: 0,
                        speedRamp: .3,
                        color: "#ff3e3e",
                        xpos: kinetigenScreen.width / 2 + 4,
                        ypos: walkerCanal
                    };
                    kinetigenHiFiBars.push(r),
                        availableResearch.splice(a, 1);
                    break;
                case "kinetigen02":
                    gotKinetigen02 = !0,
                        researchedStuff.push(kinetigen02),
                    t || (pushLog("Kinetigen now produces less modest 100 watts per cycle"),
                        createResearch("kinetigen03")),
                        kinetigenGain = 50;
                    var r = {
                        maxHeight: -(.8 * walkerCanal),
                        height: 0,
                        strokeHeight: 0,
                        dir: 0,
                        width: 4,
                        maxSpeed: -6,
                        speed: 0,
                        speedRamp: -.3,
                        color: "#ff3e3e",
                        xpos: kinetigenScreen.width / 2 - 2,
                        ypos: kinetigenScreen.height - walkerCanal + 2
                    };
                    kinetigenHiFiBars.push(r);
                    var r = {
                        maxHeight: -(.7 * walkerCanal),
                        height: 0,
                        strokeHeight: 0,
                        dir: 0,
                        width: 4,
                        maxSpeed: -6,
                        speed: 0,
                        speedRamp: -.3,
                        color: "#ff3e3e",
                        xpos: kinetigenScreen.width / 2 - 8,
                        ypos: kinetigenScreen.height - walkerCanal + 2
                    };
                    kinetigenHiFiBars.push(r);
                    var r = {
                        maxHeight: -(.7 * walkerCanal),
                        height: 0,
                        strokeHeight: 0,
                        dir: 0,
                        width: 4,
                        maxSpeed: -6,
                        speed: 0,
                        speedRamp: -.3,
                        color: "#ff3e3e",
                        xpos: kinetigenScreen.width / 2 + 4,
                        ypos: kinetigenScreen.height - walkerCanal + 2
                    };
                    kinetigenHiFiBars.push(r),
                        availableResearch.splice(a, 1);
                    break;
                case "kinetigen03":
                    gotKinetigen03 = !0,
                        researchedStuff.push(kinetigen03),
                    t || (pushLog("Kinetigen now produces an admirable 500 watts per cycle"),
                        createResearch("kinetigen04")),
                        kinetigenGain = 500;
                    var r = {
                        maxHeight: .7 * walkerCanal,
                        height: 0,
                        strokeHeight: 0,
                        dir: 1,
                        width: 4,
                        maxSpeed: 6,
                        speed: 0,
                        speedRamp: .45,
                        color: "rgb(0, 255, 194)",
                        xpos: kinetigenScreen.width / 2 - 14,
                        ypos: walkerCanal
                    };
                    kinetigenHiFiBars.push(r);
                    var r = {
                        maxHeight: .6 * walkerCanal,
                        height: 0,
                        strokeHeight: 0,
                        dir: 1,
                        width: 4,
                        maxSpeed: 6,
                        speed: 0,
                        speedRamp: .45,
                        color: "rgb(0, 255, 194)",
                        xpos: kinetigenScreen.width / 2 - 20,
                        ypos: walkerCanal
                    };
                    kinetigenHiFiBars.push(r);
                    var r = {
                        maxHeight: .7 * walkerCanal,
                        height: 0,
                        strokeHeight: 0,
                        dir: 1,
                        width: 4,
                        maxSpeed: 6,
                        speed: 0,
                        speedRamp: .45,
                        color: "rgb(0, 255, 194)",
                        xpos: kinetigenScreen.width / 2 + 10,
                        ypos: walkerCanal
                    };
                    kinetigenHiFiBars.push(r);
                    var r = {
                        maxHeight: .6 * walkerCanal,
                        height: 0,
                        strokeHeight: 0,
                        dir: 1,
                        width: 4,
                        maxSpeed: 6,
                        speed: 0,
                        speedRamp: .45,
                        color: "rgb(0, 255, 194)",
                        xpos: kinetigenScreen.width / 2 + 16,
                        ypos: walkerCanal
                    };
                    kinetigenHiFiBars.push(r);
                    var r = {
                        maxHeight: -(.6 * walkerCanal),
                        height: 0,
                        strokeHeight: 0,
                        dir: 0,
                        width: 4,
                        maxSpeed: -6,
                        speed: 0,
                        speedRamp: -.45,
                        color: "rgb(0, 255, 194)",
                        xpos: kinetigenScreen.width / 2 - 14,
                        ypos: kinetigenScreen.height - walkerCanal + 2
                    };
                    kinetigenHiFiBars.push(r);
                    var r = {
                        maxHeight: -(.5 * walkerCanal),
                        height: 0,
                        strokeHeight: 0,
                        dir: 0,
                        width: 4,
                        maxSpeed: -6,
                        speed: 0,
                        speedRamp: -.45,
                        color: "rgb(0, 255, 194)",
                        xpos: kinetigenScreen.width / 2 - 20,
                        ypos: kinetigenScreen.height - walkerCanal + 2
                    };
                    kinetigenHiFiBars.push(r);
                    var r = {
                        maxHeight: -(.6 * walkerCanal),
                        height: 0,
                        strokeHeight: 0,
                        dir: 0,
                        width: 4,
                        maxSpeed: -6,
                        speed: 0,
                        speedRamp: -.45,
                        color: "rgb(0, 255, 194)",
                        xpos: kinetigenScreen.width / 2 + 10,
                        ypos: kinetigenScreen.height - walkerCanal + 2
                    };
                    kinetigenHiFiBars.push(r);
                    var r = {
                        maxHeight: -(.5 * walkerCanal),
                        height: 0,
                        strokeHeight: 0,
                        dir: 0,
                        width: 4,
                        maxSpeed: -6,
                        speed: 0,
                        speedRamp: -.45,
                        color: "rgb(0, 255, 194)",
                        xpos: kinetigenScreen.width / 2 + 16,
                        ypos: kinetigenScreen.height - walkerCanal + 2
                    };
                    kinetigenHiFiBars.push(r),
                        availableResearch.splice(a, 1);
                    break;
                case "kinetigen04":
                    gotKinetigen04 = !0,
                        researchedStuff.push(kinetigen04),
                    t || (pushLog("Kinetigen now produces a flippin' 10,000 watts per cycle"),
                        ga("set", {
                            userId: USER_ID,
                            dimension1: shipName,
                            dimension2: USER_ID,
                            metric16: 1
                        }),
                        ga("send", "pageview"),
                        ga("set", {
                            metric16: 0
                        })),
                        kinetigenGain = 1e4;
                    var r = {
                        maxHeight: .5 * walkerCanal,
                        height: 0,
                        strokeHeight: 0,
                        dir: 1,
                        width: 4,
                        maxSpeed: 6,
                        speed: 0,
                        speedRamp: .6,
                        color: "#ffdf5a",
                        xpos: kinetigenScreen.width / 2 - 26,
                        ypos: walkerCanal
                    };
                    kinetigenHiFiBars.push(r);
                    var r = {
                        maxHeight: .4 * walkerCanal,
                        height: 0,
                        strokeHeight: 0,
                        dir: 1,
                        width: 4,
                        maxSpeed: 6,
                        speed: 0,
                        speedRamp: .6,
                        color: "#ffdf5a",
                        xpos: kinetigenScreen.width / 2 - 32,
                        ypos: walkerCanal
                    };
                    kinetigenHiFiBars.push(r);
                    var r = {
                        maxHeight: .3 * walkerCanal,
                        height: 0,
                        strokeHeight: 0,
                        dir: 1,
                        width: 4,
                        maxSpeed: 6,
                        speed: 0,
                        speedRamp: .6,
                        color: "#ffdf5a",
                        xpos: kinetigenScreen.width / 2 - 38,
                        ypos: walkerCanal
                    };
                    kinetigenHiFiBars.push(r);
                    var r = {
                        maxHeight: .5 * walkerCanal,
                        height: 0,
                        strokeHeight: 0,
                        dir: 1,
                        width: 4,
                        maxSpeed: 6,
                        speed: 0,
                        speedRamp: .6,
                        color: "#ffdf5a",
                        xpos: kinetigenScreen.width / 2 + 22,
                        ypos: walkerCanal
                    };
                    kinetigenHiFiBars.push(r);
                    var r = {
                        maxHeight: .4 * walkerCanal,
                        height: 0,
                        strokeHeight: 0,
                        dir: 1,
                        width: 4,
                        maxSpeed: 6,
                        speed: 0,
                        speedRamp: .6,
                        color: "#ffdf5a",
                        xpos: kinetigenScreen.width / 2 + 28,
                        ypos: walkerCanal
                    };
                    kinetigenHiFiBars.push(r);
                    var r = {
                        maxHeight: .3 * walkerCanal,
                        height: 0,
                        strokeHeight: 0,
                        dir: 1,
                        width: 4,
                        maxSpeed: 6,
                        speed: 0,
                        speedRamp: .6,
                        color: "#ffdf5a",
                        xpos: kinetigenScreen.width / 2 + 34,
                        ypos: walkerCanal
                    };
                    kinetigenHiFiBars.push(r);
                    var r = {
                        maxHeight: -(.4 * walkerCanal),
                        height: 0,
                        strokeHeight: 0,
                        dir: 0,
                        width: 4,
                        maxSpeed: -6,
                        speed: 0,
                        speedRamp: -.6,
                        color: "#ffdf5a",
                        xpos: kinetigenScreen.width / 2 - 26,
                        ypos: kinetigenScreen.height - walkerCanal + 2
                    };
                    kinetigenHiFiBars.push(r);
                    var r = {
                        maxHeight: -(.3 * walkerCanal),
                        height: 0,
                        strokeHeight: 0,
                        dir: 0,
                        width: 4,
                        maxSpeed: -6,
                        speed: 0,
                        speedRamp: -.6,
                        color: "#ffdf5a",
                        xpos: kinetigenScreen.width / 2 - 32,
                        ypos: kinetigenScreen.height - walkerCanal + 2
                    };
                    kinetigenHiFiBars.push(r);
                    var r = {
                        maxHeight: -(.2 * walkerCanal),
                        height: 0,
                        strokeHeight: 0,
                        dir: 0,
                        width: 4,
                        maxSpeed: -6,
                        speed: 0,
                        speedRamp: -.6,
                        color: "#ffdf5a",
                        xpos: kinetigenScreen.width / 2 - 38,
                        ypos: kinetigenScreen.height - walkerCanal + 2
                    };
                    kinetigenHiFiBars.push(r);
                    var r = {
                        maxHeight: -(.4 * walkerCanal),
                        height: 0,
                        strokeHeight: 0,
                        dir: 0,
                        width: 4,
                        maxSpeed: -6,
                        speed: 0,
                        speedRamp: -.6,
                        color: "#ffdf5a",
                        xpos: kinetigenScreen.width / 2 + 22,
                        ypos: kinetigenScreen.height - walkerCanal + 2
                    };
                    kinetigenHiFiBars.push(r);
                    var r = {
                        maxHeight: -(.3 * walkerCanal),
                        height: 0,
                        strokeHeight: 0,
                        dir: 0,
                        width: 4,
                        maxSpeed: -6,
                        speed: 0,
                        speedRamp: -.6,
                        color: "#ffdf5a",
                        xpos: kinetigenScreen.width / 2 + 28,
                        ypos: kinetigenScreen.height - walkerCanal + 2
                    };
                    kinetigenHiFiBars.push(r);
                    var r = {
                        maxHeight: -(.2 * walkerCanal),
                        height: 0,
                        strokeHeight: 0,
                        dir: 0,
                        width: 4,
                        maxSpeed: -6,
                        speed: 0,
                        speedRamp: -.6,
                        color: "#ffdf5a",
                        xpos: kinetigenScreen.width / 2 + 34,
                        ypos: kinetigenScreen.height - walkerCanal + 2
                    };
                    kinetigenHiFiBars.push(r),
                        availableResearch.splice(a, 1);
                    break;
                case "heatshields":
                    gotHeatshields = !0,
                        researchedStuff.push(heatshields),
                    t || pushLog("All potatoes are now foil-wrapped to withstand re-entry heat & the odd fan-assisted oven."),
                        availableResearch.splice(a, 1);
                    break;
                case "solarAmbience":
                    gotSolarAmbience = !0,
                        researchedStuff.push(solarAmbience),
                    t || pushLog("Solar panels now generate power from ambient light."),
                        solarAmbienceGain = .25,
                        availableResearch.splice(a, 1);
                    break;
                case "systView":
                    gotSystView = !0,
                        researchedStuff.push(systView),
                    t || pushLog("Right, check the System Peeker. Let's get this story straight."),
                        systViewButton.style.display = "inline",
                        systViewButton.style.cursor = "pointer",
                        availableResearch.splice(a, 1);
                    break;
                case "hopperHeatshields":
                    gotHopperHeatshields = !0,
                        researchedStuff.push(hopperHeatshields),
                    t || (pushLog(shipName + "'s person-pod is ready for separation. Ship will remain in orbit for thing-making operations.<br/>It'll take a trolley-load of power to get us out of orbit &mdash; fire when ready, using the Idea Lister."),
                        createResearch("landship")),
                        availableResearch.splice(a, 1);
                    break;
                case "landship":
                    researchedStuff.push(landship),
                        gotLandship = !0,
                    t || (thingMuted || podLaunch__sound.play(),
                        shipReleaseFailSafe = !0,
                        setTimeout(function() {
                            userPod = new PhysicsBody("pod",userBody.pos[0],userBody.pos[1],3,.6 * userBody.vel[0],.6 * userBody.vel[1],10,"#3060cf",planetOne),
                                physicsBodies.push(userPod);
                            for (var e = 0; probeParticleCount > e; e++) {
                                var t = getRandomInt(probeParticleLifeMin, probeParticleLifeMax)
                                    , a = getRandomInt(2, 4)
                                    , s = getRandomInt(2, 4)
                                    , n = new PhysicsBody("particle",userBody.pos[0] + userBody.radius / 2,userBody.pos[1] + userBody.radius / 2,1,userBody.vel[0] / a,userBody.vel[1] / s,4,"rgba(255, 255, 255, 0.5)",planetOne);
                                n.life = t,
                                    orbitParticles.push(n)
                            }
                            shipReleaseFailSafe = !1
                        }, 600),
                        queueLog(66, "Ejecting pod for atmospheric entry..."),
                        queueLog(3, "With our separation from the<br/>" + shipName + ", our Thing Maker can focus on bigger things."),
                        shipStatusSpan.innerHTML = "<span>Ship Status:</span> lonely"),
                        availableResearch.splice(a, 1);
                    break;
                case "landshipAgain":
                    if (gotLandship = !0,
                            gotLandshipAgain = !0,
                            researchedStuff.push(landshipAgain),
                            !t) {
                        landingStage = "space",
                            pushLog(shipName + " is firing boosters for atmospheric entry..."),
                            userBody.vel[0] *= .6,
                            userBody.vel[1] *= .6;
                        for (var l = 0; l < physicsBodies.length; l++)
                            physicsBodies[l] == userBody && physicsBodies.splice(l, 1);
                        for (var o = 0; probeParticleCount > o; o++) {
                            var d = getRandomInt(probeParticleLifeMin, probeParticleLifeMax)
                                , c = getRandomInt(2, 4)
                                , p = getRandomInt(2, 4)
                                , u = new PhysicsBody("particle",userBody.pos[0] + userBody.radius / 2,userBody.pos[1] + userBody.radius / 2,1,userBody.vel[0] / c,userBody.vel[1] / p,4,"rgba(255, 255, 255, 0.5)",planetOne);
                            u.life = d,
                                orbitParticles.push(u)
                        }
                        thingMuted || podLaunch__sound.play()
                    }
                    availableResearch.splice(a, 1);
                    break;
                case "planetBoosters":
                    if (gotPlanetBoosters = !0,
                            researchedStuff.push(planetBoosters),
                            !t) {
                        queueLog(132, "Excellent! Earth the space ship, ready for time travel stuff."),
                            queueLog(132, "Build Spud Guns to increase the sun's mass, increasing our speed and therefore speeding up time...<br/>or whatever."),
                            queueLog(132, "The more things you've built &mdash; solar panels, probetatoes, etc. &mdash; the higher the mass of the spuds & taters that we can fire into the sun.");
                        for (var o = 0; o < physicsBodies2.length; o++)
                            "planetOne" === physicsBodies2[o].type && physicsBodies2.splice(o, 1);
                        planetOneRad = Math.sqrt(Math.pow(sPlanetOne.gravSrc.pos[0] - sPlanetOne.pos[0], 2) + Math.pow(sPlanetOne.gravSrc.pos[1] - sPlanetOne.pos[1], 2)),
                            sol.radius -= sol.mass / blackHoleMass * sunCollapseRadius,
                            solStartRad = sol.radius,
                            createResearch("irishPride"),
                            shipStatusSpan.innerHTML = "<span>Ship Status:</span> planet?"
                    }
                    for (var h = 0, o = 0; o < availableItems.length; o++)
                        "item__spudGun" != availableItems[o].el.id && "item__potatoLauncher" != availableItems[o].el.id && (h += availableItems[o].currentCount);
                    void 0 != itemSpudGun && (itemSpudGun.conditions = !0,
                        itemSpudGun.costLineSpan.innerHTML = "<span id='cost'>" + numberWithCommas(itemSpudGun.currentCost) + "</span> power",
                        itemSpudGun.costSpan = itemSpudGun.el.querySelector("#cost"),
                    1 == itemSpudGun.revealed && (spudMassMultiplier = (6 * h).toFixed(0),
                        itemSpudGun.spudSpan.innerHTML = spudMass * spudMassMultiplier)),
                    void 0 != itemPotatoLauncher && (itemPotatoLauncher.conditions = !0,
                        itemPotatoLauncher.costLineSpan.innerHTML = "<span id='cost'>" + numberWithCommas(itemPotatoLauncher.currentCost) + "</span> power",
                        itemPotatoLauncher.costSpan = itemPotatoLauncher.el.querySelector("#cost"),
                    1 == itemPotatoLauncher.revealed && (taterMassMultiplier = (6 * h).toFixed(0),
                        itemPotatoLauncher.spudSpan.innerHTML = taterMass * taterMassMultiplier)),
                        sunMassProgress.style.display = "block",
                        sunMassProgress.max = blackHoleMass,
                        sunMassProgress.value = sol.mass,
                        status__atmosphere.style.display = "none",
                        status__inhabitants.style.display = "none",
                        statusLog.push(sunMassProgress),
                        availableResearch.splice(a, 1);
                    break;
                case "approachEventHorizon":
                    switch (gotApproachEventHorizon = !0,
                        researchedStuff.push(approachEventHorizon),
                    t || pushLog("Approaching event horizon...<br/>As we get closer and faster, time will move faster around us... See you after the Big Crunch."),
                        availableResearch.splice(a, 1),
                        clearInterval(saveInter),
                        options__save.style.background = "rgb(18, 148, 117)",
                        options__save.style.borderColor = "rgb(18, 148, 117)",
                        options__savefreq30s.style.borderColor = "#767676",
                        options__savefreq30s.style.color = "#767676",
                        options__savefreq60s.style.borderColor = "#767676",
                        options__savefreq60s.style.color = "#767676",
                        options__savefreq5m.style.borderColor = "#767676",
                        options__savefreq5m.style.color = "#767676",
                        options__savefreq30m.style.borderColor = "#767676",
                        options__savefreq30m.style.color = "#767676",
                        options__autosaveY.style.borderColor = "#767676",
                        options__autosaveY.style.color = "#767676",
                        options__autosaveN.style.borderColor = "#767676",
                        options__autosaveN.style.color = "#767676",
                        thingSaveFreq) {
                        case "30s":
                            options__savefreq30s.style.color = "#161419",
                                options__savefreq30s.style.background = "#767676";
                            break;
                        case "60s":
                            options__savefreq60s.style.color = "#161419",
                                options__savefreq60s.style.background = "#767676";
                            break;
                        case "5m":
                            options__savefreq5m.style.color = "#161419",
                                options__savefreq5m.style.background = "#767676";
                            break;
                        case "30m":
                            options__savefreq30m.style.color = "#161419",
                                options__savefreq30m.style.background = "#767676"
                    }
                    1 == thingAutoSave ? (options__autosaveY.style.background = "#767676",
                        options__autosaveY.style.color = "#161419") : 0 == thingAutoSave && (options__autosaveN.style.background = "#767676",
                        options__autosaveN.style.color = "#161419")
            }
            n.el.parentNode.removeChild(n.el),
                updateResourceGain(),
                checkItems(),
                checkResearch()
        }
    }
    , powerSpan = document.getElementById("watts--total"), powerGainSpan = document.getElementById("watts--ps"), power = 0, totalPowerProduced = 0, data = 0, totalSolarProduced = 0, firedSpuds = 0, firedTaters = 0, solarAmbienceGain = 0, powerGain = 0, sunlight = 1, powerLastTurn = 0, oneHundredMil, oneHundredMilPrev, updateResources = function() {
        sunlight = shipInSunlight ? 1 : solarAmbienceGain,
            powerGain = 0;
        for (var e = 0; e < availableItems.length; e++) {
            if ("item__solar" == availableItems[e].el.id) {
                var t = availableItems[e].currentCount * availableItems[e].gain * sunlight;
                powerGain += t,
                gotIrishPride && (powerGain += powerGain),
                    totalSolarProduced += t
            } else if ("item__probe" == availableItems[e].el.id) {
                var a = probes.length * availableItems[e].gain * 1.5;
                a += landedProbes.length * availableItems[e].gain,
                    powerGain += a,
                gotIrishPride && (powerGain += a)
            } else if ("item__potatoPlant" == availableItems[e].el.id) {
                var s = landedPotatoPlants.length * availableItems[e].gain;
                powerGain += s,
                gotIrishPride && (powerGain += s)
            } else if ("item__taterTower" == availableItems[e].el.id) {
                var n = landedTaterTowers.length * availableItems[e].gain;
                powerGain += n,
                gotIrishPride && (powerGain += n)
            } else
                powerGain += availableItems[e].currentCount * availableItems[e].gain,
                gotIrishPride && (powerGain += availableItems[e].currentCount * availableItems[e].gain);
            blackHoleMade || ("item__spudGun" == availableItems[e].el.id && (firedSpuds += availableItems[e].currentCount * spudGunRate),
            "item__potatoLauncher" == availableItems[e].el.id && (firedTaters += availableItems[e].currentCount * taterGunRate))
        }
        if (oneHundredMil = power > 99999999 ? !0 : !1,
            oneHundredMil != oneHundredMilPrev && (1 == oneHundredMil ? powerSpan.style.fontSize = "34px" : powerSpan.style.fontSize = "45px"),
                power += powerGain,
                totalPowerProduced += powerGain,
                oneHundredMilPrev = oneHundredMil,
                powerSpan.innerHTML = numberWithCommas(power.toFixed(0)),
                updateResourceGain(),
                checkItems(),
                checkResearch(),
                intro) {
            if (powerLastTurn != power.toFixed(0)) {
                var i = power.toFixed(0) - powerLastTurn;
                i > totalNeeded && (i = totalNeeded);
                for (var e = 0; i > e; e++)
                    switch (screentoActivate) {
                        case "thingMaker":
                            tmAddStuff();
                            break;
                        case "develop":
                            deAddStuff();
                            break;
                        case "information":
                            inAddStuff();
                            break;
                        case "center":
                            cpAddStuff()
                    }
            }
            powerLastTurn = power.toFixed(0)
        }
    }
    ;
setInterval(updateResources, 100);
var updateResourceGain = function() {
    var e = 0;
    e = 10 * powerGain,
        powerGainSpan.innerHTML = numberWithCommas(Math.round(10 * e) / 10)
}
    , canvasWrap = document.getElementById("wrapper--center")
    , oCanvas = document.getElementById("center__canvas")
    , octx = oCanvas.getContext("2d")
    , bigG = 6673e-7
    , orientation = "";
oCanvas.width = canvasWrap.offsetWidth,
    oCanvas.height = canvasWrap.offsetHeight,
    orientation = oCanvas.width > oCanvas.height ? "L" : "P";
var canvasCenter = [oCanvas.width / 2, oCanvas.height / 2]
    , shipInSunlight = !0
    , shipInSunlightInitial = shipInSunlight;
window.addEventListener("resize", function(e) {
    intro && (thingMakerCanvas.width = thingMaker__container.offsetWidth,
        thingMakerCanvas.height = thingMaker__container.offsetHeight,
        tmAnchor = [thingMakerCanvas.width / 2, thingMakerCanvas.height / 3],
        developCanvas.width = develop__container.offsetWidth,
        developCanvas.height = develop__container.offsetHeight,
        deAnchor = [developCanvas.width / 2, developCanvas.height / 3],
        informationCanvas.width = information__container.offsetWidth,
        informationCanvas.height = information__container.offsetHeight,
        inAnchor = [informationCanvas.width / 2, informationCanvas.height / 2],
        centerPowerCanvas.width = canvasWrap.offsetWidth,
        centerPowerCanvas.height = canvasWrap.offsetHeight,
        cpAnchor = [centerPowerCanvas.width / 2, centerPowerCanvas.height / 2]),
    (isFirefox || isEdge) && (window.innerHeight < 721 ? oldLogcontainer.style.height = "229px" : oldLogcontainer.style.height = "245px"),
        oCanvas.width = canvasWrap.offsetWidth,
        oCanvas.height = canvasWrap.offsetHeight,
        logNotificationPosition = [oCanvas.width - 10, rect.top + 30],
        orientation = oCanvas.width > oCanvas.height ? "L" : "P",
        canvasCenter = [oCanvas.width / 2, oCanvas.height / 2],
        planetOne.trail = [],
        sCanvas.width = canvasWrap.offsetWidth,
        sCanvas.height = canvasWrap.offsetHeight,
        sCanvas.width > sCanvas.height ? sOrientation = "L" : sOrientation = "P",
        sCanvasCenter = [sCanvas.width / 2, oCanvas.height / 2]
}),
    window.addEventListener("fullscreenchange", function(e) {
        intro && (thingMakerCanvas.width = thingMaker__container.offsetWidth,
            thingMakerCanvas.height = thingMaker__container.offsetHeight,
            tmAnchor = [thingMakerCanvas.width / 2, thingMakerCanvas.height / 3],
            developCanvas.width = develop__container.offsetWidth,
            developCanvas.height = develop__container.offsetHeight,
            deAnchor = [developCanvas.width / 2, developCanvas.height / 3],
            informationCanvas.width = information__container.offsetWidth,
            informationCanvas.height = information__container.offsetHeight,
            inAnchor = [informationCanvas.width / 2, informationCanvas.height / 2],
            centerPowerCanvas.width = canvasWrap.offsetWidth,
            centerPowerCanvas.height = canvasWrap.offsetHeight,
            cpAnchor = [centerPowerCanvas.width / 2, centerPowerCanvas.height / 2]),
            oCanvas.width = canvasWrap.offsetWidth,
            oCanvas.height = canvasWrap.offsetHeight,
            logNotificationPosition = [oCanvas.width - 10, rect.top + 30],
            orientation = oCanvas.width > oCanvas.height ? "L" : "P",
            canvasCenter = [oCanvas.width / 2, oCanvas.height / 2],
            planetOne.trail = [],
            sCanvas.width = canvasWrap.offsetWidth,
            sCanvas.height = canvasWrap.offsetHeight,
            sCanvas.width > sCanvas.height ? sOrientation = "L" : sOrientation = "P",
            sCanvasCenter = [sCanvas.width / 2, oCanvas.height / 2]
    });
var PhysicsBody = function(e, t, a, s, n, i, o, r, l, d, c) {
    this.type = e,
        this.pos = [t, a],
        this.relPos = [this.pos[0] + canvasCenter[0], this.pos[1] + canvasCenter[1]],
        this.vel = [n, i],
        this.radius = s,
        this.mass = o,
        this.colour = r,
        this.gravSrc = l,
        this.planetName = d,
        this.planetActualName = c,
        this.trailLength = 10,
    "planet" == this.type && (this.trailLength = 8,
    "localP1" == this.planetActualName && (this.trailLength = 15)),
        p2 = [this.relPos[0] + oCanvas.width, this.relPos[1] + oCanvas.width],
        this.shadPos = [[this.relPos[0], this.relPos[1]], p2],
        this.trail = [],
        this.updatePosition = function() {
            this.relPos = [this.pos[0] + canvasCenter[0], this.pos[1] + canvasCenter[1]]
        }
        ,
        this.sUpdatePosition = function() {
            this.relPos = [this.pos[0] + sCanvasCenter[0], this.pos[1] + sCanvasCenter[1]]
        }
        ,
        this.drawSelf = function() {
            octx.beginPath(),
                "tower" == this.type ? (octx.moveTo(this.relPos[0], this.relPos[1]),
                    octx.lineTo(this.relPos[0] - 50 * this.vel[0], this.relPos[1] - 50 * this.vel[1]),
                    octx.lineWidth = this.radius,
                    octx.strokeStyle = this.colour,
                    octx.stroke()) : "ship" !== this.type && "pod" !== this.type && "potatoPlant" !== this.type && "particle" !== this.type ? (octx.arc(this.relPos[0], this.relPos[1], this.radius, 0, 2 * Math.PI),
                    octx.fillStyle = this.colour,
                    octx.fill()) : (octx.rect(this.relPos[0], this.relPos[1], this.radius, this.radius),
                    octx.fillStyle = this.colour,
                    octx.fill()),
                octx.closePath()
        }
        ,
        this.sDrawSelf = function() {
            sctx.beginPath(),
                "sun" == this.type || "planet" == this.type || "planetOne" == this.type ? sctx.arc(this.relPos[0], this.relPos[1], this.radius, 0, 2 * Math.PI) : sctx.rect(this.relPos[0] - 1, this.relPos[1] - 1, this.radius, this.radius),
                sctx.fillStyle = this.colour,
                sctx.fill(),
                sctx.closePath()
        }
        ,
        this.sDrawShad = function() {
            sctx.beginPath(),
                this.shadPos[0] = [this.relPos[0], this.relPos[1]],
                sctx.moveTo(this.shadPos[0][0], this.shadPos[0][1]),
                this.shadPos[1] = [this.shadPos[0][0] - 1 * (this.gravSrc.relPos[0] - this.relPos[0]), this.shadPos[0][1] - 1 * (this.gravSrc.relPos[1] - this.relPos[1])],
                sctx.lineTo(this.shadPos[1][0], this.shadPos[1][1]),
                sctx.lineWidth = 2 * this.radius,
                grd = octx.createLinearGradient(this.shadPos[0][0], this.shadPos[0][1], this.shadPos[1][0], this.shadPos[1][1]),
                grd.addColorStop(1, "rgba(7, 12, 18, 0.000)"),
                grd.addColorStop(0, "rgba(7, 12, 18, 1.000)"),
                sctx.strokeStyle = grd,
                sctx.stroke(),
                sctx.closePath()
        }
        ,
        this.drawShad = function() {
            octx.beginPath(),
                "ship" != this.type && "pod" != this.type ? this.shadPos[0] = [sPlanetOne.shadPos[0][0] - sPlanetOne.relPos[0] + this.relPos[0], sPlanetOne.shadPos[0][1] - sPlanetOne.relPos[1] + this.relPos[1]] : this.shadPos[0] = [sPlanetOne.shadPos[0][0] - sPlanetOne.relPos[0] + this.relPos[0] + this.radius / 2, sPlanetOne.shadPos[0][1] - sPlanetOne.relPos[1] + this.relPos[1] + this.radius / 2],
                octx.moveTo(this.shadPos[0][0], this.shadPos[0][1]),
                this.shadPos[1] = [this.shadPos[0][0] + 10 * (sPlanetOne.shadPos[1][0] - sPlanetOne.shadPos[0][0]), this.shadPos[0][1] + 10 * (sPlanetOne.shadPos[1][1] - sPlanetOne.shadPos[0][1])],
                octx.lineTo(this.shadPos[1][0], this.shadPos[1][1]),
                octx.lineWidth = 2 * this.radius,
                octx.strokeStyle = "#070c12",
                octx.stroke(),
                octx.closePath()
        }
}
    , annotationLines = []
    , AnnotationLine = function(e, t, a) {
    this.life = 3,
        this.follow = a,
        this.p1 = e,
        this.p2 = t,
        this.drawSelf = function() {
            if (screenFocusReal) {
                if (octx.beginPath(),
                        this.follow = !0) {
                    var t = [e.relPos[0], e.relPos[1]]
                        , a = [this.p2[0] - t[0], this.p2[1] - t[1]]
                        , s = Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2))
                        , n = [a[0] / s, a[1] / s];
                    t[0] = t[0] + 10 * n[0],
                        t[1] = t[1] + 10 * n[1],
                        octx.moveTo(t[0], t[1]),
                        octx.lineTo(this.p2[0], this.p2[1])
                } else
                    octx.moveTo(this.p1[0], this.p1[1]),
                        octx.lineTo(this.p2[0], this.p2[1]);
                octx.moveTo(this.p2[0], this.p2[1] - 5),
                    octx.lineTo(this.p2[0], this.p2[1] + 5),
                    octx.lineWidth = 1,
                    octx.strokeStyle = "#fff",
                    octx.stroke(),
                    octx.closePath(),
                    this.life -= 1
            } else
                1 == this.follow && (this.life -= 1)
        }
}
    , updateAnnotationLines = function() {
    for (var e = 0; e < annotationLines.length; e++)
        annotationLines[e].drawSelf(),
        annotationLines[e].life < 0 && annotationLines.splice(e, 1)
}
    , physicsBodies = []
    , planetOne = new PhysicsBody("planet",0,0,50,0,0,32e3,"#fc4646",null ,null ,"localP1");
physicsBodies.push(planetOne);
var userBody = new PhysicsBody("ship",0,-160,4,.4,0,10,"#fff",planetOne);
physicsBodies.push(userBody);
var userPod, updatePhysicsBodies = function() {
        for (var e = 0; e < physicsBodies.length; e++)
            null != physicsBodies[e].gravSrc && calculateGravity(physicsBodies[e], physicsBodies[e].gravSrc),
                physicsBodies[e].updatePosition();
        if (screenFocus) {
            if (!blackHoleShrunk || re__earth)
                for (var e = 0; e < physicsBodies.length; e++)
                    physicsBodies[e].drawShad();
            gotPlanetBoosters && !re__earth && drawTrail(planetOne),
            gotLandshipAgain && "landed" != landingStage && (calculateGravity(userBody, userBody.gravSrc),
                userBody.drawShad());
            for (var e = 0; e < physicsBodies.length; e++)
                physicsBodies[e].drawSelf();
            gotLandshipAgain && drawLandedShip()
        }
    }
    , draw = function() {
        screenFocus && octx.clearRect(0, 0, oCanvas.width, oCanvas.height),
            updatePhysicsBodies(),
            updateProbes(),
            updateLandedProbes(),
            updateSpudniks(),
            updatePotatoPlants(),
            updateLandedPotatoPlants(),
            updateTaterTowers(),
            updateLandedTaterTowers(),
            fireSpudVis(),
            updateSpudguns(),
            updateLaunchers(),
            drawOrbitParticles(),
            gotLandship && "landed" != landingStage && userPod || gotLandshipAgain ? shipLandingSequence() : screenFocus && gotLandship && userPod && drawLandedPod(),
            drawLandingParticles(),
            shipInSunlight = blackHoleShrunk ? !0 : !inShadow([userBody.relPos[0] + userBody.radius / 2, userBody.relPos[1] + userBody.radius / 2], [planetOne.shadPos[0][0], planetOne.shadPos[0][1]], [planetOne.shadPos[1][0], planetOne.shadPos[1][1]], planetOne.radius, userBody),
            updateAnnotationLines(),
            adjustReflections(),
        1 == groundView && drawEndLanding(),
        (queuedLogs.length > 0 || qT > 0) && queueLog(),
        messageSoundCountdown > 0 && messageSoundCountdown--,
            animateIntros(),
        messagePulseGo && ("SPACEPLAN" == document.title && 0 >= messagePulse && (document.title = "Stuff Happened!",
            messagePulse = 70),
        "Stuff Happened!" == document.title && 0 >= messagePulse && (document.title = "SPACEPLAN",
            messagePulse = 70),
            messagePulse--)
    }
    ;
setInterval(draw, 30);
var sCanvas = document.getElementById("center__sunCanvas")
    , sctx = sCanvas.getContext("2d");
sCanvas.width = canvasWrap.offsetWidth,
    sCanvas.height = canvasWrap.offsetHeight,
    sCanvas.width > sCanvas.height ? sOrientation = "L" : sOrientation = "P";
var sCanvasCenter = [sCanvas.width / 2, sCanvas.height / 2], mercuryBlurb = "Mercury got merked.", venusBlurb = "Venus just got baked.", marsBlurb = "Mars' water evaporated (also Mars is dead).", jupiterBlurb = "Jupiter is rising (like dough... burnt dough... super burnt dough).", saturnBlurb = "Saturn? More like Saburn!", uranusBlurb = "Uranus is on fiyah!", neptuneBlurb = "Neptune boiled then went all steamy.", plutoBlurb = "Pluto isn't even a dwarf planet now. Because it's dead.", storySaid = !1, planetOneRad, physicsBodies2 = [], sol, sol = new PhysicsBody("sun",0,0,50,0,0,3e3,"#ffdf5a",null ,"","sol"), sPlanetOne = new PhysicsBody("planetOne",200,0,2,0,.1,100,"#fc4646",sol,"","earth");
physicsBodies2.push(sPlanetOne);
var mercury = new PhysicsBody("planet",0,85,1,-.15,0,2e5,"#ffcc00",sol,mercuryBlurb,"mercury");
physicsBodies2.push(mercury);
var venus = new PhysicsBody("planet",170,0,2,0,.105,2e6,"#86ffca",sol,venusBlurb,"venus");
physicsBodies2.push(venus);
var mars = new PhysicsBody("planet",300,0,1,0,.075,2e5,"#ff7443",sol,marsBlurb,"mars");
physicsBodies2.push(mars);
var jupiter = new PhysicsBody("planet",0,-350,15,.06,0,2e8,"#ffa043",sol,jupiterBlurb,"jupiter");
physicsBodies2.push(jupiter);
var saturn = new PhysicsBody("planet",380,0,12,0,.06,2e8,"#f9d293",sol,saturnBlurb,"saturn");
physicsBodies2.push(saturn);
var uranus = new PhysicsBody("planet",-450,0,7,0,-.045,2e7,"#18E6FF",sol,uranusBlurb,"uranus");
physicsBodies2.push(uranus);
var neptune = new PhysicsBody("planet",500,0,7,0,.06,2e7,"#45B9FF",sol,neptuneBlurb,"neptune");
physicsBodies2.push(neptune);
var pluto = new PhysicsBody("planet",520,0,1,0,.045,2e5,"#D9F5FF",sol,plutoBlurb,"pluto");
physicsBodies2.push(pluto),
    physicsBodies2.push(sol),
    sol.sUpdatePosition();
var intoHole__played = !1
    , sUpdatePhysicsBodies = function() {
        for (var e = 0; e < physicsBodies2.length; e++)
            null != physicsBodies2[e].gravSrc && calculateGravity(physicsBodies2[e], physicsBodies2[e].gravSrc),
                physicsBodies2[e].sUpdatePosition();
        if (gotPlanetBoosters)
            for (var e = 0; e < physicsBodies2.length; e++)
                if (null != physicsBodies2[e].gravSrc) {
                    var t = Math.sqrt(Math.pow(physicsBodies2[e].gravSrc.pos[0] - physicsBodies2[e].pos[0], 2) + Math.pow(physicsBodies2[e].gravSrc.pos[1] - physicsBodies2[e].pos[1], 2));
                    t < physicsBodies2[e].gravSrc.radius - physicsBodies2[e].radius && (physicsBodies2[e].gravSrc.mass += physicsBodies2[e].mass / 1e3,
                        pushLog(physicsBodies2[e].planetName),
                        physicsBodies2.splice(e, 1))
                }
        if (screenFocus) {
            for (var e = 0; e < physicsBodies2.length; e++)
                ("planet" === physicsBodies2[e].type || "planetOne" === physicsBodies2[e].type) && physicsBodies2[e].sDrawShad();
            for (var e = 0; e < physicsBodies2.length; e++)
                physicsBodies2[e].sDrawSelf();
            gotPlanetBoosters && !re__earth && (blackHoleShrunk || sPlanetOne.sDrawShad(),
                sDrawPlanetTrail(planetOne),
                sPlanetOne.sDrawSelf())
        }
    }
    , prevAngle = 0
    , sDraw = function() {
        if (screenFocus && sctx.clearRect(0, 0, sCanvas.width, sCanvas.height),
            !re__earth && blackHoleMade && blackHoleParticlesAnimate(),
            gotPlanetBoosters && !re__earth) {
            var e = correctPlanetVelocity();
            sPlanetOne.vel[0] = e[0],
                sPlanetOne.vel[1] = e[1],
                sPlanetOne.pos[0] += sPlanetOne.vel[0],
                sPlanetOne.pos[1] += sPlanetOne.vel[1];
            var t = Math.sqrt(Math.pow(sPlanetOne.gravSrc.pos[0] - sPlanetOne.pos[0], 2) + Math.pow(sPlanetOne.gravSrc.pos[1] - sPlanetOne.pos[1], 2))
                , a = planetOneRad / t;
            if (sPlanetOne.pos[0] *= a,
                    sPlanetOne.pos[1] *= a,
                    sPlanetOne.sUpdatePosition(),
                    blackHoleMade) {
                if (screenFocus && !re__earth) {
                    if (blackHoleMade && !blackHoleShrunk)
                        if (solShrinkD > solShrinkT) {
                            var s = easeOutExpo(solShrinkT, solShrinkB, solShrinkC, solShrinkD);
                            solShrinkT += .01,
                                sol.radius = s
                        } else
                            blackHoleShrunk = !0,
                                sol.radius = 10,
                                pushLog("Sun's all puckered up."),
                                sol.colour = "#000",
                                createResearch("approachEventHorizon"),
                                shipStatusSpan.innerHTML = "<span>Ship Status:</span> dizzy";
                    if (1 == particleFire) {
                        for (var n = 0; particleBatch > n; n++) {
                            new FallParticle
                        }
                        particleFire = !1
                    } else
                        particleCounter++,
                        particleCounter > particleFreq && (particleFire = !0,
                            particleCounter = 0)
                }
            } else
                sunMassProgress.value = sol.mass,
                    sunMassProgressSpan.innerHTML = "Sun mass: <span class='status__container__span'>" + numberWithCommas(sol.mass) + " / " + numberWithCommas(blackHoleMass) + " (" + (sol.mass / blackHoleMass * 100).toFixed(2) + "%)</span>",
                    sol.radius = solStartRad + sol.mass / blackHoleMass * sunCollapseRadius,
                sol.mass >= blackHoleMass && (blackHoleMade = !0,
                    pushLog("Sun's collapsing into a gaping big hole."),
                    sunMassProgress.style.display = "none",
                    sunMassProgressSpan.innerHTML = "Sun status: <span class='status__container__span'>literally a black hole</span>");
            fireSpuds(),
                updateSpuds()
        }
        if (sUpdatePhysicsBodies(),
            gotApproachEventHorizon && !horizonReached)
            if (planetOneRad > 0 ? planetOneRad -= .3 : horizonReached = !0,
                20 > planetOneRad && !intoHole__played && (thingMuted || intohole__sound.play(),
                    intoHole__played = !0),
                1 != particleFire || horizonReached)
                particleCounter++,
                particleCounter > particleFreq && (particleFire = !0,
                    particleCounter = 0);
            else {
                for (var n = 0; particleBatch > n; n++) {
                    new FallParticle
                }
                particleFire = !1
            }
        else
            1 == horizonReached && intoTheHole();
        updateDate()
    }
    ;
setInterval(sDraw, 30);
for (var planetLookerType = document.getElementById("center__header__planType"), systemPeekerType = document.getElementById("center__header__systType"), planetBoostersNeedCreate = !1, planetView__sound = [], systemView__sound = [], planetView__soundInt = 0, systemView__soundInt = 0, ks = 0; 5 > ks; ks++)
    planetView__sound[ks] = new Audio("audio/views/planet.mp3"),
        systemView__sound[ks] = new Audio("audio/views/system.mp3"),
        soundArray.push(planetView__sound[ks]),
        soundArray.push(systemView__sound[ks]);
var toggleCanvas = function(e) {
        gotSystView && ("center__header--plan" === e.id ? (oCanvas.style.display = "block",
            sCanvas.style.display = "none",
            planViewButton.className = "center__header--plan",
            systViewButton.className = "center__header--syst",
            systViewButton.style.display = "inline",
            planViewButton.style.cursor = "auto",
            systViewButton.style.cursor = "pointer",
            systemPeekerType.className = "center__header--systSmall",
            planetLookerType.className = "center__header--systLarge",
        thingMuted || (planetView__sound[planetView__soundInt].play(),
            planetView__soundInt++,
        planetView__soundInt >= planetView__sound.length && (planetView__soundInt = 0))) : "center__header--syst" === e.id && (oCanvas.style.display = "none",
            sCanvas.style.display = "block",
            systViewButton.className = "center__header--plan",
            planViewButton.className = "center__header--syst",
            planViewButton.style.display = "inline",
            systViewButton.style.cursor = "auto",
            planViewButton.style.cursor = "pointer",
            planetLookerType.className = "center__header--systSmall",
            systemPeekerType.className = "center__header--systLarge",
        thingMuted || (systemView__sound[systemView__soundInt].play(),
            systemView__soundInt++,
        systemView__soundInt >= systemView__sound.length && (systemView__soundInt = 0)),
        0 == storySaid && (planetBoostersNeedCreate = !0,
            queueLog(264, "Yep! Pretty likely we're on Earth..."),
            queueLog(264, "So, my plan. This will sound silly,<br/>but try to bear with me."),
            queueLog(264, "This idea is based entirely on my total misunderstanding of some Stephen<span class='no-break'>&nbsp;</span>Hawkings book I just picked up in my data thingy..."),
            queueLog(264, "So, according to this disproven 'Big<span class='no-break'>&nbsp;</span>Crunch' theory, the universe at some point is going to reverse direction and all mush together."),
            queueLog(264, "If I've misunderstood correctly, time MIGHT go backwards during the shrinking of spacetime.<br/>Probably not but let's go with it..."),
            queueLog(333, "If &mdash; right &mdash; we put these huge, fuck-off-massive boosters onto this planet,<br/>then we can remain in a stable orbit while firing more taters into the sun..."),
            setTimeout(function() {
                createResearch("planetBoosters"),
                    planetBoostersNeedCreate = !1
            }, 9990),
            queueLog(200, "This will increase its mass, meaning that we'll have to go faster to stay in its orbit."),
            queueLog(264, "The faster we go, the slower our perception of time relative to the universe &mdash; time travel!<br/>Matthew<span class='no-break'>&nbsp;</span>McConaughey type shit!"),
            queueLog(333, "With enough mass, the sun will collapse in on itself into a black hole type deal.<br/>Then? We approach its event horizon!"),
            queueLog(433, "At the event horizon, time will become infinite. Now I'm 90% sure that this is a euphemism for maddening death,<br/>but I'm a robot who can't feel and you're a person experiencing a very linear narrative so..."),
            queueLog(264, "With time being infinite we'll reach the big crunchey-crunch in no time.<br/>Or infinite time, I'm pretty confused at this point to be honest."),
            queueLog(400, "Anyway, THEN we'll probably? Get a big ol' bang. Time reverses and goes back to going forward. Hopefully the universe ends up in a more-or-less identical state to before, but this time we (I) know how the human race dies!"),
            queueLog(264, "We return to Earth, let them know.<br/>We're heroes. Roll credits."),
            queueLog(264, "Fuck off with your plot holes.<br/>Let's do this. Planet Boosters!"),
            storySaid = !0)))
    }
    ;
status__gravSrc = document.getElementById("status__gravSrc"),
    status__atmosphere = document.getElementById("status__atmosphere"),
    status__inhabitants = document.getElementById("status__inhabitants"),
    status__gravSrc.innerHTML = "Orbiting mass: <span class='status__container__span'>no idea</span>";
var probes = []
    , landedProbes = []
    , spudniks = []
    , potatoPlants = []
    , landedPotatoPlants = []
    , taterTowers = []
    , landedTaterTowers = []
    , spudguns = []
    , launchers = []
    , terminalVelocity = .2
    , parachuteVelocity = .1
    , launchPhrases = ["Good bye, sweet potato.", "Our little Arran Comet.", "Challenger is go."]
    , launchPhrasesSaid = []
    , orbitParticles = []
    , probeParticleCount = 6
    , probeParticleLifeMin = 100
    , probeParticleLifeMax = 200
    , createProbe = function() {
    for (var e = 0; probeParticleCount > e; e++) {
        var t = getRandomInt(probeParticleLifeMin, probeParticleLifeMax)
            , a = getRandomInt(2, 4)
            , s = getRandomInt(2, 4)
            , n = new PhysicsBody("particle",userBody.pos[0] + userBody.radius / 2,userBody.pos[1] + userBody.radius / 2,1,userBody.vel[0] / a,userBody.vel[1] / s,4,"rgba(255, 255, 255, 0.5)",planetOne);
        n.life = t,
            orbitParticles.push(n)
    }
    var i = new PhysicsBody("probe",userBody.pos[0] + userBody.radius / 2,userBody.pos[1] + userBody.radius / 2,1,userBody.vel[0] / 2,userBody.vel[1] / 2,4,"#fff",planetOne);
    if (i.landingZone = getRndBias(0, 30, 0, 1),
            i.terminalVelocity__set = !1,
        0 === probes.length && 0 === landedProbes.length || atmosphere__dataNeeded > atmosphere__data) {
        if (launchPhrases.length > 0) {
            var o = getRandomInt(0, launchPhrases.length - 1);
            pushLog("Probe launched. " + launchPhrases[o]);
            var r = launchPhrases.splice(o, 1);
            launchPhrasesSaid.push(r)
        } else
            pushLog("Probe launched.");
        var l = new AnnotationLine(i,logNotificationPosition,!0);
        annotationLines.push(l)
    }
    probes.push(i)
}
    , updateProbes = function() {
    for (var e = 0; e < probes.length; e++)
        calculateGravity(probes[e], probes[e].gravSrc),
            probes[e].updatePosition();
    if (screenFocus)
        for (var e = 0; e < probes.length; e++)
            probes[e].drawSelf();
    for (var e = 0; e < probes.length; e++) {
        var t = Math.sqrt(Math.pow(probes[e].gravSrc.pos[0] - probes[e].pos[0], 2) + Math.pow(probes[e].gravSrc.pos[1] - probes[e].pos[1], 2));
        if (t < probes[e].gravSrc.radius + 10)
            if (screenFocus && drawTrail(probes[e]),
                    gotHeatshields) {
                if (probes[e].vectorMagnitude = Math.sqrt(Math.pow(probes[e].vel[0], 2) + Math.pow(probes[e].vel[1], 2)),
                    probes[e].vectorMagnitude > terminalVelocity && (probes[e].vel[0] *= .95,
                        probes[e].vel[1] *= .95),
                    t < probes[e].gravSrc.radius - probes[e].landingZone + 4 && (probes[e].vectorMagnitude > parachuteVelocity && gotParachutes && (probes[e].vel[0] *= .95,
                        probes[e].vel[1] *= .95),
                    t < probes[e].gravSrc.radius - probes[e].landingZone)) {
                    if (0 === landedProbes.length) {
                        pushLog("Probetato landed successfully...<br/>This place looks familiar.");
                        var a = new AnnotationLine(probes[e],logNotificationPosition,!0);
                        annotationLines.push(a),
                        void 0 != itemPotatoPlant && (itemPotatoPlant.conditions = !0,
                            itemPotatoPlant.costLineSpan.innerHTML = "<span id='cost'>" + numberWithCommas(itemPotatoPlant.currentCost) + "</span> power",
                            itemPotatoPlant.costSpan = itemPotatoPlant.el.querySelector("#cost")),
                            ga("set", {
                                userId: USER_ID,
                                dimension1: shipName,
                                dimension2: USER_ID,
                                metric17: 1
                            }),
                            ga("send", "pageview"),
                            ga("set", {
                                metric17: 0
                            }),
                            createResearch("probetatoUpgrade")
                    }
                    landedProbes.push(probes[e]),
                        probes.splice(e, 1)
                }
            } else {
                if (itemProbe.currentCount--,
                        itemProbe.countSpan.innerHTML = itemProbe.currentCount,
                    null == heatshields) {
                    switch (atmosphere__data) {
                        case 0:
                            pushLog("Probetato lost &mdash; data gained.<br/>Check the Fact Holder and send<br/>some more taters down to solve<br/>this predicament.");
                            break;
                        case 1:
                            pushLog("Probetato lost &mdash; data gained.")
                    }
                    atmosphere__data++;
                    var a = new AnnotationLine(probes[e],logNotificationPosition,!1);
                    annotationLines.push(a),
                        status__atmosphere.innerHTML = atmosphere__data + "/" + atmosphere__dataNeeded + " <span class='status__container__span'>data for breakthrough</span>",
                        status__atmosphere.style.background = statusNotificationCol,
                        atmosphereProgress.style.display = "block",
                        atmosphereProgress.max = atmosphere__dataNeeded,
                        atmosphereProgress.value = atmosphere__data,
                        setTimeout(statusNotification, 200)
                } else {
                    pushLog("Probetato lost &mdash; baked on atmospheric entry.");
                    var a = new AnnotationLine(probes[e],logNotificationPosition,!1);
                    annotationLines.push(a)
                }
                null == heatshields && atmosphere__data >= atmosphere__dataNeeded && (pushLog("Our probetatoes are getting baked in the thick atmosphere &mdash; foil heatshields should keep them cosey.<br/>Check the Idea Lister."),
                    status__atmosphere.innerHTML = "Atmosphere: <span class='status__container__span'>thick</span>",
                    status__atmosphere.style.background = statusNotificationCol,
                    atmosphereProgress.style.display = "none",
                    createResearch("heatshields"),
                    setTimeout(statusNotification, 200)),
                    probes.splice(e, 1)
            }
    }
}
    , updateLandedProbes = function() {
    for (var e = 0; e < landedProbes.length; e++)
        screenFocus && landedProbes[e].drawSelf(),
            landedProbes[e].updatePosition()
}
    , createSpudnik = function() {
    var e = new PhysicsBody("spudnik",userBody.pos[0] + userBody.radius / 2,userBody.pos[1] + userBody.radius / 2,1,.8 * userBody.vel[0],.8 * userBody.vel[1],4,"#fff",planetOne);
    spudniks.push(e);
    for (var t = 0; probeParticleCount > t; t++) {
        var a = getRandomInt(probeParticleLifeMin, probeParticleLifeMax)
            , s = getRandomInt(8, 10) / 10
            , n = getRandomInt(8, 10) / 10
            , i = new PhysicsBody("particle",userBody.pos[0] + userBody.radius / 2,userBody.pos[1] + userBody.radius / 2,1,userBody.vel[0] * s,userBody.vel[1] * n,4,"rgba(255, 255, 255, 0.5)",planetOne);
        i.life = a,
            orbitParticles.push(i)
    }
}
    , updateSpudniks = function() {
    for (var e = 0; e < spudniks.length; e++)
        calculateGravity(spudniks[e], spudniks[e].gravSrc),
            spudniks[e].updatePosition();
    if (screenFocus)
        for (var e = 0; e < spudniks.length; e++)
            spudniks[e].drawSelf()
}
    , createPotatoPlant = function() {
    var e = new PhysicsBody("potatoPlant",userBody.pos[0] + userBody.radius / 2,userBody.pos[1] + userBody.radius / 2,3,.2 * userBody.vel[0],.2 * userBody.vel[1],4,"#fff",planetOne);
    if (e.landingZone = getRndBias(0, 30, 0, 1),
            e.terminalVelocity__set = !1,
        0 === potatoPlants.length && 0 === landedPotatoPlants.length) {
        pushLog("Potato Plant launched.");
        var t = new AnnotationLine(e,logNotificationPosition,!0);
        annotationLines.push(t)
    }
    potatoPlants.push(e);
    for (var a = 0; probeParticleCount > a; a++) {
        var s = getRandomInt(probeParticleLifeMin, probeParticleLifeMax)
            , n = getRandomInt(3, 6) / 10
            , i = getRandomInt(3, 6) / 10
            , o = new PhysicsBody("particle",userBody.pos[0] + userBody.radius / 2,userBody.pos[1] + userBody.radius / 2,1,userBody.vel[0] * n,userBody.vel[1] * i,4,"rgba(255, 255, 255, 0.5)",planetOne);
        o.life = s,
            orbitParticles.push(o)
    }
}
    , updatePotatoPlants = function() {
    for (var e = 0; e < potatoPlants.length; e++)
        calculateGravity(potatoPlants[e], potatoPlants[e].gravSrc),
            potatoPlants[e].updatePosition();
    if (screenFocus)
        for (var e = 0; e < potatoPlants.length; e++)
            potatoPlants[e].drawSelf();
    for (var e = 0; e < potatoPlants.length; e++) {
        var t = Math.sqrt(Math.pow(potatoPlants[e].gravSrc.pos[0] - potatoPlants[e].pos[0], 2) + Math.pow(potatoPlants[e].gravSrc.pos[1] - potatoPlants[e].pos[1], 2));
        if (t < potatoPlants[e].gravSrc.radius + 10 && (screenFocus && drawTrail(potatoPlants[e]),
                potatoPlants[e].vectorMagnitude = Math.sqrt(Math.pow(potatoPlants[e].vel[0], 2) + Math.pow(potatoPlants[e].vel[1], 2)),
            potatoPlants[e].vectorMagnitude > terminalVelocity && (potatoPlants[e].vel[0] *= .95,
                potatoPlants[e].vel[1] *= .95),
            t < potatoPlants[e].gravSrc.radius - potatoPlants[e].landingZone + 4 && (potatoPlants[e].vectorMagnitude > parachuteVelocity && (potatoPlants[e].vel[0] *= .95,
                potatoPlants[e].vel[1] *= .95),
            t < potatoPlants[e].gravSrc.radius - potatoPlants[e].landingZone))) {
            if (0 === landedPotatoPlants.length) {
                queueLog(66, "PotatoPlant landed successfully."),
                    queueLog(133, "Impact uncovered ancient stuff...<br/>We'll excavate the site with more power.<br/>Check the Fact Holder for progress.");
                var a = new AnnotationLine(potatoPlants[e],logNotificationPosition,!0);
                annotationLines.push(a),
                    inhabitantsProgress.style.display = "block",
                    inhabitantsProgress.max = inhabitants__dataNeeded,
                    inhabitantsProgress.value = inhabitants__data,
                    statusLog.push(inhabitantsProgress),
                    inhabitants__started = !0
            }
            landedPotatoPlants.push(potatoPlants[e]),
                potatoPlants.splice(e, 1)
        }
    }
}
    , updateLandedPotatoPlants = function() {
    for (var e = 0; e < landedPotatoPlants.length; e++)
        landedPotatoPlants[e].updatePosition(),
        screenFocus && landedPotatoPlants[e].drawSelf()
}
    , createTaterTower = function() {
    var e = new PhysicsBody("tower",userBody.pos[0] + userBody.radius / 2,userBody.pos[1] + userBody.radius / 2,8,.1 * userBody.vel[0],.1 * userBody.vel[1],4,"#fff",planetOne);
    if (0 === taterTowers.length && 0 === landedTaterTowers.length) {
        pushLog("Tater Tower launched.");
        var t = new AnnotationLine(e,logNotificationPosition,!0);
        annotationLines.push(t)
    }
    taterTowers.push(e);
    for (var a = 0; probeParticleCount > a; a++) {
        var s = getRandomInt(probeParticleLifeMin, probeParticleLifeMax)
            , n = getRandomInt(1, 4) / 10
            , i = getRandomInt(1, 4) / 10
            , o = new PhysicsBody("particle",userBody.pos[0] + userBody.radius / 2,userBody.pos[1] + userBody.radius / 2,1,userBody.vel[0] * n,userBody.vel[1] * i,4,"rgba(255, 255, 255, 0.5)",planetOne);
        o.life = s,
            orbitParticles.push(o)
    }
}
    , updateTaterTowers = function() {
    for (var e = 0; e < taterTowers.length; e++)
        calculateGravity(taterTowers[e], taterTowers[e].gravSrc),
            taterTowers[e].updatePosition();
    if (screenFocus)
        for (var e = 0; e < taterTowers.length; e++)
            taterTowers[e].drawSelf();
    for (var e = 0; e < taterTowers.length; e++) {
        var t = Math.sqrt(Math.pow(taterTowers[e].gravSrc.pos[0] - taterTowers[e].pos[0], 2) + Math.pow(taterTowers[e].gravSrc.pos[1] - taterTowers[e].pos[1], 2));
        if (t < taterTowers[e].gravSrc.radius - 2) {
            for (var a = [taterTowers[e].vel[1], -taterTowers[e].vel[0]], s = [-taterTowers[e].vel[1], taterTowers[e].vel[0]], n = [-taterTowers[e].vel[0], -taterTowers[e].vel[1]], i = 0; 5 > i; i++) {
                var o = getRandomInt(10, 30) / 100
                    , r = 1 - o
                    , l = [s[0] * o + n[0] * r, s[1] * o + n[1] * r]
                    , d = [a[0] * o + n[0] * r, a[1] * o + n[1] * r]
                    , c = (getRandomInt(800, 1e3) / 1e3,
                getRandomInt(800, 1e3) / 1e3,
                    new PhysicsBody("particle",taterTowers[e].pos[0],taterTowers[e].pos[1],1,l[0],l[1],10,planetOne.colour,planetOne));
                landingParticles.push(c);
                var c = new PhysicsBody("particle",taterTowers[e].pos[0],taterTowers[e].pos[1],1,d[0],d[1],10,planetOne.colour,planetOne);
                landingParticles.push(c)
            }
            landedTaterTowers.push(taterTowers[e]),
                taterTowers.splice(e, 1)
        }
    }
}
    , updateLandedTaterTowers = function() {
    for (var e = 0; e < landedTaterTowers.length; e++)
        landedTaterTowers[e].updatePosition(),
        screenFocus && landedTaterTowers[e].drawSelf()
}
    , createSpudgun = function() {
    var e = new PhysicsBody("spudgun",userBody.pos[0] + userBody.radius / 2,userBody.pos[1] + userBody.radius / 2,4,1.4 * userBody.vel[0],1.4 * userBody.vel[1],4,"#fff",planetOne);
    spudguns.push(e);
    for (var t = 0; probeParticleCount > t; t++) {
        var a = getRandomInt(probeParticleLifeMin, probeParticleLifeMax)
            , s = getRandomInt(10, 14) / 10
            , n = getRandomInt(10, 14) / 10
            , i = new PhysicsBody("particle",userBody.pos[0] + userBody.radius / 2,userBody.pos[1] + userBody.radius / 2,1,userBody.vel[0] * s,userBody.vel[1] * n,4,"rgba(255, 255, 255, 0.5)",planetOne);
        i.life = a,
            orbitParticles.push(i)
    }
}
    , updateSpudguns = function() {
    for (var e = 0; e < spudguns.length; e++) {
        if (1 != spudguns[e].orbitCorrected)
            var t = Math.sqrt(Math.pow(spudguns[e].gravSrc.pos[0] - spudguns[e].pos[0], 2) + Math.pow(spudguns[e].gravSrc.pos[1] - spudguns[e].pos[1], 2))
                , a = Math.sqrt(Math.pow(userBody.gravSrc.pos[0] - userBody.pos[0], 2) + Math.pow(userBody.gravSrc.pos[1] - userBody.pos[1], 2));
        if (1 != spudguns[e].orbitCorrected && t > 1.3 * a) {
            var s = .45 * Math.sqrt(bigG * spudguns[e].gravSrc.mass * spudguns[e].mass / t)
                , n = [(spudguns[e].gravSrc.pos[1] - spudguns[e].pos[1]) / t, -((spudguns[e].gravSrc.pos[0] - spudguns[e].pos[0]) / t)]
                , i = [n[0] * s, n[1] * s];
            spudguns[e].vel = [i[0], i[1]],
                spudguns[e].orbitCorrected = !0
        }
        calculateGravity(spudguns[e], spudguns[e].gravSrc),
            spudguns[e].updatePosition()
    }
    if (screenFocus)
        for (var e = 0; e < spudguns.length; e++)
            spudguns[e].drawSelf()
}
    , createLauncher = function() {
    var e = new PhysicsBody("spudgun",userBody.pos[0] + userBody.radius / 2,userBody.pos[1] + userBody.radius / 2,8,1.4 * userBody.vel[0],1.4 * userBody.vel[1],4,"#fff",planetOne);
    launchers.push(e);
    for (var t = 0; probeParticleCount > t; t++) {
        var a = getRandomInt(probeParticleLifeMin, probeParticleLifeMax)
            , s = getRandomInt(10, 14) / 10
            , n = getRandomInt(10, 14) / 10
            , i = new PhysicsBody("particle",userBody.pos[0] + userBody.radius / 2,userBody.pos[1] + userBody.radius / 2,1,userBody.vel[0] * s,userBody.vel[1] * n,4,"rgba(255, 255, 255, 0.5)",planetOne);
        i.life = a,
            orbitParticles.push(i)
    }
}
    , updateLaunchers = function() {
    for (var e = 0; e < launchers.length; e++) {
        if (1 != launchers[e].orbitCorrected)
            var t = Math.sqrt(Math.pow(launchers[e].gravSrc.pos[0] - launchers[e].pos[0], 2) + Math.pow(launchers[e].gravSrc.pos[1] - launchers[e].pos[1], 2))
                , a = Math.sqrt(Math.pow(userBody.gravSrc.pos[0] - userBody.pos[0], 2) + Math.pow(userBody.gravSrc.pos[1] - userBody.pos[1], 2));
        if (1 != launchers[e].orbitCorrected && t > 1.15 * a) {
            var s = .45 * Math.sqrt(bigG * launchers[e].gravSrc.mass * launchers[e].mass / t)
                , n = [(launchers[e].gravSrc.pos[1] - launchers[e].pos[1]) / t, -((launchers[e].gravSrc.pos[0] - launchers[e].pos[0]) / t)]
                , i = [n[0] * s, n[1] * s];
            launchers[e].vel = [i[0], i[1]],
                launchers[e].orbitCorrected = !0
        }
        calculateGravity(launchers[e], launchers[e].gravSrc),
            launchers[e].updatePosition()
    }
    if (screenFocus)
        for (var e = 0; e < launchers.length; e++)
            launchers[e].drawSelf()
}
    , drawTrail = function(e) {
    "planet" == e.type ? null != e.trail[0] ? (e.trail[e.trail.length - 1][0].toFixed(0) != sPlanetOne.relPos[0].toFixed(0) || e.trail[e.trail.length - 1][1].toFixed(0) != sPlanetOne.relPos[1].toFixed(0)) && e.trail.push([sPlanetOne.relPos[0], sPlanetOne.relPos[1]]) : e.trail.push([sPlanetOne.relPos[0], sPlanetOne.relPos[1]]) : null != e.trail[0] ? (e.trail[e.trail.length - 1][0].toFixed(0) != e.relPos[0].toFixed(0) || e.trail[e.trail.length - 1][1].toFixed(0) != e.relPos[1].toFixed(0)) && e.trail.push([e.relPos[0], e.relPos[1]]) : e.trail.push([e.relPos[0], e.relPos[1]]),
    e.trail.length > e.trailLength && e.trail.shift();
    for (var t = 1, a = e.trail.length - 1; a > -1; a--)
        octx.beginPath(),
            octx.globalAlpha = t,
            "planet" == e.type ? (octx.arc(e.trail[a][0] - sPlanetOne.relPos[0] + e.relPos[0], e.trail[a][1] - sPlanetOne.relPos[1] + e.relPos[1], e.radius * t * .99, 0, 2 * Math.PI),
                octx.fillStyle = "rgb(0, 255, 194)",
                octx.fill()) : "ship" !== e.type && "pod" !== e.type && "potatoPlant" !== e.type && "particle" !== e.type ? (octx.arc(e.trail[a][0], e.trail[a][1], e.radius * t, 0, 2 * Math.PI),
                octx.fillStyle = e.colour,
                octx.fill()) : (octx.rect(e.trail[a][0], e.trail[a][1], e.radius * t, e.radius),
                octx.fillStyle = e.colour,
                octx.fill()),
            octx.closePath(),
            t -= 1 / e.trailLength;
    octx.globalAlpha = 1
}
    , sDrawPlanetTrail = function(e) {
    for (var t = 1, a = e.trail.length - 1; a > -1; a--)
        sctx.beginPath(),
            sctx.globalAlpha = t,
            sctx.arc(e.trail[a][0], e.trail[a][1], sPlanetOne.radius * t * .98, 0, 2 * Math.PI),
            sctx.fillStyle = "rgb(0, 255, 194)",
            sctx.fill(),
            sctx.closePath(),
            sctx.globalAlpha = 1,
            t -= 1 / e.trailLength
}
    , drawOrbitParticles = function() {
    if (orbitParticles.length > 0) {
        for (var e = [], t = 0; t < orbitParticles.length; t++)
            calculateGravity(orbitParticles[t], orbitParticles[t].gravSrc),
            screenFocus && orbitParticles[t].drawSelf(),
                orbitParticles[t].updatePosition(),
                orbitParticles[t].life -= 1,
            orbitParticles[t].life <= 0 && e.push(t);
        if (orbitParticles.length > 30)
            for (var a = orbitParticles.length - 30, t = 0; a > t; t++)
                e.push(31 + t);
        e.length > 0 && spliceArray(orbitParticles, e)
    }
}
    , statusLogContainer = document.getElementById("status__container")
    , atmosphereProgress = document.getElementById("status__atmosphereBar")
    , inhabitantsProgress = document.getElementById("status__inhabitantsBar")
    , sunMassProgress = document.getElementById("status__sunMassBar")
    , sunMassProgressSpan = document.getElementById("status__sunMass")
    , statusLog = [];
statusLog.push(status__gravSrc),
    statusLog.push(status__atmosphere),
    statusLog.push(status__inhabitants);
var atmosphere__data = 0
    , inhabitants__data = 0
    , atmosphere__dataNeeded = 3
    , inhabitants__dataNeeded = 1e6
    , inhabitants__started = !1
    , inhabitants__discovered = !1
    , notificationDelay = 200
    , statusNotificationCol = "rgba(255, 255, 255, 0.7)"
    , logNotificationCol = "rgba(255, 255, 255, 0.9)"
    , rect = logContainer.getBoundingClientRect()
    , logNotificationPosition = [oCanvas.width - 10, rect.top + 180]
    , pushStatus = function(e) {
    var t = document.createElement("p");
    t.innerHTML = e,
        statusLogContainer.insertBefore(t, statusLogContainer.childNodes[0]),
        statusLog.push(e)
}
    , eventLog = []
    , eventLogMessages = []
    , queuedLogs = []
    , qT = 0
    , messageSoundGap = 300
    , messageSoundCountdown = 0
    , messageBegin__sound = new Audio("audio/messages/begin.mp3")
    , messageProcede__sound = [];
messageProcede__sound[1] = new Audio("audio/messages/procede1.mp3"),
    messageProcede__sound[2] = new Audio("audio/messages/procede2.mp3"),
    messageProcede__sound[3] = new Audio("audio/messages/procede3.mp3");
var messageConclude__sound = new Audio("audio/messages/conclude.mp3");
soundArray.push(messageBegin__sound),
    soundArray.push(messageProcede__sound[1]),
    soundArray.push(messageProcede__sound[2]),
    soundArray.push(messageProcede__sound[3]),
    soundArray.push(messageConclude__sound);
var queueLog = function(e, t) {
        if (void 0 != t)
            queuedLogs.push([t, e]);
        else if (queuedLogs.length > 0 || qT > 0) {
            if (0 == qT) {
                pushLog(queuedLogs[0][0]),
                    qT = queuedLogs[0][1];
                queuedLogs.shift()
            }
            qT--,
            0 > qT && (qT = 0)
        }
    }
    ;
queueLog();
for (var pushLog = function(e, t) {
    var a = document.createElement("p");
    if (a.innerHTML = e,
            a.className += "eventLog__event",
            logContainer.appendChild(a),
            a.parentNode.scrollTop = a.offsetTop,
            eventLog.push(a),
            eventLogMessages.push(e),
            a.style.background = logNotificationCol,
            setTimeout(statusNotification, 200),
            !t) {
        if (1 == queuedLogs.length)
            thingMuted || messageConclude__sound.play();
        else if (0 >= messageSoundCountdown)
            thingMuted || messageBegin__sound.play();
        else if (!thingMuted) {
            var s = getRandomInt(1, 3);
            messageProcede__sound[s].play()
        }
        messageSoundCountdown = messageSoundGap
    }
}
         , messagePulse = 0, messagePulseGo = !1, statusNotification = function() {
        if (screenFocusReal) {
            document.title = "SPACEPLAN",
                messagePulse = 0,
                messagePulseGo = !1;
            for (var e = 0; e < eventLog.length; e++)
                "transparent" != eventLog[e].style.background && (isFirefox || isEdge || (eventLog[e].style.transition = "all 1s"),
                    eventLog[e].style.background = "transparent");
            for (var e = 0; e < statusLog.length; e++)
                "transparent" != statusLog[e].style.background && (statusLog[e].style.transition = "all 0s",
                    statusLog[e].style.background = "transparent")
        } else
            messagePulseGo = !0,
                requestAnimationFrame(statusNotification)
    }
         , uiReflections = document.getElementsByClassName("overlay__reflection"), shipInSunlightAlt = !0, shipInSunlightInitialAlt = !0, adjustReflections = function() {
        if (gotLandship)
            if (blackHoleShrunk) {
                if (shipInSunlight != shipInSunlightInitial) {
                    if (1 == shipInSunlight)
                        for (var e = 0; e < uiReflections.length; e++)
                            uiReflections[e].classList.remove("overlay__reflection__shade");
                    else
                        for (var e = 0; e < uiReflections.length; e++)
                            uiReflections[e].classList.add("overlay__reflection__shade");
                    kinetigenSolarStrengthChange(),
                        updateResourceGain(),
                        shipInSunlightInitial = shipInSunlight
                }
            } else {
                if (shipInSunlightAlt != shipInSunlightInitialAlt) {
                    if (1 == shipInSunlightAlt)
                        for (var e = 0; e < uiReflections.length; e++)
                            uiReflections[e].classList.remove("overlay__reflection__shade");
                    else
                        for (var e = 0; e < uiReflections.length; e++)
                            uiReflections[e].classList.add("overlay__reflection__shade");
                    shipInSunlightInitialAlt = shipInSunlightAlt
                }
                userPod && (shipInSunlightAlt = !inShadow([userPod.relPos[0] + userPod.radius / 2, userPod.relPos[1] + userPod.radius / 2], [planetOne.shadPos[0][0], planetOne.shadPos[0][1]], [planetOne.shadPos[1][0], planetOne.shadPos[1][1]], planetOne.radius, userPod)),
                shipInSunlight != shipInSunlightInitial && (kinetigenSolarStrengthChange(),
                    updateResourceGain(),
                    shipInSunlightInitial = shipInSunlight)
            }
        else if (shipInSunlight != shipInSunlightInitial) {
            if (1 == shipInSunlight)
                for (var e = 0; e < uiReflections.length; e++)
                    uiReflections[e].classList.remove("overlay__reflection__shade");
            else
                for (var e = 0; e < uiReflections.length; e++)
                    uiReflections[e].classList.add("overlay__reflection__shade");
            kinetigenSolarStrengthChange(),
                updateResourceGain(),
                shipInSunlightInitial = shipInSunlight
        }
    }
         , fallParticles = [], spitParticles = [], particleCounter = 0, particleFreq = 5, particleBatch = 1, particleFire = !1, SpitParticle = function(e, t) {
        this.startDist = 10,
            this.speed = 234.3,
            this.seed = [e[0], e[1]],
            this.pos = [this.seed[0], this.seed[1]],
            this.posMagnitude = Math.sqrt(Math.pow(this.pos[0], 2) + Math.pow(this.pos[1], 2)),
            this.posNormalized = [this.pos[0] / this.posMagnitude, this.pos[1] / this.posMagnitude],
            this.pos = [this.posNormalized[0] * this.startDist, this.posNormalized[1] * this.startDist],
            this.relPos = [this.pos[0] + sCanvasCenter[0], this.pos[1] + sCanvasCenter[1]],
            spitParticles.push(this),
            this.mass = 1e5,
            this.rad = t,
            this.col = "#fff",
            this.vel = [this.seed[0], this.seed[1]],
            this.velMagnitude = Math.sqrt(Math.pow(this.vel[0], 2) + Math.pow(this.vel[1], 2)),
            this.velNormalized = [this.vel[0] / this.velMagnitude, this.vel[1] / this.velMagnitude],
            this.vel = [this.velNormalized[0] * this.speed, this.velNormalized[1] * this.speed],
            this.updatePosition = function() {
                this.relPos = [this.pos[0] + sCanvasCenter[0], this.pos[1] + sCanvasCenter[1]]
            }
            ,
            this.drawSelf = function() {
                if (screenFocus) {
                    var e = Math.sqrt(Math.pow(this.pos[0], 2) + Math.pow(this.pos[1], 2))
                        , t = e / 200
                        , a = getRandomInt(0, 3);
                    this.col = "rgb(" + parseInt(255 * t / a) + ", " + parseInt(255 * t) + ", 255)",
                        sctx.beginPath(),
                        sctx.rect(this.relPos[0], this.relPos[1], this.rad, this.rad),
                        sctx.fillStyle = this.col,
                        sctx.fill(),
                        sctx.closePath(),
                        sctx.beginPath(),
                        sctx.moveTo(this.relPos[0], this.relPos[1]),
                        sctx.lineTo(this.relPos[0] - this.vel[0], this.relPos[1] - this.vel[1]),
                        sctx.lineWidth = this.rad,
                        sctx.strokeStyle = this.col,
                        sctx.stroke(),
                        sctx.closePath(),
                        this.offsetMagnitude = Math.sqrt(Math.pow(sol.pos[0] - this.pos[0], 2) + Math.pow(sol.pos[1] - this.pos[1], 2)),
                    this.offsetMagnitude > 40 && (this.escape = !0),
                    1 == this.escape && this.offsetMagnitude < 40 && (this["delete"] = !0)
                }
            }
    }
         , FallParticle = function() {
        this.speed = getRandomInt(0, 30) / 10,
            Math.random() > .5 ? Math.random() > .5 ? this.pos = [0 - sCanvasCenter[0], getRandomInt(0, sCanvas.height) - sCanvasCenter[1]] : this.pos = [sCanvas.width - sCanvasCenter[0], getRandomInt(0, sCanvas.height) - sCanvasCenter[1]] : Math.random() > .5 ? this.pos = [getRandomInt(0, sCanvas.width) - sCanvasCenter[0], 0 - sCanvasCenter[1]] : this.pos = [getRandomInt(0, sCanvas.width) - sCanvasCenter[0], sCanvas.height - sCanvasCenter[1]],
            this.relPos = [this.pos[0] + sCanvasCenter[0], this.pos[1] + sCanvasCenter[1]],
            fallParticles.push(this),
            this.mass = 1e5,
            this.rad = getRandomInt(1, 2),
            this.col = "#fff";
        var e = Math.sqrt(Math.pow(sol.pos[0] - this.pos[0], 2) + Math.pow(sol.pos[1] - this.pos[1], 2))
            , t = [sol.pos[0] - this.pos[0], sol.pos[1] - this.pos[1]]
            , a = [t[0] / e, t[1] / e]
            , s = [a[1], -a[0]];
        this.vel = [s[0] * this.speed, s[1] * this.speed],
            this.updatePosition = function() {
                this.relPos = [this.pos[0] + sCanvasCenter[0], this.pos[1] + sCanvasCenter[1]]
            }
            ,
            this.drawSelf = function() {
                screenFocus && (this.offsetMagnitude = Math.sqrt(Math.pow(sol.pos[0] - this.pos[0], 2) + Math.pow(sol.pos[1] - this.pos[1], 2)),
                    sctx.beginPath(),
                    sctx.rect(this.relPos[0], this.relPos[1], this.rad, this.rad),
                    sctx.fillStyle = this.col,
                    sctx.fill(),
                    sctx.closePath())
            }
    }
         , tallParticles = [], tallParticleCounter = 0, tallParticleFreq = 60, tallParticleFire = !1, TallParticle = function() {
        Math.random() >= .5 ? (this.dir = 1,
            this.spread = .1) : (this.dir = -1,
            this.spread = -.1),
            this.posX = sCanvasCenter[0],
            this.width = 0,
            tallParticles.push(this),
            this.animate = function() {
                sctx.beginPath(),
                    sctx.rect(this.posX, 0, this.width, sCanvas.height),
                    sctx.fillStyle = "rgba(22, 20, 25," + (Math.random() + .5) + ")",
                    sctx.fill(),
                    this.width += this.spread,
                    this.posX += this.dir
            }
    }
         , tallWhiteParticles = [], tallWhiteParticleCounter = 0, tallWhiteParticleFreq = 120, tallWhiteParticleFire = !1, TallWhiteParticle = function() {
        Math.random() >= .5 ? this.dir = 1 : this.dir = -1,
            this.posX = sCanvasCenter[0],
            this.width = 1,
            this.speed = 0,
            tallWhiteParticles.push(this),
            this.animate = function() {
                sctx.beginPath(),
                    sctx.rect(this.posX, 0, this.width, sCanvas.height),
                    sctx.fillStyle = "#fff",
                    sctx.fill(),
                    this.posX += this.dir,
                    this.speed += .2
            }
    }
         , blackHoleParticlesAnimate = function() {
        for (var e = 0; e < tallParticles.length; e++)
            tallParticles[e].animate(),
            (tallParticles[e].posX < 0 || tallParticles[e].posX > sCanvas.width) && tallParticles.splice(e, 1);
        for (var e = 0; e < fallParticles.length; e++)
            if (calculateGravity(fallParticles[e], sol),
                    fallParticles[e].updatePosition(),
                    fallParticles[e].drawSelf(),
                fallParticles[e].offsetMagnitude < 20 || fallParticles[e].relPos[0] < 0 || fallParticles[e].relPos[0] > sCanvas.width || fallParticles[e].relPos[1] < 0 || fallParticles[e].relPos[1] > sCanvas.height) {
                if (fallParticles[e].offsetMagnitude < 20) {
                    new SpitParticle(fallParticles[e].vel,fallParticles[e].rad)
                }
                fallParticles.splice(e, 1)
            }
        if (fallParticles.length > 100) {
            fallParticles.shift()
        }
        for (var e = 0; e < spitParticles.length; e++)
            calculateGravity(spitParticles[e], sol),
                spitParticles[e].updatePosition(),
                spitParticles[e].drawSelf(),
            (1 == spitParticles[e]["delete"] || spitParticles[e].relPos[0] < 0 || spitParticles[e].relPos[0] > sCanvas.width || spitParticles[e].relPos[1] < 0 || spitParticles[e].relPos[1] > sCanvas.height) && spitParticles.splice(e, 1);
        for (var e = 0; e < tallWhiteParticles.length; e++)
            tallWhiteParticles[e].animate(),
            (tallWhiteParticles[e].posX < 0 || tallWhiteParticles[e].posX > sCanvas.width) && tallWhiteParticles.splice(e, 1)
    }
         , kinetigenButtonPadding = document.getElementById("kinetigen__button-padding"), kinetigenScreen = document.getElementById("kinetigen__screen"), kctx = kinetigenScreen.getContext("2d"), keyDownSound = [], keyUpSound = [], keyDownSoundInt = 0, keyUpSoundInt = 0, ks = 0; 15 > ks; ks++)
    keyDownSound[ks] = new Audio("audio/keyDown.mp3"),
        keyDownSound[ks].volume = .5,
        soundArray.push(keyDownSound[ks]);
for (var ks = 0; 15 > ks; ks++)
    keyUpSound[ks] = new Audio("audio/keyUp.mp3"),
        keyUpSound[ks].volume = .6,
        soundArray.push(keyUpSound[ks]);
var kinetigenGain = 1
    , walkerSolarTracker = totalSolarProduced.toFixed(0);
kinetigenScreen.width = kinetigenScreen.offsetWidth,
    kinetigenScreen.height = kinetigenScreen.offsetHeight;
var walkerCanal = (kinetigenScreen.offsetHeight - kinetigenButtonPadding.offsetHeight) / 2
    , walkerArray = []
    , solar_gradient_N = kctx.createLinearGradient(0, 0, 0, walkerCanal);
solar_gradient_N.addColorStop(0, "rgba(255, 223, 90, 0)"),
    solar_gradient_N.addColorStop(1, "rgba(255, 223, 90, 0.1)");
var solar_gradient_E = kctx.createLinearGradient(kinetigenScreen.width - walkerCanal, 0, kinetigenScreen.width, 0);
solar_gradient_E.addColorStop(0, "rgba(255, 223, 90, 0.1)"),
    solar_gradient_E.addColorStop(1, "rgba(255, 223, 90, 0)");
var solar_gradient_S = kctx.createLinearGradient(0, kinetigenScreen.height - walkerCanal, 0, kinetigenScreen.height);
solar_gradient_S.addColorStop(0, "rgba(255, 223, 90, 0.1)"),
    solar_gradient_S.addColorStop(1, "rgba(255, 223, 90, 0)");
var solar_gradient_W = kctx.createLinearGradient(0, 0, walkerCanal, 0);
solar_gradient_W.addColorStop(0, "rgba(255, 223, 90, 0)"),
    solar_gradient_W.addColorStop(1, "rgba(255, 223, 90, 0.1)");
var panelPos = [], animateTimeout, kinetigenClick = function() {
    clearTimeout(animateTimeout),
        power += parseFloat(kinetigenGain),
        totalPowerProduced += parseFloat(kinetigenGain),
        powerSpan.innerHTML = numberWithCommas(power.toFixed(0)),
        kinetigenScreen.style.transition = "all 0s",
        kinetigenScreen.style.backgroundColor = "#281922";
    for (var e = 0; e < kinetigenHiFiBars.length; e++)
        kinetigenHiFiBars[e].height = kinetigenHiFiBars[e].maxHeight,
            kinetigenHiFiBars[e].strokeHeight = kinetigenHiFiBars[e].maxHeight,
            kinetigenHiFiBars[e].speed = 0,
            kinetigenHiFiBars[e].finished = !1;
    thingMuted || (keyDownSound[keyDownSoundInt].play(),
        keyDownSoundInt++,
    keyDownSoundInt >= keyDownSound.length && (keyDownSoundInt = 0)),
        checkItems(),
        checkResearch(),
        animateTimeout = setTimeout(kinetigenAnimate, 40)
}
    , kinetigenRelease = function() {
    thingMuted || (keyUpSound[keyUpSoundInt].play(),
        keyUpSoundInt++,
    keyUpSoundInt >= keyUpSound.length && (keyUpSoundInt = 0))
}
    , kinetigenAnimate = function() {
    kinetigenScreen.style.transition = "all 0.5s",
        kinetigenScreen.style.backgroundColor = "#1a1a1a"
}
    , panelX = [0, kinetigenScreen.width - 2, 0, kinetigenScreen.width - 2], panelY = [kinetigenScreen.height / 2 - 1, kinetigenScreen.height / 2 - 1, kinetigenScreen.height / 2 + 2, kinetigenScreen.height / 2 + 2], panel = 1, kinetigenAddPanel = function() {
    kctx.beginPath(),
        shipInSunlight ? kctx.globalAlpha = 1 : kctx.globalAlpha = .3,
        1 == panel ? (panelPos.push([panelX[0], panelY[0]]),
            kctx.rect(panelX[0], panelY[0], 2, 2),
            panelY[0] > 0 ? panelY[0] -= 3 : panelX[0] += 3,
            panel = 2) : 2 == panel ? (panelPos.push([panelX[1], panelY[1]]),
            kctx.rect(panelX[1], panelY[1], 2, 2),
            panelY[1] > 0 ? panelY[1] -= 3 : panelX[1] -= 3,
            panel = 3) : 3 == panel ? (panelPos.push([panelX[2], panelY[2]]),
            kctx.rect(panelX[2], panelY[2], 2, 2),
            panelY[2] < kinetigenScreen.height - 3 ? panelY[2] += 3 : panelX[2] += 3,
            panel = 4) : 4 == panel && (panelPos.push([panelX[3], panelY[3]]),
            kctx.rect(panelX[3], panelY[3], 2, 2),
            panelY[3] < kinetigenScreen.height - 3 ? panelY[3] += 3 : panelX[3] -= 3,
            panel = 1),
        kctx.fillStyle = "#ffdf5a",
        kctx.fill(),
        kctx.closePath(),
        kctx.globalAlpha = 1
}
    , kinetigenUpdateWalkers = function() {
    if (screenFocus)
        if (gotPolishedPanels)
            for (var e = 0; e < walkerArray.length; e++)
                kctx.globalAlpha = walkerArray[e].opacity,
                    kctx.beginPath(),
                    kctx.moveTo(walkerArray[e].pos[0], walkerArray[e].pos[1]),
                    kctx.lineTo(kinetigenScreen.width / 2, kinetigenScreen.height / 2),
                    kctx.strokeStyle = walkerArray[e].color,
                    kctx.lineWidth = 1,
                    kctx.stroke(),
                    kctx.closePath(),
                    walkerArray[e].life--,
                    walkerArray[e].opacity -= .1,
                    kctx.globalAlpha = 1,
                (walkerArray[e].life <= 0 || walkerArray[e].opacity <= 0) && walkerArray.splice(e, 1);
        else
            for (var e = 0; e < walkerArray.length; e++) {
                if (walkerArray[e].trail.push([walkerArray[e].pos[0], walkerArray[e].pos[1]]),
                    walkerArray[e].trail.length > walkerArray[e].trailLength) {
                    walkerArray[e].trail.shift()
                }
                for (var t = walkerArray[e].trail.length - 1; t > -1; t--)
                    kctx.beginPath(),
                        kctx.globalAlpha = 1 - (walkerArray[e].trail.length - t) / walkerArray[e].trail.length,
                        kctx.rect(walkerArray[e].trail[t][0], walkerArray[e].trail[t][1], 1, 2),
                        kctx.fillStyle = walkerArray[e].color,
                        kctx.fill(),
                        kctx.closePath(),
                        kctx.globalAlpha = 1;
                kctx.beginPath(),
                    kctx.rect(walkerArray[e].pos[0], walkerArray[e].pos[1], 1, 1),
                    kctx.fillStyle = walkerArray[e].color,
                    kctx.fill(),
                    kctx.closePath(),
                    "N" === walkerArray[e].direction ? (walkerArray[e].pos[1] -= walkerArray[e].speed,
                    Math.random() > walkerArray[e].turnChance && (Math.random() > .5 ? walkerArray[e].pos[0] += 1 : walkerArray[e].pos[0] -= 1)) : "NE" === walkerArray[e].direction ? (walkerArray[e].pos[0] += walkerArray[e].speed,
                        walkerArray[e].pos[1] -= walkerArray[e].speed,
                    Math.random() > walkerArray[e].turnChance && (Math.random() > .5 ? walkerArray[e].pos[0] += 1 : walkerArray[e].pos[1] -= 1)) : "E" === walkerArray[e].direction ? (walkerArray[e].pos[0] += walkerArray[e].speed,
                    Math.random() > walkerArray[e].turnChance && (Math.random() > .5 ? walkerArray[e].pos[1] += 1 : walkerArray[e].pos[1] -= 1)) : "SE" === walkerArray[e].direction ? (walkerArray[e].pos[0] += walkerArray[e].speed,
                        walkerArray[e].pos[1] += walkerArray[e].speed,
                    Math.random() > walkerArray[e].turnChance && (Math.random() > .5 ? walkerArray[e].pos[0] += 1 : walkerArray[e].pos[1] += 1)) : "S" === walkerArray[e].direction ? (walkerArray[e].pos[1] += walkerArray[e].speed,
                    Math.random() > walkerArray[e].turnChance && (Math.random() > .5 ? walkerArray[e].pos[0] += 1 : walkerArray[e].pos[0] -= 1)) : "SW" === walkerArray[e].direction ? (walkerArray[e].pos[0] -= walkerArray[e].speed,
                        walkerArray[e].pos[1] += walkerArray[e].speed,
                    Math.random() > walkerArray[e].turnChance && (Math.random() > .5 ? walkerArray[e].pos[0] -= 1 : walkerArray[e].pos[1] += 1)) : "W" === walkerArray[e].direction ? (walkerArray[e].pos[0] -= walkerArray[e].speed,
                    Math.random() > walkerArray[e].turnChance && (Math.random() > .5 ? walkerArray[e].pos[1] += 1 : walkerArray[e].pos[1] -= 1)) : "NW" === walkerArray[e].direction && (walkerArray[e].pos[0] -= walkerArray[e].speed,
                        walkerArray[e].pos[1] -= walkerArray[e].speed,
                    Math.random() > walkerArray[e].turnChance && (Math.random() > .5 ? walkerArray[e].pos[0] -= 1 : walkerArray[e].pos[1] -= 1)),
                walkerArray[e].pos[0] > walkerCanal && walkerArray[e].pos[0] < kinetigenScreen.width - walkerCanal && walkerArray[e].pos[1] > walkerCanal && walkerArray[e].pos[1] < kinetigenScreen.height - walkerCanal && (kctx.beginPath(),
                    kctx.globalAlpha = walkerArray[e].opacity,
                    kctx.fillStyle = solar_gradient_N,
                    kctx.fillRect(walkerCanal, 0, kinetigenScreen.width - 2 * walkerCanal, walkerCanal),
                    kctx.closePath(),
                    kctx.beginPath(),
                    kctx.globalAlpha = walkerArray[e].opacity,
                    kctx.fillStyle = solar_gradient_E,
                    kctx.fillRect(kinetigenScreen.width - walkerCanal, walkerCanal, walkerCanal, kinetigenScreen.height - 2 * walkerCanal),
                    kctx.closePath(),
                    kctx.beginPath(),
                    kctx.globalAlpha = walkerArray[e].opacity,
                    kctx.fillStyle = solar_gradient_S,
                    kctx.fillRect(walkerCanal, kinetigenScreen.height - walkerCanal, kinetigenScreen.width - 2 * walkerCanal, walkerCanal),
                    kctx.closePath(),
                    kctx.beginPath(),
                    kctx.globalAlpha = walkerArray[e].opacity,
                    kctx.fillStyle = solar_gradient_W,
                    kctx.fillRect(0, walkerCanal, walkerCanal, kinetigenScreen.height - 2 * walkerCanal),
                    kctx.closePath(),
                    walkerArray[e].opacity -= .1,
                walkerArray[e].opacity <= 0 && (walkerArray[e].opacity = 0),
                    kctx.globalAlpha = 1),
                    walkerArray[e].trail[0][0] > walkerCanal && walkerArray[e].trail[0][0] < kinetigenScreen.width - walkerCanal && walkerArray[e].trail[0][1] > walkerCanal && walkerArray[e].trail[0][1] < kinetigenScreen.height - walkerCanal ? walkerArray.splice(e, 1) : (walkerArray[e].pos[0] >= kinetigenScreen.width - 3 || walkerArray[e].pos[0] <= 3 || walkerArray[e].pos[1] >= kinetigenScreen.height - 3 || walkerArray[e].pos[1] <= 3) && walkerArray.splice(e, 1)
            }
}
    , kinetigenSolarStrengthChange = function() {
    kctx.clearRect(0, 0, kinetigenScreen.width, kinetigenScreen.height),
        kctx.beginPath(),
        shipInSunlight ? kctx.globalAlpha = 1 : kctx.globalAlpha = .3;
    for (var e = 0; e < panelPos.length; e++)
        kctx.rect(panelPos[e][0], panelPos[e][1], 2, 2);
    kctx.fillStyle = "#ffdf5a",
        kctx.fill(),
        kctx.closePath(),
        kctx.globalAlpha = 1
}
    , kinetigenNextPanel = 0, kinetigenFireWalkers = function() {
    if (walkerSolarTracker < totalSolarProduced.toFixed(0)) {
        var e = totalSolarProduced.toFixed(0) - walkerSolarTracker;
        if (e > .15 * itemSolar.currentCount && (e = .15 * itemSolar.currentCount),
                screenFocus)
            if (gotPolishedPanels)
                for (var t = 0; e > t; t++) {
                    var a = {
                        pos: [panelPos[kinetigenNextPanel][0], panelPos[kinetigenNextPanel][1]],
                        color: "#ffdf5a",
                        life: 10,
                        opacity: 1
                    };
                    kinetigenNextPanel++,
                    kinetigenNextPanel == panelPos.length && (kinetigenNextPanel = 0),
                        walkerArray.push(a)
                }
            else
                for (var t = 0; e > t; t++) {
                    panelPos[kinetigenNextPanel][0] + 1 > walkerCanal && panelPos[kinetigenNextPanel][0] + 1 < kinetigenScreen.width - walkerCanal && panelPos[kinetigenNextPanel][1] > kinetigenScreen.height - walkerCanal ? (newDir = "N",
                        newPos = [panelPos[kinetigenNextPanel][0] + 1, panelPos[kinetigenNextPanel][1] - 2]) : panelPos[kinetigenNextPanel][0] + 1 < walkerCanal && panelPos[kinetigenNextPanel][1] > kinetigenScreen.height - walkerCanal ? (newDir = "NE",
                        newPos = [panelPos[kinetigenNextPanel][0] + 3, panelPos[kinetigenNextPanel][1] - 2]) : panelPos[kinetigenNextPanel][0] + 1 < walkerCanal && panelPos[kinetigenNextPanel][1] > walkerCanal && panelPos[kinetigenNextPanel][1] < kinetigenScreen.height - walkerCanal ? (newDir = "E",
                        newPos = [panelPos[kinetigenNextPanel][0] + 3, panelPos[kinetigenNextPanel][1]]) : panelPos[kinetigenNextPanel][0] + 1 < walkerCanal && panelPos[kinetigenNextPanel][1] < walkerCanal ? (newDir = "SE",
                        newPos = [panelPos[kinetigenNextPanel][0] + 3, panelPos[kinetigenNextPanel][1] + 3]) : panelPos[kinetigenNextPanel][0] + 1 > walkerCanal && panelPos[kinetigenNextPanel][0] + 1 < kinetigenScreen.width - walkerCanal && panelPos[kinetigenNextPanel][1] < walkerCanal ? (newDir = "S",
                        newPos = [panelPos[kinetigenNextPanel][0] + 1, panelPos[kinetigenNextPanel][1] + 3]) : panelPos[kinetigenNextPanel][0] + 1 > kinetigenScreen.width - walkerCanal && panelPos[kinetigenNextPanel][1] < walkerCanal ? (newDir = "SW",
                        newPos = [panelPos[kinetigenNextPanel][0] - 2, panelPos[kinetigenNextPanel][1] + 3]) : panelPos[kinetigenNextPanel][0] + 1 > kinetigenScreen.width - walkerCanal && panelPos[kinetigenNextPanel][1] > walkerCanal && panelPos[kinetigenNextPanel][1] < kinetigenScreen.height - walkerCanal ? (newDir = "W",
                        newPos = [panelPos[kinetigenNextPanel][0] - 2, panelPos[kinetigenNextPanel][1]]) : panelPos[kinetigenNextPanel][0] + 1 > kinetigenScreen.width - walkerCanal && panelPos[kinetigenNextPanel][1] > kinetigenScreen.height - walkerCanal && (newDir = "NW",
                        newPos = [panelPos[kinetigenNextPanel][0] - 2, panelPos[kinetigenNextPanel][1] - 2]);
                    var a = {
                        pos: newPos,
                        speed: 4,
                        trail: [],
                        trailLength: 10,
                        opacity: .5,
                        color: "#ffdf5a",
                        turnChance: .5,
                        direction: newDir,
                        life: 10
                    };
                    kinetigenNextPanel++,
                    kinetigenNextPanel == panelPos.length && (kinetigenNextPanel = 0),
                        walkerArray.push(a)
                }
    }
    walkerSolarTracker = totalSolarProduced.toFixed(0)
}
    , kinetigenDrawSplits = function() {
    kctx.beginPath(),
        kctx.moveTo(2.5, kinetigenScreen.height - 2.5),
        kctx.lineTo(kinetigenScreen.width - 2.5, kinetigenScreen.height - 2.5),
        kctx.lineTo(kinetigenScreen.width - 2.5, 2.5),
        kctx.lineTo(2.5, 2.5),
        kctx.lineTo(2.5, kinetigenScreen.height - 2.5),
        kctx.lineWidth = 1,
        kctx.strokeStyle = "#000",
        kctx.stroke(),
        kctx.closePath()
}
    , kinetigenHiFiBars = [], kHiFiBar = {
    maxHeight: .9 * walkerCanal,
    height: 0,
    strokeHeight: 0,
    dir: 1,
    width: 4,
    maxSpeed: 6,
    speed: 0,
    speedRamp: .25,
    color: "#ff3e3e",
    xpos: kinetigenScreen.width / 2 - 2,
    ypos: walkerCanal
};
kinetigenHiFiBars.push(kHiFiBar);
var kinetigenBarDrop = function() {
        for (var e = 0; e < kinetigenHiFiBars.length; e++)
            1 != kinetigenHiFiBars[e].finished && (kctx.beginPath(),
                kctx.rect(kinetigenHiFiBars[e].xpos, kinetigenHiFiBars[e].ypos, kinetigenHiFiBars[e].width, -kinetigenHiFiBars[e].height + 3),
                kctx.fillStyle = "#fff",
                kctx.fill(),
                kctx.closePath(),
                kctx.beginPath(),
                kctx.rect(kinetigenHiFiBars[e].xpos, kinetigenHiFiBars[e].ypos - kinetigenHiFiBars[e].strokeHeight, kinetigenHiFiBars[e].width, 3),
                kctx.fillStyle = kinetigenHiFiBars[e].color,
                kctx.fill(),
                kctx.closePath(),
                1 === kinetigenHiFiBars[e].dir ? (kinetigenHiFiBars[e].height > 0 || kinetigenHiFiBars[e].strokeHeight > 0 ? (kinetigenHiFiBars[e].height -= kinetigenHiFiBars[e].speed,
                    kinetigenHiFiBars[e].strokeHeight -= kinetigenHiFiBars[e].speed / 2,
                    kinetigenHiFiBars[e].speed < kinetigenHiFiBars[e].maxSpeed ? kinetigenHiFiBars[e].speed += kinetigenHiFiBars[e].speedRamp : kinetigenHiFiBars[e].speed = kinetigenHiFiBars[e].maxSpeed) : kinetigenHiFiBars[e].finished = !0,
                kinetigenHiFiBars[e].height < 0 && (kinetigenHiFiBars[e].height = 0)) : 0 === kinetigenHiFiBars[e].dir && ((kinetigenHiFiBars[e].height < 3 || kinetigenHiFiBars[e].strokeHeight < 3) && (kinetigenHiFiBars[e].height -= kinetigenHiFiBars[e].speed,
                    kinetigenHiFiBars[e].strokeHeight -= kinetigenHiFiBars[e].speed / 2,
                    kinetigenHiFiBars[e].speed > kinetigenHiFiBars[e].maxSpeed ? kinetigenHiFiBars[e].speed += kinetigenHiFiBars[e].speedRamp : kinetigenHiFiBars[e].speed = kinetigenHiFiBars[e].maxSpeed),
                kinetigenHiFiBars[e].height > 3 && (kinetigenHiFiBars[e].height = 3),
                kinetigenHiFiBars[e].strokeHeight > 2 && (kinetigenHiFiBars[e].strokeHeight = 5),
                kinetigenHiFiBars[e].strokeHeight > 2 && kinetigenHiFiBars[e].height > 3 && (kinetigenHiFiBars[e].finished = !0)))
    }
    , kinetigenWalker = function() {
        screenFocus && kctx.clearRect(2, 2, kinetigenScreen.width - 4, kinetigenScreen.height - 4),
            kinetigenUpdateWalkers(),
            kinetigenFireWalkers(),
        screenFocus && (kinetigenBarDrop(),
            kinetigenDrawSplits())
    }
    ;
setInterval(kinetigenWalker, 30);
var initDate = new Date("0000-01-01")
    , realDate = new Date("2343-04-12")
    , shipDateSpan = document.getElementById("ship__date")
    , updateDate = function() {
    if (!groundView) {
        var e = 57.44 * angleBetweenPoints([sPlanetOne.pos[0], sPlanetOne.pos[1]], [1, 0]);
        if (e.toFixed(0) != prevAngle) {
            var t = e.toFixed(0) - prevAngle;
            if (inhabitants__discovered) {
                realDate.setDate(realDate.getDate() + Math.abs(t));
                var a = realDate.getFullYear()
                    , s = realDate.getMonth()
                    , n = realDate.getDate()
                    , i = a
                    , o = o || "0";
                i += "";
                var a = i.length >= 4 ? i : new Array(4 - i.length + 1).join(o) + i
                    , i = s + 1
                    , o = o || "0";
                i += "";
                var s = i.length >= 2 ? i : new Array(2 - i.length + 1).join(o) + i
                    , i = n
                    , o = o || "0";
                i += "";
                var n = i.length >= 2 ? i : new Array(2 - i.length + 1).join(o) + i;
                shipDateSpan.innerHTML = a + "." + s + "." + n
            } else {
                initDate.setDate(initDate.getDate() + Math.abs(t));
                var a = initDate.getFullYear()
                    , s = initDate.getMonth()
                    , n = initDate.getDate()
                    , i = a
                    , o = o || "0";
                i += "";
                var a = i.length >= 4 ? i : new Array(4 - i.length + 1).join(o) + i
                    , i = s + 1
                    , o = o || "0";
                i += "";
                var s = i.length >= 2 ? i : new Array(2 - i.length + 1).join(o) + i
                    , i = n
                    , o = o || "0";
                i += "";
                var n = i.length >= 2 ? i : new Array(2 - i.length + 1).join(o) + i;
                shipDateSpan.innerHTML = a + "." + s + "." + n
            }
        }
        prevAngle = e.toFixed(0)
    }
}
    , landingStage = "space"
    , landingParticles = []
    , shipLanded = !1
    , groundView = !1
    , wrapperEnding = document.getElementById("ending__wrapper")
    , podLand__sound = new Audio("audio/pod/land.mp3");
soundArray.push(podLand__sound);
var hitground = !1, landPlayed = !1, shipLandingSequence = function() {
    if (gotLandshipAgain) {
        if ("landed" != landingStage) {
            var e = Math.sqrt(Math.pow(userBody.gravSrc.pos[0] - userBody.pos[0], 2) + Math.pow(userBody.gravSrc.pos[1] - userBody.pos[1], 2));
            if (e < userBody.gravSrc.radius + 15) {
                if ("space" == landingStage) {
                    pushLog("Entering atmosphere..."),
                        landingStage = "atmosphere";
                    var t = Math.sqrt(Math.pow(userBody.gravSrc.pos[0] - userBody.pos[0], 2) + Math.pow(userBody.gravSrc.pos[1] - userBody.pos[1], 2))
                        , a = .31 * Math.sqrt(bigG * userBody.gravSrc.mass * userBody.mass / t)
                        , s = [(userBody.gravSrc.pos[1] - userBody.pos[1]) / t, -((userBody.gravSrc.pos[0] - userBody.pos[0]) / t)]
                        , n = [s[0] * a, s[1] * a];
                    userBody.vel = [n[0], n[1]]
                }
                screenFocus && "atmosphere" == landingStage && drawTrail(userBody),
                    userBody.vel[0] *= .9996,
                    userBody.vel[1] *= .9996;
                for (var i = getRandomInt(50, 80) / 100, o = 0; o < uiReflections.length; o++)
                    uiReflections[o].style.opacity = i;
                if (scratchTexture.style.opacity = i / 2,
                    e < userBody.gravSrc.radius && (landPlayed || (thingMuted || podLand__sound.play(),
                        landPlayed = !0,
                        setTimeout(function() {
                            hitground = !0
                        }, 3700)),
                    "atmosphere" == landingStage && hitground)) {
                    for (var o = 0; o < uiReflections.length; o++)
                        uiReflections[o].style.cssText = "";
                    for (var s = [userBody.vel[1], -userBody.vel[0]], r = 0; 30 > r; r++) {
                        var l = getRandomInt(20, 80) / 100
                            , d = 1 - l
                            , c = [s[0] * l + userBody.vel[0] * d, s[1] * l + userBody.vel[1] * d]
                            , p = getRandomInt(800, 1e3) / 1e3
                            , u = getRandomInt(800, 1e3) / 1e3
                            , h = new PhysicsBody("particle",userBody.pos[0],userBody.pos[1],1,c[0] * p,c[1] * u,10,planetOne.colour,planetOne);
                        landingParticles.push(h)
                    }
                    landingStage = "landed",
                        shipLanded = !0,
                        status__gravSrc.innerHTML = "Orbiting mass: <span>Sol</span>",
                        pushLog("Landed ship successfully."),
                        scratchTexture.style.opacity = .8,
                        endingAudio.style.opacity = .4,
                        setTimeout(function() {
                            wrapperEnding.appendChild(endingVid),
                                endingVid.videoHeight = "100%",
                                endingVid.videoWidth = "100%",
                                endingVid.className = "ending__vid",
                                setTimeout(function() {
                                    endingVid.play(),
                                        endingVid.addEventListener("ended", endingTitle, !1),
                                        endingVid.volume = globalVolume
                                }, 800),
                                wrapperMain.style.top = "100%",
                                document.body.style.overflow = "hidden",
                                wrapperEnding.style.top = 0
                        }, 2e3),
                        ga("set", {
                            userId: USER_ID,
                            dimension1: shipName,
                            dimension2: USER_ID,
                            metric13: 1
                        }),
                        ga("send", "pageview"),
                        ga("set", {
                            metric13: 0
                        })
                }
            }
        }
    } else {
        var e = Math.sqrt(Math.pow(userPod.gravSrc.pos[0] - userPod.pos[0], 2) + Math.pow(userPod.gravSrc.pos[1] - userPod.pos[1], 2));
        if (e < userPod.gravSrc.radius + 15) {
            if ("space" == landingStage) {
                pushLog("Entering atmosphere..."),
                    landingStage = "atmosphere";
                var t = Math.sqrt(Math.pow(userPod.gravSrc.pos[0] - userPod.pos[0], 2) + Math.pow(userPod.gravSrc.pos[1] - userPod.pos[1], 2))
                    , a = .31 * Math.sqrt(bigG * userPod.gravSrc.mass * userPod.mass / t)
                    , s = [(userPod.gravSrc.pos[1] - userPod.pos[1]) / t, -((userPod.gravSrc.pos[0] - userPod.pos[0]) / t)]
                    , n = [s[0] * a, s[1] * a];
                userPod.vel = [n[0], n[1]]
            }
            screenFocus && "atmosphere" == landingStage && drawTrail(userPod),
                userPod.vel[0] *= .9996,
                userPod.vel[1] *= .9996;
            for (var i = getRandomInt(50, 80) / 100, o = 0; o < uiReflections.length; o++)
                uiReflections[o].style.opacity = i;
            if (e < userPod.gravSrc.radius + 10 && (landPlayed || (thingMuted || podLand__sound.play(),
                    landPlayed = !0,
                    shipLandFailSafe = !1,
                    setTimeout(function() {
                        hitground = !0,
                            shipLandFailSafe = !1
                    }, 3700)),
                "atmosphere" == landingStage && hitground)) {
                landPlayed = !1,
                    hitground = !1;
                for (var o = 0; o < uiReflections.length; o++)
                    uiReflections[o].style.cssText = "";
                for (var s = [userPod.vel[1], -userPod.vel[0]], r = 0; 30 > r; r++) {
                    var l = getRandomInt(20, 80) / 100
                        , d = 1 - l
                        , c = [s[0] * l + userPod.vel[0] * d, s[1] * l + userPod.vel[1] * d]
                        , p = getRandomInt(800, 1e3) / 1e3
                        , u = getRandomInt(800, 1e3) / 1e3
                        , h = new PhysicsBody("particle",userPod.pos[0],userPod.pos[1],1,c[0] * p,c[1] * u,10,planetOne.colour,planetOne);
                    landingParticles.push(h)
                }
                thingMuted || podLand__sound.play(),
                    landingStage = "landed",
                    shipLanded = !0,
                    status__gravSrc.innerHTML = "Orbiting mass: <span>Sol</span>",
                    queueLog(66, "Pod's still intact after that nasty impact..."),
                    queueLog(132, "Oh! The whole 'Earth' thing - yeah, looks like this is it. Let's get our radar improved using... I don't know... our massive spudnik network? Whatever. Just to confirm the 'Earth' theory."),
                    queueLog(132, "Also, think I've got enough data<br/>to understand how the humans all<br/>killed themselves. No point explaining<br/>to you - it's pretty complicated stuff. I may have a world-saving plan though... Get us that System Peeker, for sure."),
                    createResearch("systView"),
                void 0 != itemTaterTower && (itemTaterTower.conditions = !0,
                    itemTaterTower.costLineSpan.innerHTML = "<span id='cost'>" + numberWithCommas(itemTaterTower.currentCost) + "</span> power",
                    itemTaterTower.costSpan = itemTaterTower.el.querySelector("#cost")),
                    ga("set", {
                        userId: USER_ID,
                        dimension1: shipName,
                        dimension2: USER_ID,
                        metric11: 1
                    }),
                    ga("send", "pageview"),
                    ga("set", {
                        metric11: 0
                    });
                for (var g = 0; g < physicsBodies.length; g++)
                    physicsBodies[g] == userPod && physicsBodies.splice(g, 1)
            }
        }
    }
}
    , drawLandingParticles = function() {
    for (var e = 0; e < landingParticles.length; e++) {
        calculateGravity(landingParticles[e], landingParticles[e].gravSrc),
            landingParticles[e].updatePosition(),
        screenFocus && landingParticles[e].drawSelf(),
            landingParticles[e].vel[0] *= .999,
            landingParticles[e].vel[1] *= .999;
        var t = Math.sqrt(Math.pow(landingParticles[e].gravSrc.pos[0] - landingParticles[e].pos[0], 2) + Math.pow(landingParticles[e].gravSrc.pos[1] - landingParticles[e].pos[1], 2));
        t < landingParticles[e].gravSrc.radius - 10 && landingParticles.splice(e, 1)
    }
}
    , drawLandedPod = function() {
    re__earth || (userPod.updatePosition(),
        userPod.drawSelf())
}
    , drawLandedShip = function() {
    userBody.updatePosition(),
        userBody.drawSelf()
}
    , sSpuds = [], firedSpudsTracker = 0, firedTatersTracker = 0, spudFireVel = .2, taterFireVel = .1, spudParVel = .2, taterParVel = .1, solStartRad = 270, blackHoleMass = 3e7, sunCollapseRadius = 100, blackHoleMade = !1, blackHoleShrunk = !1, solShrinkT = 0, solShrinkB = 150, solShrinkC = -140, solShrinkD = 1, spudVisArray = [], fireSpuds = function() {
    if (firedSpudsTracker !== firedSpuds.toFixed(0))
        for (var e = firedSpuds.toFixed(0) - firedSpudsTracker, t = 0; e > t; t++) {
            var a = Math.sqrt(Math.pow(sPlanetOne.gravSrc.pos[0] - sPlanetOne.pos[0], 2) + Math.pow(sPlanetOne.gravSrc.pos[1] - sPlanetOne.pos[1], 2))
                , s = [sPlanetOne.gravSrc.pos[0] - sPlanetOne.pos[0], sPlanetOne.gravSrc.pos[1] - sPlanetOne.pos[1]]
                , n = [s[0] / a, s[1] / a]
                , i = [sPlanetOne.vel[0] * spudParVel + n[0] * spudFireVel, sPlanetOne.vel[1] * spudParVel + n[1] * spudFireVel]
                , o = new PhysicsBody("spud",sPlanetOne.pos[0],sPlanetOne.pos[1],1,i[0],i[1],1,"#fff",sol);
            sSpuds.push(o);
            var r = [sPlanetOne.gravSrc.pos[0] - sPlanetOne.pos[0], sPlanetOne.gravSrc.pos[1] - sPlanetOne.pos[1]]
                , l = Math.sqrt(Math.pow(r[0], 2) + Math.pow(r[1], 2))
                , d = [r[0] / l, r[1] / l];
            if (screenFocus) {
                var c = new ShotLine([spudguns[nextSpud].relPos[0], spudguns[nextSpud].relPos[1]],[spudguns[nextSpud].relPos[0] + 1e3 * d[0], spudguns[nextSpud].relPos[1] + 1e3 * d[1]],spudguns[nextSpud].radius / 2);
                spudVisArray.push(c),
                    nextSpud++
            }
            nextSpud >= spudguns.length && (nextSpud = 0)
        }
    if (firedSpudsTracker = firedSpuds.toFixed(0),
        firedTatersTracker !== firedTaters.toFixed(0))
        for (var p = firedTaters.toFixed(0) - firedTatersTracker, t = 0; p > t; t++) {
            var a = Math.sqrt(Math.pow(sPlanetOne.gravSrc.pos[0] - sPlanetOne.pos[0], 2) + Math.pow(sPlanetOne.gravSrc.pos[1] - sPlanetOne.pos[1], 2))
                , s = [sPlanetOne.gravSrc.pos[0] - sPlanetOne.pos[0], sPlanetOne.gravSrc.pos[1] - sPlanetOne.pos[1]]
                , n = [s[0] / a, s[1] / a]
                , i = [sPlanetOne.vel[0] * taterParVel + n[0] * taterFireVel, sPlanetOne.vel[1] * taterParVel + n[1] * taterFireVel]
                , o = new PhysicsBody("tater",sPlanetOne.pos[0],sPlanetOne.pos[1],2,i[0],i[1],2,"#fff",sol);
            sSpuds.push(o);
            var r = [sPlanetOne.gravSrc.pos[0] - sPlanetOne.pos[0], sPlanetOne.gravSrc.pos[1] - sPlanetOne.pos[1]]
                , l = Math.sqrt(Math.pow(r[0], 2) + Math.pow(r[1], 2))
                , d = [r[0] / l, r[1] / l];
            if (screenFocus) {
                var c = new ShotLine([launchers[nextLauncher].relPos[0], launchers[nextLauncher].relPos[1]],[launchers[nextLauncher].relPos[0] + 1e3 * d[0], launchers[nextLauncher].relPos[1] + 1e3 * d[1]],launchers[nextLauncher].radius / 2);
                spudVisArray.push(c),
                    nextLauncher++
            }
            nextLauncher >= launchers.length && (nextLauncher = 0)
        }
    firedTatersTracker = firedTaters.toFixed(0)
}
    , ShotLine = function(e, t, a) {
    this.p1 = e,
        this.p2 = t,
        this.weight = a,
        this.life = 5,
        this.drawSelf = function() {
            octx.beginPath(),
                octx.moveTo(this.p1[0], this.p1[1]),
                octx.lineTo(this.p2[0], this.p2[1]),
                octx.lineWidth = this.weight,
                octx.strokeStyle = "#00ffc2",
                octx.stroke(),
                octx.closePath(),
                this.life--
        }
}
    , fireSpudVis = function(e) {
    for (var t = 0; t < spudVisArray.length; t++)
        spudVisArray[t].drawSelf(),
        spudVisArray[t].life < 0 && spudVisArray.splice(t, 1)
}
    , updateSpuds = function() {
    for (var e = 0; e < sSpuds.length; e++) {
        calculateGravity(sSpuds[e], sSpuds[e].gravSrc),
            sSpuds[e].sUpdatePosition();
        var t = Math.sqrt(Math.pow(sSpuds[e].gravSrc.pos[0] - sSpuds[e].pos[0], 2) + Math.pow(sSpuds[e].gravSrc.pos[1] - sSpuds[e].pos[1], 2));
        t < sSpuds[e].gravSrc.radius && ("spud" == sSpuds[e].type && (sol.mass += spudMass * spudMassMultiplier),
        "tater" == sSpuds[e].type && (sol.mass += taterMass * taterMassMultiplier),
            sSpuds.splice(e, 1))
    }
    if (screenFocus)
        for (var e = 0; e < sSpuds.length; e++)
            sSpuds[e].sDrawSelf()
}
    , nextSpud = 0, nextLauncher = 0, correctPlanetVelocity = function() {
    var e = Math.sqrt(Math.pow(sPlanetOne.gravSrc.pos[0] - sPlanetOne.pos[0], 2) + Math.pow(sPlanetOne.gravSrc.pos[1] - sPlanetOne.pos[1], 2))
        , t = .15 * Math.sqrt(bigG * sPlanetOne.gravSrc.mass * sPlanetOne.mass / e)
        , a = [(sPlanetOne.gravSrc.pos[1] - sPlanetOne.pos[1]) / e, -((sPlanetOne.gravSrc.pos[0] - sPlanetOne.pos[0]) / e)]
        , s = [a[0] * t, a[1] * t];
    return s
}
    , horizonReached = !1, holeGrowTimer = 0, holeAnimateStage = 0, holeInitRad, allElements, elementsCounter = 0, the__newWrapper, the__newBg, the__body, futureDate, futureDateT = 0, yearMultiplier = 1.01, re__earth = !1, endingText = [], endingVid, scratchTexture, intohole__sound = new Audio("audio/events/intohole.mp3"), decay__sound = new Audio("audio/events/decay.mp3"), forward__sound = new Audio("audio/events/forward.mp3"), reverse1__sound = new Audio("audio/events/reverse1.mp3"), reverse2__sound = new Audio("audio/events/reverse2.mp3"), endingAudio = document.getElementById("ending-audio");
soundArray.push(intohole__sound),
    soundArray.push(decay__sound),
    soundArray.push(forward__sound),
    soundArray.push(reverse1__sound),
    soundArray.push(reverse2__sound);
var vidFailedInt = 0
    , intoTheHole = function() {
    if (1 == horizonReached)
        switch (holeAnimateStage) {
            case 0:
                endingVid = document.createElement("video"),
                    endingVid.addEventListener("error", videoFailed),
                    endingVid.src = "img/ending.mp4",
                    endingVid.autoplay = "false",
                    endingVid.preload = "auto",
                    endingVid.pause(),
                    endingVid.addEventListener("timeupdate", function() {
                        endingVid.currentTime > 24 && (endingAudio.style.opacity = 0)
                    }),
                    endingAudio.style.display = "block",
                    thingMuted ? (endingAudioSlider.value = 0,
                        endingVid.volume = 0,
                        globalVolume = 0) : endingAudioSlider.value = globalVolume,
                    endingAudioSlider.addEventListener("input", endingAudioVolume),
                    scratchTexture = document.createElement("img"),
                    scratchTexture.src = "http://www.pixhoster.info/f/2016-08/e5de1bfcbad5efb980e58397148dadfa.png",
                    scratchTexture.classList.add("scratchTexture"),
                    wrapperMain.insertBefore(scratchTexture, wrapperMain.childNodes[0]),
                    holeInitRad = sol.radius,
                    holeAnimateStage = 1,
                    ga("set", {
                        userId: USER_ID,
                        dimension1: shipName,
                        dimension2: USER_ID,
                        metric12: 1
                    }),
                    ga("send", "pageview"),
                    ga("set", {
                        metric12: 0
                    });
                break;
            case 1:
                var e = easeOutExpo(holeGrowTimer, holeInitRad, sCanvas.width, 100);
                sol.radius = e,
                    holeGrowTimer++,
                holeGrowTimer > 100 && (holeAnimateStage = 2,
                    the__newWrappersWrapper = document.createElement("div"),
                    document.body.style.margin = 0,
                    the__newWrappersWrapper.className = "the__new-wrapper",
                    the__newWrappersWrapper.style.position = "fixed",
                    the__newWrappersWrapper.style.width = "100%",
                    the__newWrappersWrapper.style.height = "100%",
                    the__newWrappersWrapper.style.background = "#fff",
                    the__newWrappersWrapper.style.zIndex = 9999,
                    document.body.appendChild(the__newWrappersWrapper),
                    the__newBg = document.createElement("div"),
                    the__newBg.style.width = "100%",
                    the__newBg.style.height = "100%",
                    the__newBg.style.background = "#161419",
                    the__newWrappersWrapper.appendChild(the__newBg),
                    the__newWrapper = wrapperMain.cloneNode(!0),
                    the__newBg.appendChild(the__newWrapper),
                    allElements = the__newWrapper.getElementsByTagName("*"),
                thingMuted || decay__sound.play());
                break;
            case 2:
                kinetigenHiFiBars = [];
                var t = {
                    maxHeight: .9 * walkerCanal,
                    height: 0,
                    strokeHeight: 0,
                    dir: 1,
                    width: 4,
                    maxSpeed: 6,
                    speed: 0,
                    speedRamp: .25,
                    color: "#ff3e3e",
                    xpos: kinetigenScreen.width / 2 - 2,
                    ypos: walkerCanal
                };
                kinetigenHiFiBars.push(t),
                    kinetigenGain = 1,
                    logContainer.innerHTML = "",
                    status__gravSrc.innerHTML = "Orbiting mass: <span class='status__container__span'>Re-Earth</span>",
                    sunMassProgressSpan.innerHTML = "Sun status: <span class='status__container__span'>doin' fine</span>",
                    physicsBodies2 = [],
                    sol = new PhysicsBody("sun",0,0,50,0,0,3e3,"#ffdf5a",null ,"","sol"),
                    sPlanetOne = new PhysicsBody("planetOne",200,0,2,0,.1,100,"#fc4646",sol,"","earth"),
                    physicsBodies2.push(sPlanetOne),
                    mercury = new PhysicsBody("planet",0,85,1,-.15,0,2e5,"#ffcc00",sol,mercuryBlurb,"mercury"),
                    physicsBodies2.push(mercury),
                    venus = new PhysicsBody("planet",170,0,2,0,.105,2e6,"#86ffca",sol,venusBlurb,"venus"),
                    physicsBodies2.push(venus),
                    mars = new PhysicsBody("planet",300,0,1,0,.075,2e5,"#ff7443",sol,marsBlurb,"mars"),
                    physicsBodies2.push(mars),
                    jupiter = new PhysicsBody("planet",0,-350,15,.06,0,2e8,"#ffa043",sol,jupiterBlurb,"jupiter"),
                    physicsBodies2.push(jupiter),
                    saturn = new PhysicsBody("planet",380,0,12,0,.06,2e8,"#f9d293",sol,saturnBlurb,"saturn"),
                    physicsBodies2.push(saturn),
                    uranus = new PhysicsBody("planet",-450,0,7,0,-.045,2e7,"#18E6FF",sol,uranusBlurb,"uranus"),
                    physicsBodies2.push(uranus),
                    neptune = new PhysicsBody("planet",500,0,7,0,.06,2e7,"#45B9FF",sol,neptuneBlurb,"neptune"),
                    physicsBodies2.push(neptune),
                    pluto = new PhysicsBody("planet",520,0,1,0,.045,2e5,"#D9F5FF",sol,plutoBlurb,"pluto"),
                    physicsBodies2.push(pluto),
                    physicsBodies2.push(sol),
                    sol.sUpdatePosition(),
                    physicsBodies = [],
                    probes = [],
                    landedProbes = [],
                    spudniks = [],
                    potatoPlants = [],
                    landedPotatoPlants = [],
                    taterTowers = [],
                    landedTaterTowers = [],
                    spudguns = [],
                    launchers = [],
                    userPod = "",
                    userBody = "",
                    planetOne = "",
                    planetOne = new PhysicsBody("planet",0,0,25,0,0,32e3,"#3060cf",null ),
                    physicsBodies.push(planetOne),
                    userBody = new PhysicsBody("ship",0,-90,2,.5,0,10,"#fff",planetOne),
                    physicsBodies.push(userBody),
                    moon = new PhysicsBody("planet",0,300,10,-.28,0,3e3,"#ccc",planetOne),
                    physicsBodies.push(moon),
                    initDate = new Date("January 01, 2072 11:13:00"),
                    realDate = new Date("January 01, 2072 11:13:00"),
                    re__earth = !0,
                    shipStatusSpan.innerHTML = "<span>Ship Status:</span> anxious";
                for (var a = 0; a < availableItems.length; a++)
                    availableItems[a].el.parentNode.removeChild(availableItems[a].el);
                availableItems = [];
                for (var a = 0; a < lockedItems.length; a++)
                    lockedItems[a].el.parentNode.removeChild(lockedItems[a].el);
                lockedItems = [],
                    power = 0;
                for (var a = 0; a < availableResearch.length; a++)
                    availableResearch[a].el.parentNode.removeChild(availableResearch[a].el);
                availableResearch = [],
                    createResearch("landshipAgain");
                for (var s = 0; 3 > s; s++)
                    elementsCounter < allElements.length && ("wrapper" == allElements[elementsCounter].className ? allElements[elementsCounter].classList.add("keep") : "wrapper--left" == allElements[elementsCounter].className ? allElements[elementsCounter].classList.add("keep") : "wrapper__column--top" == allElements[elementsCounter].className ? allElements[elementsCounter].classList.add("keep") : "container--high" == allElements[elementsCounter].className && allElements[elementsCounter].classList.add("keep"),
                    "status__gradient" == allElements[elementsCounter].className && (allElements[elementsCounter].style.display = "none"),
                        allElements[elementsCounter].removeAttribute("style"),
                        allElements[elementsCounter].style.color = "#222",
                        allElements[elementsCounter].style.backgroundColor = "transparent",
                        allElements[elementsCounter].style.fontFamily = "serif",
                    "IMG" == allElements[elementsCounter].tagName && (allElements[elementsCounter].style.display = "none"),
                    "CANVAS" == allElements[elementsCounter].tagName && (allElements[elementsCounter].style.display = "none"),
                    "BODY" == allElements[elementsCounter].tagName && (the__body = allElements[elementsCounter],
                        allElements[elementsCounter].style.color = "#222",
                        allElements[elementsCounter].style.background = "transparent",
                        allElements[elementsCounter].style.fontFamily = "serif"),
                        elementsCounter++);
                if (the__newBg.style.background = "#fff",
                    elementsCounter >= allElements.length) {
                    holeAnimateStage = 3,
                        elementsCounter = 0;
                    var n = document.createElement("div");
                    n.classList.add("ending__dateContainer"),
                        the__newBg.appendChild(n);
                    var i = document.createElement("div");
                    n.appendChild(i),
                        the__futureDate = document.createElement("p"),
                        i.appendChild(the__futureDate),
                        i.classList.add("ending__dateHolder"),
                        i.style["float"] = "left",
                        the__futureDate.style.fontSize = "14px",
                        the__futureDate.style.marginLeft = "100px",
                        the__futureDate.style.height = "400px",
                        futureDate = realDate.getFullYear();
                    var i = document.createElement("div");
                    n.appendChild(i),
                        the__futureText = document.createElement("p"),
                        i.appendChild(the__futureText),
                        i.classList.add("ending__dateHolder"),
                        i.style["float"] = "right",
                        the__futureText.style.fontSize = "14px",
                        the__futureText.style.marginRight = "100px",
                        the__futureText.style.height = "400px",
                    thingMuted || forward__sound.play(),
                        the__futureDate.innerHTML = "YEAR ~ <br/>" + veryBigNumber() + "AD"
                }
                break;
            case 3:
                for (var s = 0; 3 > s; s++)
                    elementsCounter < allElements.length && (elementsCounter < allElements.length && "keep" != allElements[elementsCounter].className && "the__date" != allElements[elementsCounter].className && "BODY" != allElements[elementsCounter].tagName && "HTML" != allElements[elementsCounter].tagName && (allElements[elementsCounter].style.display = "none"),
                        elementsCounter++);
                the__futureDate.innerHTML = "YEAR ~ <br/>" + veryBigNumber() + "AD",
                elementsCounter == allElements.length && (holeAnimateStage = 5,
                    elementsCounter = 0);
                break;
            case 5:
                32 > numberLength ? the__futureDate.innerHTML = "YEAR ~ <br/>" + veryBigNumber() + "AD" : 12 > firstDigits ? the__futureDate.innerHTML = "YEAR ~ <br/>" + veryBigNumber() + "AD" : (setTimeout(function() {
                    var e = document.createElement("p");
                    endingText.push(e),
                        e.classList.add("endingText--invis"),
                        e.innerHTML = "The universe stops expanding.",
                    thingMuted || messageBegin__sound.play(),
                        the__futureText.appendChild(e)
                }, 2e3),
                    setTimeout(function() {
                        endingText[0].classList.add("endingText")
                    }, 2010),
                    setTimeout(function() {
                        var e = document.createElement("p");
                        endingText.push(e),
                            e.classList.add("endingText--invis"),
                            e.innerHTML = "The Arrow of Time reverses.",
                        thingMuted || messageProcede__sound[2].play(),
                            the__futureText.appendChild(e),
                            time = "backward",
                            increaseSpeed = -1,
                            increaseAcc = .01,
                        thingMuted || reverse1__sound.play()
                    }, 4e3),
                    setTimeout(function() {
                        endingText[1].className = "endingText"
                    }, 4010),
                    setTimeout(function() {
                        var e = document.createElement("p");
                        endingText.push(e),
                            e.classList.add("endingText--invis"),
                            e.innerHTML = "Don't go telling your mate Gus<br/>down the pub that this is how<br/>time works<br/>&mdash; it probably isn't.",
                        thingMuted || messageConclude__sound.play(),
                            the__futureText.appendChild(e)
                    }, 8e3),
                    setTimeout(function() {
                        endingText[2].className = "endingText"
                    }, 8010),
                    setTimeout(function() {
                        var e = document.createElement("p");
                        endingText.push(e),
                            e.classList.add("endingText--invis"),
                            e.id = "keep",
                            e.innerHTML = "Anyways,",
                        thingMuted || messageBegin__sound.play(),
                            the__futureText.appendChild(e)
                    }, 14e3),
                    setTimeout(function() {
                        endingText[3].className = "endingText"
                    }, 14010),
                    holeAnimateStage = 5.1);
                break;
            case 5.1:
                if ("backward" === time ? the__futureDate.innerHTML = "YEAR ~ <br/>" + veryBigNumber() + "AD" : "BC" === time && (the__futureDate.innerHTML = "YEAR ~ <br/>" + veryBigNumber() + "BC"),
                    0 >= numberLength && "backward" === time && (time = "BC"),
                    numberLength >= 3 && "BC" === time) {
                    time = "bigBang",
                        the__futureDate.innerHTML = "YEAR ~ <br/>13,712,747,368BC";
                    for (var a = 0; a < endingText.length; a++)
                        "keep" != endingText.id && (endingText[a].className = "endingText--invis");
                    setTimeout(function() {
                        the__futureText.innerHTML = "",
                            endingText = [];
                        var e = document.createElement("p");
                        endingText.push(e),
                            e.classList.add("endingText--invis"),
                            e.innerHTML = "The Big Bang.",
                        thingMuted || messageProcede__sound[1].play(),
                            the__futureText.appendChild(e)
                    }, 5e3),
                        setTimeout(function() {
                            endingText[0].className = "endingText"
                        }, 5010),
                        setTimeout(function() {
                            var e = document.createElement("p");
                            endingText.push(e),
                                e.classList.add("endingText--invis"),
                                e.innerHTML = "The Arrow of Time reverses.",
                            thingMuted || messageProcede__sound[3].play(),
                                the__futureText.appendChild(e),
                                time = "AD",
                                futureDateT = 0,
                            thingMuted || reverse2__sound.play()
                        }, 7e3),
                        setTimeout(function() {
                            endingText[1].className = "endingText"
                        }, 7010),
                        holeAnimateStage = 5.2
                }
                break;
            case 5.2:
                if ("AD" === time) {
                    futureDate = easeInOutExpo(futureDateT, 13712747368, -13712749440, 100);
                    var o = "";
                    if (o = parseFloat(futureDate) < 0 ? "AD" : "BC",
                            the__futureDate.innerHTML = "YEAR ~ <br/>" + numberWithCommas(Math.abs(futureDate.toFixed(0))) + o,
                            futureDateT++,
                        150 == futureDateT)
                        for (var a = 0; a < endingText.length; a++)
                            endingText[a].className = "endingText--invis";
                    if (futureDateT >= 280) {
                        the__futureText.innerHTML = "",
                            endingText = [];
                        var r = document.createElement("p");
                        endingText.push(r),
                            r.classList.add("endingText--invis"),
                            r.innerHTML = "Present day.",
                        thingMuted || messageBegin__sound.play(),
                            the__futureText.appendChild(r),
                            setTimeout(function() {
                                endingText[0].className = "endingText"
                            }, 10),
                            setTimeout(function() {
                                var e = document.createElement("p");
                                endingText.push(e),
                                    e.classList.add("endingText--invis"),
                                    e.innerHTML = "Well, sort of the past...",
                                thingMuted || messageProcede__sound[3].play(),
                                    the__futureText.appendChild(e)
                            }, 2e3),
                            setTimeout(function() {
                                endingText[1].className = "endingText"
                            }, 2010),
                            setTimeout(function() {
                                var e = document.createElement("p");
                                endingText.push(e),
                                    e.classList.add("endingText--invis"),
                                    e.innerHTML = "but also kind of the future?",
                                thingMuted || messageProcede__sound[1].play(),
                                    the__futureText.appendChild(e)
                            }, 4e3),
                            setTimeout(function() {
                                endingText[2].className = "endingText"
                            }, 4010),
                            setTimeout(function() {
                                var e = document.createElement("p");
                                endingText.push(e),
                                    e.classList.add("endingText"),
                                    e.innerHTML = "Whatever.",
                                thingMuted || messageConclude__sound.play(),
                                    the__futureText.appendChild(e)
                            }, 6e3),
                            setTimeout(function() {
                                time = "presentDay"
                            }, 8e3),
                            holeAnimateStage = 5.3
                    }
                }
                break;
            case 5.3:
                "presentDay" == time && (oCanvas.style.display = "block",
                    sCanvas.style.display = "none",
                    planViewButton.className = "center__header--plan",
                    systViewButton.className = "center__header--syst",
                    systViewButton.style.display = "inline",
                    planViewButton.style.cursor = "auto",
                    systViewButton.style.cursor = "pointer",
                    systemPeekerType.className = "center__header--systSmall",
                    planetLookerType.className = "center__header--systLarge",
                    panelPos = [],
                    kinetigenSolarStrengthChange(),
                    holeAnimateStage = 5.4,
                    the__newWrappersWrapper.style.opacity = 0,
                    setTimeout(function() {
                        the__newWrappersWrapper.parentNode.removeChild(the__newWrappersWrapper),
                            holeAnimateStage = 6,
                            queueLog(33, "Starting..."),
                            queueLog(66, "Loading 'Hopper Rad-Type' systems..."),
                            queueLog(33, "Done."),
                            queueLog(66, "Loading idiolect..."),
                            queueLog(33, "Sorted."),
                            queueLog(66, "Right, hero time.")
                    }, 200));
                break;
            case 5.4:
                break;
            case 6:
        }
}
    , firstDigits = 2
    , increaseSpeed = 1
    , increaseAcc = .01
    , increaseAccAgain = .01
    , numberLength = 1
    , time = "forward"
    , veryBigNumber = function() {
    if ("forward" === time) {
        firstDigits += increaseSpeed,
            increaseSpeed += increaseAcc,
            increaseAcc += increaseAccAgain,
        firstDigits >= 999 && (firstDigits = 1,
            numberLength += 1);
        for (var e = "", t = 0; numberLength > t; t++) {
            e += ",",
            4 == t && (e += "<br/>"),
            9 == t && (e += "<br/>"),
            14 == t && (e += "<br/>"),
            19 == t && (e += "<br/>"),
            24 == t && (e += "<br/>"),
            29 == t && (e += "<br/>");
            for (var a = 0; 3 > a; a++) {
                var s = getRandomInt(0, 9);
                e += s.toString()
            }
        }
        var n = firstDigits.toFixed(0).toString() + e;
        return n
    }
    if ("backward" === time) {
        firstDigits -= increaseSpeed,
            increaseSpeed += increaseAcc,
            increaseAcc += increaseAccAgain,
        0 >= firstDigits && (firstDigits = 999,
            numberLength -= 1);
        for (var e = "", t = 0; numberLength > t; t++) {
            for (var a = 0; 3 > a; a++) {
                var s = getRandomInt(0, 9);
                e += s.toString()
            }
            e += ",",
            4 == t && (e += "<br/>"),
            9 == t && (e += "<br/>"),
            14 == t && (e += "<br/>"),
            19 == t && (e += "<br/>"),
            24 == t && (e += "<br/>"),
            29 == t && (e += "<br/>")
        }
        var n = e + firstDigits.toFixed(0).toString();
        return n
    }
    if ("BC" === time) {
        firstDigits += increaseSpeed,
            increaseSpeed += increaseAcc,
            increaseAcc += increaseAccAgain,
        firstDigits >= 999 && (firstDigits = 1,
            numberLength += 1);
        for (var e = "", t = 0; numberLength > t; t++) {
            e += ",",
            4 == t && (e += "<br/>"),
            9 == t && (e += "<br/>"),
            14 == t && (e += "<br/>"),
            19 == t && (e += "<br/>"),
            24 == t && (e += "<br/>"),
            29 == t && (e += "<br/>");
            for (var a = 0; 3 > a; a++) {
                var s = getRandomInt(0, 9);
                e += s.toString()
            }
        }
        var n = firstDigits.toFixed(0).toString() + e;
        return n
    }
}
    , endTitleSeq = [];
endTitleSeq[0] = [],
    endTitleSeq[1] = [],
    endTitleSeq[2] = [],
    endTitleSeq[3] = [];
var endingTitle = function() {
    var e = document.createElement("div");
    e.className = "endingTitleWrapper",
        wrapperEnding.insertBefore(e, wrapperEnding.childNodes[0]),
        e.style.opacity = 0,
        e.style.transition = "all 2s",
        endTitleSeq[0].push(e);
    var t = document.createElement("div");
    t.classList.add("about__wrapper"),
        e.appendChild(t);
    var a = document.createElement("div");
    a.classList.add("logo__wrapper--spaceplan"),
        t.appendChild(a);
    var s = document.createElement("img");
    s.classList.add("logo__spaceplan"),
        a.appendChild(s),
        s.src = "img/spaceplan.svg",
        s.style.opacity = 0,
        s.style.transition = "all 2s",
        endTitleSeq[0].push(s);
    var n = document.createElement("p");
    n.innerHTML = 'Created by Jake Hollands<br/><a href="https://twitter.com/jhollands_" target="_blank">twitter</a> | <a href="http://jhollands.co.uk" target="_blank">jhollands.co.uk</a> | <a href="mailto:jake@jhollands.co.uk" target="_blank">email</a>',
        t.appendChild(n),
        n.style.opacity = 0,
        n.style.transition = "all 2s",
        endTitleSeq[1].push(n);
    var i = document.createElement("p");
    i.innerHTML = 'Audio by Logan Gabriel<br/><a href="https://soundcloud.com/logangabriel" target="_blank">soundcloud</a>',
        t.appendChild(i),
        i.style.opacity = 0,
        i.style.transition = "all 2s",
        endTitleSeq[2].push(i);
    var o = document.createElement("span");
    o.innerHTML = "Disposable Income Leaderboard:",
        t.appendChild(o),
        o.style.opacity = 0,
        o.style.transition = "all 2s",
        endTitleSeq[3].push(o);
    var r = document.createElement("div");
    r.classList.add("cont__list"),
        r.id = "contributor-list-ending",
        t.appendChild(r),
        r.style.opacity = 0,
        r.style.transition = "all 2s",
        endTitleSeq[3].push(r);
    for (var l = 0; 3 > l; l++) {
        var d = document.createElement("div");
        d.classList.add("cont__row"),
            r.appendChild(d);
        var c = document.createElement("div");
        c.classList.add("cont__name"),
            c.innerHTML = "Loading...",
            d.appendChild(c);
        var p = document.createElement("div");
        p.classList.add("cont__don"),
            d.appendChild(p)
    }
    var u = document.createElement("a");
    u.href = "https://imraising.tv/u/jhollands",
        u.target = "_blank",
        t.appendChild(u),
        u.style.opacity = 0,
        u.style.transition = "all 2s",
        endTitleSeq[3].push(u);
    var h = document.createElement("div");
    h.classList.add("about__cont"),
        h.innerHTML = "Tip with Paypal",
        u.appendChild(h),
        h.style.opacity = 0,
        h.style.transition = "all 2s",
        endTitleSeq[3].push(h);
    var g = document.createElement("p");
    g.innerHTML = "Thanks for help & advice<br/>Guy<span class='no-break'>&nbsp;</span>Martin, Joe<span class='no-break'>&nbsp;</span>Hollands & Rich<span class='no-break'>&nbsp;</span>B<br/><br/>Thanks for playing & testing to<br/>CJ<span class='no-break'>&nbsp;</span>Harries, Shadow<span class='no-break'>&nbsp;</span>Phillips, Konng_, Ed<span class='no-break'>&nbsp;</span>Gallagher,<br/>Alex<span class='no-break'>&nbsp;</span>Woodhouse, JPTiger, Kimbrian<span class='no-break'>&nbsp;</span>Marshall,<br/>Joe<span class='no-break'>&nbsp;</span>Hollands, Ben<span class='no-break'>&nbsp;</span>Hollands, James<span class='no-break'>&nbsp;</span>Neal,<br/>Marc<span class='no-break'>&nbsp;</span>Gunthorpe, Grant<span class='no-break'>&nbsp;</span>Chidzey, Kieran<span class='no-break'>&nbsp;</span>Delbaere,<br/>deeprot, Adric<span class='no-break'>&nbsp;</span>Burks, Frederick<span class='no-break'>&nbsp;</span>Lebel & spacetimewanderer",
        t.appendChild(g),
        g.style.opacity = 0,
        g.style.transition = "all 2s",
        endTitleSeq[3].push(g),
        contList = document.getElementById("contributor-list-ending"),
        getGivers(),
        setTimeout(function() {
            for (var e = 0; e < endTitleSeq[0].length; e++)
                endTitleSeq[0][e].style.opacity = 1;
            endingAudio.style.display = "none"
        }, 10),
        setTimeout(function() {
            for (var e = 0; e < endTitleSeq[1].length; e++)
                endTitleSeq[1][e].style.opacity = 1
        }, 2e3),
        setTimeout(function() {
            for (var e = 0; e < endTitleSeq[2].length; e++)
                endTitleSeq[2][e].style.opacity = 1
        }, 4e3),
        setTimeout(function() {
            for (var e = 0; e < endTitleSeq[3].length; e++)
                endTitleSeq[3][e].style.opacity = 1
        }, 6e3)
}
    , videoFailed = function(e) {
    if (0 == vidFailedInt)
        endingVid.src = "img/ending.webm",
            endingVid.autoplay = "false",
            endingVid.preload = "auto",
            endingVid.pause(),
            endingVid.addEventListener("timeupdate", function() {
                endingVid.currentTime > 24 && (endingAudio.style.opacity = 0)
            }),
            vidFailedInt++;
    else if (1 == vidFailedInt)
        endingVid.src = "img/ending.ogv",
            endingVid.autoplay = "false",
            endingVid.preload = "auto",
            endingVid.pause(),
            endingVid.addEventListener("timeupdate", function() {
                endingVid.currentTime > 24 && (endingAudio.style.opacity = 0)
            }),
            vidFailedInt++;
    else {
        holeAnimateStage = 1.5;
        var t = document.createElement("div");
        t.classList.add("mobile-disclaimer"),
            document.body.appendChild(t),
            t.style.display = "flex";
        var a = document.createElement("div");
        a.classList.add("mobile-disclaimer__inner"),
            t.appendChild(a);
        var s = document.createElement("div");
        s.innerHTML = "ERROR: " + e.target.error.code + "<br/><br/>This is embarrassing. For some reason the black hole isn't working.<br/>Here's a guide to try and solve this issue quickly:<br/><a href='error/guide.txt'>Click me</a>",
            a.appendChild(s)
    }
}
    , endingAudioSlider = document.getElementById("endingAudioSlider")
    , endingAudioVolume = function() {
    globalVolume = endingAudioSlider.value,
        endingVid.volume = globalVolume,
        thingMuted = !1
}
    , manufactureHeader = document.getElementById("manufacture__header")
    , developHeader = document.getElementById("develop__header")
    , infoHeader = document.getElementById("info__header")
    , thingMaker__container = document.getElementById("thingmaker__container")
    , information__container = document.getElementById("information__container")
    , develop__container = document.getElementById("develop__wrapper")
    , thingMakerCanvas = document.getElementById("thingmaker__canvas")
    , centerPowerCanvas = document.getElementById("centerPower__canvas")
    , informationCanvas = document.getElementById("information__canvas")
    , developCanvas = document.getElementById("develop__canvas")
    , tmctx = thingMakerCanvas.getContext("2d")
    , cpctx = centerPowerCanvas.getContext("2d")
    , inctx = informationCanvas.getContext("2d")
    , dectx = developCanvas.getContext("2d")
    , headerHr = document.getElementById("header__hr");
planetLookerType.style.opacity = 0,
    systemPeekerType.style.opacity = 0,
    manufactureContainer.style.opacity = 0,
    manufactureHeader.style.opacity = 0,
    infoHeader.style.opacity = 0,
    developHeader.style.opacity = 0,
    developContainer.style.opacity = 0,
    oCanvas.style.opacity = 0,
    planViewButton.style.opacity = 0;
var thingMakerInit__sound = new Audio("audio/init/thingmaker.mp3")
    , developInit__sound = new Audio("audio/init/idealister.mp3")
    , informationInit__sound = new Audio("audio/init/factholder.mp3")
    , centerPowerInit__sound = new Audio("audio/init/title.mp3")
    , allInit__sound = new Audio("audio/init/titleresume.mp3");
soundArray.push(thingMakerInit__sound),
    soundArray.push(developInit__sound),
    soundArray.push(informationInit__sound),
    soundArray.push(centerPowerInit__sound),
    soundArray.push(allInit__sound);
var intro = !0, tmIntro = !0, deIntro = !0, inIntro = !0, cpIntro = !0, tmBootLog = !1, deBootLog = !1, inBootLog = !1, cpBootLog = !1, UiSquare = function(e, t, a, s, n, i, o, r, l, d, c, p) {
    this.x = e,
        this.y = t,
        this.initX = e,
        this.initY = t,
        this.w = a,
        this.h = s,
        this.initW = a,
        this.initH = s,
        this.targetX = n,
        this.targetY = i,
        this.targetW = o,
        this.targetH = r,
        this.col = l,
        this.duration = d,
        this.time = 0,
        this.ease = c,
        this.screen = p,
        this.extraX = 0,
        this.extraY = 0,
        this.drawSelf = function() {
            switch (this.screen) {
                case "thingMaker":
                    tmctx.beginPath(),
                        tmctx.rect(tmAnchor[0] + this.x, tmAnchor[1] + this.y, this.w, this.h),
                        tmctx.fillStyle = this.col,
                        tmctx.fill(),
                        tmctx.closePath();
                    break;
                case "develop":
                    dectx.beginPath(),
                        dectx.rect(deAnchor[0] + this.x, deAnchor[1] + this.y, this.w, this.h),
                        dectx.fillStyle = this.col,
                        dectx.fill(),
                        dectx.closePath();
                    break;
                case "information":
                    inctx.beginPath(),
                        inctx.rect(inAnchor[0] + this.x, inAnchor[1] + this.y, this.w, this.h),
                        inctx.fillStyle = this.col,
                        inctx.fill(),
                        inctx.closePath();
                    break;
                case "center":
                    cpctx.beginPath(),
                        cpctx.rect(cpAnchor[0] + this.x, cpAnchor[1] + this.y, this.w, this.h),
                        cpctx.fillStyle = this.col,
                        cpctx.fill(),
                        cpctx.closePath()
            }
        }
        ,
        this.transform = function() {
            var e, t, a, s;
            "out" == this.ease ? (e = easeOutExpo(this.time, this.initW, this.targetW, this.duration),
                t = easeOutExpo(this.time, this.initH, this.targetH, this.duration),
                a = easeOutExpo(this.time, this.initX, this.targetX, this.duration),
                s = easeOutExpo(this.time, this.initY, this.targetY, this.duration)) : "inout" == this.ease && (e = easeInOutExpo(this.time, this.initW, this.targetW, this.duration),
                t = easeInOutExpo(this.time, this.initH, this.targetH, this.duration),
                a = easeInOutExpo(this.time, this.initX, this.targetX, this.duration),
                s = easeInOutExpo(this.time, this.initY, this.targetY, this.duration)),
                this.w = e,
                this.h = t,
                this.x = a,
                this.y = s,
                this.time++,
                this.targetX += this.extraX,
                this.targetY += this.extraY,
            this.time >= this.duration && (this.state = "done")
        }
}
    , UiCircle = function(e, t, a, s, n, i, o, r, l, d, c, p, u, h, g) {
    this.x = e,
        this.y = t,
        this.initX = e,
        this.initY = t,
        this.r = a,
        this.sA = s,
        this.eA = n,
        this.initR = a,
        this.initSA = s,
        this.initEA = n,
        this.targetX = i,
        this.targetY = o,
        this.targetR = r,
        this.targetSA = l,
        this.targetEA = d,
        this.counterClockWise = c,
        this.col = p,
        this.duration = u,
        this.time = 0,
        this.ease = h,
        this.screen = g,
        this.extraX = 0,
        this.extraY = 0,
        this.drawSelf = function() {
            switch (this.screen) {
                case "thingMaker":
                    tmctx.beginPath(),
                        tmctx.arc(tmAnchor[0] + this.x, tmAnchor[1] + this.y, this.r, this.sA, this.eA * Math.PI),
                        tmctx.fillStyle = this.col,
                        tmctx.fill(),
                        tmctx.closePath();
                    break;
                case "develop":
                    dectx.beginPath(),
                        dectx.arc(deAnchor[0] + this.x, deAnchor[1] + this.y, this.r, this.sA, this.eA * Math.PI),
                        dectx.fillStyle = this.col,
                        dectx.fill(),
                        dectx.closePath();
                    break;
                case "information":
                    inctx.beginPath(),
                        inctx.arc(inAnchor[0] + this.x, inAnchor[1] + this.y, this.r, this.sA, this.eA * Math.PI),
                        inctx.fillStyle = this.col,
                        inctx.fill(),
                        inctx.closePath();
                    break;
                case "center":
                    cpctx.beginPath(),
                        cpctx.arc(cpAnchor[0] + this.x, cpAnchor[1] + this.y, this.r, this.sA, this.eA * Math.PI),
                        cpctx.fillStyle = this.col,
                        cpctx.fill(),
                        cpctx.closePath()
            }
        }
        ,
        this.transform = function() {
            var e, t, a, s, n;
            "out" == this.ease ? (e = easeOutExpo(this.time, this.initX, this.targetX, this.duration),
                t = easeOutExpo(this.time, this.initY, this.targetY, this.duration),
                a = easeOutExpo(this.time, this.initR, this.targetR, this.duration),
                s = easeOutExpo(this.time, this.initSA, this.targetSA, this.duration),
                n = easeOutExpo(this.time, this.initEA, this.targetEA, this.duration)) : "inout" == this.ease && (e = easeInOutExpo(this.time, this.initX, this.targetX, this.duration),
                t = easeInOutExpo(this.time, this.initY, this.targetY, this.duration),
                a = easeInOutExpo(this.time, this.initR, this.targetR, this.duration),
                s = easeInOutExpo(this.time, this.initSA, this.targetSA, this.duration),
                n = easeInOutExpo(this.time, this.initEA, this.targetEA, this.duration)),
                this.x = e,
                this.y = t,
                this.r = a,
                this.sA = s,
                this.eA = n,
                this.targetX += this.extraX,
                this.targetY += this.extraY,
                this.time++,
            this.time >= this.duration && (this.state = "done")
        }
}
    , UiSvg = function(e, t, a, s, n, i, o, r, l, d) {
    this.x = e,
        this.y = t,
        this.initX = e,
        this.initY = t,
        this.w = a,
        this.initW = a,
        this.h = this.w * spacePlan__aRatio,
        this.targetX = s,
        this.targetY = n,
        this.targetW = i,
        this.duration = o,
        this.time = 0,
        this.ease = r,
        this.screen = l,
        this.svg = d,
        this.extraW = 0,
        this.drawSelf = function() {
            switch (this.h = this.w * spacePlan__aRatio,
                newY = this.y - this.h / 2,
                this.x = -(this.w / 2),
                this.screen) {
                case "thingMaker":
                    tmctx.drawImage(this.svg, tmAnchor[0] + this.x, tmAnchor[1] + newY, this.w, this.w * spacePlan__aRatio);
                    break;
                case "develop":
                    dectx.drawImage(this.svg, deAnchor[0] + this.x, deAnchor[1] + newY, this.w, this.w * spacePlan__aRatio);
                    break;
                case "information":
                    inctx.drawImage(this.svg, inAnchor[0] + this.x, inAnchor[1] + newY, this.w, this.w * spacePlan__aRatio);
                    break;
                case "center":
                    cpctx.drawImage(this.svg, cpAnchor[0] + this.x, cpAnchor[1] + newY, this.w, this.w * spacePlan__aRatio)
            }
        }
        ,
        this.transform = function() {
            var e, t, a;
            "out" == this.ease ? (e = easeOutExpo(this.time, this.initW, this.targetW, this.duration),
                t = easeOutExpo(this.time, this.initX, this.targetX, this.duration),
                a = easeOutExpo(this.time, this.initY, this.targetY, this.duration)) : "inout" == this.ease && (e = easeInOutExpo(this.time, this.initW, this.targetW, this.duration),
                t = easeInOutExpo(this.time, this.initX, this.targetX, this.duration),
                a = easeInOutExpo(this.time, this.initY, this.targetY, this.duration)),
                this.w = e + this.extraW,
                this.h = this.w * spacePlan__aRatio,
                this.x = t,
                this.y = a,
                this.time++,
            this.time >= this.duration && (this.state = "done")
        }
}
    , UiLine = function(e, t, a, s, n, i, o, r, l, d, c, p, u, h) {
    this.x1 = e,
        this.y1 = t,
        this.initX1 = e,
        this.initY1 = t,
        this.x2 = a,
        this.y2 = s,
        this.initX2 = a,
        this.initY2 = s,
        this.w = n,
        this.initW = n,
        this.targetX1 = i,
        this.targetY1 = o,
        this.targetX2 = r,
        this.targetY2 = l,
        this.targetW = d,
        this.col = c,
        this.duration = p,
        this.time = 0,
        this.ease = u,
        this.screen = h,
        this.extraX1 = 0,
        this.extraY1 = 0,
        this.extraX2 = 0,
        this.extraY2 = 0,
        this.drawSelf = function() {
            switch (this.screen) {
                case "thingMaker":
                    tmctx.beginPath(),
                        tmctx.moveTo(this.x1, this.y1),
                        tmctx.lineTo(this.x2, this.y2),
                        tmctx.strokeStyle = this.col,
                        tmctx.lineWidth = this.w,
                        tmctx.stroke(),
                        tmctx.closePath();
                    break;
                case "develop":
                    dectx.beginPath(),
                        dectx.moveTo(this.x1, this.y1),
                        dectx.lineTo(this.x2, this.y2),
                        dectx.strokeStyle = this.col,
                        dectx.lineWidth = this.w,
                        dectx.stroke(),
                        dectx.closePath();
                    break;
                case "information":
                    inctx.beginPath(),
                        inctx.moveTo(this.x1, this.y1),
                        inctx.lineTo(this.x2, this.y2),
                        inctx.strokeStyle = this.col,
                        inctx.lineWidth = this.w,
                        inctx.stroke(),
                        inctx.closePath();
                    break;
                case "center":
                    cpctx.beginPath(),
                        cpctx.moveTo(this.x1, this.y1),
                        cpctx.lineTo(this.x2, this.y2),
                        cpctx.strokeStyle = this.col,
                        cpctx.lineWidth = this.w,
                        cpctx.stroke(),
                        cpctx.closePath()
            }
        }
        ,
        this.transform = function() {
            var e, t, a, s, n;
            "out" == this.ease ? (e = easeOutExpo(this.time, this.initX1, this.targetX1, this.duration),
                t = easeOutExpo(this.time, this.initY1, this.targetY1, this.duration),
                a = easeOutExpo(this.time, this.initX2, this.targetX2, this.duration),
                s = easeOutExpo(this.time, this.initY2, this.targetY2, this.duration),
                n = easeOutExpo(this.time, this.initW, this.targetW, this.duration)) : "inout" == this.ease && (e = easeInOutExpo(this.time, this.initX1, this.targetX1, this.duration),
                t = easeInOutExpo(this.time, this.initY1, this.targetY1, this.duration),
                a = easeInOutExpo(this.time, this.initX2, this.targetX2, this.duration),
                s = easeInOutExpo(this.time, this.initY2, this.targetY2, this.duration),
                n = easeInOutExpo(this.time, this.initW, this.targetW, this.duration)),
                this.x1 = e,
                this.y1 = t,
                this.x2 = a,
                this.y2 = s,
                this.w = n,
                this.time++,
                this.targetX1 += this.extraX1,
                this.targetY1 += this.extraY1,
                this.targetX2 += this.extraX2,
                this.targetY2 += this.extraY2,
            this.time >= this.duration && (this.state = "done")
        }
}
    , spaceplan__logo, spaceplan__svg = new Image;
!isFirefox & !isEdge ? spaceplan__svg.src = "img/spaceplan.svg" : spaceplan__svg.src = "img/spaceplan.png";
var spaceplan__svgWidth = 759.4
    , spaceplan__svgHeight = 87
    , spacePlan__aRatio = spaceplan__svgHeight / spaceplan__svgWidth
    , tmNeeded = 9
    , deNeeded = 49
    , inNeeded = 81
    , cpNeeded = 144
    , totalNeeded = tmNeeded + deNeeded + inNeeded + cpNeeded
    , tmGridWidth = Math.sqrt(tmNeeded)
    , deGridWidth = Math.sqrt(deNeeded)
    , inGridWidth = Math.sqrt(inNeeded)
    , cpGridWidth = Math.sqrt(cpNeeded)
    , tmGridArm = (tmGridWidth - 1) / 2
    , deGridArm = (deGridWidth - 1) / 2
    , inGridArm = (inGridWidth - 1) / 2
    , cpGridArm = (cpGridWidth - 1) / 2
    , screentoActivate = "thingMaker"
    , spliceThese = []
    , uiWhite = "#fff"
    , uiRed = "#fc4646"
    , uiBlue = "#00ffc2"
    , uiBg = "#161419"
    , uiFast = 30
    , initGutter = 2
    , initSize = 6
    , initGrid = 7
    , initDir = 0
    , initX = 0
    , initY = 0
    , initDist = 100
    , actiSize = 100
    , actiStroke = 6
    , actiMarginTop = 20
    , tmInitiated = !1
    , tm3sq = []
    , tm3ty = []
    , tm3 = [tm3sq, tm3ty]
    , tm2sq = []
    , tm2ty = []
    , tm2 = [tm2sq, tm2ty]
    , tm1sq = []
    , tm1ty = []
    , tm1 = [tm1sq, tm1ty]
    , tmStuff = [tm3, tm2, tm1]
    , tmClick = 0
    , tmStage = 1;
thingMakerCanvas.width = thingMaker__container.offsetWidth,
    thingMakerCanvas.height = thingMaker__container.offsetHeight;
var tmAnchor = [thingMakerCanvas.width / 2, thingMakerCanvas.height / 3]
    , tmGridPoints = []
    , tmGridSpace = ((initGutter + initSize) * tmGridWidth - initGutter) / tmGridWidth
    , deInitiated = !1
    , de3sq = []
    , de3ty = []
    , de3 = [de3sq, de3ty]
    , de2sq = []
    , de2ty = []
    , de2 = [de2sq, de2ty]
    , de1sq = []
    , de1ty = []
    , de1 = [de1sq, de1ty]
    , deStuff = [de3, de2, de1]
    , deClick = 0
    , deStage = 1;
developCanvas.width = develop__container.offsetWidth,
    developCanvas.height = develop__container.offsetHeight;
var deAnchor = [developCanvas.width / 2, developCanvas.height / 3]
    , deGridPoints = []
    , deGridSpace = ((initGutter + initSize) * deGridWidth - initGutter) / deGridWidth
    , inInitiated = !1
    , in3sq = []
    , in3ty = []
    , in3 = [in3sq, in3ty]
    , in2sq = []
    , in2ty = []
    , in2 = [in2sq, in2ty]
    , in1sq = []
    , in1ty = []
    , in1 = [in1sq, in1ty]
    , inStuff = [in3, in2, in1]
    , inClick = 0
    , inStage = 1;
informationCanvas.width = information__container.offsetWidth,
    informationCanvas.height = information__container.offsetHeight;
var inAnchor = [informationCanvas.width / 2, informationCanvas.height / 2]
    , inGridPoints = []
    , inGridSpace = ((initGutter + initSize) * inGridWidth - initGutter) / inGridWidth
    , cpInitiated = !1
    , cp3sq = []
    , cp3ty = []
    , cp3 = [cp3sq, cp3ty]
    , cp2sq = []
    , cp2ty = []
    , cp2 = [cp2sq, cp2ty]
    , cp1sq = []
    , cp1ty = []
    , cp1 = [cp1sq, cp1ty]
    , cpStuff = [cp3, cp2, cp1]
    , cpClick = 0
    , cpStage = 1;
centerPowerCanvas.width = canvasWrap.offsetWidth,
    centerPowerCanvas.height = canvasWrap.offsetHeight;
var cpAnchor = [centerPowerCanvas.width / 2, centerPowerCanvas.height / 2]
    , cpGridPoints = []
    , cpGridSpace = ((initGutter + initSize) * cpGridWidth - initGutter) / cpGridWidth
    , kinetigenLED = document.getElementById("kinetigen__button--LED")
    , kinetigenPulse = 0
    , hintDone = !1;
animateIntros = function() {
    intro && (tmIntro || deIntro || inIntro || cpIntro || (intro = !1),
        1 > power && eventLog.length > 6 && !hintDone ? (0 >= kinetigenPulse && (kinetigenScreen.style.transition = "all 0s",
            kinetigenScreen.style.backgroundColor = "#7e2a5d",
            kinetigenLED.style.transition = "all 0s",
            kinetigenLED.style.backgroundColor = "#ff5573",
            kinetigenPulse = 50,
            setTimeout(function() {
                kinetigenScreen.style.transition = "all 0.5s",
                    kinetigenScreen.style.backgroundColor = "#1a1a1a",
                    kinetigenLED.style.cssText = "",
                    kinetigenLED.style.transition = "all 0.5s"
            }, 10)),
            kinetigenPulse--) : power > 0 && !hintDone && (hintDone = !0,
            kinetigenScreen.style.cssText = "",
            kinetigenLED.style.cssText = ""),
        tmctx.clearRect(0, 0, thingMakerCanvas.width, thingMakerCanvas.height),
        dectx.clearRect(0, 0, developCanvas.width, developCanvas.height),
        inctx.clearRect(0, 0, informationCanvas.width, informationCanvas.height),
        cpctx.clearRect(0, 0, centerPowerCanvas.width, centerPowerCanvas.height),
    "thingMaker" != screentoActivate && tmAddStuff(),
    "thingMaker" != screentoActivate && "develop" != screentoActivate && deAddStuff(),
    "thingMaker" != screentoActivate && "develop" != screentoActivate && "information" != screentoActivate && inAddStuff(),
    "thingMaker" != screentoActivate && "develop" != screentoActivate && "information" != screentoActivate && "center" != screentoActivate && cpAddStuff(),
        animateTm(),
        animateDe(),
        animateIn(),
        animateCp(),
        animateGrids())
}
    ,
    animateGrids = function() {
        if (0 == tmInitiated)
            for (var e = 0; e < tmGridPoints.length; e++)
                tmGridPoints[e].drawSelf();
        if (0 == deInitiated)
            for (var e = 0; e < deGridPoints.length; e++)
                deGridPoints[e].drawSelf();
        if (0 == inInitiated)
            for (var e = 0; e < inGridPoints.length; e++)
                inGridPoints[e].drawSelf();
        if (0 == cpInitiated)
            for (var e = 0; e < cpGridPoints.length; e++)
                cpGridPoints[e].drawSelf()
    }
    ,
    animateTm = function() {
        for (var e = 0; e < tmStuff[0][0].length; e++)
            tmStuff[0][0][e].drawSelf(),
            "animate" == tmStuff[0][0][e].state && tmStuff[0][0][e].transform();
        for (var e = 0; e < tmStuff[0][1].length; e++)
            tmStuff[0][1][e].drawSelf(),
            "animate" == tmStuff[0][1][e].state && tmStuff[0][1][e].transform();
        for (var e = 0; e < tmStuff[1][0].length; e++)
            tmStuff[1][0][e].drawSelf(),
            "animate" == tmStuff[1][0][e].state && tmStuff[1][0][e].transform();
        for (var e = 0; e < tmStuff[1][1].length; e++)
            tmStuff[1][1][e].drawSelf(),
            "animate" == tmStuff[1][1][e].state && tmStuff[1][1][e].transform();
        for (var e = 0; e < tmStuff[2][0].length; e++)
            tmStuff[2][0][e].drawSelf(),
            "animate" == tmStuff[2][0][e].state && tmStuff[2][0][e].transform();
        for (var e = 0; e < tmStuff[2][1].length; e++)
            tmStuff[2][1][e].drawSelf(),
            "animate" == tmStuff[2][1][e].state && tmStuff[2][1][e].transform()
    }
    ,
    animateDe = function() {
        for (var e = 0; e < deStuff[0][0].length; e++)
            deStuff[0][0][e].drawSelf(),
            "animate" == deStuff[0][0][e].state && deStuff[0][0][e].transform();
        for (var e = 0; e < deStuff[0][1].length; e++)
            deStuff[0][1][e].drawSelf(),
            "animate" == deStuff[0][1][e].state && deStuff[0][1][e].transform();
        for (var e = 0; e < deStuff[1][0].length; e++)
            deStuff[1][0][e].drawSelf(),
            "animate" == deStuff[1][0][e].state && deStuff[1][0][e].transform();
        for (var e = 0; e < deStuff[1][1].length; e++)
            deStuff[1][1][e].drawSelf(),
            "animate" == deStuff[1][1][e].state && deStuff[1][1][e].transform();
        for (var e = 0; e < deStuff[2][0].length; e++)
            deStuff[2][0][e].drawSelf(),
            "animate" == deStuff[2][0][e].state && deStuff[2][0][e].transform();
        for (var e = 0; e < deStuff[2][1].length; e++)
            deStuff[2][1][e].drawSelf(),
            "animate" == deStuff[2][1][e].state && deStuff[2][1][e].transform()
    }
    ,
    animateIn = function() {
        for (var e = 0; e < inStuff[0][0].length; e++)
            inStuff[0][0][e].drawSelf(),
            "animate" == inStuff[0][0][e].state && inStuff[0][0][e].transform();
        for (var e = 0; e < inStuff[0][1].length; e++)
            inStuff[0][1][e].drawSelf(),
            "animate" == inStuff[0][1][e].state && inStuff[0][1][e].transform();
        for (var e = 0; e < inStuff[1][0].length; e++)
            inStuff[1][0][e].drawSelf(),
            "animate" == inStuff[1][0][e].state && inStuff[1][0][e].transform();
        for (var e = 0; e < inStuff[1][1].length; e++)
            inStuff[1][1][e].drawSelf(),
            "animate" == inStuff[1][1][e].state && inStuff[1][1][e].transform();
        for (var e = 0; e < inStuff[2][0].length; e++)
            inStuff[2][0][e].drawSelf(),
            "animate" == inStuff[2][0][e].state && inStuff[2][0][e].transform();
        for (var e = 0; e < inStuff[2][1].length; e++)
            inStuff[2][1][e].drawSelf(),
            "animate" == inStuff[2][1][e].state && inStuff[2][1][e].transform()
    }
    ,
    animateCp = function() {
        for (var e = 0; e < cpStuff[0][0].length; e++)
            cpStuff[0][0][e].drawSelf(),
            "animate" == cpStuff[0][0][e].state && cpStuff[0][0][e].transform();
        for (var e = 0; e < cpStuff[0][1].length; e++)
            cpStuff[0][1][e].drawSelf(),
            "animate" == cpStuff[0][1][e].state && cpStuff[0][1][e].transform();
        for (var e = 0; e < cpStuff[1][0].length; e++)
            cpStuff[1][0][e].drawSelf(),
            "animate" == cpStuff[1][0][e].state && cpStuff[1][0][e].transform();
        for (var e = 0; e < cpStuff[1][1].length; e++)
            cpStuff[1][1][e].drawSelf(),
            "animate" == cpStuff[1][1][e].state && cpStuff[1][1][e].transform();
        for (var e = 0; e < cpStuff[2][0].length; e++)
            cpStuff[2][0][e].drawSelf(),
            "animate" == cpStuff[2][0][e].state && cpStuff[2][0][e].transform();
        for (var e = 0; e < cpStuff[2][1].length; e++)
            cpStuff[2][1][e].drawSelf(),
            "animate" == cpStuff[2][1][e].state && cpStuff[2][1][e].transform()
    }
;
var tmAddStuff = function() {
        if (0 == tmInitiated) {
            if ("thingMaker" == screentoActivate) {
                var e, t, a, s;
                switch (initDir) {
                    case 0:
                        e = tmGridSpace * initX - initDist,
                            t = tmGridSpace * initY,
                            a = initDist,
                            s = 0;
                        break;
                    case 1:
                        e = tmGridSpace * initX,
                            t = tmGridSpace * initY - initDist,
                            a = 0,
                            s = initDist;
                        break;
                    case 2:
                        e = tmGridSpace * initX + initDist,
                            t = tmGridSpace * initY,
                            a = -initDist,
                            s = 0;
                        break;
                    case 3:
                        e = tmGridSpace * initX,
                            t = tmGridSpace * initY + initDist,
                            a = 0,
                            s = -initDist
                }
                var n = new UiSquare(e - initSize / 2,t - initSize / 2,initSize,initSize,a,s,0,0,uiWhite,uiFast,"inout","thingMaker");
                n.state = "animate",
                    n.id = "initGrid",
                    tm2sq.push(n),
                0 == tmClick && 7 == eventLog.length && pushLog("Lovely stuff &mdash; keep going."),
                    tmClick++,
                    initDir++,
                initDir > 3 && (initDir = 0),
                    initX++,
                initX > tmGridArm && (initX = -tmGridArm,
                    initY++)
            }
            tmClick >= tmNeeded && (screenFocusReal && (tmInitiated = !0,
                setTimeout(function() {
                    thingMuted || deBootLog || thingMakerInit__sound.play()
                }, 1e3)),
            "thingMaker" == screentoActivate && (screentoActivate = "develop",
                initX = -deGridArm,
                initY = -deGridArm,
                initDir = 0))
        }
        if (1 == tmInitiated && 1 == tmStage) {
            for (var i = !0, o = 0; o < tm2sq.length; o++)
                "initGrid" == tm2sq[o].id && "done" != tm2sq[o].state && (i = !1);
            1 == i && (tmStage = 2)
        }
        switch (tmStage) {
            case 2:
                var n = new UiSquare(0,0,0,0,-actiSize / 2,-actiSize / 2,actiSize,actiSize,uiWhite,uiFast,"inout","thingMaker");
                n.state = "animate",
                    n.id = "actiOuter",
                    tm1sq.push(n);
                var n = new UiSquare(0,0,0,0,-(actiSize / 2) + actiStroke,-(actiSize / 2) + actiStroke,actiSize - 2 * actiStroke,actiSize - 2 * actiStroke,uiRed,uiFast + 3,"inout","thingMaker");
                n.state = "animate",
                    n.id = "actiMid",
                    tm1sq.push(n);
                var n = new UiSquare(0,0,0,0,-(actiSize / 2) + actiStroke,-(actiSize / 2) + actiStroke,actiSize - 2 * actiStroke,actiSize - 2 * actiStroke,uiBg,uiFast + 7,"inout","thingMaker");
                n.state = "animate",
                    n.id = "actiInner",
                    tm1sq.push(n),
                cpBootLog || (tmctx.beginPath(),
                    tmctx.rect(0, 0, thingMakerCanvas.width, thingMakerCanvas.height),
                    tmctx.globalAlpha = .1,
                    tmctx.fillStyle = "#ffffff",
                    tmctx.fill(),
                    tmctx.closePath(),
                    tmctx.globalAlpha = 1,
                    setTimeout(function() {
                        tmctx.beginPath(),
                            tmctx.rect(0, 0, thingMakerCanvas.width, thingMakerCanvas.height),
                            tmctx.globalAlpha = .1,
                            tmctx.fillStyle = "#ffffff",
                            tmctx.fill(),
                            tmctx.closePath(),
                            tmctx.globalAlpha = 1
                    }, 300)),
                    tmStage = 2.5;
                break;
            case 2.5:
                for (var i = !0, o = 0; o < tm1sq.length; o++)
                    "actiOuter" != tm1sq[o].id && "actiInner" != tm1sq[o].id && "actiMid" != tm1sq[o].id || "done" == tm1sq[o].state || (i = !1);
                if (1 == i) {
                    tmStage = 3;
                    for (var r = [], o = 0; o < tm2sq.length; o++)
                        "initGrid" == tm2sq[o].id && r.push(o);
                    spliceArray(tm2sq, r)
                }
                break;
            case 3:
                if (!cpBootLog) {
                    tmctx.beginPath(),
                        tmctx.rect(0, 0, thingMakerCanvas.width, thingMakerCanvas.height),
                        tmctx.globalAlpha = .1,
                        tmctx.fillStyle = "#ffffff",
                        tmctx.fill(),
                        tmctx.closePath(),
                        tmctx.globalAlpha = 1;
                    for (var o = 0; o < tm1sq.length; o++)
                        "actiOuter" == tm1sq[o].id && (tm1sq[o].col = uiBlue)
                }
                for (var l, d, c, p, o = 0; o < tm1sq.length; o++) {
                    if ("actiOuter" == tm1sq[o].id) {
                        tm1sq[o].initX = tm1sq[o].x,
                            tm1sq[o].initY = tm1sq[o].y,
                            tm1sq[o].initW = tm1sq[o].w,
                            tm1sq[o].initH = tm1sq[o].h,
                            tm1sq[o].time = 0,
                            tm1sq[o].duration = uiFast;
                        var u;
                        u = window.innerHeight < 721 ? 12 : 28;
                        var h = -(tmAnchor[0] + tm1sq[o].x) + 35;
                        tm1sq[o].targetX = h;
                        var g = -(tmAnchor[1] + tm1sq[o].y) + u;
                        tm1sq[o].targetY = g;
                        var m = thingMakerCanvas.width - 70 - tm1sq[o].w;
                        tm1sq[o].targetW = m,
                            tm1sq[o].targetH = -73 + 56 * (availableItems.length + lockedItems.length),
                            tm1sq[o].state = "animate",
                            l = tm1sq[o].x + tm1sq[o].targetX,
                            d = tm1sq[o].y + tm1sq[o].targetY,
                            c = tm1sq[o].w + tm1sq[o].targetW,
                            p = tm1sq[o].h + tm1sq[o].targetH
                    }
                    if ("actiInner" == tm1sq[o].id) {
                        tm1sq[o].initX = tm1sq[o].x,
                            tm1sq[o].initY = tm1sq[o].y,
                            tm1sq[o].initW = tm1sq[o].w,
                            tm1sq[o].initH = tm1sq[o].h,
                            tm1sq[o].time = 0,
                            tm1sq[o].duration = uiFast;
                        var h = l - tm1sq[o].x;
                        tm1sq[o].targetX = h + actiStroke;
                        var g = d - tm1sq[o].y;
                        tm1sq[o].targetY = g + actiStroke;
                        var m = c - tm1sq[o].w;
                        tm1sq[o].targetW = m - 2 * actiStroke;
                        var v = p - tm1sq[o].h;
                        tm1sq[o].targetH = v - 2 * actiStroke,
                            tm1sq[o].state = "animate"
                    }
                }
                for (var o = 0; o < tm1sq.length; o++)
                    "actiMid" == tm1sq[o].id && tm1sq.splice(o, 1);
                tmStage = 3.5;
                break;
            case 3.5:
                for (var i = !0, o = 0; o < tm1sq.length; o++)
                    "actiOuter" != tm1sq[o].id && "actiInner" != tm1sq[o].id || "done" == tm1sq[o].state || (i = !1);
                if (1 == i && (tmStage = 4,
                        !cpBootLog)) {
                    tmctx.beginPath(),
                        tmctx.rect(0, 0, thingMakerCanvas.width, thingMakerCanvas.height),
                        tmctx.globalAlpha = .1,
                        tmctx.fillStyle = "#ffffff",
                        tmctx.fill(),
                        tmctx.closePath(),
                        tmctx.globalAlpha = 1;
                    for (var o = 0; o < tm1sq.length; o++)
                        "actiOuter" == tm1sq[o].id && (tm1sq[o].col = uiWhite)
                }
                break;
            case 4:
                for (var o = 0; o < tm1sq.length; o++)
                    "actiInner" == tm1sq[o].id && (tm1sq[o].initX = tm1sq[o].x,
                        tm1sq[o].initY = tm1sq[o].y,
                        tm1sq[o].initW = tm1sq[o].w,
                        tm1sq[o].initH = tm1sq[o].h,
                        tm1sq[o].time = 0,
                        tm1sq[o].duration = uiFast,
                        tm1sq[o].targetX = tm1sq[o].w,
                        tm1sq[o].targetY = 0,
                        tm1sq[o].targetW = -tm1sq[o].w,
                        tm1sq[o].targetH = 0,
                        tm1sq[o].state = "animate",
                        manufactureContainer.style.opacity = 1,
                        manufactureHeader.style.opacity = 1);
                tmStage = 4.5;
                break;
            case 4.5:
                for (var i = !0, o = 0; o < tm1sq.length; o++)
                    "actiInner" == tm1sq[o].id && "done" != tm1sq[o].state && (i = !1);
                1 == i && (tmStage = 5);
                break;
            case 5:
                for (var o = 0; o < tm1sq.length; o++)
                    "actiInner" == tm1sq[o].id && tm1sq.splice(o, 1);
                for (var o = 0; o < tm1sq.length; o++)
                    "actiOuter" == tm1sq[o].id && (tm1sq[o].initX = tm1sq[o].x,
                        tm1sq[o].initY = tm1sq[o].y,
                        tm1sq[o].initW = tm1sq[o].w,
                        tm1sq[o].initH = tm1sq[o].h,
                        tm1sq[o].time = 0,
                        tm1sq[o].duration = uiFast,
                        tm1sq[o].targetX = tm1sq[o].w,
                        tm1sq[o].targetY = 0,
                        tm1sq[o].targetW = -tm1sq[o].w,
                        tm1sq[o].targetH = 0,
                        tm1sq[o].state = "animate");
                tmStage = 5.5;
                break;
            case 5.5:
                for (var i = !0, o = 0; o < tm1sq.length; o++)
                    "actiOuter" == tm1sq[o].id && "done" != tm1sq[o].state && (i = !1);
                1 == i && (tmStage = 6);
                break;
            case 6:
                for (var o = 0; o < tm1sq.length; o++)
                    "actiOuter" == tm1sq[o].id && tm1sq.splice(o, 1);
                tmStage = 6.5,
                    tmIntro = !1,
                tmBootLog || (ga("set", {
                    userId: USER_ID,
                    dimension1: shipName,
                    dimension2: USER_ID,
                    metric2: 1
                }),
                    ga("send", "pageview"),
                    ga("set", {
                        metric2: 0
                    }),
                    queueLog(66, "Thing Maker has power. Nice.<br/>Use it to build ANYTHING in our libraries."),
                    queueLog(66, "Searching Thing Maker libraries..."),
                    queueLog(66, "Loading 'Advanced Robotics' library..."),
                    queueLog(66, "Failed."),
                    queueLog(66, "Loading 'Distress Call' library..."),
                    queueLog(66, "Failed. Bugger."),
                    queueLog(66, "Loading 'Cookie' library..."),
                    queueLog(66, "Failed. This is just silly."),
                    queueLog(66, "Loading 'Potato' library..."),
                    queueLog(66, "Success! Uhh it'll do?<br/>Other libraries are pretty corrupt."),
                    queueLog(66, "Get us some more power please.")),
                    tmBootLog = !0
        }
    }
    , deAddStuff = function() {
        if (0 == deInitiated) {
            if ("develop" == screentoActivate) {
                var e, t, a, s;
                switch (initDir) {
                    case 0:
                        e = deGridSpace * initX - initDist,
                            t = deGridSpace * initY,
                            a = initDist,
                            s = 0;
                        break;
                    case 1:
                        e = deGridSpace * initX,
                            t = deGridSpace * initY - initDist,
                            a = 0,
                            s = initDist;
                        break;
                    case 2:
                        e = deGridSpace * initX + initDist,
                            t = deGridSpace * initY,
                            a = -initDist,
                            s = 0;
                        break;
                    case 3:
                        e = deGridSpace * initX,
                            t = deGridSpace * initY + initDist,
                            a = 0,
                            s = -initDist
                }
                var n = new UiSquare(e - initSize / 2,t - initSize / 2,initSize,initSize,a,s,0,0,uiWhite,uiFast,"inout","develop");
                n.state = "animate",
                    n.id = "initGrid",
                    de2sq.push(n),
                    deClick++,
                    initDir++,
                initDir > 3 && (initDir = 0),
                    initX++,
                initX > 3 && (initX = -3,
                    initY++)
            }
            deClick >= deNeeded && (screenFocusReal && (deInitiated = !0,
                setTimeout(function() {
                    thingMuted || inBootLog || developInit__sound.play()
                }, 1e3)),
            "develop" == screentoActivate && (screentoActivate = "information",
                initX = -inGridArm,
                initY = -inGridArm,
                initDir = 0))
        }
        if (1 == deInitiated && 1 == deStage) {
            for (var i = !0, o = 0; o < de2sq.length; o++)
                "initGrid" == de2sq[o].id && "done" != de2sq[o].state && (i = !1);
            1 == i && (deStage = 2)
        }
        switch (deStage) {
            case 2:
                var n = new UiSquare(0,0,0,0,-actiSize / 2,-actiSize / 2,actiSize,actiSize,uiWhite,uiFast,"inout","develop");
                n.state = "animate",
                    n.id = "actiOuter",
                    de1sq.push(n);
                var n = new UiSquare(0,0,0,0,-(actiSize / 2) + actiStroke,-(actiSize / 2) + actiStroke,actiSize - 2 * actiStroke,actiSize - 2 * actiStroke,uiRed,uiFast + 3,"inout","develop");
                n.state = "animate",
                    n.id = "actiMid",
                    de1sq.push(n);
                var n = new UiSquare(0,0,0,0,-(actiSize / 2) + actiStroke,-(actiSize / 2) + actiStroke,actiSize - 2 * actiStroke,actiSize - 2 * actiStroke,uiBg,uiFast + 7,"inout","develop");
                n.state = "animate",
                    n.id = "actiInner",
                    de1sq.push(n),
                cpBootLog || (dectx.beginPath(),
                    dectx.rect(0, 0, developCanvas.width, developCanvas.height),
                    dectx.globalAlpha = .1,
                    dectx.fillStyle = "#ffffff",
                    dectx.fill(),
                    dectx.closePath(),
                    dectx.globalAlpha = 1,
                    setTimeout(function() {
                        dectx.beginPath(),
                            dectx.rect(0, 0, developCanvas.width, developCanvas.height),
                            dectx.globalAlpha = .1,
                            dectx.fillStyle = "#ffffff",
                            dectx.fill(),
                            dectx.closePath(),
                            dectx.globalAlpha = 1
                    }, 300)),
                    deStage = 2.5;
                break;
            case 2.5:
                for (var i = !0, o = 0; o < de1sq.length; o++)
                    "actiOuter" != de1sq[o].id && "actiInner" != de1sq[o].id || "done" == de1sq[o].state || (i = !1);
                if (1 == i) {
                    deStage = 3;
                    for (var r = [], o = 0; o < de2sq.length; o++)
                        "initGrid" == de2sq[o].id && r.push(o);
                    spliceArray(de2sq, r)
                }
                break;
            case 3:
                if (!cpBootLog) {
                    dectx.beginPath(),
                        dectx.rect(0, 0, developCanvas.width, developCanvas.height),
                        dectx.globalAlpha = .1,
                        dectx.fillStyle = "#ffffff",
                        dectx.fill(),
                        dectx.closePath(),
                        dectx.globalAlpha = 1;
                    for (var o = 0; o < de1sq.length; o++)
                        "actiOuter" == de1sq[o].id && (de1sq[o].col = uiBlue)
                }
                for (var l, d, c, p, o = 0; o < de1sq.length; o++) {
                    if ("actiOuter" == de1sq[o].id) {
                        de1sq[o].initX = de1sq[o].x,
                            de1sq[o].initY = de1sq[o].y,
                            de1sq[o].initW = de1sq[o].w,
                            de1sq[o].initH = de1sq[o].h,
                            de1sq[o].time = 0,
                            de1sq[o].duration = uiFast;
                        var u;
                        u = window.innerHeight < 721 ? 12 : 28;
                        var h = -(deAnchor[0] + de1sq[o].x) + 35;
                        de1sq[o].targetX = h;
                        var g = -(deAnchor[1] + de1sq[o].y) + u;
                        de1sq[o].targetY = g;
                        var m = developCanvas.width - 70 - de1sq[o].w;
                        de1sq[o].targetW = m,
                            availableResearch.length < 2 ? de1sq[o].targetH = -17 : de1sq[o].targetH = -73 + 56 * availableResearch.length,
                            de1sq[o].state = "animate",
                            l = de1sq[o].x + de1sq[o].targetX,
                            d = de1sq[o].y + de1sq[o].targetY,
                            c = de1sq[o].w + de1sq[o].targetW,
                            p = de1sq[o].h + de1sq[o].targetH
                    }
                    if ("actiInner" == de1sq[o].id) {
                        de1sq[o].initX = de1sq[o].x,
                            de1sq[o].initY = de1sq[o].y,
                            de1sq[o].initW = de1sq[o].w,
                            de1sq[o].initH = de1sq[o].h,
                            de1sq[o].time = 0,
                            de1sq[o].duration = uiFast;
                        var h = l - de1sq[o].x;
                        de1sq[o].targetX = h + actiStroke;
                        var g = d - de1sq[o].y;
                        de1sq[o].targetY = g + actiStroke;
                        var m = c - de1sq[o].w;
                        de1sq[o].targetW = m - 2 * actiStroke;
                        var v = p - de1sq[o].h;
                        de1sq[o].targetH = v - 2 * actiStroke,
                            de1sq[o].state = "animate"
                    }
                }
                for (var o = 0; o < de1sq.length; o++)
                    "actiMid" == de1sq[o].id && de1sq.splice(o, 1);
                deStage = 3.5;
                break;
            case 3.5:
                for (var i = !0, o = 0; o < de1sq.length; o++)
                    "actiOuter" != de1sq[o].id && "actiInner" != de1sq[o].id || "done" == de1sq[o].state || (i = !1);
                if (1 == i && (deStage = 4,
                        !cpBootLog)) {
                    dectx.beginPath(),
                        dectx.rect(0, 0, developCanvas.width, developCanvas.height),
                        dectx.globalAlpha = .1,
                        dectx.fillStyle = "#ffffff",
                        dectx.fill(),
                        dectx.closePath(),
                        dectx.globalAlpha = 1;
                    for (var o = 0; o < de1sq.length; o++)
                        "actiOuter" == de1sq[o].id && (de1sq[o].col = uiWhite)
                }
                break;
            case 4:
                for (var o = 0; o < de1sq.length; o++)
                    "actiInner" == de1sq[o].id && (de1sq[o].initX = de1sq[o].x,
                        de1sq[o].initY = de1sq[o].y,
                        de1sq[o].initW = de1sq[o].w,
                        de1sq[o].initH = de1sq[o].h,
                        de1sq[o].time = 0,
                        de1sq[o].duration = uiFast,
                        de1sq[o].targetX = de1sq[o].w,
                        de1sq[o].targetY = 0,
                        de1sq[o].targetW = -de1sq[o].w,
                        de1sq[o].targetH = 0,
                        de1sq[o].state = "animate",
                        developContainer.style.opacity = 1,
                        developHeader.style.opacity = 1);
                deStage = 4.5;
                break;
            case 4.5:
                for (var i = !0, o = 0; o < de1sq.length; o++)
                    "actiInner" == de1sq[o].id && "done" != de1sq[o].state && (i = !1);
                1 == i && (deStage = 5);
                break;
            case 5:
                for (var o = 0; o < de1sq.length; o++)
                    "actiInner" == de1sq[o].id && de1sq.splice(o, 1);
                for (var o = 0; o < de1sq.length; o++)
                    "actiOuter" == de1sq[o].id && (de1sq[o].initX = de1sq[o].x,
                        de1sq[o].initY = de1sq[o].y,
                        de1sq[o].initW = de1sq[o].w,
                        de1sq[o].initH = de1sq[o].h,
                        de1sq[o].time = 0,
                        de1sq[o].duration = uiFast,
                        de1sq[o].targetX = de1sq[o].w,
                        de1sq[o].targetY = 0,
                        de1sq[o].targetW = -de1sq[o].w,
                        de1sq[o].targetH = 0,
                        de1sq[o].state = "animate");
                deStage = 5.5;
                break;
            case 5.5:
                for (var i = !0, o = 0; o < de1sq.length; o++)
                    "actiOuter" == de1sq[o].id && "done" != de1sq[o].state && (i = !1);
                1 == i && (deStage = 6);
                break;
            case 6:
                for (var o = 0; o < de1sq.length; o++)
                    "actiOuter" == de1sq[o].id && de1sq.splice(o, 1);
                deStage = 6.5,
                    deIntro = !1,
                deBootLog || (queueLog(66, "Idea Lister is up & running.<br/>Use it to improve your things<br/>with my lovely ideas."),
                    shipStatusSpan.innerHTML = "<span>Ship Status:</span> waking..."),
                    deBootLog = !0
        }
    }
    , inAddStuff = function() {
        if (0 == inInitiated) {
            if ("information" == screentoActivate) {
                var e, t, a, s;
                switch (initDir) {
                    case 0:
                        e = inGridSpace * initX - initDist,
                            t = inGridSpace * initY,
                            a = initDist,
                            s = 0;
                        break;
                    case 1:
                        e = inGridSpace * initX,
                            t = inGridSpace * initY - initDist,
                            a = 0,
                            s = initDist;
                        break;
                    case 2:
                        e = inGridSpace * initX + initDist,
                            t = inGridSpace * initY,
                            a = -initDist,
                            s = 0;
                        break;
                    case 3:
                        e = inGridSpace * initX,
                            t = inGridSpace * initY + initDist,
                            a = 0,
                            s = -initDist
                }
                var n = new UiSquare(e - initSize / 2,t - initSize / 2,initSize,initSize,a,s,0,0,uiWhite,uiFast,"inout","information");
                n.state = "animate",
                    n.id = "initGrid",
                    in2sq.push(n),
                    inClick++,
                    initDir++,
                initDir > 3 && (initDir = 0),
                    initX++,
                initX > inGridArm && (initX = -inGridArm,
                    initY++)
            }
            inClick >= inNeeded && (screenFocusReal && (inInitiated = !0,
                setTimeout(function() {
                    thingMuted || cpBootLog || informationInit__sound.play()
                }, 1e3)),
            "information" == screentoActivate && (screentoActivate = "center",
                initX = -cpGridArm,
                initY = -cpGridArm,
                initDir = 0))
        }
        if (1 == inInitiated && 1 == inStage) {
            for (var i = !0, o = 0; o < in2sq.length; o++)
                "initGrid" == in2sq[o].id && "done" != in2sq[o].state && (i = !1);
            1 == i && (inStage = 2)
        }
        switch (inStage) {
            case 2:
                var n = new UiSquare(0,0,0,0,-actiSize / 2,-actiSize / 2,actiSize,actiSize,uiWhite,uiFast,"inout","information");
                n.state = "animate",
                    n.id = "actiOuter",
                    in1sq.push(n);
                var n = new UiSquare(0,0,0,0,-(actiSize / 2) + actiStroke,-(actiSize / 2) + actiStroke,actiSize - 2 * actiStroke,actiSize - 2 * actiStroke,uiRed,uiFast + 3,"inout","information");
                n.state = "animate",
                    n.id = "actiMid",
                    in1sq.push(n);
                var n = new UiSquare(0,0,0,0,-(actiSize / 2) + actiStroke,-(actiSize / 2) + actiStroke,actiSize - 2 * actiStroke,actiSize - 2 * actiStroke,uiBg,uiFast + 7,"inout","information");
                n.state = "animate",
                    n.id = "actiInner",
                    in1sq.push(n),
                cpBootLog || (inctx.beginPath(),
                    inctx.rect(0, 0, informationCanvas.width, informationCanvas.height),
                    inctx.globalAlpha = .1,
                    inctx.fillStyle = "#ffffff",
                    inctx.fill(),
                    inctx.closePath(),
                    inctx.globalAlpha = 1,
                    setTimeout(function() {
                        inctx.beginPath(),
                            inctx.rect(0, 0, informationCanvas.width, informationCanvas.height),
                            inctx.globalAlpha = .1,
                            inctx.fillStyle = "#ffffff",
                            inctx.fill(),
                            inctx.closePath(),
                            inctx.globalAlpha = 1
                    }, 300)),
                    inStage = 2.5;
                break;
            case 2.5:
                for (var i = !0, o = 0; o < in1sq.length; o++)
                    "actiOuter" != in1sq[o].id && "actiInner" != in1sq[o].id || "done" == in1sq[o].state || (i = !1);
                if (1 == i) {
                    inStage = 3;
                    for (var r = [], o = 0; o < in2sq.length; o++)
                        "initGrid" == in2sq[o].id && r.push(o);
                    spliceArray(in2sq, r)
                }
                break;
            case 3:
                if (!cpBootLog) {
                    inctx.beginPath(),
                        inctx.rect(0, 0, informationCanvas.width, informationCanvas.height),
                        inctx.globalAlpha = .1,
                        inctx.fillStyle = "#ffffff",
                        inctx.fill(),
                        inctx.closePath(),
                        inctx.globalAlpha = 1;
                    for (var o = 0; o < in1sq.length; o++)
                        "actiOuter" == in1sq[o].id && (in1sq[o].col = uiBlue)
                }
                for (var l, d, c, p, o = 0; o < in1sq.length; o++) {
                    if ("actiOuter" == in1sq[o].id) {
                        in1sq[o].initX = in1sq[o].x,
                            in1sq[o].initY = in1sq[o].y,
                            in1sq[o].initW = in1sq[o].w,
                            in1sq[o].initH = in1sq[o].h,
                            in1sq[o].time = 0,
                            in1sq[o].duration = uiFast;
                        var u;
                        u = window.innerHeight < 721 ? 12 : 28;
                        var h = -(inAnchor[0] + in1sq[o].x) + 35;
                        in1sq[o].targetX = h;
                        var g = -(inAnchor[1] + in1sq[o].y) + u;
                        in1sq[o].targetY = g;
                        var m = informationCanvas.width - 70 - in1sq[o].w;
                        in1sq[o].targetW = m,
                            in1sq[o].targetH = -70 + statusLogContainer.offsetHeight,
                            in1sq[o].state = "animate",
                            l = in1sq[o].x + in1sq[o].targetX,
                            d = in1sq[o].y + in1sq[o].targetY,
                            c = in1sq[o].w + in1sq[o].targetW,
                            p = in1sq[o].h + in1sq[o].targetH
                    }
                    if ("actiInner" == in1sq[o].id) {
                        in1sq[o].initX = in1sq[o].x,
                            in1sq[o].initY = in1sq[o].y,
                            in1sq[o].initW = in1sq[o].w,
                            in1sq[o].initH = in1sq[o].h,
                            in1sq[o].time = 0,
                            in1sq[o].duration = uiFast;
                        var h = l - in1sq[o].x;
                        in1sq[o].targetX = h + actiStroke;
                        var g = d - in1sq[o].y;
                        in1sq[o].targetY = g + actiStroke;
                        var m = c - in1sq[o].w;
                        in1sq[o].targetW = m - 2 * actiStroke;
                        var v = p - in1sq[o].h;
                        in1sq[o].targetH = v - 2 * actiStroke,
                            in1sq[o].state = "animate"
                    }
                }
                for (var o = 0; o < in1sq.length; o++)
                    "actiMid" == in1sq[o].id && in1sq.splice(o, 1);
                inStage = 3.5;
                break;
            case 3.5:
                for (var i = !0, o = 0; o < in1sq.length; o++)
                    "actiOuter" != in1sq[o].id && "actiInner" != in1sq[o].id || "done" == in1sq[o].state || (i = !1);
                if (1 == i && (inStage = 4,
                        !cpBootLog)) {
                    inctx.beginPath(),
                        inctx.rect(0, 0, informationCanvas.width, informationCanvas.height),
                        inctx.globalAlpha = .1,
                        inctx.fillStyle = "#ffffff",
                        inctx.fill(),
                        inctx.closePath(),
                        inctx.globalAlpha = 1;
                    for (var o = 0; o < in1sq.length; o++)
                        "actiOuter" == in1sq[o].id && (in1sq[o].col = uiWhite)
                }
                break;
            case 4:
                for (var o = 0; o < in1sq.length; o++)
                    "actiInner" == in1sq[o].id && (in1sq[o].initX = in1sq[o].x,
                        in1sq[o].initY = in1sq[o].y,
                        in1sq[o].initW = in1sq[o].w,
                        in1sq[o].initH = in1sq[o].h,
                        in1sq[o].time = 0,
                        in1sq[o].duration = uiFast,
                        in1sq[o].targetX = in1sq[o].w,
                        in1sq[o].targetY = 0,
                        in1sq[o].targetW = -in1sq[o].w,
                        in1sq[o].targetH = 0,
                        in1sq[o].state = "animate",
                        infoHeader.style.opacity = 1);
                inStage = 4.5;
                break;
            case 4.5:
                for (var i = !0, o = 0; o < in1sq.length; o++)
                    "actiInner" == in1sq[o].id && "done" != in1sq[o].state && (i = !1);
                1 == i && (inStage = 5);
                break;
            case 5:
                for (var o = 0; o < in1sq.length; o++)
                    "actiInner" == in1sq[o].id && in1sq.splice(o, 1);
                for (var o = 0; o < in1sq.length; o++)
                    "actiOuter" == in1sq[o].id && (in1sq[o].initX = in1sq[o].x,
                        in1sq[o].initY = in1sq[o].y,
                        in1sq[o].initW = in1sq[o].w,
                        in1sq[o].initH = in1sq[o].h,
                        in1sq[o].time = 0,
                        in1sq[o].duration = uiFast,
                        in1sq[o].targetX = in1sq[o].w,
                        in1sq[o].targetY = 0,
                        in1sq[o].targetW = -in1sq[o].w,
                        in1sq[o].targetH = 0,
                        in1sq[o].state = "animate");
                inStage = 5.5;
                break;
            case 5.5:
                for (var i = !0, o = 0; o < in1sq.length; o++)
                    "actiOuter" == in1sq[o].id && "done" != in1sq[o].state && (i = !1);
                1 == i && (inStage = 6);
                break;
            case 6:
                for (var o = 0; o < in1sq.length; o++)
                    "actiOuter" == in1sq[o].id && in1sq.splice(o, 1);
                inStage = 6.5,
                    inIntro = !1,
                inBootLog || queueLog(66, "Fact Holder is powered & informing us.<br/>It'll keep track of what we know,<br/>which currently isn't a lot."),
                    inBootLog = !0
        }
    }
    , cpAddStuff = function() {
        if (0 == cpInitiated) {
            if ("center" == screentoActivate) {
                var e, t, a, s;
                switch (initDir) {
                    case 0:
                        e = cpGridSpace * initX - initDist,
                            t = cpGridSpace * initY,
                            a = initDist,
                            s = 0;
                        break;
                    case 1:
                        e = cpGridSpace * initX,
                            t = cpGridSpace * initY - initDist,
                            a = 0,
                            s = initDist;
                        break;
                    case 2:
                        e = cpGridSpace * initX + initDist,
                            t = cpGridSpace * initY,
                            a = -initDist,
                            s = 0;
                        break;
                    case 3:
                        e = cpGridSpace * initX,
                            t = cpGridSpace * initY + initDist,
                            a = 0,
                            s = -initDist
                }
                var n = new UiSquare(e - initSize / 2,t - initSize / 2,initSize,initSize,a,s,0,0,uiWhite,uiFast,"inout","center");
                n.state = "animate",
                    n.id = "initGrid",
                    cp2sq.push(n),
                    cpClick++,
                    initDir++,
                initDir > 3 && (initDir = 0),
                    initX++,
                initX > cpGridArm && (initX = -cpGridArm,
                    initY++)
            }
            cpClick >= cpNeeded && (screenFocusReal && (cpBootLog ? (thingMuted || setTimeout(function() {
                allInit__sound.play()
            }, 1150),
                setTimeout(function() {
                    cpInitiated = !0
                }, 4e3)) : (thingMuted || centerPowerInit__sound.play(),
                setTimeout(function() {
                    cpInitiated = !0
                }, 1100))),
            "center" == screentoActivate && (screentoActivate = ""))
        }
        if (1 == cpInitiated && 1 == cpStage) {
            for (var i = !0, o = 0; o < cp2sq.length; o++)
                "initGrid" == cp2sq[o].id && "done" != cp2sq[o].state && (i = !1);
            1 == i && (cpStage = 2)
        }
        switch (cpStage) {
            case 2:
                for (var o = 0; o < cp2sq.length; o++)
                    if ("initGrid" == cp2sq[o].id) {
                        cp2sq[o].initX = cp2sq[o].x,
                            cp2sq[o].initY = cp2sq[o].y,
                            cp2sq[o].initW = cp2sq[o].w,
                            cp2sq[o].initH = cp2sq[o].h,
                            cp2sq[o].time = 0,
                            cp2sq[o].duration = uiFast,
                            cp2sq[o].targetX = cp2sq[o].x * getRandomInt(10, 15),
                            cp2sq[o].targetY = cp2sq[o].y * getRandomInt(10, 15);
                        var r = getRandomInt(1, 9) / 10;
                        cp2sq[o].targetW = -cp2sq[o].w * r,
                            cp2sq[o].targetH = -cp2sq[o].w * r,
                            cp2sq[o].state = "animate"
                    }
                spaceplan__logo = new UiSvg(0,0,0,0,0,.7 * oCanvas.width,uiFast,"inout","center",spaceplan__svg),
                    spaceplan__logo.id = "logo",
                    spaceplan__logo.state = "animate",
                    cp1sq.push(spaceplan__logo);
                var l;
                l = window.innerHeight < 721 ? 36 : 54;
                var d = -cpAnchor[1] + l
                    , n = new UiSquare(0,0,1,1,0,d,0,0,uiWhite,uiFast,"inout","center");
                n.state = "animate",
                    n.id = "headerHr",
                    cp2sq.push(n),
                    cpStage = 2.5;
                break;
            case 2.5:
                for (var i = !0, o = 0; o < cp2sq.length; o++)
                    "initGrid" == cp2sq[o].id && "done" != cp2sq[o].state && (i = !1);
                if (1 == i) {
                    cpStage = 3;
                    for (var o = 0; o < cp2sq.length; o++)
                        "initGrid" == cp2sq[o].id && (cp2sq[o].x = cp2sq[o].x * (getRandomInt(11, 12) / 10),
                            cp2sq[o].y = cp2sq[o].y * (getRandomInt(11, 12) / 10))
                }
                spaceplan__logo.extraW += .5;
                break;
            case 3:
                cpStage = 3.5,
                    spaceplan__logo.extraW += .5;
                break;
            case 3.5:
                cpStage = 4,
                    spaceplan__logo.extraW += .5;
                break;
            case 4:
                setTimeout(function() {
                    cpStage = 5
                }, 1e3),
                    cpStage = 4.5,
                    spaceplan__logo.extraW += .5;
                break;
            case 4.5:
                spaceplan__logo.w += .5;
                break;
            case 5:
                for (var o = 0; o < cp1sq.length; o++)
                    if ("logo" == cp1sq[o].id) {
                        cp1sq.splice(o, 1),
                            spaceplan__logo = "",
                            cpStage = 6;
                        break
                    }
                break;
            case 6:
                for (var o = 0; o < cp2sq.length; o++) {
                    if ("initGrid" == cp2sq[o].id) {
                        cp2sq[o].initX = cp2sq[o].x,
                            cp2sq[o].initY = cp2sq[o].y,
                            cp2sq[o].initW = cp2sq[o].w,
                            cp2sq[o].initH = cp2sq[o].h,
                            cp2sq[o].time = 0,
                            cp2sq[o].duration = uiFast,
                            cp2sq[o].targetX = cp2sq[o].x * getRandomInt(50, 60),
                            cp2sq[o].targetY = cp2sq[o].y * getRandomInt(50, 60);
                        var r = getRandomInt(1, 9) / 10;
                        cp2sq[o].targetW = -cp2sq[o].w * r,
                            cp2sq[o].targetH = -cp2sq[o].w * r,
                            cp2sq[o].state = "animate"
                    }
                    if ("headerHr" == cp2sq[o].id) {
                        cp2sq[o].initX = cp2sq[o].x,
                            cp2sq[o].initY = cp2sq[o].y,
                            cp2sq[o].initW = cp2sq[o].w,
                            cp2sq[o].initH = cp2sq[o].h,
                            cp2sq[o].time = 0,
                            cp2sq[o].duration = uiFast,
                            cp2sq[o].targetX = -115,
                            cp2sq[o].targetY = 0;
                        var r = getRandomInt(1, 9) / 10;
                        cp2sq[o].targetW = 229,
                            cp2sq[o].targetH = 0,
                            cp2sq[o].state = "animate"
                    }
                }
                if (!blackHoleShrunk) {
                    var c = new UiLine(cpAnchor[0],cpAnchor[1],cpAnchor[0],cpAnchor[1],0,planetOne.shadPos[0][0] - cpAnchor[0],planetOne.shadPos[0][1] - cpAnchor[1],planetOne.shadPos[1][0] - cpAnchor[0],planetOne.shadPos[1][1] - cpAnchor[1],2 * planetOne.radius,"#070c12",uiFast,"inout","center");
                    c.state = "animate",
                        c.id = "planetShad",
                        cp3sq.push(c);
                    var p = new UiLine(cpAnchor[0],cpAnchor[1],cpAnchor[0],cpAnchor[1],0,userBody.shadPos[0][0] - cpAnchor[0],userBody.shadPos[0][1] - cpAnchor[1],userBody.shadPos[1][0] - cpAnchor[0],userBody.shadPos[1][1] - cpAnchor[1],2 * userBody.radius,"#070c12",uiFast,"inout","center");
                    if (p.state = "animate",
                            p.id = "userBodyShad",
                            cp3sq.push(p),
                        gotLandship && !shipLanded) {
                        var u = new UiLine(cpAnchor[0],cpAnchor[1],cpAnchor[0],cpAnchor[1],0,userPod.shadPos[0][0] - cpAnchor[0],userPod.shadPos[0][1] - cpAnchor[1],userPod.shadPos[1][0] - cpAnchor[0],userPod.shadPos[1][1] - cpAnchor[1],2 * userPod.radius,"#070c12",uiFast,"inout","center");
                        u.state = "animate",
                            u.id = "userPodShad",
                            cp3sq.push(u)
                    }
                }
                var h = new UiCircle(0,0,0,0,2,0,0,planetOne.radius,0,0,!1,"#fc4646",uiFast,"inout","center");
                h.state = "animate",
                    h.id = "planet",
                    cp2sq.push(h);
                var g = new UiSquare(0,0,0,0,userBody.relPos[0] - cpAnchor[0],userBody.relPos[1] - cpAnchor[1],userBody.radius,userBody.radius,userBody.colour,uiFast,"inout","center");
                if (g.state = "animate",
                        g.id = "ship",
                        cp2sq.push(g),
                        gotLandship) {
                    var m = new UiSquare(0,0,0,0,userPod.relPos[0] - cpAnchor[0],userPod.relPos[1] - cpAnchor[1],userPod.radius,userPod.radius,userPod.colour,uiFast,"inout","center");
                    m.state = "animate",
                        m.id = "pod",
                        cp2sq.push(m)
                }
                for (var o = 0; o < probes.length; o++) {
                    var v = new UiCircle(0,0,0,0,2,probes[o].relPos[0] - cpAnchor[0],probes[o].relPos[1] - cpAnchor[1],probes[o].radius,0,0,!1,probes[o].colour,uiFast,"inout","center");
                    v.state = "animate",
                        v.id = "probe",
                        v.targetBody = probes[o],
                        cp2sq.push(v)
                }
                for (var o = 0; o < landedProbes.length; o++) {
                    var v = new UiCircle(0,0,0,0,2,landedProbes[o].relPos[0] - cpAnchor[0],landedProbes[o].relPos[1] - cpAnchor[1],landedProbes[o].radius,0,0,!1,landedProbes[o].colour,uiFast,"inout","center");
                    v.state = "animate",
                        v.id = "landedprobe",
                        cp2sq.push(v)
                }
                for (var o = 0; o < spudniks.length; o++) {
                    var v = new UiCircle(0,0,0,0,2,spudniks[o].relPos[0] - cpAnchor[0],spudniks[o].relPos[1] - cpAnchor[1],spudniks[o].radius,0,0,!1,spudniks[o].colour,uiFast,"inout","center");
                    v.state = "animate",
                        v.id = "probe",
                        v.targetBody = spudniks[o],
                        cp2sq.push(v)
                }
                for (var o = 0; o < potatoPlants.length; o++) {
                    var v = new UiSquare(0,0,0,0,potatoPlants[o].relPos[0] - cpAnchor[0],potatoPlants[o].relPos[1] - cpAnchor[1],potatoPlants[o].radius,potatoPlants[o].radius,potatoPlants[o].colour,uiFast,"inout","center");
                    v.state = "animate",
                        v.id = "probe",
                        v.targetBody = potatoPlants[o],
                        cp2sq.push(v)
                }
                for (var o = 0; o < landedPotatoPlants.length; o++) {
                    var v = new UiSquare(0,0,0,0,landedPotatoPlants[o].relPos[0] - cpAnchor[0],landedPotatoPlants[o].relPos[1] - cpAnchor[1],landedPotatoPlants[o].radius,landedPotatoPlants[o].radius,landedPotatoPlants[o].colour,uiFast,"inout","center");
                    v.state = "animate",
                        v.id = "landedprobe",
                        cp2sq.push(v)
                }
                for (var o = 0; o < taterTowers.length; o++) {
                    var v = new UiLine(cpAnchor[0],cpAnchor[1],cpAnchor[0],cpAnchor[1],0,taterTowers[o].relPos[0] - cpAnchor[0],taterTowers[o].relPos[1] - cpAnchor[1],taterTowers[o].relPos[0] - cpAnchor[0] - 50 * taterTowers[o].vel[0],taterTowers[o].relPos[1] - cpAnchor[1] - 50 * taterTowers[o].vel[1],taterTowers[o].radius,taterTowers[o].colour,uiFast,"inout","center");
                    v.state = "animate",
                        v.id = "tower",
                        v.targetBody = taterTowers[o],
                        cp2sq.push(v)
                }
                for (var o = 0; o < landedTaterTowers.length; o++) {
                    var v = new UiLine(cpAnchor[0],cpAnchor[1],cpAnchor[0],cpAnchor[1],0,landedTaterTowers[o].relPos[0] - cpAnchor[0],landedTaterTowers[o].relPos[1] - cpAnchor[1],landedTaterTowers[o].relPos[0] - cpAnchor[0] - 50 * landedTaterTowers[o].vel[0],landedTaterTowers[o].relPos[1] - cpAnchor[1] - 50 * landedTaterTowers[o].vel[1],landedTaterTowers[o].radius,landedTaterTowers[o].colour,uiFast,"inout","center");
                    v.state = "animate",
                        v.id = "landedTower",
                        cp2sq.push(v)
                }
                for (var o = 0; o < spudguns.length; o++) {
                    var v = new UiCircle(0,0,0,0,2,spudguns[o].relPos[0] - cpAnchor[0],spudguns[o].relPos[1] - cpAnchor[1],spudguns[o].radius,0,0,!1,spudguns[o].colour,uiFast,"inout","center");
                    v.state = "animate",
                        v.id = "probe",
                        v.targetBody = spudguns[o],
                        cp2sq.push(v)
                }
                for (var o = 0; o < launchers.length; o++) {
                    var v = new UiCircle(0,0,0,0,2,launchers[o].relPos[0] - cpAnchor[0],launchers[o].relPos[1] - cpAnchor[1],launchers[o].radius,0,0,!1,launchers[o].colour,uiFast,"inout","center");
                    v.state = "animate",
                        v.id = "probe",
                        v.targetBody = launchers[o],
                        cp2sq.push(v)
                }
                cpStage = 6.5;
                break;
            case 6.5:
                for (var o = 0; o < cp2sq.length; o++)
                    "ship" == cp2sq[o].id && (cp2sq[o].extraX = userBody.relPos[0] - (cp2sq[o].targetX + cpAnchor[0]),
                        cp2sq[o].extraY = userBody.relPos[1] - (cp2sq[o].targetY + cpAnchor[1])),
                    "pod" == cp2sq[o].id && (cp2sq[o].extraX = userPod.relPos[0] - (cp2sq[o].targetX + cpAnchor[0]),
                        cp2sq[o].extraY = userPod.relPos[1] - (cp2sq[o].targetY + cpAnchor[1])),
                    "probe" == cp2sq[o].id && (cp2sq[o].extraX = cp2sq[o].targetBody.relPos[0] - (cp2sq[o].targetX + cpAnchor[0]),
                        cp2sq[o].extraY = cp2sq[o].targetBody.relPos[1] - (cp2sq[o].targetY + cpAnchor[1])),
                    "tower" == cp2sq[o].id && (cp2sq[o].extraX1 = cp2sq[o].targetBody.relPos[0] - (cp2sq[o].targetX1 + cpAnchor[0]),
                        cp2sq[o].extraY1 = cp2sq[o].targetBody.relPos[1] - (cp2sq[o].targetY1 + cpAnchor[1]),
                        cp2sq[o].extraX2 = cp2sq[o].targetBody.relPos[0] - (cp2sq[o].targetX1 + cpAnchor[0]),
                        cp2sq[o].extraY2 = cp2sq[o].targetBody.relPos[1] - (cp2sq[o].targetY1 + cpAnchor[1]));
                if (!blackHoleShrunk)
                    for (var o = 0; o < cp3sq.length; o++)
                        "planetShad" == cp3sq[o].id && (cp3sq[o].extraX1 = planetOne.shadPos[0][0] - (cp3sq[o].targetX1 + cpAnchor[0]),
                            cp3sq[o].extraY1 = planetOne.shadPos[0][1] - (cp3sq[o].targetY1 + cpAnchor[1]),
                            cp3sq[o].extraX2 = planetOne.shadPos[1][0] - (cp3sq[o].targetX2 + cpAnchor[0]),
                            cp3sq[o].extraY2 = planetOne.shadPos[1][1] - (cp3sq[o].targetY2 + cpAnchor[1])),
                        "userBodyShad" == cp3sq[o].id && (cp3sq[o].extraX1 = userBody.shadPos[0][0] - (cp3sq[o].targetX1 + cpAnchor[0]),
                            cp3sq[o].extraY1 = userBody.shadPos[0][1] - (cp3sq[o].targetY1 + cpAnchor[1]),
                            cp3sq[o].extraX2 = userBody.shadPos[1][0] - (cp3sq[o].targetX2 + cpAnchor[0]),
                            cp3sq[o].extraY2 = userBody.shadPos[1][1] - (cp3sq[o].targetY2 + cpAnchor[1])),
                        "userPodShad" == cp3sq[o].id && (cp3sq[o].extraX1 = userPod.shadPos[0][0] - (cp3sq[o].targetX1 + cpAnchor[0]),
                            cp3sq[o].extraY1 = userPod.shadPos[0][1] - (cp3sq[o].targetY1 + cpAnchor[1]),
                            cp3sq[o].extraX2 = userPod.shadPos[1][0] - (cp3sq[o].targetX2 + cpAnchor[0]),
                            cp3sq[o].extraY2 = userPod.shadPos[1][1] - (cp3sq[o].targetY2 + cpAnchor[1]));
                for (var i = !0, o = 0; o < cp2sq.length; o++)
                    "initGrid" == cp2sq[o].id && "done" != cp2sq[o].state && (i = !1);
                1 == i && (cpStage = 7);
                break;
            case 7:
                headerHr.style.opacity = 1,
                    planetLookerType.style.opacity = 1,
                    systemPeekerType.style.opacity = 1,
                    oCanvas.style.opacity = 1,
                    planViewButton.style.opacity = 1,
                    centerPowerCanvas.parentNode.removeChild(centerPowerCanvas),
                    cpIntro = !1,
                    cpStage = 8,
                cpBootLog || (ga("set", {
                    userId: USER_ID,
                    dimension1: shipName,
                    dimension2: USER_ID,
                    metric3: 1
                }),
                    ga("send", "pageview"),
                    ga("set", {
                        metric3: 0
                    }),
                    queueLog(99, "Bloody hell that obnoxious boot up.<br/>Embarrassing &mdash; software devs aye?"),
                    queueLog(66, "Well there we go, all up & running.<br/>Build more things so we can work out<br/>where exactly we are..."),
                    shipStatusSpan.innerHTML = "<span>Ship Status:</span> breezy"),
                    cpBootLog = !0
        }
    }
    ;
initDir = 0,
    initX = -tmGridArm,
    initY = -tmGridArm;
for (var i = 0; tmNeeded > i; i++) {
    var xSpawn = tmGridSpace * initX
        , ySpawn = tmGridSpace * initY
        , newSq = new UiSquare(xSpawn - 1,ySpawn - 1,2,2,0,0,0,0,uiWhite,uiFast,"inout","thingMaker");
    newSq.state = "done",
        tmGridPoints.push(newSq),
        initDir++,
    initDir > 3 && (initDir = 0),
        initX++,
    initX > tmGridArm && (initX = -tmGridArm,
        initY++)
}
initDir = 0,
    initX = -deGridArm,
    initY = -deGridArm;
for (var i = 0; deNeeded > i; i++) {
    var xSpawn = deGridSpace * initX
        , ySpawn = deGridSpace * initY
        , newSq = new UiSquare(xSpawn - 1,ySpawn - 1,2,2,0,0,0,0,uiWhite,uiFast,"inout","develop");
    newSq.state = "done",
        deGridPoints.push(newSq),
        initDir++,
    initDir > 3 && (initDir = 0),
        initX++,
    initX > deGridArm && (initX = -deGridArm,
        initY++)
}
initDir = 0,
    initX = -inGridArm,
    initY = -inGridArm;
for (var i = 0; inNeeded > i; i++) {
    var xSpawn = inGridSpace * initX
        , ySpawn = inGridSpace * initY
        , newSq = new UiSquare(xSpawn - 1,ySpawn - 1,2,2,0,0,0,0,uiWhite,uiFast,"inout","information");
    newSq.state = "done",
        inGridPoints.push(newSq),
        initDir++,
    initDir > 3 && (initDir = 0),
        initX++,
    initX > inGridArm && (initX = -inGridArm,
        initY++)
}
initDir = 0,
    initX = -cpGridArm,
    initY = -cpGridArm;
for (var i = 0; cpNeeded > i; i++) {
    var xSpawn = cpGridSpace * initX
        , ySpawn = cpGridSpace * initY
        , newSq = new UiSquare(xSpawn - 1,ySpawn - 1,2,2,0,0,0,0,uiWhite,uiFast,"inout","center");
    newSq.state = "done",
        cpGridPoints.push(newSq),
        initDir++,
    initDir > 3 && (initDir = 0),
        initX++,
    initX > cpGridArm && (initX = -cpGridArm,
        initY++)
}
initX = -tmGridArm,
    initY = -tmGridArm,
    initDir = 0;
var spliceArray = function(e, t) {
    if (void 0 != t)
        for (var a = t.length - 1; a > -1; a--)
            e.splice(t[a], 1)
}
    , options__button = document.getElementById("options__button")
    , about__button = document.getElementById("about__button")
    , options = document.getElementById("options")
    , about = document.getElementById("about")
    , options__save = document.getElementById("options__save")
    , options__autosaveY = document.getElementById("options__autosave--y")
    , options__autosaveN = document.getElementById("options__autosave--n")
    , options__savefreq30s = document.getElementById("options__savefreq--30s")
    , options__savefreq60s = document.getElementById("options__savefreq--60s")
    , options__savefreq5m = document.getElementById("options__savefreq--5m")
    , options__savefreq30m = document.getElementById("options__savefreq--30m")
    , options__soundY = document.getElementById("options__sound--y")
    , options__soundN = document.getElementById("options__sound--n")
    , options__drawvisY = document.getElementById("options__drawvis--y")
    , options__drawvisN = document.getElementById("options__drawvis--n");
options.style.display = "none";
for (var thingMuted = !1, thingAutoSave = !0, thingSaveFreq = "60s", thingdrawVis = !1, saveInter, options__sound = [], about__sound = [], options__soundInt = 0, about__soundInt = 0, ks = 0; 5 > ks; ks++)
    options__sound[ks] = new Audio("audio/menu/options.mp3"),
        about__sound[ks] = new Audio("audio/menu/about.mp3"),
        soundArray.push(options__sound[ks]),
        soundArray.push(about__sound[ks]);
var optctx = options__button.getContext("2d")
    , optionsCog__svg = new Image;
!isFirefox & !isEdge ? optionsCog__svg.src = "img/options.svg" : optionsCog__svg.src = "img/options.png";
var optionsClose__svg = new Image;
!isFirefox & !isEdge ? optionsClose__svg.src = "img/close.svg" : optionsClose__svg.src = "img/close.png",
    optionsImg = {
        cog: optionsCog__svg,
        close: optionsClose__svg,
        cogPos: 0,
        cogSize: 20,
        cogMaxSize: 20
    };
var optionsInterval, optionsTime = 0, optionsTimer = 7;
optionsImg.close.onload = function() {
    optctx.drawImage(optionsImg.close, 0, 0, optionsImg.cogSize, optionsImg.cogSize),
        optctx.drawImage(optionsImg.cog, 0, 0, optionsImg.cogSize, optionsImg.cogSize)
}
    ,
    contList = document.getElementById("contributor-list"),
    about.style.display = "none";
var optionsSlider = document.getElementById("options__volume");
optionsSlider.addEventListener("input", adjustVolume);
for (var i = 0; i < soundArray.length; i++)
    soundArray[i].volume = globalVolume;
optionsSlider.value = globalVolume;
var getGivers = function() {
    var e = createCORSRequest("GET", "https://imraising.tv/api/v1/topDonors?apikey=px9TJFsizPkaRo87BIw1Bw");
    if (!e)
        throw new Error("CORS not supported");
    e.onload = function() {
        contList.innerHTML = "";
        for (var t = (e.responseText,
            e.responseText), a = JSON.parse(t), s = 0, n = 0; 3 > n; n++) {
            var i = document.createElement("div");
            i.classList.add("cont__row"),
                contList.appendChild(i);
            var o = document.createElement("div");
            o.classList.add("cont__name"),
                i.appendChild(o);
            var r = document.createElement("div");
            r.classList.add("cont__don"),
                i.appendChild(r),
                void 0 != a[n] ? "Anonymous" == a[n].nickname ? (s += 1,
                    o.innerHTML = a[n + s].nickname,
                    r.innerHTML = "£" + a[n + s].amount.total.toFixed(2)) : (o.innerHTML = a[n + s].nickname,
                    r.innerHTML = "£" + a[n + s].amount.total.toFixed(2)) : (o.innerHTML = "*********",
                    r.innerHTML = "£0.00")
        }
    }
        ,
        e.onerror = function() {
            console.log("There was an error!")
        }
        ,
        e.send()
}
    , lastSavedSpan = document.getElementById("options__lastsaved"), lastSavedDate, saveExists;
if (null !== localStorage.getItem("saveExists")) {
    "true" == localStorage.getItem("saveExists") && console.log("Loading save..."),
        saveExists = localStorage.getItem("saveExists"),
        shipName = localStorage.getItem("shipName"),
        shipNameSpan.value = shipName,
        prevAngle = localStorage.getItem("prevAngle"),
        initDate = new Date(localStorage.getItem("initDate")),
        realDate = new Date(localStorage.getItem("realDate")),
        physicsBodies = [];
    var str = localStorage.getItem("planetOne_pos")
        , pos = str.split(",");
    pos[0] = parseFloat(pos[0]),
        pos[1] = parseFloat(pos[1]);
    var str = localStorage.getItem("planetOne_vel")
        , vel = str.split(",");
    vel[0] = parseFloat(vel[0]),
        vel[1] = parseFloat(vel[1]),
        planetOne = new PhysicsBody(localStorage.getItem("planetOne_type"),pos[0],pos[1],parseInt(localStorage.getItem("planetOne_radius")),vel[0],vel[1],parseInt(localStorage.getItem("planetOne_mass")),localStorage.getItem("planetOne_colour"),null ),
        physicsBodies.push(planetOne);
    var str = localStorage.getItem("userBody_pos")
        , pos = str.split(",");
    pos[0] = parseFloat(pos[0]),
        pos[1] = parseFloat(pos[1]);
    var str = localStorage.getItem("userBody_vel")
        , vel = str.split(",");
    vel[0] = parseFloat(vel[0]),
        vel[1] = parseFloat(vel[1]),
        userBody = new PhysicsBody(localStorage.getItem("userBody_type"),pos[0],pos[1],parseInt(localStorage.getItem("userBody_radius")),vel[0],vel[1],parseInt(localStorage.getItem("userBody_mass")),localStorage.getItem("userBody_colour"),planetOne),
    "true" == localStorage.getItem("userBodyinArray") && physicsBodies.push(userBody),
        physicsBodies2 = [];
    for (var str = localStorage.getItem("sunCanvasPhysBods"), sunCanvasPhysBods = str.split(","), pla = 0; pla < sunCanvasPhysBods.length; pla++)
        switch (sunCanvasPhysBods[pla]) {
            case "sol":
                var str = localStorage.getItem("sol_pos")
                    , pos = str.split(",");
                pos[0] = parseFloat(pos[0]),
                    pos[1] = parseFloat(pos[1]);
                var str = localStorage.getItem("sol_vel")
                    , vel = str.split(",");
                vel[0] = parseFloat(vel[0]),
                    vel[1] = parseFloat(vel[1]),
                    sol = new PhysicsBody(localStorage.getItem("sol_type"),pos[0],pos[1],parseInt(localStorage.getItem("sol_radius")),vel[0],vel[1],parseInt(localStorage.getItem("sol_mass")),localStorage.getItem("sol_colour"),null ,",","sol")
        }
    for (var earthInArray = !1, pla = 0; pla < sunCanvasPhysBods.length; pla++)
        switch (sunCanvasPhysBods[pla]) {
            case "sol":
                physicsBodies2.push(sol);
                break;
            case "earth":
                var str = localStorage.getItem("earth_pos")
                    , pos = str.split(",");
                pos[0] = parseFloat(pos[0]),
                    pos[1] = parseFloat(pos[1]);
                var str = localStorage.getItem("earth_vel")
                    , vel = str.split(",");
                vel[0] = parseFloat(vel[0]),
                    vel[1] = parseFloat(vel[1]),
                    sPlanetOne = new PhysicsBody(localStorage.getItem("earth_type"),pos[0],pos[1],parseInt(localStorage.getItem("earth_radius")),vel[0],vel[1],parseInt(localStorage.getItem("earth_mass")),localStorage.getItem("earth_colour"),sol,",","earth"),
                    physicsBodies2.push(sPlanetOne),
                    earthInArray = !0;
                break;
            case "mercury":
                var str = localStorage.getItem("mercury_pos")
                    , pos = str.split(",");
                pos[0] = parseFloat(pos[0]),
                    pos[1] = parseFloat(pos[1]);
                var str = localStorage.getItem("mercury_vel")
                    , vel = str.split(",");
                vel[0] = parseFloat(vel[0]),
                    vel[1] = parseFloat(vel[1]),
                    mercury = new PhysicsBody(localStorage.getItem("mercury_type"),pos[0],pos[1],parseInt(localStorage.getItem("mercury_radius")),vel[0],vel[1],parseInt(localStorage.getItem("mercury_mass")),localStorage.getItem("mercury_colour"),sol,mercuryBlurb,"mercury"),
                    physicsBodies2.push(mercury);
                break;
            case "venus":
                var str = localStorage.getItem("venus_pos")
                    , pos = str.split(",");
                pos[0] = parseFloat(pos[0]),
                    pos[1] = parseFloat(pos[1]);
                var str = localStorage.getItem("venus_vel")
                    , vel = str.split(",");
                vel[0] = parseFloat(vel[0]),
                    vel[1] = parseFloat(vel[1]),
                    venus = new PhysicsBody(localStorage.getItem("venus_type"),pos[0],pos[1],parseInt(localStorage.getItem("venus_radius")),vel[0],vel[1],parseInt(localStorage.getItem("venus_mass")),localStorage.getItem("venus_colour"),sol,venusBlurb,"venus"),
                    physicsBodies2.push(venus);
                break;
            case "mars":
                var str = localStorage.getItem("mars_pos")
                    , pos = str.split(",");
                pos[0] = parseFloat(pos[0]),
                    pos[1] = parseFloat(pos[1]);
                var str = localStorage.getItem("mars_vel")
                    , vel = str.split(",");
                vel[0] = parseFloat(vel[0]),
                    vel[1] = parseFloat(vel[1]),
                    mars = new PhysicsBody(localStorage.getItem("mars_type"),pos[0],pos[1],parseInt(localStorage.getItem("mars_radius")),vel[0],vel[1],parseInt(localStorage.getItem("mars_mass")),localStorage.getItem("mars_colour"),sol,marsBlurb,"mars"),
                    physicsBodies2.push(mars);
                break;
            case "jupiter":
                var str = localStorage.getItem("jupiter_pos")
                    , pos = str.split(",");
                pos[0] = parseFloat(pos[0]),
                    pos[1] = parseFloat(pos[1]);
                var str = localStorage.getItem("jupiter_vel")
                    , vel = str.split(",");
                vel[0] = parseFloat(vel[0]),
                    vel[1] = parseFloat(vel[1]),
                    jupiter = new PhysicsBody(localStorage.getItem("jupiter_type"),pos[0],pos[1],parseInt(localStorage.getItem("jupiter_radius")),vel[0],vel[1],parseInt(localStorage.getItem("jupiter_mass")),localStorage.getItem("jupiter_colour"),sol,jupiterBlurb,"jupiter"),
                    physicsBodies2.push(jupiter);
                break;
            case "saturn":
                var str = localStorage.getItem("saturn_pos")
                    , pos = str.split(",");
                pos[0] = parseFloat(pos[0]),
                    pos[1] = parseFloat(pos[1]);
                var str = localStorage.getItem("saturn_vel")
                    , vel = str.split(",");
                vel[0] = parseFloat(vel[0]),
                    vel[1] = parseFloat(vel[1]),
                    saturn = new PhysicsBody(localStorage.getItem("saturn_type"),pos[0],pos[1],parseInt(localStorage.getItem("saturn_radius")),vel[0],vel[1],parseInt(localStorage.getItem("saturn_mass")),localStorage.getItem("saturn_colour"),sol,saturnBlurb,"saturn"),
                    physicsBodies2.push(saturn);
                break;
            case "uranus":
                var str = localStorage.getItem("uranus_pos")
                    , pos = str.split(",");
                pos[0] = parseFloat(pos[0]),
                    pos[1] = parseFloat(pos[1]);
                var str = localStorage.getItem("uranus_vel")
                    , vel = str.split(",");
                vel[0] = parseFloat(vel[0]),
                    vel[1] = parseFloat(vel[1]),
                    uranus = new PhysicsBody(localStorage.getItem("uranus_type"),pos[0],pos[1],parseInt(localStorage.getItem("uranus_radius")),vel[0],vel[1],parseInt(localStorage.getItem("uranus_mass")),localStorage.getItem("uranus_colour"),sol,uranusBlurb,"uranus"),
                    physicsBodies2.push(uranus);
                break;
            case "neptune":
                var str = localStorage.getItem("neptune_pos")
                    , pos = str.split(",");
                pos[0] = parseFloat(pos[0]),
                    pos[1] = parseFloat(pos[1]);
                var str = localStorage.getItem("neptune_vel")
                    , vel = str.split(",");
                vel[0] = parseFloat(vel[0]),
                    vel[1] = parseFloat(vel[1]),
                    neptune = new PhysicsBody(localStorage.getItem("neptune_type"),pos[0],pos[1],parseInt(localStorage.getItem("neptune_radius")),vel[0],vel[1],parseInt(localStorage.getItem("neptune_mass")),localStorage.getItem("neptune_colour"),sol,neptuneBlurb,"neptune"),
                    physicsBodies2.push(neptune);
                break;
            case "pluto":
                var str = localStorage.getItem("pluto_pos")
                    , pos = str.split(",");
                pos[0] = parseFloat(pos[0]),
                    pos[1] = parseFloat(pos[1]);
                var str = localStorage.getItem("pluto_vel")
                    , vel = str.split(",");
                vel[0] = parseFloat(vel[0]),
                    vel[1] = parseFloat(vel[1]),
                    pluto = new PhysicsBody(localStorage.getItem("pluto_type"),pos[0],pos[1],parseInt(localStorage.getItem("pluto_radius")),vel[0],vel[1],parseInt(localStorage.getItem("pluto_mass")),localStorage.getItem("pluto_colour"),sol,plutoBlurb,"pluto"),
                    physicsBodies2.push(pluto)
        }
    if (!earthInArray) {
        var str = localStorage.getItem("sEarth_pos")
            , pos = str.split(",");
        pos[0] = parseFloat(pos[0]),
            pos[1] = parseFloat(pos[1]);
        var str = localStorage.getItem("sEarth_vel")
            , vel = str.split(",");
        vel[0] = parseFloat(vel[0]),
            vel[1] = parseFloat(vel[1]),
            sPlanetOne = new PhysicsBody(localStorage.getItem("sEarth_type"),pos[0],pos[1],parseInt(localStorage.getItem("sEarth_radius")),vel[0],vel[1],parseInt(localStorage.getItem("sEarth_mass")),localStorage.getItem("sEarth_colour"),sol,",","sEarth")
    }
    power = parseFloat(localStorage.getItem("power")),
        totalPowerProduced = parseFloat(localStorage.getItem("totalPowerProduced")),
        powerLastTurn = parseFloat(localStorage.getItem("powerLastTurn")),
        planetOneRad = parseFloat(localStorage.getItem("planetOneRad")),
        solStartRad = parseFloat(localStorage.getItem("solStartRad")),
        totalSolarProduced = parseFloat(localStorage.getItem("totalSolarProduced")),
        walkerSolarTracker = parseFloat(localStorage.getItem("walkerSolarTracker")),
        landingStage = localStorage.getItem("landingStage"),
        boughtSpudGuns = "true" == localStorage.getItem("boughtSpudGuns"),
        boughtPotatoLaunchers = "true" == localStorage.getItem("boughtPotatoLaunchers"),
        shipLanded = "true" == localStorage.getItem("shipLanded"),
        storySaid = "true" == localStorage.getItem("storySaid"),
        shipStatusSpan.innerHTML = localStorage.getItem("shipStatusSpan"),
        planetBoostersNeedCreate = "true" == localStorage.getItem("planetBoostersNeedCreate"),
    1 == planetBoostersNeedCreate && (createResearch("planetBoosters"),
        planetBoostersNeedCreate = !1),
        potatoPlantUnlock = "true" == localStorage.getItem("potatoPlantUnlock"),
        taterTowerUnlock = "true" == localStorage.getItem("taterTowerUnlock"),
        spudGunUnlock = "true" == localStorage.getItem("spudGunUnlock"),
        potatoLauncherUnlock = "true" == localStorage.getItem("potatoLauncherUnlock"),
        shipReleaseFailSafe = "true" == localStorage.getItem("shipReleaseFailSafe"),
        shipLandFailSafe = "true" == localStorage.getItem("shipLandFailSafe");
    var str = localStorage.getItem("availableItems")
        , availableItemsSave = [];
    availableItemsSave = str.split(",");
    for (var str = localStorage.getItem("availableItemsCost"), availableItemsCost = str.split(","), li = 0; li < availableItemsCost.length; li++)
        availableItemsCost[li] = parseInt(availableItemsCost[li]);
    for (var str = localStorage.getItem("availableItemsCount"), availableItemsCount = str.split(","), li = 0; li < availableItemsCount.length; li++)
        availableItemsCount[li] = parseInt(availableItemsCount[li]);
    for (var li = 0; li < availableItemsSave.length; li++)
        switch (availableItemsSave[li]) {
            case "item__solar":
                itemSolar = new ItemConstruct("item__solar",availableItemsCost[li],"Repair Solar Cell","****** ***** ****","power",solarPower,solarBlurb,!0,availableItemsCount[li],solarSound,icon__solar),
                    itemSolar.reveal();
                break;
            case "item__potato":
                itemPotato = new ItemConstruct("item__potato",availableItemsCost[li],"Potato","******","power",potatoPower,potatoBlurb,!0,availableItemsCount[li],potatoSound,icon__potato),
                    itemPotato.reveal();
                break;
            case "item__probe":
                itemProbe = new ItemConstruct("item__probe",availableItemsCost[li],"Probetato","*********","power",probePower,probeBlurb,!0,availableItemsCount[li],probeSound,icon__probe),
                    itemProbe.reveal();
                break;
            case "item__spudnik":
                itemSpudnik = new ItemConstruct("item__spudnik",availableItemsCost[li],"Spudnik","*******","power",spudnikPower,spudnikBlurb,!0,availableItemsCount[li],spudnikSound,icon__spudnik),
                    itemSpudnik.reveal();
                break;
            case "item__potatoPlant":
                var thisCondition = landedProbes.length > 0;
                itemPotatoPlant = new ItemConstruct("item__potatoPlant",availableItemsCost[li],"Potato Plant","****** *****","power",potatoPlantPower,potatoPlantBlurb,thisCondition,availableItemsCount[li],potatoPlantSound,icon__potatoplant),
                    itemPotatoPlant.reveal(),
                thisCondition || (itemPotatoPlant.costLineSpan.innerHTML = "<span id='cost' style='display:none;'></span>Requires landed probetato");
                break;
            case "item__taterTower":
                var thisCondition = !1;
                1 == shipLanded && (thisCondition = !0),
                    itemTaterTower = new ItemConstruct("item__taterTower",availableItemsCost[li],"Tater Tower","***** *****","power",taterTowerPower,taterTowerBlurb,thisCondition,availableItemsCount[li],taterTowerSound,icon__tatertower),
                    itemTaterTower.reveal(),
                thisCondition || (itemTaterTower.costLineSpan.innerHTML = "<span id='cost' style='display:none;'></span>Requires landed pod");
                break;
            case "item__spudGun":
                var thisCondition = !1;
                1 == gotPlanetBoosters && (thisCondition = !0),
                    itemSpudGun = new ItemConstruct("item__spudGun",availableItemsCost[li],"Spud Gun","**** ***","power",spudGunPower,spudGunBlurb,thisCondition,availableItemsCount[li],spudGunSound,icon__spudgun),
                    itemSpudGun.reveal(),
                thisCondition || (itemSpudGun.costLineSpan.innerHTML = "<span id='cost' style='display:none;'></span>Requires planet boosters");
                break;
            case "item__potatoLauncher":
                var thisCondition = !1;
                1 == gotPlanetBoosters && (thisCondition = !0),
                    itemPotatoLauncher = new ItemConstruct("item__potatoLauncher",availableItemsCost[li],"Potato Launcher","****** ********","power",potatoLauncherPower,potatoLauncherBlurb,thisCondition,availableItemsCount[li],potatoLauncherSound,icon__potatolauncher),
                    itemPotatoLauncher.reveal(),
                thisCondition || (itemPotatoLauncher.costLineSpan.innerHTML = "<span id='cost' style='display:none;'></span>Requires planet boosters")
        }
    for (var str = localStorage.getItem("lockedItems"), lockedItemsSave = str.split(","), li = 0; li < lockedItemsSave.length; li++)
        switch (lockedItemsSave[li]) {
            case "item__solar":
                itemSolar = new ItemConstruct("item__solar",solarCost,"Repair Solar Cell","****** ***** ****","power",solarPower,solarBlurb,!0,0,solarSound,icon__solar),
                    lockedItems.push(itemSolar);
                break;
            case "item__potato":
                itemPotato = new ItemConstruct("item__potato",potatoCost,"Potato","******","power",potatoPower,potatoBlurb,!0,0,potatoSound,icon__potato),
                    lockedItems.push(itemPotato);
                break;
            case "item__probe":
                itemProbe = new ItemConstruct("item__probe",probeCost,"Probetato","*********","power",probePower,probeBlurb,!0,0,probeSound,icon__probe),
                    lockedItems.push(itemProbe);
                break;
            case "item__spudnik":
                itemSpudnik = new ItemConstruct("item__spudnik",spudnikCost,"Spudnik","*******","power",spudnikPower,spudnikBlurb,!0,0,spudnikSound,icon__spudnik),
                    lockedItems.push(itemSpudnik);
                break;
            case "item__potatoPlant":
                var thisCondition = landedProbes.length > 0;
                itemPotatoPlant = new ItemConstruct("item__potatoPlant",potatoPlantCost,"Potato Plant","****** *****","power",potatoPlantPower,potatoPlantBlurb,thisCondition,0,potatoPlantSound,icon__potatoplant),
                thisCondition || (itemPotatoPlant.costLineSpan.innerHTML = "<span id='cost' style='display:none;'></span>Requires landed probetato"),
                    lockedItems.push(itemPotatoPlant);
                break;
            case "item__taterTower":
                var thisCondition = !1;
                1 == shipLanded && (thisCondition = !0),
                    itemTaterTower = new ItemConstruct("item__taterTower",taterTowerCost,"Tater Tower","***** *****","power",taterTowerPower,taterTowerBlurb,thisCondition,0,taterTowerSound,icon__tatertower),
                thisCondition || (itemTaterTower.costLineSpan.innerHTML = "<span id='cost' style='display:none;'></span>Requires landed pod"),
                    lockedItems.push(itemTaterTower);
                break;
            case "item__spudGun":
                var thisCondition = !1;
                1 == gotPlanetBoosters && (thisCondition = !0),
                    itemSpudGun = new ItemConstruct("item__spudGun",spudGunCost,"Spud Gun","**** ***","power",spudGunPower,spudGunBlurb,thisCondition,0,spudGunSound,icon__spudgun),
                thisCondition || (itemSpudGun.costLineSpan.innerHTML = "<span id='cost' style='display:none;'></span>Requires planet boosters"),
                    lockedItems.push(itemSpudGun);
                break;
            case "item__potatoLauncher":
                var thisCondition = !1;
                1 == gotPlanetBoosters && (thisCondition = !0),
                    itemPotatoLauncher = new ItemConstruct("item__potatoLauncher",potatoLauncherCost,"Potato Launcher","****** ********","power",potatoLauncherPower,potatoLauncherBlurb,thisCondition,0,potatoLauncherSound,icon__potatolauncher),
                thisCondition || (itemPotatoLauncher.costLineSpan.innerHTML = "<span id='cost' style='display:none;'></span>Requires planet boosters"),
                    lockedItems.push(itemPotatoLauncher)
        }
    for (var sola = 0; sola < localStorage.getItem("panelCount"); sola++)
        kinetigenAddPanel();
    var str = localStorage.getItem("availableResearch")
        , availableResearchSave = [];
    availableResearchSave = str.split(",");
    for (var re = 0; re < availableResearchSave.length; re++)
        switch (availableResearchSave[re]) {
            case "cleanPanels":
                createResearch("cleanPanels");
                break;
            case "polishedPanels":
                createResearch("polishedPanels");
                break;
            case "goldenPanels":
                createResearch("goldenPanels");
                break;
            case "heatshields":
                createResearch("heatshields");
                break;
            case "parachutes":
                createResearch("parachutes");
                break;
            case "solarAmbience":
                createResearch("solarAmbience");
                break;
            case "hopperHeatshields":
                createResearch("hopperHeatshields");
                break;
            case "hopperLanding":
                createResearch("hopperLanding");
                break;
            case "landship":
                createResearch("landship");
                break;
            case "systView":
                createResearch("systView");
                break;
            case "planetBoosters":
                createResearch("planetBoosters");
                break;
            case "approachEventHorizon":
                createResearch("approachEventHorizon");
                break;
            case "kinetigen01":
                createResearch("kinetigen01");
                break;
            case "kinetigen02":
                createResearch("kinetigen02");
                break;
            case "kinetigen03":
                createResearch("kinetigen03");
                break;
            case "kinetigen04":
                createResearch("kinetigen04");
                break;
            case "potatoUpgrade":
                createResearch("potatoUpgrade");
                break;
            case "probetatoUpgrade":
                createResearch("probetatoUpgrade");
                break;
            case "spudnikUpgrade":
                createResearch("spudnikUpgrade");
                break;
            case "potatoPlantUpgrade":
                createResearch("potatoPlantUpgrade");
                break;
            case "taterTowerUpgrade":
                createResearch("taterTowerUpgrade");
                break;
            case "spudGunUpgrade":
                createResearch("spudGunUpgrade");
                break;
            case "potatoLauncherUpgrade":
                createResearch("potatoLauncherUpgrade");
                break;
            case "irishPride":
                createResearch("irishPride")
        }
    var str = localStorage.getItem("researchedStuff")
        , researchedStuffSave = [];
    researchedStuffSave = str.split(",");
    for (var re = 0; re < researchedStuffSave.length; re++)
        switch (researchedStuffSave[re]) {
            case "cleanPanels":
                createResearch("cleanPanels"),
                    researchThing("cleanPanels", !0);
                break;
            case "polishedPanels":
                createResearch("polishedPanels"),
                    researchThing("polishedPanels", !0);
                break;
            case "goldenPanels":
                createResearch("goldenPanels"),
                    researchThing("goldenPanels", !0);
                break;
            case "heatshields":
                createResearch("heatshields"),
                    researchThing("heatshields", !0);
                break;
            case "parachutes":
                createResearch("parachutes"),
                    researchThing("parachutes", !0);
                break;
            case "solarAmbience":
                createResearch("solarAmbience"),
                    researchThing("solarAmbience", !0);
                break;
            case "hopperHeatshields":
                createResearch("hopperHeatshields"),
                    researchThing("hopperHeatshields", !0);
                break;
            case "hopperLanding":
                createResearch("hopperLanding"),
                    researchThing("hopperLanding", !0);
                break;
            case "landship":
                createResearch("landship"),
                    researchThing("landship", !0);
                break;
            case "systView":
                createResearch("systView"),
                    researchThing("systView", !0);
                break;
            case "planetBoosters":
                createResearch("planetBoosters"),
                    researchThing("planetBoosters", !0);
                break;
            case "approachEventHorizon":
                createResearch("approachEventHorizon"),
                    researchThing("approachEventHorizon", !0);
                break;
            case "kinetigen01":
                createResearch("kinetigen01"),
                    researchThing("kinetigen01", !0);
                break;
            case "kinetigen02":
                createResearch("kinetigen02"),
                    researchThing("kinetigen02", !0);
                break;
            case "kinetigen03":
                createResearch("kinetigen03"),
                    researchThing("kinetigen03", !0);
                break;
            case "kinetigen04":
                createResearch("kinetigen04"),
                    researchThing("kinetigen04", !0);
                break;
            case "potatoUpgrade":
                createResearch("potatoUpgrade"),
                    researchThing("potatoUpgrade", !0);
                break;
            case "probetatoUpgrade":
                createResearch("probetatoUpgrade"),
                    researchThing("probetatoUpgrade", !0);
                break;
            case "spudnikUpgrade":
                createResearch("spudnikUpgrade"),
                    researchThing("spudnikUpgrade", !0);
                break;
            case "potatoPlantUpgrade":
                createResearch("potatoPlantUpgrade"),
                    researchThing("potatoPlantUpgrade", !0);
                break;
            case "taterTowerUpgrade":
                createResearch("taterTowerUpgrade"),
                    researchThing("taterTowerUpgrade", !0);
                break;
            case "spudGunUpgrade":
                createResearch("spudGunUpgrade"),
                    researchThing("spudGunUpgrade", !0);
                break;
            case "potatoLauncherUpgrade":
                createResearch("potatoLauncherUpgrade"),
                    researchThing("potatoLauncherUpgrade", !0);
                break;
            case "irishPride":
                createResearch("irishPride"),
                    researchThing("irishPride", !0)
        }
    if (gotLandship) {
        var str = localStorage.getItem("userPod_pos")
            , pos = str.split(",");
        pos[0] = parseFloat(pos[0]),
            pos[1] = parseFloat(pos[1]);
        var str = localStorage.getItem("userPod_vel")
            , vel = str.split(",");
        vel[0] = parseFloat(vel[0]),
            vel[1] = parseFloat(vel[1]),
            userPod = new PhysicsBody(localStorage.getItem("userPod_type"),pos[0],pos[1],parseInt(localStorage.getItem("userPod_radius")),vel[0],vel[1],parseInt(localStorage.getItem("userPod_mass")),localStorage.getItem("userPod_colour"),planetOne),
        "true" == localStorage.getItem("userPodinArray") && physicsBodies.push(userPod)
    }
    if ("" !== localStorage.getItem("probesSave")) {
        var str = localStorage.getItem("probesSave")
            , probesSave = [];
        probesSave = str.split(",");
        for (var pr = 0; pr < probesSave.length; pr++) {
            var str = localStorage.getItem(probesSave[pr] + "_pos")
                , pos = str.split(",");
            pos[0] = parseFloat(pos[0]),
                pos[1] = parseFloat(pos[1]);
            var str = localStorage.getItem(probesSave[pr] + "_vel")
                , vel = str.split(",");
            vel[0] = parseFloat(vel[0]),
                vel[1] = parseFloat(vel[1]);
            var newProbe = new PhysicsBody("probe",pos[0],pos[1],1,vel[0],vel[1],4,localStorage.getItem(probesSave[pr] + "_colour"),planetOne);
            newProbe.landingZone = localStorage.getItem(probesSave[pr] + "_landingZone"),
                newProbe.terminalVelocity__set = localStorage.getItem(probesSave[pr] + "_terminalVelocity__set"),
                probes.push(newProbe)
        }
    }
    if ("" !== localStorage.getItem("landedProbesSave")) {
        var str = localStorage.getItem("landedProbesSave")
            , landedProbesSave = [];
        landedProbesSave = str.split(",");
        for (var pr = 0; pr < landedProbesSave.length; pr++) {
            var str = localStorage.getItem(landedProbesSave[pr] + "_pos")
                , pos = str.split(",");
            pos[0] = parseFloat(pos[0]),
                pos[1] = parseFloat(pos[1]);
            var str = localStorage.getItem(landedProbesSave[pr] + "_vel")
                , vel = str.split(",");
            vel[0] = parseFloat(vel[0]),
                vel[1] = parseFloat(vel[1]);
            var newProbe = new PhysicsBody("probe",pos[0],pos[1],1,vel[0],vel[1],4,localStorage.getItem(landedProbesSave[pr] + "_colour"),planetOne);
            newProbe.landingZone = localStorage.getItem(landedProbesSave[pr] + "_landingZone"),
                newProbe.terminalVelocity__set = localStorage.getItem(landedProbesSave[pr] + "_terminalVelocity__set"),
                landedProbes.push(newProbe)
        }
    }
    if ("" !== localStorage.getItem("spudniksSave")) {
        var str = localStorage.getItem("spudniksSave")
            , spudniksSave = [];
        spudniksSave = str.split(",");
        for (var pr = 0; pr < spudniksSave.length; pr++) {
            var str = localStorage.getItem(spudniksSave[pr] + "_pos")
                , pos = str.split(",");
            pos[0] = parseFloat(pos[0]),
                pos[1] = parseFloat(pos[1]);
            var str = localStorage.getItem(spudniksSave[pr] + "_vel")
                , vel = str.split(",");
            vel[0] = parseFloat(vel[0]),
                vel[1] = parseFloat(vel[1]);
            var newSpudnik = new PhysicsBody("spudnik",pos[0],pos[1],1,vel[0],vel[1],4,localStorage.getItem(spudniksSave[pr] + "_colour"),planetOne);
            spudniks.push(newSpudnik)
        }
    }
    if ("" !== localStorage.getItem("potatoPlantsSave")) {
        var str = localStorage.getItem("potatoPlantsSave")
            , potatoPlantsSave = [];
        potatoPlantsSave = str.split(",");
        for (var pr = 0; pr < potatoPlantsSave.length; pr++) {
            var str = localStorage.getItem(potatoPlantsSave[pr] + "_pos")
                , pos = str.split(",");
            pos[0] = parseFloat(pos[0]),
                pos[1] = parseFloat(pos[1]);
            var str = localStorage.getItem(potatoPlantsSave[pr] + "_vel")
                , vel = str.split(",");
            vel[0] = parseFloat(vel[0]),
                vel[1] = parseFloat(vel[1]);
            var newPotatoPlant = new PhysicsBody("potatoPlant",pos[0],pos[1],localStorage.getItem(potatoPlantsSave[pr] + "_radius"),vel[0],vel[1],4,localStorage.getItem(potatoPlantsSave[pr] + "_colour"),planetOne);
            newPotatoPlant.landingZone = localStorage.getItem(potatoPlantsSave[pr] + "_landingZone"),
                newPotatoPlant.terminalVelocity__set = localStorage.getItem(potatoPlantsSave[pr] + "_terminalVelocity__set"),
                potatoPlants.push(newPotatoPlant)
        }
    }
    if ("" !== localStorage.getItem("landedPotatoPlantsSave")) {
        var str = localStorage.getItem("landedPotatoPlantsSave")
            , landedPotatoPlantsSave = [];
        landedPotatoPlantsSave = str.split(",");
        for (var pr = 0; pr < landedPotatoPlantsSave.length; pr++) {
            var str = localStorage.getItem(landedPotatoPlantsSave[pr] + "_pos")
                , pos = str.split(",");
            pos[0] = parseFloat(pos[0]),
                pos[1] = parseFloat(pos[1]);
            var str = localStorage.getItem(landedPotatoPlantsSave[pr] + "_vel")
                , vel = str.split(",");
            vel[0] = parseFloat(vel[0]),
                vel[1] = parseFloat(vel[1]);
            var newPotatoPlant = new PhysicsBody("potatoPlant",pos[0],pos[1],localStorage.getItem(landedPotatoPlantsSave[pr] + "_radius"),vel[0],vel[1],4,localStorage.getItem(landedPotatoPlantsSave[pr] + "_colour"),planetOne);
            newPotatoPlant.landingZone = localStorage.getItem(landedPotatoPlantsSave[pr] + "_landingZone"),
                newPotatoPlant.terminalVelocity__set = localStorage.getItem(landedPotatoPlantsSave[pr] + "_terminalVelocity__set"),
                landedPotatoPlants.push(newPotatoPlant)
        }
    }
    if ("" !== localStorage.getItem("taterTowersSave")) {
        var str = localStorage.getItem("taterTowersSave")
            , taterTowersSave = [];
        taterTowersSave = str.split(",");
        for (var pr = 0; pr < taterTowersSave.length; pr++) {
            var str = localStorage.getItem(taterTowersSave[pr] + "_pos")
                , pos = str.split(",");
            pos[0] = parseFloat(pos[0]),
                pos[1] = parseFloat(pos[1]);
            var str = localStorage.getItem(taterTowersSave[pr] + "_vel")
                , vel = str.split(",");
            vel[0] = parseFloat(vel[0]),
                vel[1] = parseFloat(vel[1]);
            var newTaterTower = new PhysicsBody("tower",pos[0],pos[1],localStorage.getItem(taterTowersSave[pr] + "_radius"),vel[0],vel[1],4,localStorage.getItem(taterTowersSave[pr] + "_colour"),planetOne);
            taterTowers.push(newTaterTower)
        }
    }
    if ("" !== localStorage.getItem("landedTaterTowersSave")) {
        var str = localStorage.getItem("landedTaterTowersSave")
            , landedTaterTowersSave = [];
        landedTaterTowersSave = str.split(",");
        for (var pr = 0; pr < landedTaterTowersSave.length; pr++) {
            var str = localStorage.getItem(landedTaterTowersSave[pr] + "_pos")
                , pos = str.split(",");
            pos[0] = parseFloat(pos[0]),
                pos[1] = parseFloat(pos[1]);
            var str = localStorage.getItem(landedTaterTowersSave[pr] + "_vel")
                , vel = str.split(",");
            vel[0] = parseFloat(vel[0]),
                vel[1] = parseFloat(vel[1]);
            var newTaterTower = new PhysicsBody("tower",pos[0],pos[1],localStorage.getItem(landedTaterTowersSave[pr] + "_radius"),vel[0],vel[1],4,localStorage.getItem(landedTaterTowersSave[pr] + "_colour"),planetOne);
            landedTaterTowers.push(newTaterTower)
        }
    }
    if ("" !== localStorage.getItem("spudgunsSave")) {
        var str = localStorage.getItem("spudgunsSave")
            , spudgunsSave = [];
        spudgunsSave = str.split(",");
        for (var pr = 0; pr < spudgunsSave.length; pr++) {
            var str = localStorage.getItem(spudgunsSave[pr] + "_pos")
                , pos = str.split(",");
            pos[0] = parseFloat(pos[0]),
                pos[1] = parseFloat(pos[1]);
            var str = localStorage.getItem(spudgunsSave[pr] + "_vel")
                , vel = str.split(",");
            vel[0] = parseFloat(vel[0]),
                vel[1] = parseFloat(vel[1]);
            var newSpudgun = new PhysicsBody("spudgun",pos[0],pos[1],localStorage.getItem(spudgunsSave[pr] + "_radius"),vel[0],vel[1],4,localStorage.getItem(spudgunsSave[pr] + "_colour"),planetOne);
            spudguns.push(newSpudgun)
        }
    }
    if ("" !== localStorage.getItem("launchersSave")) {
        var str = localStorage.getItem("launchersSave")
            , launchersSave = [];
        launchersSave = str.split(",");
        for (var pr = 0; pr < launchersSave.length; pr++) {
            var str = localStorage.getItem(launchersSave[pr] + "_pos")
                , pos = str.split(",");
            pos[0] = parseFloat(pos[0]),
                pos[1] = parseFloat(pos[1]);
            var str = localStorage.getItem(launchersSave[pr] + "_vel")
                , vel = str.split(",");
            vel[0] = parseFloat(vel[0]),
                vel[1] = parseFloat(vel[1]);
            var newLauncher = new PhysicsBody("spudgun",pos[0],pos[1],localStorage.getItem(launchersSave[pr] + "_radius"),vel[0],vel[1],4,localStorage.getItem(launchersSave[pr] + "_colour"),planetOne);
            launchers.push(newLauncher)
        }
    }
    for (var elmes = 0; void 0 != localStorage.getItem("eventLogMessages_" + elmes); )
        pushLog(localStorage.getItem("eventLogMessages_" + elmes), !0),
            elmes++;
    for (var logsQueued = localStorage.getItem("queuedLogs"), q = 0; logsQueued > q; q++) {
        var thisLog = localStorage.getItem("queuedLog_" + q)
            , thisTimer = parseInt(localStorage.getItem("queuedLogT_" + q));
        queueLog(thisTimer, thisLog)
    }
    if (document.getElementById("status__gravSrc").style.display = localStorage.getItem("status__gravSrc--disp"),
            document.getElementById("status__atmosphere").style.display = localStorage.getItem("status__atmosphere--disp"),
            document.getElementById("status__inhabitantsBar").style.display = localStorage.getItem("status__inhabitantsBar--disp"),
            document.getElementById("status__inhabitants").style.display = localStorage.getItem("status__inhabitants--disp"),
            document.getElementById("status__sunMassBar").style.display = localStorage.getItem("status__sunMassBar--disp"),
            document.getElementById("status__sunMass").style.display = localStorage.getItem("status__sunMass--disp"),
            document.getElementById("status__gravSrc").innerHTML = localStorage.getItem("status__gravSrc--cont"),
            document.getElementById("status__atmosphere").innerHTML = localStorage.getItem("status__atmosphere--cont"),
            document.getElementById("status__inhabitantsBar").innerHTML = localStorage.getItem("status__inhabitantsBar--cont"),
            document.getElementById("status__inhabitants").innerHTML = localStorage.getItem("status__inhabitants--cont"),
            document.getElementById("status__sunMassBar").innerHTML = localStorage.getItem("status__sunMassBar--cont"),
            document.getElementById("status__sunMass").innerHTML = localStorage.getItem("status__sunMass--cont"),
            atmosphere__data = parseInt(localStorage.getItem("atmosphere__data")),
            ground__data = parseInt(localStorage.getItem("ground__data")),
            inhabitants__data = parseInt(localStorage.getItem("inhabitants__data")),
            inhabitants__started = "true" == localStorage.getItem("inhabitants__started"),
            inhabitants__discovered = "true" == localStorage.getItem("inhabitants__discovered"),
            inhabitantsProgress.max = inhabitants__dataNeeded,
            inhabitantsProgress.value = inhabitants__data,
            blackHoleShrunk = "true" == localStorage.getItem("blackHoleShrunk"),
            blackHoleMade = "true" == localStorage.getItem("blackHoleMade"),
            solShrinkT = parseInt(localStorage.getItem("solShrinkT")),
            solShrinkB = parseInt(localStorage.getItem("solShrinkB")),
            solShrinkC = parseInt(localStorage.getItem("solShrinkC")),
            solShrinkD = parseInt(localStorage.getItem("solShrinkD")),
            tmBootLog = "true" == localStorage.getItem("tmBootLog"),
            deBootLog = "true" == localStorage.getItem("deBootLog"),
            inBootLog = "true" == localStorage.getItem("inBootLog"),
            cpBootLog = "true" == localStorage.getItem("cpBootLog"),
            hintDone = "true" == localStorage.getItem("hintDone"),
            shipReleaseFailSafe) {
        userPod = new PhysicsBody("pod",userBody.pos[0],userBody.pos[1],3,.6 * userBody.vel[0],.6 * userBody.vel[1],10,"#3060cf",planetOne),
            physicsBodies.push(userPod);
        for (var i = 0; probeParticleCount > i; i++) {
            var probeParticleLife = getRandomInt(probeParticleLifeMin, probeParticleLifeMax)
                , particleVelX = getRandomInt(2, 4)
                , particleVelY = getRandomInt(2, 4)
                , newParticle = new PhysicsBody("particle",userBody.pos[0] + userBody.radius / 2,userBody.pos[1] + userBody.radius / 2,1,userBody.vel[0] / particleVelX,userBody.vel[1] / particleVelY,4,"rgba(255, 255, 255, 0.5)",planetOne);
            newParticle.life = probeParticleLife,
                orbitParticles.push(newParticle)
        }
        shipReleaseFailSafe = !1
    }
    switch (shipLandFailSafe && (hitground = !0,
        shipLandFailSafe = !1),
    gotPlanetBoosters && (void 0 != itemSpudGun && (itemSpudGun.conditions = !0,
        itemSpudGun.costLineSpan.innerHTML = "<span id='cost'>" + numberWithCommas(itemSpudGun.currentCost) + "</span> power",
        itemSpudGun.costSpan = itemSpudGun.el.querySelector("#cost"),
        itemSpudGun.el.addEventListener("click", buildItem)),
    void 0 != itemPotatoLauncher && (itemPotatoLauncher.conditions = !0,
        itemPotatoLauncher.costLineSpan.innerHTML = "<span id='cost'>" + numberWithCommas(itemPotatoLauncher.currentCost) + "</span> power",
        itemPotatoLauncher.costSpan = itemPotatoLauncher.el.querySelector("#cost"),
        itemPotatoLauncher.el.addEventListener("click", buildItem))),
    landedProbes.length > 0 && void 0 != itemPotatoPlant && (itemPotatoPlant.conditions = !0,
        itemPotatoPlant.costLineSpan.innerHTML = "<span id='cost'>" + numberWithCommas(itemPotatoPlant.currentCost) + "</span> power",
        itemPotatoPlant.costSpan = itemPotatoPlant.el.querySelector("#cost"),
        itemPotatoPlant.el.addEventListener("click", buildItem)),
    shipLanded && void 0 != itemTaterTower && (itemTaterTower.conditions = !0,
        itemTaterTower.costLineSpan.innerHTML = "<span id='cost'>" + numberWithCommas(itemTaterTower.currentCost) + "</span> power",
        itemTaterTower.costSpan = itemTaterTower.el.querySelector("#cost"),
        itemTaterTower.el.addEventListener("click", buildItem)),
        thingdrawVis = localStorage.getItem("thingdrawVis"),
        "true" == thingdrawVis ? (thingdrawVis = !0,
            options__drawvisY.classList.add("options__toggle--selected")) : "false" == thingdrawVis && (thingdrawVis = !1,
            options__drawvisN.classList.add("options__toggle--selected")),
        thingSaveFreq = localStorage.getItem("thingSaveFreq")) {
        case "30s":
            options__savefreq30s.classList.add("options__toggle--selected");
            break;
        case "60s":
            options__savefreq60s.classList.add("options__toggle--selected");
            break;
        case "5m":
            options__savefreq5m.classList.add("options__toggle--selected");
            break;
        case "30m":
            options__savefreq30m.classList.add("options__toggle--selected")
    }
    if (thingAutoSave = localStorage.getItem("thingAutoSave"),
            "true" == thingAutoSave ? (thingAutoSave = !0,
                options__autosaveY.classList.add("options__toggle--selected")) : "false" == thingAutoSave && (thingAutoSave = !1,
                options__autosaveN.classList.add("options__toggle--selected")),
        1 == thingAutoSave)
        switch (thingSaveFreq) {
            case "30s":
                clearInterval(saveInter),
                    saveInter = setInterval(saveState, 3e4);
                break;
            case "60s":
                clearInterval(saveInter),
                    saveInter = setInterval(saveState, 6e4);
                break;
            case "5m":
                clearInterval(saveInter),
                    saveInter = setInterval(saveState, 3e5);
                break;
            case "30m":
                clearInterval(saveInter),
                    saveInter = setInterval(saveState, 18e5)
        }
    else
        clearInterval(saveInter);
    globalVolume = parseFloat(localStorage.getItem("globalVolume")),
        optionsSlider.value = globalVolume,
        adjustVolume(),
        thingMuted = localStorage.getItem("thingMuted"),
        "true" == thingMuted ? (thingMuted = !0,
            options__soundN.classList.add("options__toggle--selected")) : "false" == thingMuted && (thingMuted = !1,
            options__soundY.classList.add("options__toggle--selected")),
        USER_ID = localStorage.getItem("user_id");
    var tempD = localStorage.getItem("lastSavedDate");
    lastSavedDate = new Date(tempD),
        lastSavedSpan.innerHTML = " on " + lastSavedDate.getFullYear() + "-" + lastSavedDate.getMonth() + "-" + lastSavedDate.getDate() + " at " + lastSavedDate.getHours() + ":" + lastSavedDate.getMinutes() + ":" + lastSavedDate.getSeconds();
    var introPlayInt = totalPowerProduced;
    introPlayInt > totalNeeded && (introPlayInt = totalNeeded);
    for (var i = 0; introPlayInt > i; i++)
        switch (screentoActivate) {
            case "thingMaker":
                tmAddStuff();
                break;
            case "develop":
                deAddStuff();
                break;
            case "information":
                inAddStuff();
                break;
            case "center":
                cpAddStuff()
        }
    console.log("save loaded")
} else {
    var todaysDay = new Date
        , todayY = todaysDay.getFullYear()
        , todayM = todaysDay.getMonth()
        , todayD = todaysDay.getDate()
        , todayH = todaysDay.getHours()
        , todayMi = todaysDay.getMinutes()
        , userStr = getRandomInt(0, 9).toString() + getRandomInt(0, 9).toString() + getRandomInt(0, 9).toString() + getRandomInt(0, 9).toString() + getRandomInt(0, 9).toString() + getRandomInt(0, 9).toString() + getRandomInt(0, 9).toString() + getRandomInt(0, 9).toString() + getRandomInt(0, 9).toString() + getRandomInt(0, 9).toString();
    switch (USER_ID = todayY.toString() + todayM.toString() + todayD.toString() + todayH.toString() + todayMi.toString() + "_" + userStr,
        ga("set", {
            userId: USER_ID,
            dimension1: shipName,
            dimension2: USER_ID,
            metric1: 1
        }),
        ga("send", "pageview"),
        ga("set", {
            metric1: 0
        }),
        itemSolar = new ItemConstruct("item__solar",solarCost,"Repair Solar Cell","****** ***** ****","power",solarPower,solarBlurb,!0,0,solarSound,icon__solar),
        lockedItems.push(itemSolar),
        itemPotato = new ItemConstruct("item__potato",potatoCost,"Potato","******","power",potatoPower,potatoBlurb,!0,0,potatoSound,icon__potato),
        lockedItems.push(itemPotato),
        1 == thingMuted ? options__soundN.classList.add("options__toggle--selected") : 0 == thingMuted && options__soundY.classList.add("options__toggle--selected"),
        1 == thingdrawVis ? options__drawvisY.classList.add("options__toggle--selected") : 0 == thingdrawVis && options__drawvisN.classList.add("options__toggle--selected"),
        thingSaveFreq) {
        case "30s":
            options__savefreq30s.classList.add("options__toggle--selected");
            break;
        case "60s":
            options__savefreq60s.classList.add("options__toggle--selected");
            break;
        case "5m":
            options__savefreq5m.classList.add("options__toggle--selected");
            break;
        case "30m":
            options__savefreq30m.classList.add("options__toggle--selected")
    }
    if (1 == thingAutoSave ? options__autosaveY.classList.add("options__toggle--selected") : "false" == thingAutoSave && options__autosaveN.classList.add("options__toggle--selected"),
        1 == thingAutoSave)
        switch (thingSaveFreq) {
            case "30s":
                clearInterval(saveInter),
                    saveInter = setInterval(saveState, 3e4);
                break;
            case "60s":
                clearInterval(saveInter),
                    saveInter = setInterval(saveState, 6e4);
                break;
            case "5m":
                clearInterval(saveInter),
                    saveInter = setInterval(saveState, 3e5);
                break;
            case "30m":
                clearInterval(saveInter),
                    saveInter = setInterval(saveState, 18e5)
        }
    else
        clearInterval(saveInter);
    setTimeout(function() {
        queueLog(33, "Starting..."),
            queueLog(66, "Loading 'Hopper Rad-Type' systems..."),
            queueLog(33, "Done."),
            queueLog(66, "Loading idiolect..."),
            queueLog(33, "Sorted."),
            queueLog(133, "Hello! Wakey wakey, let's get to work.<br/>Where are we? No idea.<br/>Systems are being difficult..."),
            queueLog(133, "Power's all messed up too &mdash; sort it out?<br/>Use your kinetic generator button<br>&Leftarrow; over there &Leftarrow; ")
    }, 2e3),
        createResearch("kinetigen01")
}
