var bibleList = [];
var languageList = ["Ahirani", "Akukem", "Ambae, East", "Apali", "Arabic", "Arapaho", "Aromanian", "Aruamu", "Assamese", "Baga Sitemu", "Bareli, Palya", "Beami", "Belarusian", "Bengali", "Bhadrawahi", "Bhattiyali", "Bhunjia", "Bodo Parja", "Borei", "Borna", "Bugun", "Chichewa", "Chin, Daai", "Chinese, Mandarin", "Chilughuru", "Czech", "Danu", "Dawro", "Desiya", "Dholuo", "Dutch", "English", "Estonian", "Éwé", "Finnish", "Gata", "Gamo", "Ganda", "German", "Gikuyu", "Gofa", "Gowli", "Greek, Ancient", "Gujarati", "Haitian", "Haryanvi", "Hausa", "Hebrew", "Hebrew, Ancient", "Hebrew, Modern", "Hindi", "Holiya", "Hungarian", "Igbo", "Indonesian", "Icelandic", "Italian", "Juray", "Kamano", "Kannada", "Kapingamarangi", "Khanty", "K'iche'", "Kire", "Kolami, Southeastern", "Konda-Dora", "Kosraean", "Koya", "Kurdish, Central", "Kutu", "Kuvi", "Kwere", "Kyenele", "Lingala", "Lithuanian", "Lodhi", "Makhuwa-Meetto", "Makonde", "Malayalam", "Male", "Maninka, Sankaran", "Marathi", "Matumbi", "Meitei", "Morokodo", "Mum", "Munda", "Mwera", "Naga, Kharam", "Naga Pidgin", "Nahali", "Ndamba", "Ndebele", "Nend", "Ngindo", "Ngoni (Tanzania)", "Nguu", "Norwegian Bokmål", "Oriya", "Oromo", "Pahari, Mahasu", "Panjabi, Eastern", "Palaung, Shwe", "Pengo", "Persian, Iranian", "Pohnpeian", "Polish", "Portuguese", "Powari", "Pular", "Rakhine", "Reli", "Romani, Balkan", "Romani, Carpathian", "Romani, Vlax", "Sakachep", "Sanskrit", "Serbian", "Shatt", "Shi", "Shipogoro", "Sholaga", "Shona", "Siksika", "Slovak", "Soli", "Sop", "Spanish", "Susu", "Swahili", "Swedish", "Tagin", "Tai", "Takuu", "Tamil", "Tavoyan", "Telugu", "Thai", "Toma", "Tongan", "Tsakhur", "Tswana", "Turkish", "Tutsa Naga", "Twi", "Ukrainian", "Urdu", "Vaagri Booli", "Vaghri", "Vidunda", "Vietnamese", "Yalunka", "Yao", "Yapese", "Yiddish, Eastern", "Yombe", "Yoruba", "Zaramo", "Zigua"];

export default {
    onload: ({ extensionAPI }) => {
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
        
        const config2 = {
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

        // onload
        var n = 1;
        var apiKey, language;
        if (extensionAPI.settings.get("bible-apikey")) {
            apiKey = extensionAPI.settings.get("bible-apikey");
        }
        if (extensionAPI.settings.get("bibleList")) {
            bibleList = extensionAPI.settings.get("bibleList");
            extensionAPI.settings.panel.create(config);
        } else if (extensionAPI.settings.get("bible-language")) {
            language = extensionAPI.settings.get("bible-language");
            extensionAPI.settings.panel.create(config);
        } else {
            extensionAPI.settings.panel.create(config);
        }
        console.info("setting 2");
        extensionAPI.settings.panel.create(config2);
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
        async function setLanguage(evt) {
            if (evt == "Ahirani") {
                language = "ahr";
            } else if (evt == "Akukem") {
                language = "spm";
            } else if (evt == "Ambae, East") {
                language = "omb";
            } else if (evt == "Apali") {
                language = "ena";
            } else if (evt == "Arabic") {
                language = "arb";
            } else if (evt == "Arapaho") {
                language = "arp";
            } else if (evt == "Aromanian") {
                language = "rup";
            } else if (evt == "Aruamu") {
                language = "msy";
            } else if (evt == "Assamese") {
                language = "asm";
            } else if (evt == "Baga Sitemu") {
                language = "bsp";
            } else if (evt == "Bareli, Palya") {
                language = "bpx";
            } else if (evt == "Beami") {
                language = "beo";
            } else if (evt == "Belarusian") {
                language = "bel";
            } else if (evt == "Bengali") {
                language = "ben";
            } else if (evt == "Bhadrawahi") {
                language = "bhd";
            } else if (evt == "Bhattiyali") {
                language = "bht";
            } else if (evt == "Bhunjia") {
                language = "bhu";
            } else if (evt == "Bodo Parja") {
                language = "bdv";
            } else if (evt == "Borei") {
                language = "gai";
            } else if (evt == "Borna") {
                language = "bwo";
            } else if (evt == "Bugun") {
                language = "bgg";
            } else if (evt == "Chichewa") {
                language = "nya";
            } else if (evt == "Chin, Daai") {
                language = "dao";
            } else if (evt == "Chinese, Mandarin") {
                language = "cmn";
            } else if (evt == "Chilughuru") {
                language = "ruf";
            } else if (evt == "Czech") {
                language = "ces";
            } else if (evt == "Danu") {
                language = "dnv";
            } else if (evt == "Dawro") {
                language = "dwr";
            } else if (evt == "Desiya") {
                language = "dso";
            } else if (evt == "Dholuo") {
                language = "luo";
            } else if (evt == "Dutch") {
                language = "nld";
            } else if (evt == "English") {
                language = "eng";
            } else if (evt == "Estonian") {
                language = "ekk";
            } else if (evt == "Éwé") {
                language = "ewe";
            } else if (evt == "Finnish") {
                language = "fin";
            } else if (evt == "Gata") {
                language = "gaq";
            } else if (evt == "Gamo") {
                language = "gmv";
            } else if (evt == "Ganda") {
                language = "lug";
            } else if (evt == "German") {
                language = "deu";
            } else if (evt == "Gikuyu") {
                language = "kik";
            } else if (evt == "Gofa") {
                language = "gof";
            } else if (evt == "Gowli") {
                language = "gok";
            } else if (evt == "Greek, Ancient") {
                language = "grc";
            } else if (evt == "Gujarati") {
                language = "guj";
            } else if (evt == "Haitian") {
                language = "hat";
            } else if (evt == "Haryanvi") {
                language = "bgc";
            } else if (evt == "Hausa") {
                language = "hau";
            } else if (evt == "Hebrew") {
                language = "heb";
            } else if (evt == "Hebrew, Ancient") {
                language = "hbo";
            } else if (evt == "Hebrew, Modern") {
                language = "heb";
            } else if (evt == "Hindi") {
                language = "hin";
            } else if (evt == "Holiya") {
                language = "hoy";
            } else if (evt == "Hungarian") {
                language = "hun";
            } else if (evt == "Igbo") {
                language = "ibo";
            } else if (evt == "Indonesian") {
                language = "ind";
            } else if (evt == "Icelandic") {
                language = "isl";
            } else if (evt == "Italian") {
                language = "ita";
            } else if (evt == "Juray") {
                language = "juy";
            } else if (evt == "Kamano") {
                language = "kbq";
            } else if (evt == "Kannada") {
                language = "kan";
            } else if (evt == "Kapingamarangi") {
                language = "kpgh";
            } else if (evt == "Khanty") {
                language = "kca";
            } else if (evt == "K'iche'") {
                language = "quc";
            } else if (evt == "Kire") {
                language = "geb";
            } else if (evt == "Kolami, Southeastern") {
                language = "nit";
            } else if (evt == "Konda-Dora") {
                language = "kfc";
            } else if (evt == "Kosraean") {
                language = "kos";
            } else if (evt == "Koya") {
                language = "kff";
            } else if (evt == "Kurdish, Central") {
                language = "ckb";
            } else if (evt == "Kutu") {
                language = "kdc";
            } else if (evt == "Kuvi") {
                language = "kxv";
            } else if (evt == "Kwere") {
                language = "cwe";
            } else if (evt == "Kyenele") {
                language = "kql";
            } else if (evt == "Lingala") {
                language = "lin";
            } else if (evt == "Lithuanian") {
                language = "lit";
            } else if (evt == "Lodhi") {
                language = "lbm";
            } else if (evt == "Makhuwa-Meetto") {
                language = "mgh";
            } else if (evt == "Makonde") {
                language = "kde";
            } else if (evt == "Malayalam") {
                language = "mal";
            } else if (evt == "Male") {
                language = "mdy";
            } else if (evt == "Maninka, Sankaran") {
                language = "msc";
            } else if (evt == "Marathi") {
                language = "mar";
            } else if (evt == "Matumbi") {
                language = "mgw";
            } else if (evt == "Meitei") {
                language = "mni";
            } else if (evt == "Morokodo") {
                language = "mgc";
            } else if (evt == "Mum") {
                language = "kqa";
            } else if (evt == "Munda") {
                language = "unx";
            } else if (evt == "Mwera") {
                language = "mwe";
            } else if (evt == "Naga, Kharam") {
                language = "kfw";
            } else if (evt == "Naga Pidgin") {
                language = "nag";
            } else if (evt == "Nahali") {
                language = "nlx";
            } else if (evt == "Ndamba") {
                language = "ndj";
            } else if (evt == "Ndebele") {
                language = "nde";
            } else if (evt == "Nend") {
                language = "anh";
            } else if (evt == "Ngindo") {
                language = "nnq";
            } else if (evt == "Ngoni (Tanzania)") {
                language = "xnj";
            } else if (evt == "Nguu") {
                language = "ngp";
            } else if (evt == "Norwegian Bokmål") {
                language = "nob";
            } else if (evt == "Oriya") {
                language = "ory";
            } else if (evt == "Oromo") {
                language = "gaz";
            } else if (evt == "Pahari, Mahasu") {
                language = "bfz";
            } else if (evt == "Panjabi, Eastern") {
                language = "pan";
            } else if (evt == "Palaung, Shwe") {
                language = "pll";
            } else if (evt == "Pengo") {
                language = "peg";
            } else if (evt == "Persian, Iranian") {
                language = "pes";
            } else if (evt == "Pohnpeian") {
                language = "pon";
            } else if (evt == "Polish") {
                language = "pol";
            } else if (evt == "Portuguese") {
                language = "por";
            } else if (evt == "Powari") {
                language = "pwr";
            } else if (evt == "Pular") {
                language = "fuf";
            } else if (evt == "Rakhine") {
                language = "rki";
            } else if (evt == "Reli") {
                language = "rei";
            } else if (evt == "Romani, Balkan") {
                language = "rmn";
            } else if (evt == "Romani, Carpathian") {
                language = "rmc";
            } else if (evt == "Romani, Vlax") {
                language = "rmy";
            } else if (evt == "Sakachep") {
                language = "sch";
            } else if (evt == "Sanskrit") {
                language = "san";
            } else if (evt == "Serbian") {
                language = "srp";
            } else if (evt == "Shatt") {
                language = "shj";
            } else if (evt == "Shi") {
                language = "shr";
            } else if (evt == "Shipogoro") {
                language = "poy";
            } else if (evt == "Sholaga") {
                language = "sle";
            } else if (evt == "Shona") {
                language = "sna";
            } else if (evt == "Siksika") {
                language = "bla";
            } else if (evt == "Slovak") {
                language = "slk";
            } else if (evt == "Soli") {
                language = "sby";
            } else if (evt == "Sop") {
                language = "urw";
            } else if (evt == "Spanish") {
                language = "spa";
            } else if (evt == "Susu") {
                language = "sus";
            } else if (evt == "Swahili") {
                language = "swh";
            } else if (evt == "Swedish") {
                language = "swe";
            } else if (evt == "Tagin") {
                language = "tgj";
            } else if (evt == "Tai") {
                language = "taw";
            } else if (evt == "Takuu") {
                language = "nho";
            } else if (evt == "Tamil") {
                language = "tam";
            } else if (evt == "Tavoyan") {
                language = "tvn";
            } else if (evt == "Telugu") {
                language = "tel";
            } else if (evt == "Thai") {
                language = "tha";
            } else if (evt == "Toma") {
                language = "tod";
            } else if (evt == "Tongan") {
                language = "ton";
            } else if (evt == "Tsakhur") {
                language = "tkr";
            } else if (evt == "Tswana") {
                language = "tsn";
            } else if (evt == "Turkish") {
                language = "tur";
            } else if (evt == "Tutsa Naga") {
                language = "tvt";
            } else if (evt == "Twi") {
                language = "twi";
            } else if (evt == "Ukrainian") {
                language = "ukr";
            } else if (evt == "Urdu") {
                language = "urd";
            } else if (evt == "Vaagri Booli") {
                language = "vaa";
            } else if (evt == "Vaghri") {
                language = "vgr";
            } else if (evt == "Vidunda") {
                language = "vid";
            } else if (evt == "Vietnamese") {
                language = "vie";
            } else if (evt == "Yalunka") {
                language = "yal";
            } else if (evt == "Yao") {
                language = "yao";
            } else if (evt == "Yapese") {
                language = "yap";
            } else if (evt == "Yiddish, Eastern") {
                language = "ydd";
            } else if (evt == "Yombe") {
                language = "yom";
            } else if (evt == "Yoruba") {
                language = "yor";
            } else if (evt == "Zaramo") {
                language = "zaj";
            } else if (evt == "Zigua") {
                language = "ziw";
            }
            await searchLanguage();
        }

        async function searchLanguage () {
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
                
                console.info(bibleList);
                console.info(n);

                sleep(1000);
                if (n % 2 === 0) {
                    console.info("setting 2");
                    await extensionAPI.settings.panel.create(config2);
                } else {
                    console.info("setting 1");
                    await extensionAPI.settings.panel.create(config1);
                }
                n = n + 1;
            }
        }

        // onChange - Preferred Bible
        async function setPrefBible(evt) {
            console.info(evt);
        }
        // command palette commands
        extensionAPI.ui.commandPalette.addCommand({
            label: "****",
            callback: () => {
                var parentUid = window.roamAlphaAPI.ui.getFocusedBlock()?.["block-uid"]; if (parentUid == undefined) { alert("Please make sure to focus a block before importing from Semantic Scholar"); return; } else { window.roamAlphaAPI.updateBlock({ block: { uid: parentUid, string: "Loading...".toString(), open: true } }); } fetchSSArtM(false, null, parentUid); document.querySelector("body")?.click();
            },
        });

    },
    onunload: () => {

    }
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}