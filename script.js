// ================= DESTINATION DATABASE =================

const destinations = [

{
id:"hampta-pass",
name:"Hampta Pass Trek",
region:"India",
location:"Himachal Pradesh, India",
image:"images1/HAMPTA.jpg",
desc:"A stunning crossover trek from lush green valleys to the cold desert of Spiti.",
difficulty:"moderate", terrain:"mountain", altitude:"medium",
duration:5, experience:"intermediate", budget:"budget",
bestTime:"May - September",
startPoint:"Manali",
fitness:"Moderate",
cost:"₹8,000 - ₹12,000",
season:{Jan:"avoid",Feb:"avoid",Mar:"avoid",Apr:"avoid",May:"peak",Jun:"peak",Jul:"monsoon",Aug:"monsoon",Sep:"peak",Oct:"avoid",Nov:"avoid",Dec:"avoid"}
},

{
id:"swiss-alps",
name:"Swiss Alps Trek",
region:"Europe",
location:"Switzerland",
image:"images1/SWISS ALPS.jpg",
desc:"Luxury alpine trekking with breathtaking views and scenic landscapes.",
difficulty:"moderate", terrain:"mountain", altitude:"high",
duration:6, experience:"intermediate", budget:"high",
bestTime:"June - September",
startPoint:"Interlaken",
fitness:"Moderate",
cost:"₹1,50,000+",
season:{Jan:"avoid",Feb:"avoid",Mar:"avoid",Apr:"avoid",May:"avoid",Jun:"peak",Jul:"peak",Aug:"peak",Sep:"peak",Oct:"avoid",Nov:"avoid",Dec:"avoid"}
},

{
id:"everest-base-camp",
name:"Everest Base Camp Trek",
region:"Nepal",
location:"Nepal",
image:"images1/EVEREST.jpg",
desc:"The ultimate high-altitude Himalayan adventure.",
difficulty:"hard", terrain:"mountain", altitude:"high",
duration:12, experience:"advanced", budget:"high",
bestTime:"April - May, Sept - Oct",
startPoint:"Lukla",
fitness:"High",
cost:"₹1,20,000+",
season:{Jan:"avoid",Feb:"avoid",Mar:"avoid",Apr:"peak",May:"peak",Jun:"avoid",Jul:"avoid",Aug:"avoid",Sep:"peak",Oct:"peak",Nov:"avoid",Dec:"avoid"}
},

{
id:"kedarkantha",
name:"Kedarkantha Trek",
region:"India",
location:"Uttarakhand, India",
image:"images1/KEDARKANTHA.jpg",
desc:"Perfect beginner snow trek with summit views.",
difficulty:"easy", terrain:"snow", altitude:"medium",
duration:4, experience:"beginner", budget:"budget",
bestTime:"Dec - April",
startPoint:"Sankri",
fitness:"Easy",
cost:"₹6,000 - ₹10,000",
season:{Jan:"peak",Feb:"peak",Mar:"peak",Apr:"avoid",May:"avoid",Jun:"avoid",Jul:"avoid",Aug:"avoid",Sep:"avoid",Oct:"avoid",Nov:"peak",Dec:"peak"}
},

{
id:"chadar",
name:"Chadar Trek",
region:"India",
location:"Ladakh, India",
image:"images1/CHADAR.jpg",
desc:"Frozen river trek in Ladakh winters.",
difficulty:"hard", terrain:"snow", altitude:"high",
duration:9, experience:"advanced", budget:"high",
bestTime:"Jan - Feb",
startPoint:"Leh",
fitness:"High",
cost:"₹25,000+",
season:{Jan:"peak",Feb:"peak",Mar:"avoid",Apr:"avoid",May:"avoid",Jun:"avoid",Jul:"avoid",Aug:"avoid",Sep:"avoid",Oct:"avoid",Nov:"avoid",Dec:"avoid"}
},

{
id:"roopkund",
name:"Roopkund Trek",
region:"India",
location:"Uttarakhand, India",
image:"images1/ROOPKUND.jpg",
desc:"Famous skeleton lake trek in Himalayas.",
difficulty:"moderate", terrain:"mountain", altitude:"high",
duration:7, experience:"intermediate", budget:"budget",
bestTime:"May - June, Sept",
startPoint:"Lohajung",
fitness:"Moderate",
cost:"₹8,000 - ₹12,000",
season:{Jan:"avoid",Feb:"avoid",Mar:"avoid",Apr:"avoid",May:"peak",Jun:"peak",Jul:"avoid",Aug:"avoid",Sep:"peak",Oct:"avoid",Nov:"avoid",Dec:"avoid"}
},

{
id:"valley-of-flowers",
name:"Valley of Flowers Trek",
region:"India",
location:"Uttarakhand, India",
image:"images1/VALLEY.jpg",
desc:"Colorful alpine meadows and scenic beauty.",
difficulty:"easy", terrain:"forest", altitude:"medium",
duration:5, experience:"beginner", budget:"budget",
bestTime:"July - August",
startPoint:"Govindghat",
fitness:"Easy",
cost:"₹6,000 - ₹9,000",
season:{Jan:"avoid",Feb:"avoid",Mar:"avoid",Apr:"avoid",May:"avoid",Jun:"peak",Jul:"peak",Aug:"peak",Sep:"avoid",Oct:"avoid",Nov:"avoid",Dec:"avoid"}
},

{
id:"rajmachi",
name:"Rajmachi Trek",
region:"India",
location:"Maharashtra, India",
image:"images1/RAJMACHI.jpg",
desc:"Monsoon trek near Pune with forts.",
difficulty:"easy", terrain:"forest", altitude:"low",
duration:2, experience:"beginner", budget:"budget",
bestTime:"June - September",
startPoint:"Lonavala",
fitness:"Easy",
cost:"₹1,000 - ₹2,000",
season:{Jan:"avoid",Feb:"avoid",Mar:"avoid",Apr:"avoid",May:"avoid",Jun:"monsoon",Jul:"monsoon",Aug:"monsoon",Sep:"monsoon",Oct:"avoid",Nov:"avoid",Dec:"avoid"}
},

{
id:"sandakphu",
name:"Sandakphu Trek",
region:"India",
location:"West Bengal, India",
image:"images1/SANDAKPHU.jpg",
desc:"View Everest and Kanchenjunga together.",
difficulty:"moderate", terrain:"mountain", altitude:"high",
duration:7, experience:"intermediate", budget:"mid",
bestTime:"April - May, Oct - Nov",
startPoint:"Manebhanjan",
fitness:"Moderate",
cost:"₹10,000 - ₹15,000",
season:{Jan:"avoid",Feb:"avoid",Mar:"avoid",Apr:"peak",May:"peak",Jun:"avoid",Jul:"avoid",Aug:"avoid",Sep:"avoid",Oct:"peak",Nov:"peak",Dec:"avoid"}
},

{
id:"kumara-parvatha",
name:"Kumara Parvatha Trek",
region:"India",
location:"Karnataka, India",
image:"images1/KUMARA.jpg",
desc:"Challenging trek in Western Ghats.",
difficulty:"hard", terrain:"forest", altitude:"medium",
duration:2, experience:"advanced", budget:"budget",
bestTime:"Oct - Feb",
startPoint:"Kukke Subramanya",
fitness:"High",
cost:"₹2,000 - ₹4,000",
season:{Jan:"peak",Feb:"peak",Mar:"peak",Apr:"avoid",May:"avoid",Jun:"avoid",Jul:"avoid",Aug:"avoid",Sep:"avoid",Oct:"peak",Nov:"peak",Dec:"peak"}
},

{
id:"triund",
name:"Triund Trek",
region:"India",
location:"Himachal Pradesh, India",
image:"images1/TRIUND.jpg",
desc:"Short scenic trek near Dharamshala.",
difficulty:"easy", terrain:"mountain", altitude:"low",
duration:2, experience:"beginner", budget:"budget",
bestTime:"March - June, Sept - Dec",
startPoint:"McLeod Ganj",
fitness:"Easy",
cost:"₹1,000 - ₹3,000",
season:{Jan:"avoid",Feb:"avoid",Mar:"avoid",Apr:"peak",May:"peak",Jun:"peak",Jul:"monsoon",Aug:"monsoon",Sep:"peak",Oct:"peak",Nov:"avoid",Dec:"avoid"}
},

{
id:"tadiandamol",
name:"Tadiandamol Trek",
region:"India",
location:"Karnataka, India",
image:"images1/TADIANDAMOL.jpg",
desc:"Highest peak in Coorg.",
difficulty:"easy", terrain:"forest", altitude:"low",
duration:2, experience:"beginner", budget:"budget",
bestTime:"Oct - Feb",
startPoint:"Kakkabe",
fitness:"Easy",
cost:"₹1,500 - ₹3,000",
season:{Jan:"peak",Feb:"peak",Mar:"peak",Apr:"avoid",May:"avoid",Jun:"monsoon",Jul:"monsoon",Aug:"monsoon",Sep:"avoid",Oct:"peak",Nov:"peak",Dec:"peak"}
},

{
id:"annapurna-circuit",
name:"Annapurna Circuit Trek",
region:"Nepal",
location:"Nepal",
image:"images1/ANNAPURNA.jpg",
desc:"Diverse Himalayan landscapes.",
difficulty:"moderate", terrain:"mountain", altitude:"high",
duration:10, experience:"intermediate", budget:"mid",
bestTime:"March - May, Sept - Nov",
startPoint:"Besisahar",
fitness:"Moderate",
cost:"₹40,000+",
season:{Jan:"avoid",Feb:"avoid",Mar:"peak",Apr:"peak",May:"peak",Jun:"avoid",Jul:"avoid",Aug:"avoid",Sep:"peak",Oct:"peak",Nov:"avoid",Dec:"avoid"}
},

{
id:"inca-trail",
name:"Inca Trail",
region:"Peru",
location:"Peru",
image:"images1/INCA.jpg",
desc:"Ancient trail to Machu Picchu.",
difficulty:"moderate", terrain:"mountain", altitude:"medium",
duration:4, experience:"intermediate", budget:"mid",
bestTime:"May - September",
startPoint:"Cusco",
fitness:"Moderate",
cost:"₹70,000+",
season:{Jan:"avoid",Feb:"avoid",Mar:"avoid",Apr:"peak",May:"peak",Jun:"peak",Jul:"peak",Aug:"peak",Sep:"peak",Oct:"avoid",Nov:"avoid",Dec:"avoid"}
},

{
id:"kilimanjaro",
name:"Mount Kilimanjaro Trek",
region:"Tanzania",
location:"Tanzania",
image:"images1/KILIMANJARO.jpg",
desc:"Africa's highest peak climb.",
difficulty:"hard", terrain:"mountain", altitude:"high",
duration:8, experience:"advanced", budget:"high",
bestTime:"Jan - March, June - Oct",
startPoint:"Moshi",
fitness:"High",
cost:"₹1,50,000+",
season:{Jan:"peak",Feb:"peak",Mar:"avoid",Apr:"avoid",May:"avoid",Jun:"peak",Jul:"peak",Aug:"peak",Sep:"peak",Oct:"avoid",Nov:"avoid",Dec:"peak"}
},

{
id:"torres-del-paine",
name:"Torres del Paine Trek",
region:"Chile",
location:"Chile",
image:"images1/PATAGONIA.jpg",
desc:"Glaciers and rugged Patagonia views.",
difficulty:"moderate", terrain:"mountain", altitude:"medium",
duration:6, experience:"intermediate", budget:"high",
bestTime:"Nov - March",
startPoint:"Puerto Natales",
fitness:"Moderate",
cost:"₹1,20,000+",
season:{Jan:"peak",Feb:"peak",Mar:"peak",Apr:"avoid",May:"avoid",Jun:"avoid",Jul:"avoid",Aug:"avoid",Sep:"avoid",Oct:"peak",Nov:"peak",Dec:"peak"}
},

{
id:"dolomites",
name:"Dolomites Trek",
region:"Italy",
location:"Italy",
image:"images1/DOLOMITES.jpg",
desc:"Alpine trekking paradise.",
difficulty:"moderate", terrain:"mountain", altitude:"medium",
duration:5, experience:"intermediate", budget:"high",
bestTime:"June - September",
startPoint:"Cortina",
fitness:"Moderate",
cost:"₹1,00,000+",
season:{Jan:"avoid",Feb:"avoid",Mar:"avoid",Apr:"avoid",May:"avoid",Jun:"peak",Jul:"peak",Aug:"peak",Sep:"peak",Oct:"avoid",Nov:"avoid",Dec:"avoid"}
},

{
id:"laugavegur",
name:"Laugavegur Trail",
region:"Iceland",
location:"Iceland",
image:"images1/ICELAND.jpg",
desc:"Colorful Icelandic landscapes.",
difficulty:"moderate", terrain:"mountain", altitude:"medium",
duration:4, experience:"intermediate", budget:"high",
bestTime:"June - August",
startPoint:"Landmannalaugar",
fitness:"Moderate",
cost:"₹90,000+",
season:{Jan:"avoid",Feb:"avoid",Mar:"avoid",Apr:"avoid",May:"avoid",Jun:"peak",Jul:"peak",Aug:"peak",Sep:"avoid",Oct:"avoid",Nov:"avoid",Dec:"avoid"}
},

{
id:"mount-fuji",
name:"Mount Fuji Trek",
region:"Japan",
location:"Japan",
image:"images1/FUJI.jpg",
desc:"Iconic sunrise trek in Japan.",
difficulty:"moderate", terrain:"mountain", altitude:"high",
duration:2, experience:"intermediate", budget:"mid",
bestTime:"July - August",
startPoint:"Fujinomiya",
fitness:"Moderate",
cost:"₹30,000+",
season:{Jan:"avoid",Feb:"avoid",Mar:"avoid",Apr:"avoid",May:"avoid",Jun:"avoid",Jul:"peak",Aug:"peak",Sep:"avoid",Oct:"avoid",Nov:"avoid",Dec:"avoid"}
},

{
id:"appalachian",
name:"Appalachian Trail",
region:"USA",
location:"United States",
image:"images1/APPALACHIAN.jpg",
desc:"Legendary long-distance forest trail.",
difficulty:"hard", terrain:"forest", altitude:"medium",
duration:14, experience:"advanced", budget:"mid",
bestTime:"April - October",
startPoint:"Georgia",
fitness:"High",
cost:"₹50,000+",
season:{Jan:"avoid",Feb:"avoid",Mar:"avoid",Apr:"peak",May:"peak",Jun:"peak",Jul:"peak",Aug:"peak",Sep:"peak",Oct:"peak",Nov:"avoid",Dec:"avoid"}
},


{
id:"trolltunga",
name:"Trolltunga Trek",
region:"Norway",
location:"Norway",
image:"images1/TROLLTUNGA.jpg",
desc:"Cliff-edge hike in Norway.",
difficulty:"hard", terrain:"mountain", altitude:"high",
duration:1, experience:"advanced", budget:"high",
bestTime:"June - August",
startPoint:"Odda",
fitness:"High",
cost:"₹1,00,000+",
season:{Jan:"avoid",Feb:"avoid",Mar:"avoid",Apr:"avoid",May:"avoid",Jun:"peak",Jul:"peak",Aug:"peak",Sep:"avoid",Oct:"avoid",Nov:"avoid",Dec:"avoid"}
}

];

// ================= MATCHING LOGIC =================

function gradeDestinations(userPrefs){

const userDays = parseInt(userPrefs.days);

let scored = destinations.map(dest =>{

let score = 0;
let matchedTags = [];

if(dest.difficulty === userPrefs.difficulty){
score += 2; matchedTags.push("Difficulty");
}

if(dest.terrain === userPrefs.terrain){
score += 2; matchedTags.push("Terrain");
}

if(dest.experience === userPrefs.experience){
score += 2; matchedTags.push("Experience");
}

if(dest.altitude === userPrefs.altitude){
score += 1; matchedTags.push("Altitude");
}

if(Math.abs(dest.duration - userDays) <= 2){
score += 1; matchedTags.push("Duration");
}

if(dest.budget === userPrefs.budget){
score += 1; matchedTags.push("Budget");
}

return {...dest, score, matchedTags};

});

scored.sort((a,b)=>b.score-a.score);
return scored.slice(0,3);
}

// ================= CARD GENERATOR =================

function buildCardHTML(dest, isMatch=false){
    let tags = `<span class="px-2 py-1 bg-mint/10 text-mint text-xs font-bold rounded-md uppercase tracking-wider">${dest.difficulty}</span> 
                <span class="px-2 py-1 bg-mint/10 text-mint text-xs font-bold rounded-md uppercase tracking-wider">${dest.terrain}</span>`;

    let matchBadge = "";
    if(isMatch){
        let percent = Math.round((dest.score/9)*100);
        matchBadge = `<div class="absolute top-3 right-3 bg-juniper/90 backdrop-blur-md text-mint px-3 py-1 rounded-full text-sm font-bold z-10 border border-mint/30">${percent}% Match</div>`;
    }

    return `
    <div class="destination-card group relative bg-white dark:bg-gray-800 rounded-3xl shadow-md overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_50px_rgba(45,212,191,0.25)] border border-transparent hover:border-mint/30 flex flex-col h-full" 
     data-type="${dest.difficulty} ${dest.terrain} ${dest.altitude}">
    
    ${matchBadge}

    <div class="overflow-hidden h-60 relative flex-shrink-0">
        <img src="${dest.image}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
        <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>

    <div class="p-6 flex flex-col flex-grow">
        <div class="flex gap-2 mb-4">${tags}</div>

        <h3 class="text-2xl font-extrabold mb-2 text-juniper dark:text-white group-hover:text-mint transition-colors duration-300">
            ${dest.name}
        </h3>

        <p class="text-sm text-gray-500 dark:text-gray-400 mb-6 line-clamp-3 leading-relaxed flex-grow">
            ${dest.desc}
        </p>

        <div class="flex gap-2 mt-auto">
<a href="destination.html?id=${encodeURIComponent(dest.name)}"
class="flex-1 bg-mint text-juniper py-2 text-center rounded font-bold">
View Trek
</a>

<button onclick="saveFavorite('${dest.name}')"
class="px-3 bg-red-100 text-red-500 rounded">
❤️
</button>
</div>
    </div>
</div>
`;
}
// ================= LOAD =================

document.addEventListener("DOMContentLoaded",()=>{

const container = document.getElementById("catalog-container");

if(container){
container.innerHTML = destinations.map(d=>buildCardHTML(d)).join("");
}

});

function saveFavorite(name){
    let favs = JSON.parse(localStorage.getItem("favorites")) || [];

    if(!favs.includes(name)){
        favs.push(name);
        localStorage.setItem("favorites", JSON.stringify(favs));
        alert("Added to favorites!");
    } else {
        alert("Already in favorites!");
    }
}
