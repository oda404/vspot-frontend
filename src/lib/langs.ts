
import { derived, writable } from "svelte/store";

export const current_language = writable(
    typeof window !== "undefined" &&
    (localStorage.lang && JSON.parse(localStorage.lang)) || "ro"
);

export function current_language_set(lang: string) {
    typeof window !== "undefined" && (localStorage.lang = JSON.stringify(lang));
    current_language.set(lang);
}

var translations = {
    "ro": {
        "home.title": "Noul tau magazin Vapes & Tobacco!",
        "home.explore": "Exploreaza catalogul nostru",
        "home.explore.btn": "Vezi",

        "page.login": "Intra in cont",
        "page.signup": "Creeaza un cont",
        "page.contact": "Contact",
        "page.cookie_policy": "Politica cookies",

        "orderinfo.personaldata": "Date de contact",
        "orderinfo.shippingaddress": "Adresa livrare",
        "orderinfo.billingaddress": "Adresa facturare",
        "orderinfo.firstname": "Nume",
        "orderinfo.lastname": "Prenume",
        "orderinfo.phone": "Telefon",
        "orderinfo.county": "Judet",
        "orderinfo.city": "Localitate",
        "orderinfo.address": "Adresa",
        "orderinfo.postalcode": "Cod postal",
        "orderinfo.newaccount": "Creeaza un cont",
        "orderinfo.noaccount": "Continua fara cont",
        "orderinfo.dataconsent": "Accept politica de confidentialitate cu privire la prelucrarea datelor personale.",
        "orderinfo.paymentoption": "Metoda de plata",

        "ordership.shipping_is_billing": "Adresa de livrare este aceeasi cu adresa de facturare.",
        "ordership.shipping_method": "Metoda livrare",
        "ordership.shipping_option_none": "Ai uitat sa alegi o metda de livrare.",
        "ordership.next": "Finalizeaza comanda",

        "order.info": "Facturare",
        "order.shipping": "Livrare",
        "order.send": "Trimite",
        "order.sendorder": "Trimite comanda",
        "order.payandsend": "Plateste & trimite",

        "payment.card": "Card",
        "payment.cash": "Ramburs la livrare",
        "payment.missingerror": "Ai uitat sa alegi o metoda de plata.",
        "payment.payment": "Plata",

        "shipping.missingerror": "Ai uitat sa alegi o metda de livrare.",
        "shipping.methoddescription": "{{cost}} | Livrare in {{delivery_time}} zile",

        "cart.title": "Finalizeaza comanda",

        "product.disposables": "Disposables",
        "product.kits": "Kituri",
        "product.consumables": "Lichide/Mentenanta",
        "product.pouches": "Pouchuri",
        "product.cigs": "Tigari",
        "product.smoking": "Tutungerie",
        "product.liquids": "Lichide",
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
        "product.new": "Acum le-am primit!",

        "product.disposables.description": "Kituri preumplute de unica folosinta sau reincarcabile",
        "product.pouches.description": "Pliculete cu nicotina aplicate in partea de sus a buzei",
        "product.smoking.description": "Produse destinate fumatorilor de tutun",
        "product.liquids.description": "Lichide, baze si nicotina pentru vapat",
        "product.kits.description": "Kituri de vapat pentru incepatori si impatimiti",
        "product.rollingpaper.description": "Foite pentru rulat tigari",
        "product.lighter.description": "Brichete pe gaz, benzina si torte narghilea",
        "product.grinder.description": "Grindere pentru maruntit tutun si doar tutun!",
        "product.filter.description": "Filtre pentru tigari rulate",
        "product.capsules.description": "Capsule aromate pentru tigari",
        "product.resistor.description": "Rezistente/cartuse + rezistente",
        "product.entrykit.description": "Recomandat daca este primul tau vape",
        "product.nic.description": "Nicotina ??/",
        "product.pouches_weak.description": "O alegere buna pentru incepatori",
        "product.pouches_mid.description": "Daca te-ai plictisit de pouch-urile slabe dar totusi nu vrei sa adormi inca",
        "product.pouches_strong.description": "Pentru cei ce vor experienta autentica",

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
        "filter.reusable": "Reincarcabil",
        "filter.cartridge": "Cartus",
        "filter.nicotinefree": "Fara nicotina",

        "filteropt.zippolike": "Tip Zippo",
        "filteropt.antiwind": "Anti-vant",
        "filteropt.white": "Alb",
        "filteropt.silver": "Argintiu",
        "filteropt.black": "Negru",
        "filteropt.100": "100 buc.",
        "filteropt.150": "150 buc.",
        "filteropt.true": "Da",
        "filteropt.nicshot": "Shot nicotina",

        "sort.title": "Sorteaza",
        "sort.new": "Nou",
        "sort.priceup": "Pret crescator",
        "sort.pricedown": "Pret descresator",
        "sort.name": "Nume A-Z",

        "action.addtocart": "Adauga in cos",
        "action.apply": "Aplica",
        "action.seecart": "Vezi cosul",
        "action.continueshopping": "Continua cumparaturile",
        "action.backtomainpage": "Inapoi la pagina principala",
        "action.delete": "Sterge",
        "action.shipping": "Vreau sa trag la plaman!",
        "action.change": "Schimba",
        "action.yes": "Da",
        "action.no": "Nu",
        "action.login": "Intra in cont",
        "action.loginshort": "Intra in cont",
        "action.signup": "Creeza un cont",
        "action.signup_short": "Creeaza cont",
        "action.see_all": "Vezi toate",

        "description.outofstock": "Acest produs nu este in stoc :(",
        "description.instock": "In stoc",
        "description.addedtocart": "Adaugat in cos",
        "description.notaddedtocart": "Produsul nu a putut fi adaugat in cos!",
        "description.cartlimithit": "Ai deja tot stocul nostru disponibil pentru acest produs in cos.",
        "description.stock": "{{n}} in stoc",
        "description.itemsincart": "{{n}} in cos",
        "description.yourcart": "Cosul tau",
        "description.total": "Subtotal: {{n}}",
        "description.cartcheckout": "Vezi cosul",
        "description.cartempty": "Cosul de cumparaturi este gol :(",
        "description.ordersummary": "Sumar comanda",
        "description.shipping": "Livrare",
        "description.producttotal": "Subtotal",
        "description.simpletotal": "Total",
        "description.productcount": { text: "{{n}} $", formatter: (n: number) => { return n === 1 ? "produs" : "produse" } },
        "description.productreminder": "Inainte sa trimiti comanda, ai tot ce iti trebuie?",
        "description.productreminder_noitems": "Poate ai nevoie de un...",
        "description.yourproducts": "Produsele tale",
        "description.pcs": "BUC.",
        "description.shippingtbd": "Vezi pe pagina urmatoare",
        "description.orderthankyou": "Multumim pentru comanda!",
        "description.details": "Detalii",
        "description.badorder": "nu a putut fi gasita...",
        "description.here": "aici",
        "description.ordernumber": "Comanda #",
        "description.orderplacedextrainfo": "Pentru mai multe detalii vezi rubrica Comenzi a profilului tau. Pentru oricare alte probleme ne poti contacta direct pe noi",
        "description.orderregistered": "a fost inregistrata! Vei primi cat de curand un email de confirmare",
        "description.orderconfirmed": "a fost confirmata, si in momentul asta o pregatim pentru livrare",
        "description.ordershipped": "se afla in drum spre tine!",
        "description.ordercompleted": "a ajung la destinatia ei, adica la tine! Pup dulce :3",
        "description.welcomeback": "Salut {{name}}!",

        "easter.badorder": "Daca ai ajuns pe pagina asta ori a facut caca baza noastra de date pe ea, ori ai umblat la url paramter... sa dormi cu un ochi deschis la noapte",

        "age.confirmation": "Aveti peste {{n}} ani?",
        "age.description": "Acest site este destinat persoanelor cu varta peste {{n}} ani.",

        "user.firstname": "Numele",
        "user.lastname": "Prenumele",
        "user.email": "Email",
        "user.password": "Parola",
        "user.password_confirm": "Confirma parola",
        "user.createaccount": "Creeaza un cont nou",
        "user.forgorpassword": "Am uitat parola :(",
        "user.password_requirements": "Parola trebuie sa fie compusa din minim 8 caractere",

        "signup.tos_consent": "Accept termenii si conditiile serviciului",
        "signup.tos_consent_missing": "Termenii si conditiile serviciului sunt obligatorii",
        "signup.goto_login": "Am deja un cont",

        "error.email_taken": "Acesta adresa de email a fost inregistrata deja",
        "error.encountered_error": "Am intampinat o problema :(",
        "error.encountered_error_description": "Incercati sa reincarcati pagina, daca problema persista contactati-ne",
        "error.page404": "Pagina nu exista :(",
        "error.page404_description": "Aceasta pagina ori a fost stearsa ori nu a existat de la inceput :3",
        "error.password_forgot": "Ai uitat parola",
        "error.password_e2big": "Parola este prea lunga",
        "error.email": "Adresa de email este invalida",
        "error.email_or_password_invalid": "Ai gresit adresa de email sau parola",

        "contact.description": "Pentru orice intrebari sau sesizari va stam la dispozitie prin urmatoarele canale de comunicare:",
        "contact.schedule": "Program contact: Luni - Vineri 10:30-18:30",
        "contact.phone": "Telefonic la:",
        "contact.fees": "*Tarifele standard se aplica",
        "contact.hq": "Sediu social: {{address}}",
        "contact.capital": "Capital social: {{n}}",

        "tos.title": "Termenii serviciului",
        "privacy_policy.title": "Politica confidentialitate",
        "cookie_policy.title": "Politica cookies",
        "return_policy.title": "Politica retururi",

        "footer.products": "Produse",
        "footer.locations": "Locatii",
        "footer.legal": "Prostii legale",
        "footer.contact": "Contact",
        "footer.seedetails": "Vezi detalii",
        "footer.seo": "The V Spot este magazinul online pentru toate nevoiile tale ce au de a face cu nicotina. Tigari, vapeuri, kituri pentru vapat, lichide, baze, pouchuri, accesorii si nu numai! Toate acestea exclusiv de la cele mai bune branduri!"
    },
    "en": {
        "home.title": "Your one-stop for all your Vape needs",
        "home.explore": "Check out our catalogue",
        "home.explore.btn": "Let's go",

        "page.login": "Login",
        "page.signup": "Sign up",
        "page.contact": "Contact",
        "page.cookie_policy": "Cookie policy",

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
        "orderinfo.dataconsent": "I consent to the processing of my personal data according to the policy.",
        "orderinfo.paymentoption": "Payment option",

        "ordership.shipping_is_billing": "The shipping address is the same as the billing address.",
        "ordership.shipping_method": "Shipping method",
        "ordership.shipping_option_none": "Please select a shipping method.",
        "ordership.next": "Submit order",

        "order.info": "Billing",
        "order.shipping": "Shipping",
        "order.send": "Send",
        "order.sendorder": "Submit order",
        "order.payandsend": "Pay n' send",

        "payment.card": "Card",
        "payment.cash": "Cash on delivery",
        "payment.missingerror": "Please select a payment method",
        "payment.payment": "Payment",

        "shipping.missingerror": "Please select a shipping method.",
        "shipping.methoddescription": "{{cost}} | Delivery in {{delivery_time}} days",

        "cart.title": "Checkout",

        "product.disposables": "Disposables",
        "product.kits": "Kits",
        "product.consumables": "Liquids",
        "product.pouches": "Pouches",
        "product.cigs": "Cigarettes",
        "product.smoking": "Smoking",
        "product.liquids": "Liquids",
        "product.rollingpaper": "Rolling paper",
        "product.lighter": "Lighters",
        "product.grinder": "Grinders",
        "product.filter": "Filters",
        "product.capsules": "Capsules",
        "product.resistor": "Resistors",
        "product.entrykit": "Entry kits",
        "product.nic": "Nicotine",
        "product.pouches_weak": "Mild pouches",
        "product.pouches_mid": "Moderate pouches",
        "product.pouches_strong": "Strong pouches",
        "product.new": "Just in!",

        "product.disposables.description": "One-time use kits",
        "product.pouches.description": "Nicotine pouches",
        "product.smoking.description": "Products geared towards tobacco smokers",
        "product.liquids.description": "Liquids, bases and nicotine for vaping",
        "product.kits.description": "Entry and advanced kits for vaping",
        "product.rollingpaper.description": "Paper used for rolling cigarettes",
        "product.lighter.description": "Lighters running on butane, petroleum and shisha torches",
        "product.grinder.description": "Grinders for grinding strictly tobacco!",
        "product.filter.description": "Filters for use in rolled cigarettes",
        "product.capsules.description": "Capsules for flavoring traditional cigarettes",
        "product.resistor.description": "???",
        "product.entrykit.description": "Recommended if you're trying out vaping for the first time",
        "product.nic.description": "Nicotine ??/",
        "product.pouches_weak.description": "Good for people who have never tried pouches before",
        "product.pouches_mid.description": "Good if you're bored of weak pouches but don't want to fall asleep",
        "product.pouches_strong.description": "Pouches for those who seek the authentic experience",


        "nav.home": "Home",
        "nav.products": "Products",
        "nav.contact": "Contact us",
        "nav.search": "Search",
        "nav.login": "Log in",

        "filters.title": "Apply filter",
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

        "filteropt.zippolike": "Zippo-like",
        "filteropt.antiwind": "Wind resistant",
        "filteropt.white": "White",
        "filteropt.silver": "Silver",
        "filteropt.black": "Black",
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
        "action.backtomainpage": "Back to the main page",
        "action.delete": "Remove",
        "action.shipping": "Looks good!",
        "action.change": "Change",
        "action.yes": "Yes",
        "action.no": "No",
        "action.login": "Login",
        "action.signup": "Sign up",
        "action.see_all": "See all",

        "description.outofstock": "This item is out of stock :(",
        "description.instock": "In stock",
        "description.addedtocart": "Added to cart",
        "description.notaddedtocart": "The product couldn't be added to the cart!",
        "description.cartlimithit": "You already have our entire stock for this product in your cart.",
        "description.stock": "{{n}} in stock",
        "description.itemsincart": "{{n}} in cart",
        "description.yourcart": "Your cart",
        "description.total": "Total: {{n}}",
        "description.cartcheckout": "Go to checkout",
        "description.cartempty": "Your shopping cart is empty :(",
        "description.ordersummary": "Summary",
        "description.shipping": "Shipping",
        "description.producttotal": "Products",
        "description.simpletotal": "Total",
        "description.productcount": { text: "{{n}} $", formatter: (n: number) => { return n === 1 ? "product" : "products" } },
        "description.productreminder": "Wait! Are you stocked up on everything?",
        "description.productreminder_noitems": "Maybe you're looking for a...",
        "description.yourproducts": "Your products",
        "description.pcs": "PCS.",
        "description.shippingtbd": "See on the next page",
        "description.orderthankyou": "Thank you for your order!",
        "description.welcomeback": "Hi {{name}}!",

        "description.details": "Details",

        "description.ordernumber": "The order #",
        "description.orderplacedextrainfo": "For more details about this order go to the Orders tab in your profile. For any other questions feel free to contact us",
        "description.orderregistered": " has been registered! You will soon get an email confirming the order",
        "description.orderconfirmed": "has been confirmed, and we're getting it ready for shipping",
        "description.ordershipped": "is currently on it's way to you!",
        "description.ordercompleted": "has reached it's destination, that being you :3!",
        "description.badorder": "could not be found...",
        "description.here": "here",

        "easter.badorder": "If you got here either our db shit the bed or you had a poke at the url paramter... sleep with one eye open",

        "age.confirmation": "Are you over {{n}}?",
        "age.description": "This site contains products geared towards people over {{n}}.",

        "user.firstname": "Firstname",
        "user.lastname": "Lastname",
        "user.email": "Email",
        "user.password": "Password",
        "user.password_confirm": "Confirm password",
        "user.createaccount": "Create a new account",
        "user.forgorpassword": "I forgot my password :(",
        "user.password_requirements": "The password must be at least 8 characters in length",

        "signup.tos_consent": "I accept the terms of service",
        "signup.tos_consent_missing": "The terms of service are mandatory",
        "signup.goto_login": "I already have an account",

        "error.email_taken": "This is email has already been registered",
        "error.encountered_error": "We encountered a problem :(",
        "error.encountered_error_description": "If this error persists you can contact us",
        "error.page404": "This page does not exist :(",
        "error.page404_description": "This page was either delete or it never existed :3",
        "error.password_forgot": "You forgot the password",
        "error.password_e2big": "The password is too long",
        "error.email": "The email is invalid",
        "error.email_or_password_invalid": "The email or the password in incorrect",

        "contact.description": "For any questions or feedback you can reach out to us through any of the following methods:",
        "contact.schedule": "Contact schedule: Monday - Friday 10:30-18:30",
        "contact.phone": "Telephone:",
        "contact.fees": "*Standard fees apply",
        "contact.hq": "Headquarters: {{address}}",
        "contact.capital": "Equity capital: {{n}}",

        "tos.title": "Terms of service",
        "privacy_policy.title": "Privacy policy",
        "cookie_policy.title": "Cookie policy",
        "return_policy.title": "Return policy",

        "footer.products": "Products",
        "footer.locations": "Locations",
        "footer.legal": "Legal stuff",
        "footer.contact": "Contact",
        "footer.seedetails": "See details",
        "footer.seo": "The V Spot is the online shop for all of your nicotine needs. Cigarettes, vapes, vaping kits, liquids, vaping bases, nicotine pouches, accessories and much more. Each and every one of them exclusively from top brands."
    },
    "common": {
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
        "filteropt.50": "50mg",
        "filteropt.65": "65mg",
        "filteropt.switchpro": "Vozol Switch Pro",
        "filteropt.neon800": "Vozol Neon 800",
        "filteropt.star2000": "Vozol Star 2000",
        "filteropt.elfbarv2": "Elf Bar V2",
        "filteropt.cyclones": "Cyclones",
        "filteropt.juicy": "Juicy",
        "filteropt.ocb": "OCB",
        "filteropt.raw": "RAW",
        "filteropt.100": "100 BUC.",
        "filteropt.150": "150 BUC.",
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
        "filteropt.gotekx2": "Gotek X2"
    },
    "fallback": {
        "missing_translation": "Missing localization"
    }
}

export const l = derived(current_language, ($lang) => (title: string, props?: any) => {

    const translation = (translations as any)[$lang];
    if (!translation)
        throw new Error(`Translations for language '${$lang}' have not been declared!`);

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
})
