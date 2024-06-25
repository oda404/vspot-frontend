import { derived, writable } from "svelte/store";

export const current_language = writable<"ro" | "en">(
    (typeof window !== "undefined" &&
        localStorage.lang &&
        JSON.parse(localStorage.lang)) ||
    "ro",
);

export function current_language_set(lang: "ro" | "en") {
    typeof window !== "undefined" && (localStorage.lang = JSON.stringify(lang));
    current_language.set(lang);
}

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
            "Transport prin firma ta preferata de curierat oriunde in Romania.",

        "page.main.payment": "Plata card sau cash",
        "page.main.payment.description":
            "Platesti folosind cardul online cu 3DSecure sau cash cand preiei comanda.",

        "page.main.return": "Retur gratuit",
        "page.main.return.check_policy": "*Vezi politica de retur",
        "page.main.return.description":
            "Daca nu esti multumit de un produs iti trimitem altul sau banii inapoi*",

        "page.main.satisfaction": "Satisfactie totala",
        "page.main.satisfaction.description": "Atat am avut de spus",

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
            "Inainte sa trimiti comanda te rugam sa-ti faci un cont, e gratis!",
        "order.send": "Trimite",
        "order.sendorder": "Trimite comanda",
        "order.payandsend": "Plateste & trimite",
        "order.status": "Status: {{status}}",
        "order.registered": "Am primit comanda ta",
        "order.confirmed": "Iti pregatim comanda",
        "order.shipped": "In transport",
        "order.completed": "A ajuns la tine",
        "order.coupon": "Voucher",
        "order.orderon": "Comanda pe {{date}}",
        "order.no_orders": "Nu ai plasat nicio comanda inca...",
        "order.consent":
            "Sunt de acord cu Termenii serviciului si Politica de confidentialitate",
        "order.consent_error":
            "Termenii serviciului si politica de confidentialitate sunt obligatorii.",

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
            "Kituri preumplute de unica folosinta sau reincarcabile",
        "product.pouches.description":
            "Pliculete cu nicotina aplicate in partea de sus a buzei",
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
        "product.entrykit.description": "Recomandat daca este primul tau vape",
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

        "description.description": "Descriere",
        "description.specs": "Specificatii",
        "description.outofstock": "Acest produs nu este in stoc :(",
        "description.outofstock_simple": "Nu este in stoc",
        "description.instock": "In stoc",
        "description.addedtocart": "Adaugat in cos",
        "description.notaddedtocart": "Produsul nu a putut fi adaugat in cos!",
        "description.cartlimithit":
            "Ai deja tot stocul nostru disponibil pentru acest produs in cos.",
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
        "description.orderregistered":
            "a fost inregistrata! Vei primi cat de curand un email de confirmare",
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
            "Program de lucru cu publicul prin mediul online: Luni - Vineri 10:30-18:30 UTC+2",
        "contact.phone": "Telefonic la:",
        "contact.fees": "*Tarifele standard se aplica",
        "contact.hq": "Sediu social: {{address}}",
        "contact.capital": "Capital social: {{n}}",

        "cookies.mandatory_notice":
            "Acest site foloseste cookie-uri necesare pentru functionarea sa. Prin folosire site-ului va dati acordul la folosirea acestor cookie-uri.",

        "slideshow.switchpro": "Vezi Switch Pro",

        "footer.products": "Produse",
        "footer.locations": "Locatii",
        "footer.legal": "Informatii utile",
        "footer.contact": "Contact",
        "footer.seedetails": "Vezi detalii",
        "footer.seo":
            "The V Spot este magazinul online pentru toate nevoiile tale ce au de a face cu nicotina. Tigari, vapeuri, kituri pentru vapat, lichide, baze, pouchuri, accesorii si nu numai! Toate acestea exclusiv de la cele mai bune branduri!",
    },
    en: {
        "home.title": "Your new Vapes & Tobacco store!",
        "home.explore": "Check out our catalogue",
        "home.explore.btn": "Let's go",

        "page.main": "Main page",
        "page.login": "Login",
        "page.signup": "Sign up",
        "page.contact": "Contact",
        "page.cookie_policy": "Cookie policy",
        "page.account": "My account",
        "page.my_orders": "My orders",
        "page.cart": "Checkout",
        "page.order_info": "Order information",
        "page.order_shipping": "Order shipping",
        "page.order_submit": "Send order",
        "page.tos": "Terms of service",
        "page.privacy_policy": "Privacy policy",
        "page.return_policy": "Return policy",

        "page.confirm_email.title.success": "Account confirmed!",
        "page.confirm_email.description.success":
            "Thank you for confirming your email address!",
        "page.confirm_email.title.failed": "Expired link",
        "page.confirm_email.description.failed":
            "The confirmation link has either expired or is invalid.",
        "page.confirm_email.resend": "Send another confirmation email",

        "page.send_confirm_email.title": "Email confirmation",
        "page.send_confirm_email.description": "We have sent you an email at",
        "page.send_confirm_email.follow_instructions":
            "Please follow the instructions in that email to confirm your account.",
        "page.send_confirm_email.spam_notice":
            "If you haven't received anything, make sure to also check the spam folder.",
        "page.send_confirm_email.wrong_email":
            "Don't have access to that email address? Change your email",

        "page.main.description":
            "is commited to bringing you the highest quality nicotine-related products! Vapes, kits, pouches, cigarettes and much more exclusively from top brands!",

        "page.main.best_brands": "Top brands",
        "page.main.best_brands.description":
            "We've partnered up with the best brands in the pursuit of bringing you the cream of the crop!",

        "page.main.shipping": "Shipping all across Romania",
        "page.main.shipping.description":
            "Shipping everywhere in Romania through your favorite shipping agency.",

        "page.main.payment": "Card or cash payment",
        "page.main.payment.description":
            "Pay online using your card, or cash when picking up your goodies.",

        "page.main.return": "Product return",
        "page.main.return.check_policy": "*See return policy",
        "page.main.return.description":
            "If you're not satisfied with a product, you're getting a new one, or your money back*",

        "page.main.satisfaction": "Complete satisfaction",
        "page.main.satisfaction.description": "That's all there is to it",

        "orderinfo.personaldata": "Contact",
        "orderinfo.shippingaddress": "Shipping address",
        "orderinfo.billingaddress": "Billing address",
        "orderinfo.firstname": "Firstname",
        "orderinfo.lastname": "Lastname",
        "orderinfo.phone": "Phone",
        "orderinfo.county": "County",
        "orderinfo.city": "City",
        "orderinfo.address": "Address",
        "orderinfo.postalcode": "Postal code",
        "orderinfo.newaccount": "Create an account",
        "orderinfo.noaccount": "Continue without an account",
        "orderinfo.continue": "Continue",
        "orderinfo.dataconsent":
            "I consent to the processing of my personal data according to the policy.",
        "orderinfo.paymentoption": "Payment option",

        "ordership.shipping_is_billing":
            "The shipping address is the same as the billing address.",
        "ordership.shipping_method": "Shipping method",
        "ordership.shipping_option_none": "Please select a shipping method.",
        "ordership.next": "Submit order",

        "order.info": "Billing",
        "order.shipping": "Shipping",
        "order.noaccount_notice":
            "Before continuing with the order please create an account",
        "order.send": "Send",
        "order.sendorder": "Submit order",
        "order.payandsend": "Pay n' send",
        "order.status": "Status: {{status}}",
        "order.registered": "Registered",
        "order.confirmed": "Confirmed",
        "order.shipped": "Shipped",
        "order.completed": "Completed",
        "order.coupon": "Voucher",
        "order.orderon": "Order on {{date}}",
        "order.no_orders": "You haven't placed any orders yet...",
        "order.consent":
            "I have read and accept the terms of service and the privacy policy",
        "order.consent_error":
            "The terms of service and privacy policy are mandatory",

        "payment.card": "Card",
        "payment.cash": "Cash on delivery",
        "payment.missingerror": "Please select a payment method",
        "payment.payment": "Payment",

        "shipping.missingerror": "Please select a shipping method.",
        "shipping.methoddescription":
            "{{cost}} | Delivery in {{delivery_time}} days",
        "shipping.shipping_through": "Shipping through:",

        "cart.title": "Checkout",

        "product.disposables": "Disposables",
        "product.kits": "Kits",
        "product.pouches": "Pouches",
        "product.cigs": "Cigarettes",
        "product.smoking": "Smoking",
        "product.liquids": "E-Liquids",
        "product.rollingpaper": "Rolling paper",
        "product.lighter": "Lighters",
        "product.grinder": "Grinders",
        "product.filter": "Filters",
        "product.capsules": "Capsules",
        "product.resistor": "Coils",
        "product.entrykit": "Entry kits",
        "product.nic": "Nicotine",
        "product.pouches_weak": "Mild pouches",
        "product.pouches_mid": "Moderate pouches",
        "product.pouches_strong": "Strong pouches",
        "product.new": "Just in!",
        "product.cone": "Cones",
        "product.disposable_reusable": "Pod kits",
        "product.disposable_cartridge": "Pods",

        "product.disposables.description":
            "Prefilled disposable / JUUL-like kits",
        "product.pouches.description": "Nicotine pouches",
        "product.smoking.description":
            "Products geared towards tobacco smokers",
        "product.liquids.description": "Liquids, bases and nicotine for vaping",
        "product.kits.description": "Entry and advanced kits for vaping",
        "product.rollingpaper.description": "Paper used for rolling cigarettes",
        "product.lighter.description":
            "Lighters running on butane, petroleum and shisha torches",
        "product.grinder.description": "Grinders used for grinding tobacco!",
        "product.filter.description": "Filters for use in rolled cigarettes",
        "product.capsules.description":
            "Capsules for flavoring traditional cigarettes",
        "product.resistor.description": "Replacement coils for kits",
        "product.entrykit.description":
            "Recommended if you're trying out vaping for the first time",
        "product.nic.description": "Nicotine shots for use with E-liquids",
        "product.pouches_weak.description":
            "Good for people who have never tried pouches before",
        "product.pouches_mid.description":
            "Good if you're bored of mild pouches but you're not looking to fall asleep",
        "product.pouches_strong.description":
            "Good if you have the nicotine tolerance of a nordic viking",
        "product.cone.description": "Cones, pre-rolled and ready to smoke",
        "product.disposable_reusable.description":
            "Juul-like kits with prefilled pods",
        "product.disposable_cartridge.description": "Prefilled pods",

        "nav.home": "Home",
        "nav.products": "Products",
        "nav.contact": "Get in touch",
        "nav.search": "Search",
        "nav.login": "Log in",

        "filters.title": "Filters",
        "filter.brand": "Brand",
        "filter.puffs": "Puffs",
        "filter.subtype": "Type",
        "filter.concentration": "Concentration",
        "filter.qty": "Quantity",
        "filter.diameter": "Diameter",
        "filter.material": "Material",
        "filter.trait": "Traits",
        "filter.color": "Color",
        "filter.reusable": "Reusable",
        "filter.cartridge": "Cartridge",
        "filter.nicotinefree": "Nicotine-free",
        "filter.active_coal": "Activated charcoal",
        "filter.with_filters": "With filters",
        "filter.compartments": "Pieces",
        "filter.kief_catcher": "Kief Catcher",

        "filteropt.zippolike": "Zippo-like",
        "filteropt.antiwind": "Wind resistant",
        "filteropt.white": "White",
        "filteropt.silver": "Silver",
        "filteropt.black": "Black",
        "filteropt.50": "50 pcs.",
        "filteropt.100": "100 pcs.",
        "filteropt.150": "150 pcs.",
        "filteropt.true": "Yes",
        "filteropt.nicshot": "Nicshot",

        "sort.title": "Sort by",
        "sort.new": "New",
        "sort.priceup": "Ascending price",
        "sort.pricedown": "Descending price",
        "sort.name": "Name A-Z",

        "action.addtocart": "Add to cart",
        "action.apply": "Apply",
        "action.seecart": "See cart",
        "action.continueshopping": "Continue shopping",
        "action.backtomainpage": "Go to the main page",
        "action.delete": "Remove",
        "action.shipping": "Looks good!",
        "action.change": "Modify",
        "action.yes": "Yes",
        "action.no": "No",
        "action.login": "Login",
        "action.signup": "Sign up",
        "action.see_all": "See all",
        "action.remember_me": "Remember me",
        "action.update": "Update",
        "action.logout": "Logout",
        "action.see_policy": "See policy",

        "description.description": "Description",
        "description.specs": "Specifications",
        "description.outofstock": "This item is out of stock :(",
        "description.outofstock_simple": "Out of stock",
        "description.instock": "In stock",
        "description.addedtocart": "Added to cart",
        "description.notaddedtocart":
            "The product couldn't be added to the cart!",
        "description.cartlimithit":
            "You already have our entire stock for this product in your cart.",
        "description.stock": "{{n}} in stock",
        "description.itemsincart": "{{n}} in cart",
        "description.yourcart": "Your cart",
        "description.total": "Total: {{n}}",
        "description.cartcheckout": "Go to checkout",
        "description.cartempty": "Your shopping cart is empty...",
        "description.ordersummary": "Summary",
        "description.shipping": "Shipping",
        "description.producttotal": "Products",
        "description.simpletotal": "Total",
        "description.productcount": {
            text: "{{n}} $",
            formatter: (n: number) => {
                return n === 1 ? "product" : "products";
            },
        },
        "description.productreminder":
            "Wait! Are you stocked up on everything?",
        "description.productreminder_noitems": "Maybe you're looking for...",
        "description.yourproducts": "Your products",
        "description.pcs": "PCS.",
        "description.shippingtbd": "See on the next page",
        "description.orderthankyou": "Thank you for your order!",
        "description.welcomeback": "Hi {{name}}!",
        "description.user_info": "My account",
        "description.user_orders": "My orders",
        "description.user_delete": "Close account",
        "description.noproducts": "No products were found...",
        "description.discount": "Discount",

        "description.details": "Details",

        "description.ordernumber": "The order #",
        "description.orderplacedextrainfo":
            "For more details about this order go to the Orders tab in your profile. For any other questions feel free to contact us",
        "description.orderregistered":
            " has been registered! You will soon get an email confirming the order",
        "description.orderconfirmed":
            "has been confirmed, and we're getting it ready for shipping",
        "description.ordershipped": "is currently on it's way to you!",
        "description.ordercompleted":
            "has reached it's destination, that being you :3!",
        "description.badorder": "could not be found...",
        "description.here": "here",

        "easter.badorder":
            "If you got here either our db shit the bed or you had a poke at the url paramter... sleep with one eye open",

        "age.notice":
            "This website sells products that contain nicotine and other potentially harmful and addictive substances. Before using this website you have to confirm you are of legal age.",
        "age.confirmok": "I'm at least {{age}}",
        "age.confirm_not_ok": "I'm under {{age}}",

        "user.firstname": "Firstname",
        "user.account_details": "Account details",
        "user.lastname": "Lastname",
        "user.email": "Email",
        "user.password": "Password",
        "user.password_old": "Current password",
        "user.password_new": "New password",
        "user.password_new_confirm": "Confirm new password",
        "user.password_confirm": "Confirm password",
        "user.createaccount": "Create a new account",
        "user.forgorpassword": "I forgot my password",
        "user.password_requirements":
            "The password must be at least 8 characters in length",
        "user.passwords_dont_match": "The password don't match",
        "user.delete_title": "Close your V-Spot account",
        "user.delete_warning":
            "Deleting an account is an irreversible operation!",
        "user.delete_data_notice":
            "Your contact, shipping and billing information will be delete from ours servers according to our privacy policy.",
        "error.password_incorrect": "The password is incorrect",
        "user.delete": "Close my account",

        "signup.consent":
            "I have read and accept the terms of service and the privacy policy",
        "signup.consent_missing":
            "The terms of service and privacy policy are mandatory",
        "signup.goto_login": "I already have an account",

        "error.encountered_error": "We encountered a problem :(",
        "error.encountered_error_description":
            "If this error persists you can contact us",
        "error.page404": "This page does not exist :(",
        "error.page404_description":
            "This page was either delete or it never existed...",
        "error.turnstile_failed":
            "The human verification failed, try to reload the page",
        "error.turnstile_invalid":
            "We encountered a problem, please reload the page and try again",
        "error.passwords_dont_match": "Passwords don't match",
        "error.failedordersubmit": "Something went wrong, please try again",

        "error.empty": "This field is required",
        "error.invalid": "Invalid field",

        "error.empty.email": "The email is required",
        "error.invalid.email": "The email is invalid",
        "error.duplicate.email": "This email has already been registered",

        "error.empty.password": "The password is required",
        "error.2short.password": "The password is too short",
        "error.2long.password":
            "The password can have a maximum of 256 characters",

        "error.empty.firstname": "The firstname is required",
        "error.2short.firstname": "The firstname is too short",
        "error.2long.firstname":
            "The firstname can have a maximum of 64 characters",

        "error.empty.lastname": "The lastname is required",
        "error.2short.lastname": "The lastname is too short",
        "error.2long.lastname":
            "The lastname can have a maximum of 64 characters",

        "error.invalid.coupon": "This voucher is invalid",
        "error.duplicate.coupon": "You already used this voucher for an order",

        "contact.description":
            "For any questions or feedback you can reach out to us through any of the following methods:",
        "contact.schedule":
            "Online working hours: Monday - Friday 10:30-18:30 UTC+2",
        "contact.phone": "Telephone:",
        "contact.fees": "*Standard fees apply",
        "contact.hq": "Headquarters: {{address}}",
        "contact.capital": "Equity capital: {{n}}",

        "cookies.mandatory_notice":
            "This site uses mandatory cookies in order to function properly. By continuing to use this site, you agree to the use of the these cookies.",

        "slideshow.switchpro": "Take me to Switch Pro",

        "footer.products": "Products",
        "footer.locations": "Locations",
        "footer.legal": "Legal stuff",
        "footer.contact": "Contact",
        "footer.seedetails": "See details",
        "footer.seo":
            "The V Spot is the online shop for all of your nicotine needs. Cigarettes, vapes, vaping kits, liquids, vaping bases, nicotine pouches, accessories and much more. Each and every one of them exclusively from top brands.",
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

        "shipping.fancourier": "Fan Courier",
        "shipping.sameday": "Sameday",

        "product.switchpro": "Switch Pro",
    },
    fallback: {
        missing_translation: "Missing localization",
    },
};

export const l = derived(
    current_language,
    ($lang) => (title: string, props?: any) => {
        const translation = (translations as any)[$lang];
        if (!translation)
            throw new Error(
                `Translations for language '${$lang}' have not been declared!`,
            );

        let val = (translation as any)[title];
        if (!val) {
            val = (translations["common"] as any)[title];
            if (!val) {
                val = `${(translations.fallback as any)["missing_translation"]} for ${title}`;
                // throw new Error(`Key '${title}' has not been declared for language '${$lang}' nor for common!`);
            }
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
