// ================= ITINERARY MODAL SYSTEM =================

function createItineraryModal() {
    const modal = document.createElement('div');
    modal.id = 'itineraryModal';
    modal.innerHTML = `
        <div class="itinerary-modal-overlay" onclick="closeItineraryModal(event)"></div>
        <div class="itinerary-modal-content">
            <button class="itinerary-modal-close" onclick="closeItineraryModal()">×</button>
            
            <!-- Header Section -->
            <div class="itinerary-header">
                <h1 id="itineraryTitle">Trek Name</h1>
                <div class="itinerary-meta-info">
                    <div class="meta-item"><i class="fas fa-location-dot"></i> <span id="itineraryLocation">Location</span></div>
                    <div class="meta-item"><i class="fas fa-calendar"></i> <span id="itineraryDuration">Days</span></div>
                    <div class="meta-item"><i class="fas fa-gauge"></i> <span id="itineraryDifficulty">Difficulty</span></div>
                    <div class="meta-item"><i class="fas fa-mountain"></i> <span id="itineraryAltitude">Altitude</span></div>
                </div>
                <div class="itinerary-highlights" id="itineraryHighlights"></div>
                <div class="itinerary-package-switch">
                    <p class="itinerary-package-label">Package</p>
                    <div class="itinerary-package-buttons">
                        <button class="package-tier-btn" data-tier="budget" onclick="setItineraryPackage('budget')">Budget</button>
                        <button class="package-tier-btn active" data-tier="standard" onclick="setItineraryPackage('standard')">Standard</button>
                        <button class="package-tier-btn" data-tier="premium" onclick="setItineraryPackage('premium')">Premium</button>
                    </div>
                    <p class="itinerary-package-note" id="itineraryPackageNote">Balanced comfort and support for most trekkers.</p>
                </div>
            </div>

            <!-- Tabs Navigation -->
            <div class="itinerary-tabs">
                <button class="itinerary-tab-btn active" onclick="switchItineraryTab('overview', this)">Overview</button>
                <button class="itinerary-tab-btn" onclick="switchItineraryTab('itinerary', this)">Day by Day</button>
                <button class="itinerary-tab-btn" onclick="switchItineraryTab('packing', this)">Packing List</button>
                <button class="itinerary-tab-btn" onclick="switchItineraryTab('cost', this)">Cost Breakdown</button>
                <button class="itinerary-tab-btn" onclick="switchItineraryTab('safety', this)">Safety & Facts</button>
                <button class="itinerary-tab-btn" onclick="switchItineraryTab('faqs', this)">FAQs</button>
            </div>

            <!-- Tab Contents -->
            <div class="itinerary-content">
                <!-- Overview Tab -->
                <div id="overviewTab" class="itinerary-tab-content active">
                    <div class="itinerary-section">
                        <h3><i class="fas fa-info-circle"></i> Trek Overview</h3>
                        <div class="overview-grid" id="overviewContent"></div>
                    </div>
                </div>

                <!-- Day by Day Tab -->
                <div id="itineraryTab" class="itinerary-tab-content">
                    <div class="itinerary-section" id="dayByDayContent"></div>
                </div>

                <!-- Packing Tab -->
                <div id="packingTab" class="itinerary-tab-content">
                    <div class="packing-grid" id="packingContent"></div>
                </div>

                <!-- Cost Tab -->
                <div id="costTab" class="itinerary-tab-content">
                    <div class="itinerary-section" id="costContent"></div>
                </div>

                <!-- Safety Tab -->
                <div id="safetyTab" class="itinerary-tab-content">
                    <div class="itinerary-section" id="safetyContent"></div>
                </div>

                <!-- FAQs Tab -->
                <div id="faqsTab" class="itinerary-tab-content">
                    <div class="itinerary-section" id="faqsContent"></div>
                </div>
            </div>

            <!-- CTA Buttons -->
            <div class="itinerary-cta">
                <button class="btn-book-now" onclick="bookNowFromItinerary()">
                    <i class="fas fa-check-circle"></i> Book This Trek
                </button>
                <button class="btn-download-pdf" onclick="downloadItineraryPDF()">
                    <i class="fas fa-download"></i> Download PDF
                </button>
                <button class="btn-contact" onclick="contactGuide()">
                    <i class="fas fa-phone"></i> Contact Guide
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function openItineraryModal(trekName) {
    if (!document.getElementById('itineraryModal')) {
        createItineraryModal();
    }

    const itinerary = getTrekItinerary(trekName);
    if (!itinerary) {
        alert('Trek details not found');
        return;
    }

    const trek = destinations.find(d => d.name === trekName);
    currentSelectedTrek = trek;
    currentItin = itinerary;
    currentItineraryTier = 'standard';

    // Fill header
    document.getElementById('itineraryTitle').textContent = itinerary.overview.name;
    document.getElementById('itineraryLocation').textContent = itinerary.overview.location;
    document.getElementById('itineraryDuration').textContent = itinerary.overview.duration + ' Days';
    document.getElementById('itineraryDifficulty').textContent = itinerary.overview.difficulty;
    document.getElementById('itineraryAltitude').textContent = itinerary.overview.altitude;

    // Highlights
    const highlightsHTML = itinerary.overview.highlights
        .map(h => `<span class="highlight-badge"><i class="fas fa-star"></i> ${h}</span>`)
        .join('');
    document.getElementById('itineraryHighlights').innerHTML = highlightsHTML;
    syncItineraryTierUI();

    // Populate all tabs
    populateOverviewTab(itinerary);
    populateDayByDayTab(itinerary, trek);
    populatePackingTab(itinerary);
    populateCostTab(itinerary, trek);
    populateSafetyTab(itinerary);
    populateFAQsTab(itinerary);

    document.getElementById('itineraryModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeItineraryModal(event) {
    if (event && event.target.id !== 'itineraryModal') return;
    const modal = document.getElementById('itineraryModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function switchItineraryTab(tabName, buttonElement) {
    // Hide all tabs
    document.querySelectorAll('.itinerary-tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.itinerary-tab-btn').forEach(btn => btn.classList.remove('active'));

    // Show selected tab
    document.getElementById(tabName + 'Tab').classList.add('active');
    if (buttonElement) {
        buttonElement.classList.add('active');
    }
}

function populateOverviewTab(itinerary) {
    const html = `
        <div class="overview-item">
            <label>Distance</label>
            <p>${itinerary.overview.distance}</p>
        </div>
        <div class="overview-item">
            <label>Best Season</label>
            <p>${itinerary.overview.bestSeason}</p>
        </div>
        <div class="overview-item">
            <label>Starting Point</label>
            <p>${itinerary.logistics.startPoint}</p>
        </div>
        <div class="overview-item">
            <label>Ending Point</label>
            <p>${itinerary.logistics.endPoint}</p>
        </div>
    `;
    document.getElementById('overviewContent').innerHTML = html;
}

function populateDayByDayTab(itinerary) {
    const tierConfig = getItineraryTierConfig(currentItineraryTier);
    const html = itinerary.dayByDay.map(day => `
        <div class="day-accordion">
            <div class="day-header" onclick="toggleDayAccordion(this)">
                <h4><i class="fas fa-hiking"></i> Day ${day.day}: ${day.title}</h4>
                <p class="day-meta">
                    <span><i class="fas fa-shoe-prints"></i> ${day.distance}</span>
                    <span><i class="fas fa-mountain"></i> ${day.altitude}</span>
                    <span><i class="fas fa-clock"></i> ${day.duration}</span>
                </p>
            </div>
            <div class="day-details">
                <div class="detail-section">
                    <h5><i class="fas fa-map"></i> Activities</h5>
                    <p>${day.activities} ${tierConfig.activityNote}</p>
                </div>
                <div class="detail-section">
                    <h5><i class="fas fa-utensils"></i> Meals</h5>
                    <p>${day.meals} ${tierConfig.mealNote}</p>
                </div>
                <div class="detail-section">
                    <h5><i class="fas fa-bed"></i> Accommodation</h5>
                    <p>${day.accommodation} ${tierConfig.stayNote}</p>
                </div>
            </div>
        </div>
    `).join('');
    document.getElementById('dayByDayContent').innerHTML = `<div>${html}</div>`;
}

function populatePackingTab(itinerary) {
    const packingHTML = Object.entries(itinerary.packing)
        .map(([category, items]) => `
            <div class="packing-category">
                <h4>${category.charAt(0).toUpperCase() + category.slice(1)}</h4>
                <ul>
                    ${items.map(item => `<li><i class="fas fa-check"></i> ${item}</li>`).join('')}
                </ul>
            </div>
        `)
        .join('');
    document.getElementById('packingContent').innerHTML = packingHTML;
}

function populateCostTab(itinerary, trek) {
    const tierConfig = getItineraryTierConfig(currentItineraryTier);
    const costBreak = itinerary.costBreakdown;
    const estimate = trek ? getTrekPriceEstimate(trek) : null;
    const fallbackBase = trek ? getPriceForDifficulty(trek.difficulty) : costBreak.basePrice;
    const basePrice = estimate
        ? (estimate[currentItineraryTier] || estimate.standard)
        : fallbackBase;
    const gstAmount = Math.round(basePrice * 0.05);
    const total = basePrice + gstAmount + costBreak.insurance;

    const standardReference = estimate ? estimate.standard : fallbackBase;
    const budgetPrice = estimate ? estimate.budget : Math.round(standardReference * 0.85);
    const standardPrice = estimate ? estimate.standard : standardReference;
    const premiumPrice = estimate ? estimate.premium : Math.round(standardReference * 1.35);

    const mergedInclusions = [...costBreak.inclusions, ...tierConfig.inclusions];
    const mergedExclusions = [...costBreak.exclusions, ...tierConfig.exclusions];

    const html = `
        <div class="cost-breakdown">
            <div class="cost-row">
                <span>Budget Package</span>
                <strong>₹${budgetPrice.toLocaleString()}</strong>
            </div>
            <div class="cost-row">
                <span>Standard Package</span>
                <strong>₹${standardPrice.toLocaleString()}</strong>
            </div>
            <div class="cost-row">
                <span>Premium Package</span>
                <strong>₹${premiumPrice.toLocaleString()}</strong>
            </div>
            <div class="cost-row">
                <span>${tierConfig.label} Base Price (per person)</span>
                <strong>₹${basePrice.toLocaleString()}</strong>
            </div>
            <div class="cost-row">
                <span>GST (5%)</span>
                <strong>₹${gstAmount.toLocaleString()}</strong>
            </div>
            <div class="cost-row">
                <span>Travel Insurance</span>
                <strong>₹${costBreak.insurance.toLocaleString()}</strong>
            </div>
            <div class="cost-row total">
                <span>Total per Person (${tierConfig.label})</span>
                <strong>₹${total.toLocaleString()}</strong>
            </div>
            <div class="cost-note">Note: Prices subject to GST. Group discounts available for 10+ people.</div>
        </div>
        <div class="cost-inclusions">
            <h4><i class="fas fa-check-circle"></i> Inclusions (${tierConfig.label})</h4>
            <ul>
                ${mergedInclusions.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>
        <div class="cost-exclusions">
            <h4><i class="fas fa-times-circle"></i> Exclusions (${tierConfig.label})</h4>
            <ul>
                ${mergedExclusions.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>
    `;
    document.getElementById('costContent').innerHTML = html;
}

function populateSafetyTab(itinerary) {
    const safetyHTML = `
        <h4><i class="fas fa-shield"></i> Safety Guidelines</h4>
        <ul class="safety-list">
            ${itinerary.safetyGuidelines.map(guide => `<li>${guide}</li>`).join('')}
        </ul>
        <h4 style="margin-top: 2rem;"><i class="fas fa-route"></i> How to Reach</h4>
        <p>${itinerary.logistics.howToReach}</p>
        <p style="margin-top: 1rem;"><strong>Nearest Airport:</strong> ${itinerary.logistics.nearestAirport}</p>
    `;
    document.getElementById('safetyContent').innerHTML = safetyHTML;
}

function populateFAQsTab(itinerary) {
    const faqHTML = itinerary.faqs.map(faq => `
        <div class="faq-item">
            <div class="faq-question" onclick="toggleFAQ(this)">
                <h5>${faq.q}</h5>
                <i class="fas fa-chevron-down"></i>
            </div>
            <div class="faq-answer">
                <p>${faq.a}</p>
            </div>
        </div>
    `).join('');
    document.getElementById('faqsContent').innerHTML = faqHTML;
}

function toggleDayAccordion(header) {
    header.parentElement.classList.toggle('active');
}

function toggleFAQ(element) {
    element.parentElement.classList.toggle('active');
}

function getItineraryTierConfig(tier) {
    const configs = {
        budget: {
            label: 'Budget',
            activityNote: 'Group-paced support and essential route coordination.',
            mealNote: 'Basic but nutritious trek meal plan.',
            stayNote: 'Shared camps/guesthouses based on route availability.',
            note: 'Efficient group itinerary with essential trek services.',
            inclusions: [
                'Shared transport in base camp circuit',
                'Group support team and common logistics'
            ],
            exclusions: [
                'Private porter or dedicated support crew',
                'Premium room upgrades and concierge add-ons'
            ]
        },
        standard: {
            label: 'Standard',
            activityNote: 'Balanced schedule with planned acclimatization support.',
            mealNote: 'Standard meals with hydration and trail snacks.',
            stayNote: 'Comfort-focused guesthouse/camp mix as available.',
            note: 'Balanced comfort and support for most trekkers.',
            inclusions: [
                'Priority logistics coordination on trek days',
                'Enhanced trek briefing and pace management'
            ],
            exclusions: [
                'Dedicated private guide and one-to-one assistance',
                'Luxury room guarantees across all nights'
            ]
        },
        premium: {
            label: 'Premium',
            activityNote: 'Smaller-group prioritization with enhanced safety coordination.',
            mealNote: 'Upgraded meal plan with additional snacks and recovery options.',
            stayNote: 'Premium category stays where inventory is available.',
            note: 'High-comfort itinerary with upgraded trek services.',
            inclusions: [
                'Dedicated local transfers for base camp circuit',
                'Priority support team allocation where possible'
            ],
            exclusions: [
                'International flight/train to trek base camp',
                'Luxury requests outside listed itinerary services'
            ]
        }
    };

    return configs[tier] || configs.standard;
}

function syncItineraryTierUI() {
    const tierConfig = getItineraryTierConfig(currentItineraryTier);

    document.querySelectorAll('.package-tier-btn').forEach(button => {
        const isActive = button.dataset.tier === currentItineraryTier;
        button.classList.toggle('active', isActive);
    });

    const noteElement = document.getElementById('itineraryPackageNote');
    if (noteElement) {
        noteElement.textContent = tierConfig.note;
    }
}

function setItineraryPackage(tier) {
    currentItineraryTier = tier;
    syncItineraryTierUI();

    if (!currentItin || !currentSelectedTrek) return;

    populateDayByDayTab(currentItin, currentSelectedTrek);
    populateCostTab(currentItin, currentSelectedTrek);
}

function bookNowFromItinerary() {
    if (currentSelectedTrek) {
        closeItineraryModal();
        window.location.href = `book.html?trek=${currentSelectedTrek.id || currentSelectedTrek.name}&tier=${currentItineraryTier}`;
    }
}

function downloadItineraryPDF() {
    alert('PDF download feature coming soon!');
}

function contactGuide() {
    alert('Guide contact form coming soon!');
}

// Global variables
let currentSelectedTrek = null;
let currentItin = null;
let currentItineraryTier = 'standard';
