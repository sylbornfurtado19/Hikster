// ================= DESTINATION DATABASE =================

const destinations = [

{
name:"Hampta Pass Trek", region:"India", image:"images1/HAMPTA.jpg",
desc:"A stunning crossover trek from lush green valleys to the cold desert of Spiti.",
difficulty:"moderate", terrain:"mountain", altitude:"medium",
duration:5, experience:"intermediate", budget:"budget"
},

{
name:"Swiss Alps Trek", region:"Europe", image:"images1/SWISS ALPS.jpg",
desc:"Luxury alpine trekking with breathtaking views and scenic landscapes.",
difficulty:"moderate", terrain:"mountain", altitude:"high",
duration:6, experience:"intermediate", budget:"high"
},

{
name:"Everest Base Camp Trek", region:"Nepal", image:"images1/EVEREST.jpg",
desc:"The ultimate high-altitude Himalayan adventure.",
difficulty:"hard", terrain:"mountain", altitude:"high",
duration:12, experience:"advanced", budget:"high"
},

{
name:"Kedarkantha Trek", region:"India", image:"images1/KEDARKANTHA.jpg",
desc:"Perfect beginner snow trek with summit views.",
difficulty:"easy", terrain:"snow", altitude:"medium",
duration:4, experience:"beginner", budget:"budget"
},

{
name:"Chadar Trek", region:"India", image:"images1/CHADAR.jpg",
desc:"Frozen river trek in Ladakh winters.",
difficulty:"hard", terrain:"snow", altitude:"high",
duration:9, experience:"advanced", budget:"high"
},

{
name:"Roopkund Trek", region:"India", image:"images1/ROOPKUND.jpg",
desc:"Famous skeleton lake trek in Himalayas.",
difficulty:"moderate", terrain:"mountain", altitude:"high",
duration:7, experience:"intermediate", budget:"budget"
},

{
name:"Valley of Flowers Trek", region:"India", image:"images1/VALLEY.jpg",
desc:"Colorful alpine meadows and scenic beauty.",
difficulty:"easy", terrain:"forest", altitude:"medium",
duration:5, experience:"beginner", budget:"budget"
},

{
name:"Rajmachi Trek", region:"India", image:"images1/RAJMACHI.jpg",
desc:"Monsoon trek near Pune with forts.",
difficulty:"easy", terrain:"forest", altitude:"low",
duration:2, experience:"beginner", budget:"budget"
},

{
name:"Sandakphu Trek", region:"India", image:"images1/SANDAKPHU.jpg",
desc:"View Everest and Kanchenjunga together.",
difficulty:"moderate", terrain:"mountain", altitude:"high",
duration:7, experience:"intermediate", budget:"mid"
},

{
name:"Kumara Parvatha Trek", region:"India", image:"images1/KUMARA.jpg",
desc:"Challenging trek in Western Ghats.",
difficulty:"hard", terrain:"forest", altitude:"medium",
duration:2, experience:"advanced", budget:"budget"
},

{
name:"Triund Trek", region:"India", image:"images1/TRIUND.jpg",
desc:"Short scenic trek near Dharamshala.",
difficulty:"easy", terrain:"mountain", altitude:"low",
duration:2, experience:"beginner", budget:"budget"
},

{
name:"Tadiandamol Trek", region:"India", image:"images1/TADIANDAMOL.jpg",
desc:"Highest peak in Coorg.",
difficulty:"easy", terrain:"forest", altitude:"low",
duration:2, experience:"beginner", budget:"budget"
},

{
name:"Annapurna Circuit Trek", region:"Nepal", image:"images1/ANNAPURNA.jpg",
desc:"Diverse Himalayan landscapes.",
difficulty:"moderate", terrain:"mountain", altitude:"high",
duration:10, experience:"intermediate", budget:"mid"
},

{
name:"Inca Trail", region:"Peru", image:"images1/INCA.jpg",
desc:"Ancient trail to Machu Picchu.",
difficulty:"moderate", terrain:"mountain", altitude:"medium",
duration:4, experience:"intermediate", budget:"mid"
},

{
name:"Mount Kilimanjaro Trek", region:"Tanzania", image:"images1/KILIMANJARO.jpg",
desc:"Africa’s highest peak climb.",
difficulty:"hard", terrain:"mountain", altitude:"high",
duration:8, experience:"advanced", budget:"high"
},

{
name:"Torres del Paine Trek", region:"Chile", image:"images1/PATAGONIA.jpg",
desc:"Glaciers and rugged Patagonia views.",
difficulty:"moderate", terrain:"mountain", altitude:"medium",
duration:6, experience:"intermediate", budget:"high"
},

{
name:"Dolomites Trek", region:"Italy", image:"images1/DOLOMITES.jpg",
desc:"Alpine trekking paradise.",
difficulty:"moderate", terrain:"mountain", altitude:"medium",
duration:5, experience:"intermediate", budget:"high"
},

{
name:"Laugavegur Trail", region:"Iceland", image:"images1/ICELAND.jpg",
desc:"Colorful Icelandic landscapes.",
difficulty:"moderate", terrain:"mountain", altitude:"medium",
duration:4, experience:"intermediate", budget:"high"
},

{
name:"Mount Fuji Trek", region:"Japan", image:"images1/FUJI.jpg",
desc:"Iconic sunrise trek in Japan.",
difficulty:"moderate", terrain:"mountain", altitude:"high",
duration:2, experience:"intermediate", budget:"mid"
},

{
name:"Appalachian Trail", region:"USA", image:"images1/APPALACHIAN.jpg",
desc:"Legendary long-distance forest trail.",
difficulty:"hard", terrain:"forest", altitude:"medium",
duration:14, experience:"advanced", budget:"mid"
},

{
name:"Overland Track", region:"Australia", image:"images1/OVERLAND.jpg",
desc:"Tasmania wilderness trek.",
difficulty:"moderate", terrain:"forest", altitude:"medium",
duration:6, experience:"intermediate", budget:"high"
},

{
name:"Trolltunga Trek", region:"Norway", image:"images1/TROLLTUNGA.jpg",
desc:"Cliff-edge hike in Norway.",
difficulty:"hard", terrain:"mountain", altitude:"high",
duration:1, experience:"advanced", budget:"high"
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
    <div class="destination-card group relative bg-white dark:bg-gray-800 rounded-3xl shadow-md overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_50px_rgba(45,212,191,0.25)] border border-transparent hover:border-mint/30">
        
        ${matchBadge}

        <div class="overflow-hidden h-60 relative">
            <img src="${dest.image}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>

        <div class="p-6 flex flex-col">
            <div class="flex gap-2 mb-4">${tags}</div>

            <h3 class="text-2xl font-extrabold mb-2 text-juniper dark:text-white group-hover:text-mint transition-colors duration-300">${dest.name}</h3>

            <p class="text-sm text-gray-500 dark:text-gray-400 mb-6 line-clamp-2 leading-relaxed">${dest.desc}</p>

            <a href="destination.html?id=${encodeURIComponent(dest.name)}"
               class="mt-auto bg-mint text-juniper py-3 text-center rounded-xl font-bold transition-all duration-300 hover:bg-juniper hover:text-mint hover:shadow-lg active:scale-95">
                Explore Journey
            </a>
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
