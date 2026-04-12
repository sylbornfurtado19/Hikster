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

// ================= REVIEWS DATABASE =================

const defaultReviews = [
{
    id: 1,
    reviewer: "Sarah Mitchell",
    trek: "Hampta Pass Trek",
    rating: 5,
    text: "Absolutely incredible! The transition from green valleys to desert is breathtaking. Our guide was knowledgeable and the accommodations were comfortable. Perfect for intermediate trekkers like me. Highly recommended!",
    date: "Dec 15, 2024",
    helpful: 127,
    verified: true
},
{
    id: 2,
    reviewer: "Rajesh Kumar",
    trek: "Everest Base Camp Trek",
    rating: 5,
    text: "A lifetime achievement! The view from the base camp is humbling. Yes, it's challenging with the altitude, but worth every step. Proper acclimatization and a great team made it possible.",
    date: "Dec 10, 2024",
    helpful: 94,
    verified: true
},
{
    id: 3,
    reviewer: "Emma Wilson",
    trek: "Swiss Alps Trek",
    rating: 4,
    text: "Stunning scenery and excellent organization. The guides were professional and caring. A bit pricey but you get what you pay for. Would definitely do another trek here!",
    date: "Dec 8, 2024",
    helpful: 67,
    verified: true
},
{
    id: 4,
    reviewer: "Arjun Singh",
    trek: "Hampta Pass Trek",
    rating: 4,
    text: "Great experience overall. Weather was challenging on the last day, but the guide managed it well. Beautiful landscapes, less crowded than expected. Food was simple but tasty.",
    date: "Dec 5, 2024",
    helpful: 45,
    verified: true
},
{
    id: 5,
    reviewer: "Sophie Anderson",
    trek: "Roopkund Trek",
    rating: 5,
    text: "Roopkund is magical! The skeleton lake is fascinating, and the alpine meadows in September are gorgeous. Perfect mix of mystery and natural beauty. Will be back!",
    date: "Nov 28, 2024",
    helpful: 156,
    verified: true
},
{
    id: 6,
    reviewer: "Vikram Patel",
    trek: "Everest Base Camp Trek",
    rating: 4,
    text: "Challenging but doable with proper preparation. The Sherpa team was amazing - very supportive throughout. Main complaints: food got repetitive and accommodation is extremely basic.",
    date: "Nov 24, 2024",
    helpful: 82,
    verified: true
},
{
    id: 7,
    reviewer: "Jessica Chen",
    trek: "Annapurna Circuit Trek",
    rating: 5,
    text: "Breathtaking views around every corner! The Thorong La pass crossing was the highlight. The little villages and warm hospitality of locals made it special. Best trek experience ever!",
    date: "Nov 20, 2024",
    helpful: 203,
    verified: true
},
{
    id: 8,
    reviewer: "Aditya Nair",
    trek: "Kedarkantha Trek",
    rating: 4,
    text: "Perfect beginner snow trek! Beautiful snow-covered peaks and relatively easy terrain. Good for building confidence. Recommend going in peak season for better snow views.",
    date: "Nov 15, 2024",
    helpful: 73,
    verified: true
},
{
    id: 9,
    reviewer: "Lisa Thompson",
    trek: "Inca Trail Trek",
    rating: 5,
    text: "An absolute classic! Camping in Machu Picchu area was surreal. The history, the porters' stories, the mountain scenery - everything was perfect. Worth every penny!",
    date: "Nov 12, 2024",
    helpful: 189,
    verified: true
},
{
    id: 10,
    reviewer: "Rohan Gupta",
    trek: "Chadar Trek",
    rating: 5,
    text: "Chadar is otherworldly! Trekking on a frozen river in extreme conditions was thrilling. Not for the faint-hearted, but immensely rewarding. The guides were experienced and safety-conscious.",
    date: "Nov 8, 2024",
    helpful: 112,
    verified: true
}
];

// Initialize reviews in localStorage if not present
if (!localStorage.getItem('hiksterReviews')) {
    localStorage.setItem('hiksterReviews', JSON.stringify(defaultReviews));
}

// ================= COMPREHENSIVE ITINERARY DATABASE =================

const trekItineraries = {
    "Hampta Pass Trek": {
        overview: {
            name: "Hampta Pass Trek",
            location: "Himachal Pradesh, India",
            duration: 5,
            difficulty: "Moderate",
            altitude: "3,270m",
            distance: "52 km",
            bestSeason: "May - September",
            highlights: ["Green Valley to Cold Desert", "Alpine Meadows", "Spiti Valley Views", "Adventure Crossing"]
        },
        dayByDay: [
            { day: 1, title: "Arrival at Manali", distance: "0 km", altitude: "2,050m", activities: "Arrive at Manali. Meet guide and team. Orientation & safety briefing.", meals: "Welcome dinner", accommodation: "Hotel (3-star)", duration: "Acclimatization" },
            { day: 2, title: "Manali to Prini", distance: "8 km", altitude: "2,100m", activities: "Trek through lush green forests. Visit apple orchards. Local village exploration.", meals: "Packed lunch, Dinner at guesthouse", accommodation: "Guesthouse", duration: "4-5 hours" },
            { day: 3, title: "Prini to Lamadugh", distance: "12 km", altitude: "2,900m", activities: "Climb through dense forests. Cross mountain streams. Scenic valley views.", meals: "Packed lunch, Hot dinner", accommodation: "Tent camp (alpine meadow)", duration: "6-7 hours" },
            { day: 4, title: "Lamadugh to Hampta Pass", distance: "10 km", altitude: "3,270m", activities: "Early morning start. Trek to famous pass. Experience transition from green to desert. Summit views of Spiti Valley.", meals: "Early breakfast, Packed lunch, Special dinner", accommodation: "Tent camp at pass", duration: "7-8 hours" },
            { day: 5, title: "Descent & Departure", distance: "12 km", altitude: "2,000m", activities: "Descend to Chatargarh. Vehicle pickup. Farewell dinner with guides.", meals: "Breakfast, Packed lunch, Farewell dinner", accommodation: "Hotel in Manali", duration: "6 hours trek + drive" }
        ],
        packing: {
            clothing: ["Thermal layers (2-3)", "Wool sweater", "Fleece jacket", "Rain jacket", "Trekking pants (2)", "Warm hat & gloves", "Thermal socks (4-5)"],
            footwear: ["Trekking boots", "Sandals for camp", "Wool socks"],
            gear: ["50L+ backpack", "Sleeping bag (-5°C)", "Sleeping mat", "Trekking poles", "Headlamp (batteries)", "Sunscreen SPF 50+", "Sunglasses"],
            essentials: ["2-3L water bottle", "Energy snacks", "Personal toiletries", "First aid kit", "Medications", "ID & documents"]
        },
        costBreakdown: {
            basePrice: 8499,
            gst: "5%",
            insurance: 299,
            inclusions: ["Accommodation (hotel & tent)", "All meals", "Expert trek guide", "Porter support", "Entry permits", "Basic safety kit"],
            exclusions: ["Travel to Manali", "Personal gear", "Alcoholic beverages", "Tips & gratuities"]
        },
        safetyGuidelines: [
            "Inform guides of any medical conditions",
            "Stay hydrated - drink 3-4L water daily",
            "Acclimatize properly at each camp",
            "Never trek alone - always in buddy system",
            "Bring altitude sickness medication (Diamox)",
            "Follow guide instructions strictly",
            "Check weather updates daily"
        ],
        logistics: {
            howToReach: "Delhi to Manali by bus (12-14 hrs) or flight to Kullu then taxi (1 hr)",
            startPoint: "Manali (2,050m)",
            endPoint: "Manali",
            nearestAirport: "Kullu Manali Airport (45 km)"
        },
        faqs: [
            { q: "Is this trek beginners friendly?", a: "Yes! Hampta Pass is perfect for beginners. Moderate difficulty with good acclimatization opportunities." },
            { q: "What's the best time to visit?", a: "May-June and September for clear skies. July-August has lower visibility due to monsoon." },
            { q: "Do I need mountaineering experience?", a: "No technical climbing required. Basic fitness and trekking experience recommended." },
            { q: "Can I cancel or postpone?", a: "Flexible cancellation options available up to 7 days before trek start." }
        ]
    },
    "Everest Base Camp Trek": {
        overview: {
            name: "Everest Base Camp Trek",
            location: "Solukhumbu, Nepal",
            duration: 12,
            difficulty: "Hard",
            altitude: "5,364m",
            distance: "130 km",
            bestSeason: "April-May, September-October",
            highlights: ["World's Highest Mountain", "Sherpa Culture", "Khumbu Icefall", "Prayer Flags & Monasteries"]
        },
        dayByDay: [
            { day: 1, title: "Fly to Lukla, Trek to Phakding", distance: "11 km", altitude: "2,610m", activities: "Scenic flight to Lukla. Meet porters. Trek through villages & suspension bridges.", meals: "Lunch, Dinner at teahouse", accommodation: "Teahouse", duration: "4-5 hours" },
            { day: 2, title: "Phakding to Namche Bazaar", distance: "19 km", altitude: "3,440m", activities: "Cross rivers via suspension bridges. Climb to vibrant market town of Namche.", meals: "Breakfast, Packed lunch, Dinner", accommodation: "Teahouse", duration: "5-6 hours" },
            { day: 3, title: "Namche Rest & Acclimatization", distance: "0 km", altitude: "3,440m", activities: "Rest day. Optional visit to Sherpa museum, Sagarmatha National Park, local market.", meals: "All meals at teahouse", accommodation: "Teahouse", duration: "Rest day" },
            { day: 4, title: "Namche to Tengboche", distance: "15 km", altitude: "3,867m", activities: "Trek through rhododendron forests. Visit ancient Tengboche Monastery. Everest views!", meals: "All meals provided", accommodation: "Teahouse", duration: "5-6 hours" },
            { day: 5, title: "Tengboche to Dingboche", distance: "18 km", altitude: "4,410m", activities: "Visit local villages. Optional hike to Island Peak viewpoint. Everest, Ama Dablam views.", meals: "All meals", accommodation: "Teahouse", duration: "6-7 hours" },
            { day: 6, title: "Dingboche Acclimatization", distance: "0 km", altitude: "4,410m", activities: "Acclimatization hike to Nagarjuna Hill. Panoramic mountain views. Rest.", meals: "All meals", accommodation: "Teahouse", duration: "Acclimatization hike" },
            { day: 7, title: "Dingboche to Lobuche East", distance: "11 km", altitude: "4,910m", activities: "Trek through high altitude terrain. Prayer flags & meditation spots.", meals: "All meals", accommodation: "Teahouse", duration: "4-5 hours" },
            { day: 8, title: "Lobuche to Everest Base Camp", distance: "21 km", altitude: "5,364m", activities: "Early start. Trek to famous EBC! Visit stone stupa & prayer flags. Celebrate achievement!", meals: "Early breakfast, Packed lunch, Dinner", accommodation: "Teahouse at Gorak Shep", duration: "7-8 hours" },
            { day: 9, title: "EBC to Pheriche", distance: "21 km", altitude: "4,371m", activities: "Descend and recover. Visit Sherpa cultural centers.", meals: "All meals", accommodation: "Teahouse", duration: "6-7 hours descent" },
            { day: 10, title: "Pheriche to Namche", distance: "26 km", altitude: "3,440m", activities: "Trek back to Namche. Enjoy descent. Last shopping at market.", meals: "All meals", accommodation: "Teahouse", duration: "5-6 hours" },
            { day: 11, title: "Namche to Lukla", distance: "19 km", altitude: "2,860m", activities: "Final trek back to Lukla. Relax before flight.", meals: "All meals", accommodation: "Teahouse", duration: "5-6 hours" },
            { day: 12, title: "Fly to Kathmandu", distance: "Flight", altitude: "1,300m", activities: "Early morning flight to Kathmandu. Celebration dinner with team.", meals: "Breakfast, Lunch, Celebration dinner", accommodation: "Hotel in Kathmandu", duration: "Flight + evening" }
        ],
        packing: {
            clothing: ["Thermal layers (3-4)", "Wool sweater", "Insulated jacket", "Heavy down jacket (-15°C)", "Trekking pants (2)", "Rain jacket", "Wool hat & gloves", "Thermal socks (8+)"],
            footwear: ["Mountaineering boots", "Gaiters", "Camp shoes", "Wool liner socks"],
            gear: ["60L+ backpack", "Sleeping bag (-15°C)", "Sleeping mat", "Trekking poles", "Crampons", "Microspikes", "Headlamp + batteries"],
            essentials: ["Water bottle & thermos", "High-calorie snacks", "Altitude medication (Diamox)", "Sunscreen SPF 50+", "First aid kit", "Passport (2 photos)"]
        },
        costBreakdown: {
            basePrice: 120000,
            gst: "5%",
            insurance: 299,
            inclusions: ["All accommodation (teahouse)", "All meals (breakfast, lunch, dinner)", "Expert guide (Sherpa)", "Porter support (1:2 ratio)", "Flights (Kathmandu-Lukla)", "Park permits", "First aid & rescue"],
            exclusions: ["International flights", "Visa fees", "Personal gear", "Tipsguidance"]
        },
        safetyGuidelines: [
            "Acute Mountain Sickness (AMS) can occur - acclimatization essential",
            "Take Diamox prescription before trek",
            "Report symptoms immediately: headache, nausea, dizziness",
            "Drink 4-5L water daily",
            "Never push beyond comfort - pace yourself",
            "Follow guide's instructions strictly",
            "Rescue helicopter available in emergencies"
        ],
        logistics: {
            howToReach: "Fly to Kathmandu, then scenic flight to Lukla (scenic 1 hr flight)",
            startPoint: "Kathmandu (required 2 days before trek)",
            endPoint: "Kathmandu (after trek completion)",
            nearestAirport: "Tribhuvan International Airport, Kathmandu"
        },
        faqs: [
            { q: "Will I get altitude sickness?", a: "Many people experience mild AMS. Acclimatization days & medication help. Go slow, hydrate, rest." },
            { q: "Is this suitable for beginners?", a: "Not recommended for complete beginners. Should have previous trekking experience." },
            { q: "What's the success rate?", a: "~85% reach base camp. Some turn back due to altitude. It's a personal journey." },
            { q: "How fit do I need to be?", a: "Advanced fitness. Do cardio & strength training 3 months before trek." }
        ]
    },
    "Kedarkantha Trek": {
        overview: {
            name: "Kedarkantha Trek",
            location: "Uttarakhand, India",
            duration: 4,
            difficulty: "Easy",
            altitude: "3,810m",
            distance: "28 km",
            bestSeason: "December - April",
            highlights: ["Perfect Snow Trek", "Summit Views", "Beginner-Friendly", "Winter Wonderland"]
        },
        dayByDay: [
            { day: 1, title: "Delhi to Sankri", distance: "Travel", altitude: "1,920m", activities: "Drive from Delhi (8-9 hours). Arrive at Sankri village. Guide orientation. Briefing on snow trek.", meals: "Breakfast in car, Dinner at guesthouse", accommodation: "Guesthouse", duration: "Drive day" },
            { day: 2, title: "Sankri to Khad", distance: "8 km", altitude: "2,200m", activities: "Trek through oak & pine forests. First snow encounter. Mountain streams. Village views.", meals: "Packed breakfast, Lunch, Dinner", accommodation: "Tent camp", duration: "4-5 hours" },
            { day: 3, title: "Khad to Kedarkantha Summit", distance: "9 km", altitude: "3,810m", activities: "Trek through snow meadows. Early start. Trek to summit (3,810m). 360° mountain views! Celebrate!", meals: "Early breakfast, Packed lunch at summit, Special dinner", accommodation: "Tent camp", duration: "6-7 hours" },
            { day: 4, title: "Descent & Return", distance: "8 km", altitude: "1,900m", activities: "Optional sunrise hike (if weather permits). Descend back to Sankri. Celebration with guides & team.", meals: "Breakfast, Packed lunch, Celebration dinner", accommodation: "Guesthouse", duration: "5 hours trek + 2 hrs drive" }
        ],
        packing: {
            clothing: ["Thermal layers (2-3)", "Wool sweater", "Fleece jacket", "Insulated jacket", "Rain jacket", "Wool hat & gloves", "Thermal socks (4-5)"],
            footwear: ["Insulated trekking boots", "Gaiters", "Microspikes/crampons", "Camp sandals"],
            gear: ["40L backpack", "Sleeping bag (-10°C)", "Sleeping mat", "Trekking poles", "Crampons", "Headlamp + batteries"],
            essentials: ["Water bottle", "High-energy snacks", "Sunscreen SPF 50+", "First aid kit", "Medications", "Toiletries"]
        },
        costBreakdown: {
            basePrice: 6799,
            gst: "5%",
            insurance: 299,
            inclusions: ["Accommodation (tent & guesthouse)", "All meals", "Expert trek guide", "Porter support", "Safety equipment", "Tea & snacks"],
            exclusions: ["Travel to Sankri", "Personal gear rental", "Extra activities", "Gratuities"]
        },
        safetyGuidelines: [
            "Snow trek requires caution - follow guide instructions strictly",
            "Learn basic crampons & ice techniques on Day 1",
            "Stay together - buddy system always",
            "Watch for avalanche zones - guide will advise",
            "Bring altitude sickness medication",
            "Check weather forecast daily",
            "Report any discomfort immediately"
        ],
        logistics: {
            howToReach: "Delhi to Sankri by car (8-9 hours, or overnight bus + taxi)",
            startPoint: "Sankri Village (1,920m)",
            endPoint: "Sankri Village",
            nearestAirport: "Delhi (250 km)"
        },
        faqs: [
            { q: "Is this the best first snow trek?", a: "Yes! Perfect beginner snow trek. No technical climbing. Great for building confidence." },
            { q: "What if there's no snow?", a: "Trek still happens. Routes adjust based on snow conditions. Guide advises on the ground." },
            { q: "Can families with kids join?", a: "Kids 10+ with good fitness can join. Slower pace & more rest breaks needed." },
            { q: "What's the weather like?", a: "January-February coldest (-15°C night, -5°C day). March warmer. April has melting snow." }
        ]
    }
};

function getTrekItinerary(trekName) {
    if (trekItineraries[trekName]) {
        return trekItineraries[trekName];
    }

    const trek = destinations.find(dest => dest.name === trekName);
    if (!trek) {
        return null;
    }

    const basePrice = getPriceForDifficulty(trek.difficulty);
    const duration = Number(trek.duration) || 4;
    const dayCount = Math.max(3, Math.min(12, duration));
    const progressLabels = ["Arrival & briefing", "Acclimatization", "Trail ascent", "Summit / high point", "Descent & departure"];
    const dayByDay = Array.from({ length: dayCount }, (_, index) => {
        const dayNumber = index + 1;
        const isFirst = dayNumber === 1;
        const isLast = dayNumber === dayCount;
        const middleTitle = progressLabels[Math.min(progressLabels.length - 1, Math.floor(index / Math.max(1, dayCount / progressLabels.length)))];

        return {
            day: dayNumber,
            title: isFirst ? "Arrival and trek briefing" : isLast ? "Return and wrap-up" : middleTitle,
            distance: isFirst ? "Travel / arrival" : `${Math.max(4, Math.round((dayCount * 6) / dayCount))} km`,
            altitude: trek.altitude === "high" ? "High altitude" : trek.altitude === "medium" ? "Mid altitude" : "Lower altitude",
            activities: isFirst
                ? `Arrive at ${trek.startPoint || trek.location}. Meet the guide, complete check-in, and review the route, weather, and safety plan.`
                : isLast
                    ? "Descend or travel back, complete check-out, and share a farewell meal with the team."
                    : `Trek through ${trek.terrain} terrain with guide-led breaks, photo stops, and pace adjustments based on the group.`,
            meals: isFirst
                ? "Welcome dinner"
                : isLast
                    ? "Breakfast, lunch, farewell dinner"
                    : "Breakfast, packed lunch, hot dinner",
            accommodation: isLast
                ? "Hotel / return stay"
                : trek.difficulty === "hard"
                    ? "Teahouse / alpine camp"
                    : "Guesthouse / campsite",
            duration: isFirst
                ? "Arrival day"
                : isLast
                    ? "Departure day"
                    : `${Math.max(4, Math.min(8, 4 + Math.floor(index / 2)))} hours`
        };
    });

    return {
        overview: {
            name: trek.name,
            location: trek.location || trek.region,
            duration: trek.duration,
            difficulty: toSentenceCase(trek.difficulty),
            altitude: trek.altitude === "high" ? "High altitude" : trek.altitude === "medium" ? "Medium altitude" : "Low altitude",
            distance: `${Math.max(10, duration * 6)} km`,
            bestSeason: trek.bestTime || "Best season varies",
            highlights: [
                trek.desc,
                `${toSentenceCase(trek.difficulty)} difficulty`,
                `${toSentenceCase(trek.terrain)} terrain`,
                trek.bestTime || "Seasonal windows apply"
            ]
        },
        dayByDay,
        packing: {
            clothing: ["Moisture-wicking layers", "Warm outer layer", "Rain protection", "Extra socks"],
            footwear: ["Trekking boots", "Camp footwear", "Wool socks"],
            gear: ["Backpack", "Water bottle", "Headlamp", "Trekking poles"],
            essentials: ["ID documents", "Personal medications", "Snacks", "Sunscreen"]
        },
        costBreakdown: {
            basePrice,
            gst: "5%",
            insurance: 299,
            inclusions: ["Accommodation", "Meals", "Guide support", "Basic safety assistance"],
            exclusions: ["Travel to start point", "Personal expenses", "Tips", "Optional rentals"]
        },
        safetyGuidelines: [
            "Follow the guide's instructions at all times",
            "Stay hydrated and pace yourself",
            "Carry weather-appropriate layers",
            "Report altitude discomfort early",
            "Do not trek alone or break the group"
        ],
        logistics: {
            howToReach: `Reach ${trek.startPoint || trek.location} by train, flight, or road depending on the destination.`,
            startPoint: trek.startPoint || trek.location,
            endPoint: trek.startPoint || trek.location,
            nearestAirport: trek.location || trek.region
        },
        faqs: [
            { q: "Is this trek suitable for me?", a: `This trek is marked ${toSentenceCase(trek.difficulty)} and is best suited to trekkers with matching fitness levels.` },
            { q: "What is included in the package?", a: "Accommodation, meals, guide support, and basic safety assistance are included by default." },
            { q: "What should I pack?", a: "Bring layered clothing, trekking footwear, hydration, and personal essentials listed in the packing section." },
            { q: "When should I book?", a: `Book during the recommended window: ${trek.bestTime || "the best seasonal window"}.` }
        ]
    };
}

function getPriceForDifficulty(difficulty) {
    const priceMap = { hard: 10499, moderate: 8499, easy: 6799 };
    return priceMap[difficulty?.toLowerCase()] || 6799;
}

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

function toSentenceCase(value) {
    if (!value) return "";
    return value
        .split(" ")
        .filter(Boolean)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
}

function buildCardHTML(dest, isMatch=false){
    let tags = `<span class="px-2 py-1 bg-mint/10 text-mint text-xs font-bold rounded-md tracking-wide">${toSentenceCase(dest.difficulty)}</span> 
                <span class="px-2 py-1 bg-mint/10 text-mint text-xs font-bold rounded-md tracking-wide">${toSentenceCase(dest.terrain)}</span>`;

    let matchBadge = "";
    if(isMatch){
        let percent = Math.round((dest.score/9)*100);
        matchBadge = `<div class="absolute top-3 right-3 bg-juniper/90 backdrop-blur-md text-mint px-3 py-1 rounded-full text-sm font-bold z-10 border border-mint/30">${percent}% Match</div>`;
    }

    return `
    <div class="destination-card group relative bg-white dark:bg-gray-800 rounded-3xl shadow-md overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_50px_rgba(45,212,191,0.25)] border border-transparent hover:border-mint/30 flex flex-col h-full cursor-pointer" 
     onclick="openTrekCardItinerary('${dest.id}')"
     onkeydown="if(event.key==='Enter' || event.key===' '){event.preventDefault(); openTrekCardItinerary('${dest.id}');}"
     role="button"
     tabindex="0"
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

        <div class="flex justify-end mt-auto">
    <button onclick="event.stopPropagation(); saveFavorite('${dest.name}')"
    class="px-3 py-2 bg-red-100 text-red-500 rounded">
    ❤️
    </button>
    </div>
        <p class="mt-3 text-xs text-gray-500 dark:text-gray-400">Click anywhere on this card to view trek details.</p>
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

function removeFavorite(name){
    let favs = JSON.parse(localStorage.getItem("favorites")) || [];

    favs = favs.filter(f => f !== name);

    localStorage.setItem("favorites", JSON.stringify(favs));

    location.reload();
}
