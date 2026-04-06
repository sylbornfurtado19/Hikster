// ================= DESTINATIONS DATA (21 TREKS) =================

const destinations = [

/* ---------- INDIA ---------- */
{
name:"Hampta Pass Trek",
image:"images1/HAMPTA.jpg",
desc:"A perfect crossover trek from lush green valleys to cold deserts of Spiti.",
difficulty:"moderate",
terrain:"mountain",
altitude:"medium",
duration:5,
experience:"intermediate",
budget:"budget"
},

{
name:"Kedarkantha Trek",
image:"images1/KEDARKANTHA.jpg",
desc:"A beginner-friendly snow trek with stunning summit views.",
difficulty:"easy",
terrain:"snow",
altitude:"medium",
duration:4,
experience:"beginner",
budget:"budget"
},

{
name:"Chadar Trek",
image:"images1/CHADAR.jpg",
desc:"Walk over a frozen river in extreme Himalayan winters.",
difficulty:"hard",
terrain:"snow",
altitude:"high",
duration:9,
experience:"advanced",
budget:"high"
},

{
name:"Roopkund Trek",
image:"images1/ROOPKUND.jpg",
desc:"Mysterious skeleton lake trek in high Himalayas.",
difficulty:"moderate",
terrain:"mountain",
altitude:"high",
duration:7,
experience:"intermediate",
budget:"budget"
},

{
name:"Valley of Flowers Trek",
image:"images1/VALLEY.jpg",
desc:"Colorful alpine flowers spread across scenic meadows.",
difficulty:"easy",
terrain:"forest",
altitude:"medium",
duration:5,
experience:"beginner",
budget:"budget"
},

{
name:"Rajmachi Trek",
image:"images1/RAJMACHI.jpg",
desc:"A scenic monsoon trek near Pune with forts and waterfalls.",
difficulty:"easy",
terrain:"forest",
altitude:"low",
duration:2,
experience:"beginner",
budget:"budget"
},

{
name:"Sandakphu Trek",
image:"images1/SANDAKPHU.jpg",
desc:"Witness Everest, Kanchenjunga, and more in one frame.",
difficulty:"moderate",
terrain:"mountain",
altitude:"high",
duration:7,
experience:"intermediate",
budget:"mid"
},

{
name:"Kumara Parvatha Trek",
image:"images1/KUMARA.jpg",
desc:"One of the toughest treks in South India.",
difficulty:"hard",
terrain:"forest",
altitude:"medium",
duration:2,
experience:"advanced",
budget:"budget"
},

{
name:"Triund Trek",
image:"images1/TRIUND.jpg",
desc:"Short and scenic trek near Dharamshala.",
difficulty:"easy",
terrain:"mountain",
altitude:"low",
duration:2,
experience:"beginner",
budget:"budget"
},

{
name:"Tadiandamol Trek",
image:"images1/TADIANDAMOL.jpg",
desc:"Highest peak in Coorg with lush green landscapes.",
difficulty:"easy",
terrain:"forest",
altitude:"low",
duration:2,
experience:"beginner",
budget:"budget"
},

/* ---------- INTERNATIONAL ---------- */

{
name:"Everest Base Camp Trek",
image:"images1/EVEREST.jpg",
desc:"The ultimate Himalayan adventure to the base of the world's tallest peak.",
difficulty:"hard",
terrain:"mountain",
altitude:"high",
duration:12,
experience:"advanced",
budget:"high"
},

{
name:"Annapurna Circuit Trek",
image:"images1/ANNAPURNA.jpg",
desc:"A diverse trek covering forests, rivers, and high passes.",
difficulty:"moderate",
terrain:"mountain",
altitude:"high",
duration:10,
experience:"intermediate",
budget:"mid"
},

{
name:"Inca Trail",
image:"images1/INCA.jpg",
desc:"Ancient trail leading to Machu Picchu.",
difficulty:"moderate",
terrain:"mountain",
altitude:"medium",
duration:4,
experience:"intermediate",
budget:"mid"
},

{
name:"Mount Kilimanjaro Trek",
image:"images1/KILIMANJARO.jpg",
desc:"Africa’s highest peak and a bucket-list climb.",
difficulty:"hard",
terrain:"mountain",
altitude:"high",
duration:8,
experience:"advanced",
budget:"high"
},

{
name:"Torres del Paine Trek",
image:"images1/PATAGONIA.jpg",
desc:"Dramatic landscapes of glaciers and peaks.",
difficulty:"moderate",
terrain:"mountain",
altitude:"medium",
duration:6,
experience:"intermediate",
budget:"high"
},

{
name:"Dolomites Trek",
image:"images1/DOLOMITES.jpg",
desc:"Alpine trekking with stunning jagged peaks.",
difficulty:"moderate",
terrain:"mountain",
altitude:"medium",
duration:5,
experience:"intermediate",
budget:"high"
},

{
name:"Laugavegur Trail",
image:"images1/ICELAND.jpg",
desc:"Colorful volcanic landscapes in Iceland.",
difficulty:"moderate",
terrain:"mountain",
altitude:"medium",
duration:4,
experience:"intermediate",
budget:"high"
},

{
name:"Mount Fuji Trek",
image:"images1/FUJI.jpg",
desc:"Iconic sunrise trek in Japan.",
difficulty:"moderate",
terrain:"mountain",
altitude:"high",
duration:2,
experience:"intermediate",
budget:"mid"
},

{
name:"Appalachian Trail",
image:"images1/APPALACHIAN.jpg",
desc:"One of the longest trekking routes in the world.",
difficulty:"hard",
terrain:"forest",
altitude:"medium",
duration:14,
experience:"advanced",
budget:"mid"
},

{
name:"Overland Track",
image:"images1/OVERLAND.jpg",
desc:"Tasmania’s famous wilderness trek.",
difficulty:"moderate",
terrain:"forest",
altitude:"medium",
duration:6,
experience:"intermediate",
budget:"high"
},

{
name:"Trolltunga Trek",
image:"images1/TROLLTUNGA.jpg",
desc:"A dramatic cliff hike in Norway.",
difficulty:"hard",
terrain:"mountain",
altitude:"high",
duration:1,
experience:"advanced",
budget:"high"
}

];


// ================= MATCHING LOGIC =================

function gradeDestinations(userPrefs){

return destinations.map(dest =>{

let score = 0;

if(dest.difficulty === userPrefs.difficulty) score += 2;
if(dest.terrain === userPrefs.terrain) score += 2;
if(dest.altitude === userPrefs.altitude) score += 1;
if(dest.experience === userPrefs.experience) score += 2;

// duration match
if(userPrefs.days <= dest.duration) score += 1;

// budget match
if(dest.budget === userPrefs.budget) score += 1;

return {...dest, score};

})
.sort((a,b)=>b.score-a.score)
.slice(0,3);

}


// ================= CARD UI =================

function buildCardHTML(dest, isMatch=false){

return `
<div class="destination-card bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:-translate-y-2 transition-all"
data-type="${dest.difficulty} ${dest.terrain} ${dest.altitude}">

<img src="${dest.image}" class="w-full h-56 object-cover">

<div class="p-5 flex flex-col h-full">

<h3 class="text-xl font-bold mb-2">${dest.name}</h3>

<p class="text-sm text-gray-500 mb-4 flex-1">${dest.desc}</p>

<div class="text-xs mb-4 flex gap-2 flex-wrap">
<span class="bg-mint px-2 py-1 rounded">${dest.difficulty}</span>
<span class="bg-mint px-2 py-1 rounded">${dest.terrain}</span>
<span class="bg-mint px-2 py-1 rounded">${dest.altitude}</span>
</div>

<a href="destination.html?id=${encodeURIComponent(dest.name)}"
class="mt-auto bg-mint text-juniper text-center py-2 rounded font-bold">
View Trek
</a>

</div>
</div>
`;
}


// ================= LOAD ALL DESTINATIONS =================

document.addEventListener("DOMContentLoaded",()=>{

const container = document.getElementById("catalog-container");

if(container){
container.innerHTML = destinations.map(d=>buildCardHTML(d)).join("");
}

});
