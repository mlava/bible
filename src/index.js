import iziToast from "izitoast";

export default {
    onload: ({ extensionAPI }) => {
        // onload
        var apiKey, language, bibleId;
        var languageList = ["Select Here", "English", "Ahirani", "Akukem", "Ambae, East", "Apali", "Arabic", "Arapaho", "Aromanian", "Aruamu", "Assamese", "Baga Sitemu", "Bareli, Palya", "Beami", "Belarusian", "Bengali", "Bhadrawahi", "Bhattiyali", "Bhunjia", "Bodo Parja", "Borei", "Borna", "Bugun", "Chichewa", "Chin, Daai", "Chinese, Mandarin", "Chilughuru", "Czech", "Danu", "Dawro", "Desiya", "Dholuo", "Dutch", "English", "Estonian", "Éwé", "Finnish", "Gata", "Gamo", "Ganda", "German", "Gikuyu", "Gofa", "Gowli", "Greek, Ancient", "Gujarati", "Haitian", "Haryanvi", "Hausa", "Hebrew", "Hebrew, Ancient", "Hebrew, Modern", "Hindi", "Holiya", "Hungarian", "Igbo", "Indonesian", "Icelandic", "Italian", "Juray", "Kamano", "Kannada", "Kapingamarangi", "Khanty", "K'iche'", "Kire", "Kolami, Southeastern", "Konda-Dora", "Kosraean", "Koya", "Kurdish, Central", "Kutu", "Kuvi", "Kwere", "Kyenele", "Lingala", "Lithuanian", "Lodhi", "Makhuwa-Meetto", "Makonde", "Malayalam", "Male", "Maninka, Sankaran", "Marathi", "Matumbi", "Meitei", "Morokodo", "Mum", "Munda", "Mwera", "Naga, Kharam", "Naga Pidgin", "Nahali", "Ndamba", "Ndebele", "Nend", "Ngindo", "Ngoni (Tanzania)", "Nguu", "Norwegian Bokmål", "Oriya", "Oromo", "Pahari, Mahasu", "Panjabi, Eastern", "Palaung, Shwe", "Pengo", "Persian, Iranian", "Pohnpeian", "Polish", "Portuguese", "Powari", "Pular", "Rakhine", "Reli", "Romani, Balkan", "Romani, Carpathian", "Romani, Vlax", "Sakachep", "Sanskrit", "Serbian", "Shatt", "Shi", "Shipogoro", "Sholaga", "Shona", "Siksika", "Slovak", "Soli", "Sop", "Spanish", "Susu", "Swahili", "Swedish", "Tagin", "Tai", "Takuu", "Tamil", "Tavoyan", "Telugu", "Thai", "Toma", "Tongan", "Tsakhur", "Tswana", "Turkish", "Tutsa Naga", "Twi", "Ukrainian", "Urdu", "Vaagri Booli", "Vaghri", "Vidunda", "Vietnamese", "Yalunka", "Yao", "Yapese", "Yiddish, Eastern", "Yombe", "Yoruba", "Zaramo", "Zigua"];
        var bibleList = [];
        if (extensionAPI.settings.get("bible-apikey")) {
            apiKey = extensionAPI.settings.get("bible-apikey");
        }
        if (extensionAPI.settings.get("bibleId")) {
            bibleId = extensionAPI.settings.get("bibleId");
        }
        if (extensionAPI.settings.get("bibleList")) {
            bibleList = extensionAPI.settings.get("bibleList");
        }
        if (extensionAPI.settings.get("bible-language")) {
            language = extensionAPI.settings.get("bible-language");
        }

        const config = {
            tabTitle: "Bible API",
            settings: [
                {
                    id: "bible-apikey",
                    name: "API key",
                    description: "Add your API key from API Bible. You can find your API key at https://scripture.api.bible/admin/applications.",
                    action: {
                        type: "input",
                        placeholder: "API key",
                        onChange: (evt) => { setAPIKey(evt); }
                    }
                },
                {
                    id: "bible-language",
                    name: "Preferred Language",
                    description: "Language to use for Bible versions.",
                    action: {
                        type: "select",
                        items: languageList,
                        onChange: (evt) => { setLanguage(evt); }
                    }
                },
            ]
        };
        const config1 = {
            tabTitle: "Bible API",
            settings: [
                {
                    id: "bible-apikey",
                    name: "API key",
                    description: "Add your API key from API Bible. You can find your API key at https://scripture.api.bible/admin/applications.",
                    action: {
                        type: "input",
                        placeholder: "API key",
                        onChange: (evt) => { setAPIKey(evt); }
                    }
                },
                {
                    id: "bible-language",
                    name: "Preferred Language",
                    description: "Language to use for Bible versions.",
                    action: {
                        type: "select",
                        items: languageList,
                        onChange: (evt) => { setLanguage(evt); }
                    }
                },
                {
                    id: "bible-pref",
                    name: "Preferred Bible Version",
                    description: "Your preferred Bible version",
                    action: {
                        type: "select",
                        items: bibleList,
                        onChange: (evt) => { setPrefBible(evt); }
                    }
                },
            ]
        };

        if (bibleId != undefined) {
            extensionAPI.settings.panel.create(config1);
        } else {
            extensionAPI.settings.panel.create(config);
        }

        var myHeaders = new Headers();
        myHeaders.append("api-key", apiKey);
        myHeaders.append("accept", "application/json");
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };

        // onChange - API Key
        async function setAPIKey(evt) {
            if (evt.target.value != "") {
                apiKey = evt.target.value;
                myHeaders.set("api-key", apiKey);
            } else {
                apiKey = null;
            }
        }

        // onChange - Language
        const languageMap = {
            "Ahirani": "ahr",
            "Akukem": "spm",
            "Ambae, East": "omb",
            "Apali": "ena",
            "Arabic": "arb",
            "Arapaho": "arp",
            "Aromanian": "rup",
            "Aruamu": "msy",
            "Assamese": "asm",
            "Baga Sitemu": "bsp",
            "Bareli, Palya": "bpx",
            "Beami": "beo",
            "Belarusian": "bel",
            "Bengali": "ben",
            "Bhadrawahi": "bhd",
            "Bhattiyali": "bht",
            "Bhunjia": "bhu",
            "Bodo Parja": "bdv",
            "Borei": "gai",
            "Borna": "bwo",
            "Bugun": "bgg",
            "Chichewa": "nya",
            "Chin, Daai": "dao",
            "Chinese, Mandarin": "cmn",
            "Chilughuru": "ruf",
            "Czech": "ces",
            "Danu": "dnv",
            "Dawro": "dwr",
            "Desiya": "dso",
            "Dholuo": "luo",
            "Dutch": "nld",
            "English": "eng",
            "Estonian": "ekk",
            "Éwé": "ewe",
            "Finnish": "fin",
            "Gata": "gaq",
            "Gamo": "gmv",
            "Ganda": "lug",
            "German": "deu",
            "Gikuyu": "kik",
            "Gofa": "gof",
            "Gowli": "gok",
            "Greek, Ancient": "grc",
            "Gujarati": "guj",
            "Haitian": "hat",
            "Haryanvi": "bgc",
            "Hausa": "hau",
            "Hebrew": "heb",
            "Hebrew, Ancient": "hbo",
            "Hebrew, Modern": "heb",
            "Hindi": "hin",
            "Holiya": "hoy",
            "Hungarian": "hun",
            "Igbo": "ibo",
            "Indonesian": "ind",
            "Icelandic": "isl",
            "Italian": "ita",
            "Juray": "juy",
            "Kamano": "kbq",
            "Kannada": "kan",
            "Kapingamarangi": "kpgh",
            "Khanty": "kca",
            "K'iche'": "quc",
            "Kire": "geb",
            "Kolami, Southeastern": "nit",
            "Konda-Dora": "kfc",
            "Kosraean": "kos",
            "Koya": "kff",
            "Kurdish, Central": "ckb",
            "Kutu": "kdc",
            "Kuvi": "kxv",
            "Kwere": "cwe",
            "Kyenele": "kql",
            "Lingala": "lin",
            "Lithuanian": "lit",
            "Lodhi": "lbm",
            "Makhuwa-Meetto": "mgh",
            "Makonde": "kde",
            "Malayalam": "mal",
            "Male": "mdy",
            "Maninka, Sankaran": "msc",
            "Marathi": "mar",
            "Matumbi": "mgw",
            "Meitei": "mni",
            "Morokodo": "mgc",
            "Mum": "kqa",
            "Munda": "unx",
            "Mwera": "mwe",
            "Naga, Kharam": "kfw",
            "Naga Pidgin": "nag",
            "Nahali": "nlx",
            "Ndamba": "ndj",
            "Ndebele": "nde",
            "Nend": "anh",
            "Ngindo": "nnq",
            "Ngoni (Tanzania)": "xnj",
            "Nguu": "ngp",
            "Norwegian Bokmål": "nob",
            "Oriya": "ory",
            "Oromo": "gaz",
            "Pahari, Mahasu": "bfz",
            "Panjabi, Eastern": "pan",
            "Palaung, Shwe": "pll",
            "Pengo": "peg",
            "Persian, Iranian": "pes",
            "Pohnpeian": "pon",
            "Polish": "pol",
            "Portuguese": "por",
            "Powari": "pwr",
            "Pular": "fuf",
            "Rakhine": "rki",
            "Reli": "rei",
            "Romani, Balkan": "rmn",
            "Romani, Carpathian": "rmc",
            "Romani, Vlax": "rmy",
            "Sakachep": "sch",
            "Sanskrit": "san",
            "Serbian": "srp",
            "Shatt": "shj",
            "Shi": "shr",
            "Shipogoro": "poy",
            "Sholaga": "sle",
            "Shona": "sna",
            "Siksika": "bla",
            "Slovak": "slk",
            "Soli": "sby",
            "Sop": "urw",
            "Spanish": "spa",
            "Susu": "sus",
            "Swahili": "swh",
            "Swedish": "swe",
            "Tagin": "tgj",
            "Tai": "taw",
            "Takuu": "nho",
            "Tamil": "tam",
            "Tavoyan": "tvn",
            "Telugu": "tel",
            "Thai": "tha",
            "Toma": "tod",
            "Tongan": "ton",
            "Tsakhur": "tkr",
            "Tswana": "tsn",
            "Turkish": "tur",
            "Tutsa Naga": "tvt",
            "Twi": "twi",
            "Ukrainian": "ukr",
            "Urdu": "urd",
            "Vaagri Booli": "vaa",
            "Vaghri": "vgr",
            "Vidunda": "vid",
            "Vietnamese": "vie",
            "Yalunka": "yal",
            "Yao": "yao",
            "Yapese": "yap",
            "Yiddish, Eastern": "ydd",
            "Yombe": "yom",
            "Yoruba": "yor",
            "Zaramo": "zaj",
            "Zigua": "ziw"
        };
        
        async function setLanguage(evt) {
            language = languageMap[evt];
            return await searchByLanguage(language);
        }
        

        // searchByLanguage
        async function searchByLanguage(language) {
            var url = "https://api.scripture.api.bible/v1/bibles?language=" + language;
            const response = await fetch(url, requestOptions);
            if (response.ok) {
                var data = await response.json();
                var data = data.data;
                bibleList.length = 0;
                bibleList.push("Select Here");
                for (var i = 0; i < data.length; i++) {
                    bibleList.push(data[i].name);
                }
                await extensionAPI.settings.set("bibleList", bibleList);
                await extensionAPI.settings.set("bibleListFull", data);
                sleep(1000);
                await extensionAPI.settings.panel.create(config1);
            }
        }

        // onChange - Preferred Bible
        async function setPrefBible(evt) {
            var bibleListFull = await extensionAPI.settings.get("bibleListFull");
            for (var i = 0; i < bibleListFull.length; i++) {
                if (bibleListFull[i].name == evt) {
                    bibleId = bibleListFull[i].id;
                    await extensionAPI.settings.set("bibleId", bibleId);
                }
            }
            createPrefBible(bibleId);
        }

        // create a preferred bible dataset
        async function createPrefBible(bibleId) {
            var books = [];
            var url = "https://api.scripture.api.bible/v1/bibles/" + bibleId + "/books?include-chapters=true&include-chapters-and-sections=true";
            const response = await fetch(url, requestOptions);
            if (response.ok) {
                var data = await response.json();
                data = data.data;
                for (var i = 0; i < data.length; i++) {
                    var sections = [];
                    for (var j = 0; j < data[i].chapters.length; j++) {
                        if (data[i].chapters[j].sections.length > 0) {
                            for (var k = 0; k < data[i].chapters[j].sections.length; k++) {
                                sections.push([data[i].chapters[j].sections[k].id, data[i].chapters[j].sections[k].title, data[i].chapters[j].sections[k].firstVerseId, data[i].chapters[j].sections[k].lastVerseId])
                            }
                        }
                    }
                    books.push([data[i].id, data[i].name, data[i].abbreviation, data[i].chapters.length, sections]);
                }
                await extensionAPI.settings.set("bibleBookList", books);
            }

        }

        // command palette commands
        // searchPrefBible
        extensionAPI.ui.commandPalette.addCommand({
            label: "Search Bible by string",
            callback: () => {
                var parentUid = window.roamAlphaAPI.ui.getFocusedBlock()?.["block-uid"];
                if (parentUid == undefined) {
                    prompt("Please make sure to focus a block before importing from API.Bible", null, 5, 3000);
                    return;
                } else {
                    window.roamAlphaAPI.updateBlock({ block: { uid: parentUid, string: "Loading...".toString(), open: true } });
                };
                searchPrefBible().then(string => {
                    if (string != undefined) {
                        window.roamAlphaAPI.updateBlock({
                            block: {
                                uid: parentUid,
                                string: string,
                            }
                        });
                    } else {
                        window.roamAlphaAPI.updateBlock({
                            block: {
                                uid: parentUid,
                                string: "",
                            }
                        });
                    }
                    document.querySelector("body")?.click();
                });
            },
        });

        // importBibleSection
        extensionAPI.ui.commandPalette.addCommand({
            label: "Import Bible section",
            callback: () => {
                var parentUid = window.roamAlphaAPI.ui.getFocusedBlock()?.["block-uid"];
                if (parentUid == undefined) {
                    prompt("Please make sure to focus a block before importing from API.Bible", null, 5, 3000);
                    return;
                } else {
                    window.roamAlphaAPI.updateBlock({ block: { uid: parentUid, string: "Loading...".toString(), open: true } });
                };
                importBibleSection().then(string => {
                    if (string != undefined) {
                        window.roamAlphaAPI.updateBlock({
                            block: {
                                uid: parentUid,
                                string: string,
                            }
                        });
                    } else {
                        window.roamAlphaAPI.updateBlock({
                            block: {
                                uid: parentUid,
                                string: "",
                            }
                        });
                    }
                    document.querySelector("body")?.click();
                });
            },
        });

        // importBibleSectionChapter
        extensionAPI.ui.commandPalette.addCommand({
            label: "Import Bible section by Chapter",
            callback: () => {
                var parentUid = window.roamAlphaAPI.ui.getFocusedBlock()?.["block-uid"];
                if (parentUid == undefined) {
                    prompt("Please make sure to focus a block before importing from API.Bible", null, 5, 3000);
                    return;
                } else {
                    window.roamAlphaAPI.updateBlock({ block: { uid: parentUid, string: "Loading...".toString(), open: true } });
                };
                importBibleSectionChapter().then(string => {
                    if (string != undefined) {
                        window.roamAlphaAPI.updateBlock({
                            block: {
                                uid: parentUid,
                                string: string,
                            }
                        });
                    } else {
                        window.roamAlphaAPI.updateBlock({
                            block: {
                                uid: parentUid,
                                string: "",
                            }
                        });
                    }
                    document.querySelector("body")?.click();
                });
            },
        });

        // importBibleSectionSearch
        extensionAPI.ui.commandPalette.addCommand({
            label: "Search for and import a Bible section by title",
            callback: () => {
                var parentUid = window.roamAlphaAPI.ui.getFocusedBlock()?.["block-uid"];
                if (parentUid == undefined) {
                    prompt("Please make sure to focus a block before importing from API.Bible", null, 5, 3000);
                    return;
                } else {
                    window.roamAlphaAPI.updateBlock({ block: { uid: parentUid, string: "Loading...".toString(), open: true } });
                };
                importBibleSectionSearch().then(string => {
                    if (string != undefined) {
                        window.roamAlphaAPI.updateBlock({
                            block: {
                                uid: parentUid,
                                string: string,
                            }
                        });
                    } else {
                        window.roamAlphaAPI.updateBlock({
                            block: {
                                uid: parentUid,
                                string: "",
                            }
                        });
                    }
                    document.querySelector("body")?.click();
                });
            },
        });

        // importBiblePassage
        extensionAPI.ui.commandPalette.addCommand({
            label: "Import a Bible passage or verse",
            callback: () => {
                var parentUid = window.roamAlphaAPI.ui.getFocusedBlock()?.["block-uid"];
                if (parentUid == undefined) {
                    prompt("Please make sure to focus a block before importing from API.Bible", null, 5, 3000);
                    return;
                } else {
                    window.roamAlphaAPI.updateBlock({ block: { uid: parentUid, string: "Loading...".toString(), open: true } });
                }
                importBiblePassage().then(string => {
                    if (string != undefined) {
                        window.roamAlphaAPI.updateBlock({
                            block: {
                                uid: parentUid,
                                string: string,
                            }
                        });
                    } else {
                        window.roamAlphaAPI.updateBlock({
                            block: {
                                uid: parentUid,
                                string: "",
                            }
                        });
                    }
                    document.querySelector("body")?.click();
                });
            },
        });

        // importRandomVerse
        extensionAPI.ui.commandPalette.addCommand({
            label: "Import a random Bible verse",
            callback: () => {
                var parentUid = window.roamAlphaAPI.ui.getFocusedBlock()?.["block-uid"];
                if (parentUid == undefined) {
                    prompt("Please make sure to focus a block before importing from API.Bible", null, 5, 3000);
                    return;
                } else {
                    window.roamAlphaAPI.updateBlock({ block: { uid: parentUid, string: "Loading...".toString(), open: true } });
                }
                importRandomVerse().then(async string => {
                    if (string != undefined) {
                        await window.roamAlphaAPI.updateBlock({
                            block: {
                                uid: parentUid,
                                string: string,
                            }
                        });
                    } else {
                        await window.roamAlphaAPI.updateBlock({
                            block: {
                                uid: parentUid,
                                string: "",
                            }
                        });
                    }
                    document.querySelector("body")?.click();
                });
            },
        });

        // SmartBlock definitions
        // importRandomVerse
        const args = {
            text: "IMPORTRANDOMVERSE",
            help: "Import a random verse from API.Bible",
            handler: (context) => () => {
                return importRandomVerse();
            },
        };

        if (window.roamjs?.extension?.smartblocks) {
            window.roamjs.extension.smartblocks.registerCommand(args);
        } else {
            document.body.addEventListener(
                `roamjs:smartblocks:loaded`,
                () =>
                    window.roamjs?.extension.smartblocks &&
                    window.roamjs.extension.smartblocks.registerCommand(args)
            );
        }

        // check config
        async function checkConfig() {
            var key;
            if (extensionAPI.settings.get("bible-apikey") == "" || extensionAPI.settings.get("bible-apikey") == null || extensionAPI.settings.get("bible-apikey") == undefined ) {
                key = "API";
                return key;
            } else if (extensionAPI.settings.get("bible-apikey")) {
                apiKey = extensionAPI.settings.get("bible-apikey");
            }
            if (extensionAPI.settings.get("bible-language") == "" || extensionAPI.settings.get("bible-language") == null || extensionAPI.settings.get("bible-language") == undefined ) {
                key = "bibleLanguage";
                return key;
            } else if (extensionAPI.settings.get("bible-language")) {
                language = extensionAPI.settings.get("bible-language");
            }
            if (extensionAPI.settings.get("bibleId") == "" || extensionAPI.settings.get("bibleId") == null || extensionAPI.settings.get("bibleId") == undefined ) {
                key = "bibleId";
                return key;
            } else if (extensionAPI.settings.get("bibleId")) {
                bibleId = extensionAPI.settings.get("bibleId");
            }
            return true;
        }

        // searchPrefBible
        async function searchPrefBible() {
            var config = await checkConfig();
            if (config == true) {
                let bibleBookList = extensionAPI.settings.get("bibleBookList");
                let promptString = "Enter a search phrase";
                let searchQuery = await prompt(promptString, null, 7);
                var url = "https://api.scripture.api.bible/v1/bibles/" + bibleId + "/search?query=" + encodeURIComponent(searchQuery) + "&limit=100";
                const response = await fetch(url, requestOptions);
                if (response.ok) {
                    var data = await response.json();
                    return await createString(data, bibleBookList, false, true, false);
                } else {
                    await prompt("Your search of API.Bible failed", null, 5, 3000);
                    return;
                }
            } else if (config == "API") {
                await prompt("Please set your API token in the configuration settings via the Roam Depot tab.", null, 5, 3000);
                return;
            } else if (config == "bibleId") {
                await prompt("Please set your preferred Bible in the configuration settings via the Roam Depot tab.", null, 5, 3000);
                return;
            } else if (config == "bibleLanguage") {
                await prompt("Please set your preferred language in the configuration settings via the Roam Depot tab.", null, 5, 3000);
                return;
            }
        }

        // importBibleSection
        async function importBibleSection() {
            var config = await checkConfig();
            if (config == true) {
                let promptString = "Select a section to import";
                let bibleBookList = extensionAPI.settings.get("bibleBookList");
                let selectString = "<select><option value=\"\">Select</option>";
                for (var i = 0; i < bibleBookList.length; i++) {
                    for (var j = 0; j < bibleBookList[i][4].length; j++) {
                        selectString += "<option value=\"" + bibleBookList[i][4][j][0] + "\">" + bibleBookList[i][4][j][1] + "</option>";
                    }
                }
                if (selectString == "<select><option value=\"\">Select</option>") {
                    await prompt("Your chosen Bible doesn't support sections", null, 5, 3000);
                    return;
                } else {
                    selectString += "</select>";
                    let searchQuery = await prompt(promptString, selectString, 8);
                    if (searchQuery != "cancelled") {
                        var url = "https://api.scripture.api.bible/v1/bibles/" + bibleId + "/sections/" + searchQuery + "?content-type=json&include-notes=false&include-titles=true&include-chapter-numbers=true&include-verse-numbers=true&include-verse-spans=false";
                        const response = await fetch(url, requestOptions);
                        if (response.ok) {
                            var data = await response.json();
                            return await createString(data, bibleBookList, false, false, false);
                        } else {
                            await prompt("Import from API.Bible failed", null, 5, 3000);
                            return;
                        }
                    } else {
                        await prompt("You cancelled your search", null, 5, 3000);
                        return;
                    }
                }
            } else if (config == "API") {
                await prompt("Please set your API token in the configuration settings via the Roam Depot tab.", null, 5, 3000);
                return;
            } else if (config == "bibleId") {
                await prompt("Please set your preferred Bible in the configuration settings via the Roam Depot tab.", null, 5, 3000);
                return;
            } else if (config == "bibleLanguage") {
                await prompt("Please set your preferred language in the configuration settings via the Roam Depot tab.", null, 5, 3000);
                return;
            }
        }

        // importBibleSectionChapter
        async function importBibleSectionChapter() {
            var config = await checkConfig();
            if (config == true) {
                let bibleBookList = extensionAPI.settings.get("bibleBookList");
                let selectString1 = "<select><option value=\"\">Select</option>";
                for (var i = 0; i < bibleBookList.length; i++) {
                    for (var j = 0; j < bibleBookList[i][4].length; j++) {
                        selectString1 += "<option value=\"" + bibleBookList[i][4][j][0] + "\">" + bibleBookList[i][4][j][1] + "</option>";
                    }
                }
                selectString1 += "</select>";
                if (selectString1 == "<select><option value=\"\">Select</option></select>") {
                    await prompt("Your chosen Bible doesn't support sections", null, 5, 3000);
                    return;
                } else {
                    // choose the chapter from which to limit selections
                    let promptString = "From which chapter is your section?";
                    let selectString = "<select><option value=\"\">Select</option>";
                    for (var i = 0; i < bibleBookList.length; i++) {
                        selectString += "<option value=\"" + bibleBookList[i][0] + "\">" + bibleBookList[i][1] + "</option>";
                    }
                    selectString += "</select>";
                    let searchQuery = await prompt(promptString, selectString, 6);
                    if (searchQuery != "cancelled") {
                        let selectString2 = "<select><option value=\"\">Select</option>";
                        for (var i = 0; i < bibleBookList.length; i++) {
                            if (bibleBookList[i][0] == searchQuery) {
                                for (var j = 0; j < bibleBookList[i][4].length; j++) {
                                    selectString2 += "<option value=\"" + bibleBookList[i][4][j][0] + "\">" + bibleBookList[i][4][j][1] + "</option>";
                                }
                            }
                        }
                        selectString2 += "</select>";
                        // get the section
                        let promptString2 = "Select a section to import";
                        let searchQuery2 = await prompt(promptString2, selectString2, 8);
                        if (searchQuery2 != "cancelled") {
                            var url = "https://api.scripture.api.bible/v1/bibles/" + bibleId + "/sections/" + searchQuery2 + "?content-type=json&include-notes=false&include-titles=true&include-chapter-numbers=true&include-verse-numbers=true&include-verse-spans=false";
                            const response = await fetch(url, requestOptions);
                            if (response.ok) {
                                var data = await response.json();
                                return await createString(data, bibleBookList, false, false, false);
                            } else {
                                await prompt("Import from API.Bible failed", null, 5, 3000);
                                return;
                            }
                        } else {
                            await prompt("You cancelled your search", null, 5, 3000);
                            return;
                        }
                    } else {
                        await prompt("You cancelled your search", null, 5, 3000);
                        return;
                    }
                }
            } else if (config == "API") {
                await prompt("Please set your API token in the configuration settings via the Roam Depot tab.", null, 5, 3000);
                return;
            } else if (config == "bibleId") {
                await prompt("Please set your preferred Bible in the configuration settings via the Roam Depot tab.", null, 5, 3000);
                return;
            } else if (config == "bibleLanguage") {
                await prompt("Please set your preferred language in the configuration settings via the Roam Depot tab.", null, 5, 3000);
                return;
            }
        }

        // importBibleSectionSearch
        async function importBibleSectionSearch() {
            var config = await checkConfig();
            if (config == true) {
                let bibleBookList = extensionAPI.settings.get("bibleBookList");
                let selectString1 = "<select><option value=\"\">Select</option>";
                for (var i = 0; i < bibleBookList.length; i++) {
                    for (var j = 0; j < bibleBookList[i][4].length; j++) {
                        selectString1 += "<option value=\"" + bibleBookList[i][4][j][0] + "\">" + bibleBookList[i][4][j][1] + "</option>";
                    }
                }
                selectString1 += "</select>";
                if (selectString1 == "<select><option value=\"\">Select</option></select>") {
                    await prompt("Your chosen Bible doesn't support sections", null, 5, 3000);
                    return;
                } else {
                    // find matching section titles
                    let promptString = "Search string";
                    let searchQuery = await prompt(promptString, null, 7);
                    if (searchQuery != "cancelled") {
                        var regex = new RegExp(searchQuery, "i");
                        let selectString2 = "<select><option value=\"\">Select</option>";
                        for (var i = 0; i < bibleBookList.length; i++) {
                            for (var j = 0; j < bibleBookList[i][4].length; j++) {
                                if (bibleBookList[i][4][j][1].match(regex)) {
                                    selectString2 += "<option value=\"" + bibleBookList[i][4][j][0] + "\">" + bibleBookList[i][4][j][1] + "</option>";
                                }
                            }
                        }
                        selectString2 += "</select>";
                        // get the section
                        let promptString2 = "Select a section to import";
                        let searchQuery2 = await prompt(promptString2, selectString2, 8);
                        if (searchQuery2 != "cancelled") {
                            var url = "https://api.scripture.api.bible/v1/bibles/" + bibleId + "/sections/" + searchQuery2 + "?content-type=json&include-notes=false&include-titles=true&include-chapter-numbers=true&include-verse-numbers=true&include-verse-spans=false";
                            const response = await fetch(url, requestOptions);
                            if (response.ok) {
                                var data = await response.json();
                                return await createString(data, bibleBookList, false, false, false);
                            } else {
                                await prompt("Import from API.Bible failed", null, 5, 3000);
                                return;
                            }
                        } else {
                            await prompt("You cancelled your search", null, 5, 3000);
                            return;
                        }
                    } else {
                        await prompt("You cancelled your search", null, 5, 3000);
                        return;
                    }
                }
            } else if (config == "API") {
                await prompt("Please set your API token in the configuration settings via the Roam Depot tab.", null, 5, 3000);
                return;
            } else if (config == "bibleId") {
                await prompt("Please set your preferred Bible in the configuration settings via the Roam Depot tab.", null, 5, 3000);
                return;
            } else if (config == "bibleLanguage") {
                await prompt("Please set your preferred language in the configuration settings via the Roam Depot tab.", null, 5, 3000);
                return;
            }
        }

        // importBiblePassage
        async function importBiblePassage() {
            var config = await checkConfig();
            if (config == true) {
                let promptString = "Enter a passage or verse to import";
                let bibleBookList = extensionAPI.settings.get("bibleBookList");
    
                let selectString = "<select><option value=\"\">Select</option>";
                for (var i = 0; i < bibleBookList.length; i++) {
                    selectString += "<option value=\"" + bibleBookList[i][0] + "\">" + bibleBookList[i][1] + "</option>";
                }
                selectString += "</select>";
                let searchQuery = await prompt(promptString, selectString, 4);
                if (searchQuery != "cancelled") {
                    let queryString = searchQuery[0] + "." + searchQuery[1];
                    if (searchQuery[2] != '' && searchQuery[2] != undefined) {
                        queryString += "." + searchQuery[2];
                    }
                    queryString += "-" + searchQuery[0] + "." + searchQuery[1];
                    if (searchQuery[3] != '' && searchQuery[3] != undefined) {
                        queryString += "." + searchQuery[3];
                    } else if (searchQuery[2] != undefined && searchQuery[3] == undefined) {
                        queryString += "." + searchQuery[2];
                    }
    
                    var url = "https://api.scripture.api.bible/v1/bibles/" + bibleId + "/passages/" + queryString + "?content-type=json&include-notes=false&include-titles=true&include-chapter-numbers=true&include-verse-numbers=true&include-verse-spans=false&use-org-id=false";
                    const response = await fetch(url, requestOptions);
                    if (response.ok) {
                        var data = await response.json();
                        return await createString(data, bibleBookList, true, false, false);
                    } else {
                        await prompt("Your search of API.Bible failed", null, 5, 3000);
                        return;
                    }
                } else {
                    await prompt("You cancelled your search", null, 5, 3000);
                    return;
                }
            } else if (config == "API") {
                await prompt("Please set your API token in the configuration settings via the Roam Depot tab.", null, 5, 3000);
                return;
            } else if (config == "bibleId") {
                await prompt("Please set your preferred Bible in the configuration settings via the Roam Depot tab.", null, 5, 3000);
                return;
            } else if (config == "bibleLanguage") {
                await prompt("Please set your preferred language in the configuration settings via the Roam Depot tab.", null, 5, 3000);
                return;
            }
        }

        // importRandomVerse
        async function importRandomVerse() {
            var config = await checkConfig();
            if (config == true) {
                let bibleBookList = extensionAPI.settings.get("bibleBookList");
                var randomBook = bibleBookList[Math.floor(Math.random() * bibleBookList.length)];
                var randomChapter = Math.floor(Math.random() * randomBook[3]);
                if (randomChapter < 1) {
                    randomChapter = 1;
                }
    
                var url = "https://api.scripture.api.bible/v1/bibles/" + bibleId + "/chapters/" + randomBook[0] + "." + randomChapter + "/verses";
                const response = await fetch(url, requestOptions);
                if (response.ok) {
                    var data = await response.json();
                    data = data.data;
                    var randomVerse = data[Math.floor(Math.random() * data.length)];
                    var url1 = "https://api.scripture.api.bible/v1/bibles/" + bibleId + "/verses/" + randomVerse.id + "?content-type=json&include-notes=false&include-titles=true&include-chapter-numbers=false&include-verse-numbers=true&include-verse-spans=false&use-org-id=false";
                    const response1 = await fetch(url1, requestOptions);
                    if (response1.ok) {
                        var data1 = await response1.json();
                        return await createString(data1, bibleBookList, true, false, true);
                    } else {
                        await prompt("Failed to get a random verse from API.Bible", null, 5, 3000);
                        return;
                    }
                } else {
                    await prompt("Failed to get a random verse from API.Bible", null, 5, 3000);
                    return;
                }
            } else if (config == "API") {
                await prompt("Please set your API token in the configuration settings via the Roam Depot tab.", null, 5, 3000);
                return;
            } else if (config == "bibleId") {
                await prompt("Please set your preferred Bible in the configuration settings via the Roam Depot tab.", null, 5, 3000);
                return;
            } else if (config == "bibleLanguage") {
                await prompt("Please set your preferred language in the configuration settings via the Roam Depot tab.", null, 5, 3000);
                return;
            }
        }

        // create the string to import
        async function createString(data, bibleBookList, passage, verseSearch, random) {
            if (verseSearch) {
                data = data.data;
                var versesList = data.verses;
                if (versesList.length < 1) {
                    await prompt("There were no results for that search", null, 5, 3000);
                    return;
                } else {
                    var promptString = "Which of these verses do you want to import?";
                    let selectString = "<select><option value=\"\">Select</option>";
                    for (var i = 0; i < versesList.length; i++) {
                        selectString += "<option value=\"" + versesList[i].id + "\">" + versesList[i].text + "</option>";
                    }
                    selectString += "</select>";
                    var searchQuery = await prompt(promptString, selectString, 3);

                    if (searchQuery != "cancelled") {
                        for (var i = 0; i < versesList.length; i++) {
                            if (searchQuery == versesList[i].id) {
                                let verseId = versesList[i].reference.split(":")[1];
                                return "> #bible_verse^^" + verseId + "^^ " + versesList[i].text + "\n\n" + versesList[i].reference + "";
                            }
                        }
                    } else {
                        await prompt("You cancelled your search", null, 5, 3000);
                        return;
                    }
                }
            } else {
                var title;
                var string = "> ";
                if (!passage && !random) {
                    title = data.data.title;
                    string += "**" + title + "**\n\n";
                }
                var content = data.data.content;
                for (var i = 0; i < content.length; i++) {
                    if (content[i].attrs.style == "c") {
                        string += "#bible_chapter^^" + content[i].items[0].text + "^^ ";
                    } else if (content[i].attrs.style == "q" || content[i].attrs.style == "q1" || content[i].attrs.style == "q2") {
                        /*if ((i < content.length - 1 && content[i - 1].attrs.style != "q")) {
                            string += "\n\n";
                        }*/
                        for (var j = 0; j < content[i].items.length; j++) {
                            if (content[i].items[j].attrs.style == "v") {
                                if (content[i].items[j].items[0].text != "1") {
                                    string += "#bible_quote_verse^^" + content[i].items[j].items[0].text + "^^ ";
                                }
                            } else {
                                if (j > 0) {
                                    string += "" + content[i].items[j].text + "";
                                } else {
                                    string += "#bible_quote^^" + content[i].items[j].text + "^^";
                                }
                            }
                        }
                        string += "\n";
                        if ((i < content.length - 1 && (content[i + 1].attrs.style != "q" && content[i + 1].attrs.style != "q1" && content[i + 1].attrs.style != "q2")) || (i == content.length - 1)) {
                            string += "\n";
                        }
                    } else if (content[i].attrs.style != "s" && content[i].attrs.style != "s1" && content[i].attrs.style != "s2" && content[i].attrs.style != "b" && content[i].attrs.style != "r") {
                        for (var j = 0; j < content[i].items.length; j++) {
                            if (content[i].items[j].attrs.style == "v") {
                                if (content[i].items[j].items[0].text != "1") {
                                    string += "#bible_verse^^" + content[i].items[j].items[0].text + "^^ ";
                                } else if (content[i].items[j].items[0].text == "1" && random) {
                                    string += "#bible_verse^^" + content[i].items[j].items[0].text + "^^ ";
                                }
                            } else if (content[i].items[j].attrs.style === "wj") {
                                string += content[i].items[j].items[0].text;
                            } else if (content[i].items[j].attrs.style != "add") {
                                string += content[i].items[j].text;
                            }
                        }
                        if ((i < content.length - 1 && content[i + 1].attrs.style != "q") || (i == content.length - 1)) {
                            string += "\n\n";
                        }
                    }
                }
                string = string.replaceAll("  ", " ");
                var reference = "";
                if (passage) {
                    reference = data.data.reference;
                } else {
                    for (var i = 0; i < bibleBookList.length; i++) {
                        let bookId = data.data.bookId;
                        if (bookId == bibleBookList[i][0]) {
                            reference += "" + bibleBookList[i][1] + " ";
                        }
                    }
                    var chapter = data.data.chapterId.split(".")[1];
                    reference += chapter + ":";
                    let firstVerse = data.data.firstVerseId.split(".")[2];
                    let lastVerse = data.data.lastVerseId.split(".")[2];
                    reference += firstVerse + "-" + lastVerse;
                }

                string += "" + reference + "";
                return string;
            }
        }
    },
    onunload: () => {
        // remove SmartBlock definitions onunload
        if (window.roamjs?.extension?.smartblocks) {
            window.roamjs.extension.smartblocks.unregisterCommand("IMPORTRANDOMVERSE");
        };
    }
}

// helper functions
async function prompt(string, selectString, type, duration) {
    if (type == 3) { // select input
        return new Promise((resolve) => {
            iziToast.question({
                theme: 'light',
                color: 'black',
                layout: 2,
                class: 'bibles',
                drag: false,
                timeout: false,
                close: true,
                overlay: true,
                title: "API.Bible",
                message: string,
                position: 'center',
                onClosed: function () { resolve("cancelled") },
                closeOnEscape: true,
                inputs: [
                    [selectString, 'change', function (instance, toast, select, e) { }]
                ],
                buttons: [
                    ['<button><b>Confirm</b></button>', function (instance, toast, button, e, inputs) {
                        instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
                        resolve(inputs[0].options[inputs[0].selectedIndex].value);
                    }, false], // true to focus
                    [
                        "<button>Cancel</button>",
                        function (instance, toast, button, e) {
                            instance.hide({ transitionOut: "fadeOut" }, toast, "button");
                            resolve("cancelled");
                        },
                    ],
                ]
            });
        })
    } else if (type == 4) { // passage import
        return new Promise((resolve) => {
            var book, chapter, startVerse, endVerse;
            iziToast.question({
                theme: 'light',
                color: 'black',
                layout: 2,
                class: 'bibles',
                drag: false,
                timeout: false,
                close: true,
                overlay: true,
                title: "API.Bible",
                message: string,
                position: 'center',
                onClosed: function () { resolve("cancelled") },
                closeOnEscape: true,
                inputs: [
                    ['<label>Book *' + selectString + '</label>', 'change', function (instance, toast, select, e) {
                        book = e.target.value;
                    }],
                    [
                        '<label>Chapter *<input type="text" placeholder="string"></label>', 'change', function (instance, toast, select, e) {
                            chapter = e.target.value;
                        }
                    ],
                    [
                        '<label>Starting Verse<input type="text" placeholder="Starting Verse"></label>', 'change', function (instance, toast, select, e) {
                            startVerse = e.target.value;
                        }
                    ],
                    [
                        '<label>Ending Verse<input type="text" placeholder="Ending Verse"></label>', 'change', function (instance, toast, select, e) {
                            endVerse = e.target.value;
                        }
                    ],
                ],
                buttons: [
                    ['<button><b>Confirm</b></button>', function (instance, toast, button, e, inputs) {
                        instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
                        resolve([book, chapter, startVerse, endVerse]);
                    }, false], // true to focus
                    [
                        "<button>Cancel</button>",
                        function (instance, toast, button, e) {
                            instance.hide({ transitionOut: "fadeOut" }, toast, "button");
                            resolve("cancelled");
                        },
                    ],
                ]
            });
        })
    } else if (type == 5) { // alert
        iziToast.show({
            theme: 'dark',
            message: string,
            class: 'bibles-info',
            position: 'center',
            close: false,
            timeout: duration,
            closeOnClick: true,
            closeOnEscape: true,
            displayMode: 2
        });
    } else if (type == 6) { // book selection
        return new Promise((resolve) => {
            var section;
            iziToast.question({
                theme: 'light',
                color: 'black',
                layout: 2,
                class: 'bibles',
                drag: false,
                timeout: false,
                close: true,
                overlay: true,
                title: "API.Bible",
                message: string,
                position: 'center',
                onClosed: function () { resolve("cancelled") },
                closeOnEscape: true,
                inputs: [
                    ['<label>Book *' + selectString + '</label>', 'change', function (instance, toast, select, e) {
                        section = e.target.value;
                    }]
                ],
                buttons: [
                    ['<button><b>Confirm</b></button>', function (instance, toast, button, e, inputs) {
                        instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
                        resolve(section);
                    }, false], // true to focus
                    [
                        "<button>Cancel</button>",
                        function (instance, toast, button, e) {
                            instance.hide({ transitionOut: "fadeOut" }, toast, "button");
                            resolve("cancelled");
                        },
                    ],
                ]
            });
        })
    } else if (type == 7) { // simple prompt
        return new Promise((resolve) => {
            iziToast.question({
                theme: 'light',
                color: 'black',
                layout: 2,
                class: 'bibles',
                drag: false,
                timeout: false,
                close: false,
                overlay: true,
                displayMode: 2,
                id: "question",
                title: "API.Bible",
                message: string,
                position: "center",
                onClosed: function () { resolve("cancelled") },
                inputs: [
                    [
                        '<input type="text" placeholder="">',
                        "change",
                        function (instance, toast, input, e) {
                        },
                        true,
                    ],
                ],
                buttons: [
                    [
                        "<button><b>Confirm</b></button>",
                        async function (instance, toast, button, e, inputs) {
                            instance.hide({ transitionOut: "fadeOut" }, toast, "button");
                            resolve(inputs[0].value);
                        },
                        false,
                    ],
                    [
                        "<button>Cancel</button>",
                        async function (instance, toast, button, e) {
                            instance.hide({ transitionOut: "fadeOut" }, toast, "button");
                            resolve("cancelled");
                        },
                    ],
                ],
            });
        })
    } else if (type == 8) { // section selection
        return new Promise((resolve) => {
            var section;
            iziToast.question({
                theme: 'light',
                color: 'black',
                layout: 2,
                class: 'bibles',
                drag: false,
                timeout: false,
                close: true,
                overlay: true,
                title: "API.Bible",
                message: string,
                position: 'center',
                onClosed: function () { resolve("cancelled") },
                closeOnEscape: true,
                inputs: [
                    ['<label>Section *' + selectString + '</label>', 'change', function (instance, toast, select, e) {
                        section = e.target.value;
                    }]
                ],
                buttons: [
                    ['<button><b>Confirm</b></button>', function (instance, toast, button, e, inputs) {
                        instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
                        resolve(section);
                    }, false], // true to focus
                    [
                        "<button>Cancel</button>",
                        function (instance, toast, button, e) {
                            instance.hide({ transitionOut: "fadeOut" }, toast, "button");
                            resolve("cancelled");
                        },
                    ],
                ]
            });
        })
    }
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}