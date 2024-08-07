import { derived, writable } from "svelte/store";

// export const current_language = writable<"ro" | "en">(
//     (typeof window !== "undefined" &&
//         localStorage.lang &&
//         JSON.parse(localStorage.lang)) ||
//     "ro",
// );

const current_language = writable("ro");

var translations = {
    ro: {
        "home.title": "Noul tau magazin Vapes & Tobacco!",
        "home.explore": "Exploreaza catalogul nostru",
        "home.explore.btn": "Vezi",

        "page.main": "Pagina principala",
        "page.login": "Intra in cont",
        "page.signup": "Creeaza un cont",
        "page.contact": "Contact",
        "page.cookie_policy": "Politica cookies",
        "page.account": "Contul meu",
        "page.my_orders": "Comenzile mele",
        "page.cart": "Cosul de cumparaturi",
        "page.order_info": "Informatii comanda",
        "page.order_shipping": "Livrare comanda",
        "page.order_submit": "Trimite comanda",
        "page.tos": "Termenii si conditiile",
        "page.privacy_policy": "Politica de confidentialitate",
        "page.return_policy": "Politica retur",
        "page.forgot_password": "Recuperare parola",
        "page.forgot_password.description": "Introduceti adresa de email asociata contului dumneavoastra si va vom trimite un email cu instructiuni pentru resetarea parolei",
        "page.forgot_password.success": "Cerere recuperare parola trimisa",
        "page.reset_password": "Resetare parola",
        "page.reset_password.description": "Alege o noua parola",
        "page.reset_password.expired": "Link expirat",
        "page.reset_password.expired.description": "Aceasta cerere de resetare a parolei a expirat",

        "page.reset_password.success": "Parola resetata",
        "page.reset_password.success.description": "Puteti intra in contul dumneavoastra folosind noua parola",

        "page.forgot_password.success.header": "Email trimis",
        "page.forgot_password.success.description": "Email-ul pentru resetarea parolei contului dumneavoastra a fost trimis. Va rugam sa urmati instructiunile din email pentru a va reseta parola.",

        "page.send_confirm_email.title": "Confirmare email",
        "page.send_confirm_email.description":
            "V-am trimis un email de confirmare pe ",
        "page.send_confirm_email.follow_instructions":
            "Va rugam sa urmati instructiunile din email pentru a va activa contul.",
        "page.send_confirm_email.spam_notice":
            "Daca nu ati primit nici un email va rugam sa verificati si folder-ul de spam.",
        "page.send_confirm_email.wrong_email":
            "Adresa de email gresita? Schimba adresa",

        "page.confirm_email.title.success": "Va multumim!",
        "page.confirm_email.description.success":
            "Adresa dumneavoastra de email a fost confirmata. Va uram cumparaturi placute pe V-Spot!",
        "page.confirm_email.title.failed": "Link expirat",
        "page.confirm_email.description.failed":
            "Link-ul de confirmare a expirat sau este invalid.",
        "page.confirm_email.resend": "Trimite alt email de confirmare",

        "page.main.description":
            "are ca obiectiv sa-ti puna la dispozitie doar cele mai bune produse ce au de a face cu nicotina! Vapes, kituri, pouchuri sau tigari clasice, le gasesti la noi exclusiv de la cele mai bune branduri!",

        "page.main.best_brands": "Cele mai bune branduri",
        "page.main.best_brands.description":
            " Lucram exclusiv cu cele mai bune branduri pentru a-ti asigura satisfactia completa cand dai o comanda!",

        "page.main.shipping": "Transport in tota tara",
        "page.main.shipping.description":
            "Transport oriunde in Romania, in 1-2 zile lucratoare de la confirmarea comenzii",

        "page.main.payment": "Plata card sau cash",
        "page.main.payment.description":
            "Platesti folosind cardul online cu 3DSecure sau cash cand preiei comanda",

        "page.main.support": "Vorbeste cu un expert",
        "page.main.support.description":
            "Daca esti in cautarea unei recomandari, suntem aici 10:00-18:00 de Luni pana Vineri",

        "page.main.satisfaction": "Satisfactie totala",
        "page.main.satisfaction.description":
            "Iti oferim cele mai noi si cele bune produse pentru o experienta de vapat unica",

        "orderinfo.personaldata": "Date de contact",
        "orderinfo.shippingaddress": "Adresa de livrare",
        "orderinfo.billingaddress": "Adresa de facturare",
        "orderinfo.firstname": "Nume",
        "orderinfo.lastname": "Prenume",
        "orderinfo.phone": "Telefon",
        "orderinfo.county": "Judet",
        "orderinfo.city": "Localitate",
        "orderinfo.address": "Adresa",
        "orderinfo.postalcode": "Cod postal",
        "orderinfo.newaccount": "Creeaza un cont",
        "orderinfo.noaccount": "Continua fara cont",
        "orderinfo.continue": "Urmatorul pas",
        "orderinfo.dataconsent":
            "Accept politica de confidentialitate cu privire la prelucrarea datelor personale.",
        "orderinfo.paymentoption": "Metoda de plata",

        "ordership.shipping_is_billing":
            "Adresa de livrare este aceeasi cu adresa de facturare.",
        "ordership.shipping_method": "Metoda livrare",
        "ordership.shipping_option_none":
            "Ai uitat sa alegi o metda de livrare.",
        "ordership.next": "Finalizeaza comanda",

        "order.info": "Facturare",
        "order.shipping": "Livrare",
        "order.noaccount_notice":
            "Inainte sa trimiti comanda te rugam sa-ti creezi un cont!",
        "order.send": "Trimite",
        "order.sendorder": "Trimite comanda",
        "order.payandsend": "Plateste & trimite",
        "order.status": "Status: {{status}}",
        "order.registered": "Am primit comanda ta",
        "order.confirmed": "Iti pregatim comanda",
        "order.shipped": "In transport",
        "order.completed": "A ajuns la tine",
        "order.canceled": "Anulata",

        "order.admin.registered": "In asteptare confirmare",
        "order.admin.confirmed": "Confirmata",
        "order.admin.shipped": "In transport",
        "order.admin.completed": "Livrata",
        "order.admin.canceled": "Anulata",
        "order.admin.no_orders": "Nicio comanda",
        "order.admin.missing_shipping_number": "Ai uitat AWB-ul",
        "order.admin.shipping_number": "AWB",

        "order.coupon": "Cod",
        "order.orderon": "Comanda pe {{date}}",
        "order.no_orders": "Nu ai plasat nicio comanda inca...",
        "order.consent":
            "Sunt de acord cu Termenii serviciului si Politica de confidentialitate",
        "order.consent_error":
            "Termenii serviciului si politica de confidentialitate sunt obligatorii.",
        "order.do_you_have_a_voucher": "Ai un voucher?",
        "order.create_account_for_voucher":
            "Creeaza un cont pentru a aplica un voucher",
        "order.discount_showcase":
            "Ai {{perc}}% reducere pentru aceasta comanda!",

        "payment.card": "Card",
        "payment.cash": "Ramburs la livrare",
        "payment.missingerror": "Ai uitat sa alegi o metoda de plata.",
        "payment.payment": "Plata",

        "shipping.missingerror": "Ai uitat sa alegi o metda de livrare.",
        "shipping.methoddescription":
            "{{cost}} | Livrare in {{delivery_time}} zile",
        "shipping.shipping_through": "Livrare prin:",

        "cart.title": "Finalizeaza comanda",

        "product.disposables": "Disposables",
        "product.kits": "Kituri",
        "product.pouches": "Pouchuri",
        "product.cigs": "Tigari",
        "product.smoking": "Tutungerie",
        "product.liquids": "E-Lichide",
        "product.rollingpaper": "Foite",
        "product.lighter": "Brichete",
        "product.grinder": "Grindere",
        "product.filter": "Filtre",
        "product.capsules": "Capsule",
        "product.resistor": "Rezistente",
        "product.entrykit": "Kituri incepatori",
        "product.nic": "Nicotinizare",
        "product.pouches_weak": "Pouchuri slabe",
        "product.pouches_mid": "Pouchuri moderate",
        "product.pouches_strong": "Pouchuri tari",
        "product.new": "Noutati!",
        "product.cone": "Conuri",
        "product.disposable_reusable": "Vape reincarcabil",
        "product.disposable_cartridge": "Poduri",

        "product.disposables.description":
            "Kituri preumplute de unica folosinta sau cu poduri",
        "product.pouches.description":
            "Plicuri cu nicotina",
        "product.smoking.description": "Produse destinate fumatorilor de tutun",
        "product.liquids.description": "Lichide, baze si nicotina pentru vapat",
        "product.kits.description":
            "Kituri de vapat pentru incepatori si impatimiti",
        "product.rollingpaper.description": "Foite pentru rulat tigari",
        "product.lighter.description":
            "Brichete pe gaz, benzina si torte narghilea",
        "product.grinder.description":
            "Grindere pentru maruntit tutun si doar tutun!",
        "product.filter.description": "Filtre pentru tigari rulate",
        "product.capsules.description": "Capsule aromate pentru tigari",
        "product.resistor.description": "Rezistente pentru kit-uri",
        "product.entrykit.description": "Recomandat ca si primul tau vape",
        "product.nic.description": "Shot-uri de nicotina pentru E-lichide",
        "product.pouches_weak.description": "O alegere buna pentru incepatori",
        "product.pouches_mid.description":
            "Daca te-ai plictisit de pouch-urile slabe dar nu vrei sa adormi",
        "product.pouches_strong.description":
            "Pentru cei ce au toleranta la nicotina a unui cal",
        "product.cone.description": "Conuri prerulate gata pentru umplere",
        "product.disposable_reusable.description":
            "Vape-uri reincarcabile cu poduri",
        "product.disposable_cartridge.description": "Poduri preumplute",

        "product.recommended_for_you": "Recomandate pentru tine",

        "price.only_online": "Aceasta reducere este valabila exclusiv online",

        "nav.home": "Acasa",
        "nav.products": "Produse",
        "nav.contact": "Contact",
        "nav.search": "Cauta",
        "nav.login": "Intra in cont",

        "filters.title": "Aplica filtre",
        "filter.brand": "Brand",
        "filter.puffs": "Numar pufuri",
        "filter.subtype": "Tip",
        "filter.concentration": "Concentratie",
        "filter.qty": "Cantitate",
        "filter.diameter": "Diametru",
        "filter.material": "Material",
        "filter.trait": "Caracteristici",
        "filter.color": "Culoare",
        "filter.reusable": "Dispozitiv poduri",
        "filter.cartridge": "Poduri",
        "filter.nicotinefree": "Fara nicotina",
        "filter.has_nicotine": "Cu nicotina",
        "filter.active_coal": "Carbune activ",
        "filter.with_filters": "Cu filtre",
        "filter.compartments": "Compartimente",
        "filter.kief_catcher": "Compartiment Kief",

        "filteropt.zippolike": "Tip Zippo",
        "filteropt.antiwind": "Anti-vant",
        "filteropt.white": "Alb",
        "filteropt.silver": "Argintiu",
        "filteropt.black": "Negru",
        "filteropt.50": "50 buc.",
        "filteropt.100": "100 buc.",
        "filteropt.150": "150 buc.",
        "filteropt.true": "Da",
        "filteropt.nicshot": "Shot nicotina",

        "sort.title": "Sorteaza",
        "sort.new": "Cele mai noi",
        "sort.priceup": "Pret crescator",
        "sort.pricedown": "Pret descresator",
        "sort.name": "Nume A-Z",

        "action.addtocart": "Adauga in cos",
        "action.apply": "Aplica",
        "action.seecart": "Vezi cosul",
        "action.continueshopping": "Continua cumparaturile",
        "action.backtomainpage": "Inapoi la pagina principala",
        "action.delete": "Sterge",
        "action.shipping": "Mai departe",
        "action.continue_without_account": "Continua fara cont",
        "action.change": "Schimba",
        "action.yes": "Da",
        "action.no": "Nu",
        "action.login": "Intra in cont",
        "action.loginshort": "Intra in cont",
        "action.signup": "Creeza un cont",
        "action.signup_short": "Creeaza cont",
        "action.see_all": "Vezi toate",
        "action.remember_me": "Tine-ma minte",
        "action.update": "Actualizeaza",
        "action.logout": "Iesi din cont",
        "action.see_policy": "Vezi politica",
        "action.send_reset_password": "Trimite email",
        "action.reset_password": "Reseteaza parola",
        "action.resend_password_reset": "Retrimite cererea de resetare",

        "description.need_assistance": "Ai nevoie de ajutor? Contacteaza-ne",

        "description.description": "Descriere",
        "description.specs": "Specificatii",
        "description.outofstock": "Acest produs nu este in stoc :(",
        "description.outofstock_simple": "Stoc epuizat",
        "description.instock": "In stoc",
        "description.lastinstock": "Ultimul produs",
        "description.addedtocart": "Adaugat in cos",
        "description.notaddedtocart": "Produsul nu a putut fi adaugat in cos",
        "description.cartlimithit":
            "Ai deja tot stocul nostru disponibil pentru acest produs in cos",
        "description.stock": "{{n}} in stoc",
        "description.itemsincart": "{{n}} in cos",
        "description.yourcart": "Cosul tau",
        "description.total": "Subtotal: {{n}}",
        "description.cartcheckout": "Vezi cosul",
        "description.cartempty": "Cosul de cumparaturi este gol...",
        "description.ordersummary": "Sumar comanda",
        "description.shipping": "Livrare",
        "description.producttotal": "Subtotal",
        "description.simpletotal": "Total",
        "description.productcount": {
            text: "{{n}} $",
            formatter: (n: number) => {
                return n === 1 ? "produs" : "produse";
            },
        },
        "description.productreminder": "Ai tot ce iti trebuie?",
        "description.productreminder_noitems": "Poate ai nevoie de...",
        "description.yourproducts": "Produsele tale",
        "description.pcs": "BUC.",
        "description.shippingtbd": "Vezi pe pagina urmatoare",
        "description.orderthankyou": "Multumim pentru comanda!",
        "description.details": "Detalii",
        "description.badorder": "nu a putut fi gasita...",
        "description.here": "aici",
        "description.ordernumber": "Comanda #",
        "description.orderplacedextrainfo":
            'Pentru mai multe detalii vezi rubrica "Comenzile mele" a profilului tau. Pentru oricare alte probleme ne poti contacta direct pe noi',
        "description.order_registered":
            "Am primit comanda ta! Vei primi cat de curand un email de confirmare.",
        "description.orderconfirmed":
            "a fost confirmata, si in momentul asta o pregatim pentru livrare",
        "description.ordershipped": "se afla in drum spre tine!",
        "description.ordercompleted":
            "a ajung la destinatia ei, adica la tine! Pup dulce :3",
        "description.welcomeback": "Salut {{name}}!",
        "description.user_info": "Contul meu",
        "description.user_orders": "Comenzile mele",
        "description.user_delete": "Inchide contul",
        "description.noproducts": "Nu s-a gasit nici un produs...",
        "description.discount": "Reducere",

        "easter.badorder":
            "Daca ai ajuns pe pagina asta ori a facut caca baza noastra de date pe ea, ori ai umblat la url paramter... sa dormi cu un ochi deschis la noapte",

        "age.notice":
            "Acest site comercializeaza produse ce contin nicotina/substante ce pot dauna sanatatii si crea dependenta. Trebuie sa confirmati ca aveti varsta minima legala pentru a continua.",
        "age.confirmok": "Am minim {{age}} ani",
        "age.confirm_not_ok": "Am sub {{age}} ani",

        "user.firstname": "Numele",
        "user.account_details": "Detalii cont",
        "user.lastname": "Prenumele",
        "user.email": "Email",
        "user.password": "Parola",
        "user.password_old": "Parola actuala",
        "user.password_new": "Parola noua",
        "user.password_new_confirm": "Confirma noua parola",
        "user.password_confirm": "Confirma parola",
        "user.createaccount": "Creeaza un cont",
        "user.forgorpassword": "Am uitat parola",
        "user.delete_title": "Inchide contul tau la V-Spot",
        "user.delete_warning":
            "Stergerea unui cont este o operatiune ireversibila!",
        "user.delete_data_notice":
            "Datele tale cu caracter personal vor fi sterse de pe serverele noastre conform politicii de confidentialitate.",
        "user.password_requirements":
            "Parola trebuie sa fie compusa din minim 8 caractere",
        "user.delete": "Inchide contul",

        "signup.consent":
            "Sunt de acord cu Termenii serviciului si Politica de confidentialitate",
        "signup.consent_missing":
            "Termenii serviciului si politica de confidentialitate sunt obligatorii.",
        "signup.goto_login": "Am deja un cont",

        "error.email_taken": "Acesta adresa de email a fost inregistrata deja",
        "error.encountered_error": "Am intampinat o problema :(",
        "error.encountered_error_description":
            "Incercati sa reincarcati pagina, daca problema persista contactati-ne",
        "error.page404": "Pagina nu exista :(",
        "error.page404_description":
            "Aceasta pagina nu a existat niciodata sau a fost stearsa...",

        "error.creds": "Adresa de email sau parola este gresita",
        "error.turnstile_failed":
            "Verificare a esuat, incercati sa reincarcati pagina",
        "error.turnstile_invalid":
            "Am intampinat o problema, te rog reincarca pagina si incearca din nou",
        "error.passwords_dont_match": "Parolele introduse difera",
        "error.failedordersubmit":
            "Ceva nu a mers bine, va rog incercati din nou",

        "error.empty": "Acest camp este obligatoriu",
        "error.invalid": "Camp invalid",

        "error.empty.email": "Ai uitat adresa de email",
        "error.invalid.email": "Adresa de email este invalida",
        "error.duplicate.email":
            "Aceasta adresa de email a fost inregistrata deja",

        "error.nonexistent.email": "Aceasta adresa de email nu a fost inregistrata",

        "error.empty.password": "Ai uitat parola",
        "error.2short.password": "Parola este prea scurta",
        "error.2long.password":
            "Parola poate avea un numar maxim de 256 de caractere",
        "error.creds.password": "Parola este gresita",

        "error.empty.firstname": "Ai uitat prenumele",
        "error.2short.firstname": "Numele este prea scurt",
        "error.2long.firstname":
            "Numele poate avea un numar maxim de 64 de caractere",

        "error.empty.lastname": "Ai uitat numele",
        "error.2short.lastname": "Prenumele este prea scurt",
        "error.2long.lastname":
            "Prenumele poate avea un numar maxim de 64 de caractere",

        "error.invalid.coupon": "Acest voucher nu exista",
        "error.duplicate.coupon":
            "Ai folosit deja acest voucher pentru o comanda",

        "contact.description":
            "Pentru orice intrebari sau sesizari va stam la dispozitie prin urmatoarele canale de comunicare:",
        "contact.schedule":
            "Program de lucru cu publicul prin mediul online: Luni - Vineri 10:00-18:00",
        "contact.phone": "Telefonic la:",
        "contact.fees": "*Tarifele standard se aplica",
        "contact.hq": "Sediu social: {{address}}",
        "contact.capital": "Capital social: {{n}}",

        "cookies.mandatory_notice":
            "Acest site foloseste cookie-uri necesare pentru functionarea sa. Prin folosire site-ului va dati acordul la folosirea acestor cookie-uri.",

        "slideshow.switchpro": "Vezi Switch Pro",

        "searchbar.error_occured": "Am intampinat o problema",
        "searchbar.nothing_found": "Nu s-a gasit niciun rezultat",
        "searchbar.search_results": "Rezultatele cautarii",

        "invoice.date_type.issue": "Data emitere",
        "invoice.date_type.spv": "Data in SPV",

        "password_requirements.password_must_have": "Parola trebuie sa contina",
        "password_requirements.min_characters": "Cel putin {{n}} caractere",

        "spec.puffs_per_pod": "Numar fumuri per pod",
        "spec.liquid_per_pod": "Cantitate e-lichid per pod",
        "spec.nicotine_per_pod": "Concentratie nicotina per pod",
        "spec.pods_per_package": "Numar de poduri in pachet",
        "spec.compatible_with": "Compatibil cu",
        "spec.one_time_use": "De unica folosinta",
        "spec.flavor": "Profil aroma",
        "spec.battery_capacity": "Capacitate baterie",
        "spec.material": "Material",
        "spec.rechargable": "Cu poduri",
        "spec.contains_pod": "Pod inclus",
        "spec.color": "Culoare",
        "spec.puffs": "Numar fumuri",
        "spec.liquid": "Cantitate e-lichid",
        "spec.nicotine": "Concentratie nicotina",
        "spec.nicotinefree": "Fara nicotina",
        "spec.contains_n_pods": "Numar poduri incluse",
        "spec.pods_flavor": "Aroma podurilor",

        "specval.lemon_passion_fruit": "Fructul pasiunii si lamaie",
        "specval.blue_mojito": "Mojito Albastru",
        "specval.cranberry_ice": "Merisoare cu efect racoritor (gheata)",
        "specval.lychee_ice": "Litchi cu efect racoritor (gheata)",
        "specval.passionfruit_blueberry_bull": "Fructul pasiunii, afine si energizant",
        "specval.strawberry_kiwi": "Capsuni si kiwi",
        "specval.blueberry_sour_raspberry": "Afine si zmeura acrisoara",
        "specval.cola_ice": "Cola cu efect racoritor (gheata)",
        "specval.menthol_mojito": "Mojito mentolat",
        "specval.mr_blue": "Afine, zmeura, mure si menta",
        "specval.strawberry_smoothie": "Smoothie de capsuni",
        "specval.blue_razz_ice": "Fructe de padure cu efect racoritor (gheata)",
        "specval.bull_ice": "Energizant cu efect racoritor (gheata)",
        "specval.cherry_ice": "Cirese cu efect racoritor (gheata)",
        "specval.cool_mint": "Menta",
        "specval.grape_ice": "Struguri cu efect racoritor (gheata)",
        "specval.lemon_mojito": "Mojito de lamaie",
        "specval.lush_ice": "Pepene verde cu efect racoritor (gheata)",
        "specval.strawberry_raspberry_cherry": "Capsuni, zmeura si cirese",
        "specval.apple_peach": "Mere si piersici",
        "specval.blackberry_ice": "Mure cu efect racoritor (gheata)",
        "specval.blueberry_ice": "Afine cu efect racoritor (gheata)",
        "specval.cherry_peach_lemonade": "Limonada de cirese si piersici",
        "specval.kiwi_passion_fruit_guava": "Kiwi, fructul pasiunii si guava",
        "specval.lychee_passion_fruit_orange": "Litchi, fructul pasiunii si portocale",
        "specval.mixed_berries": "Amestec de mure",
        "specval.red_berry": "Amestec de mure rosii",
        "specval.strawberry_ice": "Capsuni cu efect racoritor (gheata)",
        "specval.tobacco": "Tutun",
        "specval.triple_melon": "Pepene verde, pepene galben si castravete",
        "specval.watermelon_bubblegum": "Pepene verde si guma",
        "specval.watermelon_lychee_guava": "Pepene verde, litchi si guava",
        "specval.banana_ice": "Banana cu efect racoritor (gheata)",
        "specval.dragon_fruit_banana_cherry": "Fructul dragonului, banana si cirese",
        "specval.mango_ice": "Mango cu efect racoritor (gheata)",
        "specval.strawberry_watermelon": "Capsuni si pepene verde",
        "specval.cherry_cola": "Cirese si cola",
        "specval.peach_mango_watermelon": "Piersici, mango si pepene verde",
        "specval.blue_razz_lemon": "Fructe de padure si lamaie",
        "specval.menthol": "Menta",
        "specval.rainbow_candy": "Bomboane curcubeu / Amestec de bomboane",
        "specval.sour_apple": "Mere acrisoare",
        "specval.strawberry_apple": "Capsuni si mere",
        "specval.strawberry_cranberry_bubblegum": "Capsuni, merisoare si guma",
        "specval.vzbull": "Energizant",
        "specval.watermelon_ice": "Pepene verde cu efect racoritor (gheata)",
        "specval.aluminium": "Aluminiu",
        "specval.blue": "Albastru",
        "specval.red": "Rosu",
        "specval.yellow": "Galben",
        "specval.green": "Verde",
        "specval.grey": "Gri",
        "specval.black": "Negru",
        "specval.purple": "Mov",
        "specval.orange": "Portocaliu",
        "specval.true": "Da",
        "specval.false": "Nu",
        "specval.approx_2000": "Aprox. 2000",
        "specval.950mAh": "950mAh",
        "specval.plastic": "Plastic",
        "specval.metal": "Metal",
        "specval.4": "4",
        "specval.approx_800": "Aprox. 800",
        "specval.approx_600": "Aprox. 600",
        "specval.tropical_mixed": "Mix tropical",
        "specval.lemon_and_lime": "Lamaie & lime",
        "specval.blueberry_lime": "Afine & lime",
        "specval.pink_lemonade": "Limonada roz",
        "specval.watermelon_strawberry": "Pepene verde & capsuni",
        "specval.melon_berry": "Mure & pepene",
        "specval.fizzy_cherry": "Cirese revigorante",
        "specval.white_peach_razz": "Piersici si zmeura",
        "specval.strawberry_burst": "Explozie de capsuni",
        "specval.blueberry_raspberries": "Afine si mure",
        "specval.blueberry_peach": "Afine si piersici",
        "specval.crystal_4in1": "Dispozitiv SKE Crystal 4-in-1",

        "package_content.pods_switch_pro": "Poduri Vozol Switch PRO",
        "package_content.instruction_manual": "Manual de utilizare",
        "package_content.switchpro_device": "Dispozitiv Vozol Switch PRO",
        "package_content.pod_switch_pro": "Pod Vozol Switch PRO",
        "package_content.type_c_cable": "Cablu Tip-C",
        "package_content.neon800": "Vape Vozol Neon 800",
        "package_content.star2000": "Vape Vozol Star 2000",
        "package_content.crystal_4in1_device": "Dispozitiv Crystal 4-in-1",
        "package_content.pods_crystal_4in1": "Poduri Crystal 4-in-1",

        "product.crystalbar.description": "Vape Crystal de unica folosinta cu 600 de fumuri",
        "product.star2000.description": "Aroma Vozol intr-un vape de unica folosinta fara nicontina cu 2000 de fumuri",
        "product.neon800.description": "Savoarea Vozol intr-un vape de unica folosinta cu 800 de fumuri",
        "product.elfbarv2.description": "Versiunea 2 al renumitului Elf Bar de unica folosinta cu 600 de fumuri",
        "product.crystal4in1.description": "Gustul unic Crystal intr-un vape cu 4 poduri interschimbabile",
        "product.switchpro.description": "Gustul Vozol, acum intr-un vape cu poduri",

        "product.mystique.description": "Lichidul Mystique de la Guerrilla Flavors cu un gust de neuitat",
        "product.puffbar.description": "Noul Lichid Puff Bar de la Guerrilla Flavors",
        "product.nicshot.description": "Nicotinizare pentru E-Lichide",

        "product.gtx_go80.description": "Kit Vaporesso GTX GO80 pentru o experienta de vapat unica",
        "product.ursa_nano.description": "Lost Vape Ursa nano",
        "product.cyberg.description": "Kit-urile Aspire Cyber G",
        "product.argusz.description": "Kit-urile VooPoo Argus Z",
        "product.gotek.description": "Kit-urile Aspire Gotek",
        "product.argus_p2.description": "Noile kit-uri VooPoo Argus P2 cu display OLED",
        "product.argus_g2_mini.description": "Kit-urile VooPoo Argus G2 Mini",
        "product.xros4.description": "Kit-urile Vaporesso XROS 4",

        "footer.products": "Produse",
        "footer.locations": "Locatii",
        "footer.legal": "Informatii utile",
        "footer.contact": "Contact",
        "footer.seedetails": "Vezi detalii",
        "footer.seo":
            "The V Spot este magazinul online pentru toate nevoiile tale ce au de a face cu nicotina. Tigari, vapeuri, kituri pentru vapat, lichide, baze, pouchuri, accesorii si nu numai! Toate acestea exclusiv de la cele mai bune branduri!",
    },
    common: {
        "filter.vgpg": "VG/PG",
        "filteropt.vozol": "Vozol",
        "filteropt.elfbar": "Elf bar",
        "filteropt.600": "600",
        "filteropt.800": "800",
        "filteropt.1600": "1600",
        "filteropt.2000": "2000",
        "filteropt.cuba": "Cuba",
        "filteropt.fedrs": "FEDRS",
        "filteropt.iceberg": "Iceberg",
        "filteropt.snatch": "SNATCH",
        "filteropt.16": "16mg",
        "filteropt.43": "43mg",
        "filteropt.50mg": "50mg",
        "filteropt.65": "65mg",
        "filteropt.switchpro": "Vozol Switch Pro",
        "filteropt.neon800": "Vozol Neon 800",
        "filteropt.star2000": "Vozol Star 2000",
        "filteropt.elfbarv2": "Elf Bar V2",
        "filteropt.cyclones": "Cyclones",
        "filteropt.juicy": "Juicy",
        "filteropt.ocb": "OCB",
        "filteropt.raw": "RAW",
        "filteropt.6": "6mm",
        "filteropt.plastic": "Plastic",
        "filteropt.metal": "Metal",
        "filteropt.40ml": "40ml",
        "filteropt.20mg": "20mg",
        "filteropt.50/50": "50/50",
        "filteropt.puffbar": "Puff Bar",
        "filteropt.guerrilla_flavors": "Guerrilla Flavors",
        "filteropt.nicoboom": "Nico Boom",
        "filteropt.aspire": "Aspire",
        "filteropt.gotek": "Gotek",
        "filteropt.gotekx2": "Gotek X2",
        "filteropt.cuba_ninja": "CUBA Ninja",
        "filteropt.actitube": "ActiTube",
        "filteropt.cyberg": "Cyber G",
        "filteropt.cyberg_slim": "Cyber G Slim",
        "filteropt.2": "2",
        "filteropt.3": "3",
        "filteropt.voopoo": "VooPoo",
        "filteropt.vaporesso": "Vaporesso",
        "filteropt.xros4": "XROS 4",
        "filteropt.argusz": "Argus Z",
        "filteropt.eliquid_france": "ELiquid France",
        "filteropt.10": "10 buc.",
        "filteropt.ske": "SKE",
        "filteropt.crystalbar": "Crystal Bar",
        "filteropt.epotion": "E-Potion",
        "filteropt.mystique": "Mystique",
        "filteropt.70/30": "70/30",
        "filteropt.lostvape": "Lost Vape",
        "filteropt.ursa_nano": "Ursa Nano",
        "filteropt.gtx_go80": "GTX GO 80",
        "filteropt.argus_g2_mini": "Argus G2 Mini",
        "filteropt.argus_p2": "Argus P2",
        "filteropt.31mg": "31mg",
        "filteropt.38.4mg": "38.4mg",
        "filteropt.43mg": "43mg",
        "filteropt.2400": "2400",
        "filteropt.crystal4in1": "Crystal 4-in-1",

        "specval.800mAh": "800mAh",
        "specval.800": "800",
        "specval.2ml": "2ml",
        "specval.2%": "2%",
        "specval.2": "2",
        "specval.switchpro": "Vozol Switch PRO",
        "specval.5.5ml": "5.5ml",

        "shipping.fancourier": "Fan Courier",
        "shipping.sameday": "Sameday",

        "product.switchpro": "Vozol Switch Pro",
        "product.crystal4in1": "SKE Crystal 4-in-1",
        "product.elfbarv2": "Elf Bar V2",
        "product.neon800": "Vozol Neon 800",
        "product.star2000": "Vozol Star 2000",
        "product.crystalbar": "Crystal Bar",
        "product.puffbar": "Lichid Puff Bar",
        "product.mystique": "Lichid Mystique",
        "product.nicshot": "Shot Nicotina",
        "product.gtx_go80": "Vaporesso GTX GO 80",
        "product.ursa_nano": "Lost-Vape Ursa Nano",
        "product.cyberg": "Aspire Cyber G",
        "product.argusz": "VooPoo Argus Z",
        "product.gotek": "Aspire Gotek",
        "product.argus_p2": "Argus P2",
        "product.argus_g2_mini": "Argus G2 Mini",
        "product.xros4": "Vaporesso XROS 4",
    },
    fallback: {
        missing_translation: "Missing localization",
    },
};

export const l = derived(
    current_language,
    ($lang) => (title: string, props?: any) => {
        const translation = translations.ro;
        // if (!translation)
        //     throw new Error(
        //         `Translations for language '${$lang}' have not been declared!`,
        //     );

        let val = (translation as any)[title];
        if (!val) {
            val = (translations.common as any)[title];
            if (!val)
                val = `${(translations.fallback as any)["missing_translation"]} for ${title}`;
        }

        if (props) {
            if (typeof val === "object") {
                console.assert(Object.entries(props).length === 1);
                console.assert(val.text);
                console.assert(val.formatter);
                const [key, value] = Object.entries(props)[0];
                val = val.text.replace("$", val.formatter(value));
            }

            for (const [key, value] of Object.entries(props))
                val = val.replace(`{{${key}}}`, value);
        }

        return val;
    },
);
