import { destinations } from '../data/destinations';
import { attractions } from '../data/attractions';
import { restaurants } from '../data/restaurants';
import { hotels } from '../data/hotels';
import { guides } from '../data/guides';
import { vehicleCategories } from '../data/vehicles';

/**
 * Intelligent Rule-Based & Destination-Aware Itinerary Generator
 */
export const aiPlannerService = {
  async generateItinerary(params) {
    const {
      startLocation = 'Chennai',
      destination = 'Madurai',
      destinationId,
      startDate,
      durationDays = 3,
      travelers = 2,
      budget = 20000,
      travelStyle = 'Culture',
      preferredTransport = 'Sedan',
      accommodationPreference = 'Heritage Chettinad Mansion / Resort',
      specialInterests = ''
    } = params;

    // Simulate 1.2s intelligent generation delay for realistic UX
    await new Promise(resolve => setTimeout(resolve, 1200));

    // Resolve destination
    const matchedDest = destinations.find(
      d =>
        (destinationId && d.id === destinationId) ||
        d.name.toLowerCase().includes(destination.toLowerCase()) ||
        destination.toLowerCase().includes(d.name.toLowerCase())
    ) || destinations[0];

    const destId = matchedDest.id;
    const destAttractions = attractions.filter(a => a.destinationId === destId);
    const destRestaurants = restaurants.filter(r => r.destinationId === destId);
    const destHotels = hotels.filter(h => h.destinationId === destId);
    const destGuides = guides.filter(g => g.destinationId === destId);

    // Fallbacks if not enough destination-specific items
    const availableAttractions = destAttractions.length > 0 ? destAttractions : attractions;
    const availableRestaurants = destRestaurants.length > 0 ? destRestaurants : restaurants;
    const availableHotels = destHotels.length > 0 ? destHotels : hotels;
    const availableGuides = destGuides.length > 0 ? destGuides : guides;

    const numDays = Math.max(1, Math.min(7, Number(durationDays) || 3));
    const numTravelers = Math.max(1, Number(travelers) || 2);
    const nights = Math.max(1, numDays - 1);
    const targetBudget = Math.max(1000, Number(budget) || 5000);

    // Intelligent budget distribution according to real-world travel proportions
    const targetHotelBudget = Math.round(targetBudget * 0.44);
    const targetNightlyRate = Math.round(targetHotelBudget / nights);

    // Pick hotel matching budget tier and user preference
    const sortedHotels = [...availableHotels].sort((a, b) => {
      // If user chose hostel/homestay or budget is under 7000, prioritize budget categories
      if (targetBudget < 7000 || accommodationPreference.toLowerCase().includes('hostel') || accommodationPreference.toLowerCase().includes('guest')) {
        const isABudget = a.category === 'Hostels' || a.category === 'Homestays' || a.category === 'Guest houses';
        const isBBudget = b.category === 'Hostels' || b.category === 'Homestays' || b.category === 'Guest houses';
        if (isABudget && !isBBudget) return -1;
        if (!isABudget && isBBudget) return 1;
      }
      return Math.abs(a.pricePerNight - targetNightlyRate) - Math.abs(b.pricePerNight - targetNightlyRate);
    });

    const recommendedHotel = sortedHotels[0] || availableHotels[0] || hotels[0];
    const recommendedGuide = availableGuides[0] || guides[0];

    // Pick recommended vehicle appropriate for budget & preference
    let recommendedVehicle;
    if (preferredTransport) {
      recommendedVehicle = vehicleCategories.find(v => v.name.toLowerCase().includes(preferredTransport.toLowerCase()));
    }
    if (!recommendedVehicle) {
      if (targetBudget < 6000) {
        recommendedVehicle = vehicleCategories[0]; // Bike taxi / Auto
      } else if (targetBudget < 12000) {
        recommendedVehicle = vehicleCategories[1]; // Auto rickshaw / Mini
      } else if (targetBudget < 25000) {
        recommendedVehicle = vehicleCategories[2]; // Mini Cab / Sedan
      } else {
        recommendedVehicle = vehicleCategories[3]; // Sedan (Prime)
      }
    }

    // Realistic itemized cost calculations constrained strictly to targetBudget
    let estHotelCost;
    let actualNightlyRate = recommendedHotel.pricePerNight || targetNightlyRate;
    if (actualNightlyRate * nights > targetBudget * 0.52) {
      estHotelCost = Math.round(targetBudget * 0.44);
      actualNightlyRate = Math.round(estHotelCost / nights);
    } else {
      estHotelCost = Math.min(Math.round(targetBudget * 0.48), actualNightlyRate * nights);
    }

    const estTransportCost = Math.round(targetBudget * 0.18);
    const estFoodCost = Math.round(targetBudget * 0.26);
    const estActivityCost = Math.max(0, targetBudget - (estHotelCost + estTransportCost + estFoodCost));
    const calculatedTotal = estHotelCost + estTransportCost + estFoodCost + estActivityCost;

    const dayThemes = [
      { title: `Iconic Landmarks & Heritage of ${matchedDest.name}`, theme: 'Royal Forts & Classical Architecture' },
      { title: `Artisan Trails & Cultural Immersion`, theme: 'Local Bazaars, Crafts & Folk Art' },
      { title: `Scenic Horizons & Gastronomic Secrets`, theme: 'Sunset Viewpoints & Heirloom Cuisine' },
      { title: `Hidden Gems & Local Living`, theme: 'Off-the-beaten-path Neighborhoods & Temples' },
      { title: `Nature Escapes & Valley Vistas`, theme: 'Outdoor Trails & Tranquil Gardens' },
      { title: `Relaxation, Wellness & Sunset Cruise`, theme: 'Leisurely Mornings & Twilight Experiences' },
      { title: `Souvenirs, Sweetmeats & Farewell Walk`, theme: 'Artisan Markets & Memory Making' }
    ];

    for (let i = 0; i < numDays; i++) {
      const themeObj = dayThemes[i % dayThemes.length];
      const morningAttr = availableAttractions[(i * 2) % availableAttractions.length];
      const eveningAttr = availableAttractions[(i * 2 + 1) % availableAttractions.length];
      const noonRest = availableRestaurants[i % availableRestaurants.length];
      const eveningRest = availableRestaurants[(i + 1) % availableRestaurants.length];

      days.push({
        day: i + 1,
        title: themeObj.title,
        theme: themeObj.theme,
        morning: {
          time: '08:30 AM - 11:45 AM',
          activity: `Explore ${morningAttr.name} (${morningAttr.category})`,
          location: morningAttr.name,
          estTravelTime: `${15 + (i * 5)} mins via ${recommendedVehicle.name}`,
          notes: morningAttr.tips || 'Arrive early to beat mid-day lines and capture the morning golden light.'
        },
        afternoon: {
          time: '12:30 PM - 02:45 PM',
          activity: `Authentic lunch tasting at ${noonRest.name}`,
          location: noonRest.address || `${matchedDest.name} Center`,
          estTravelTime: '10 mins transit',
          notes: `Must try: ${noonRest.popularDishes.slice(0, 2).join(' & ')}.`
        },
        evening: {
          time: '04:00 PM - 07:30 PM',
          activity: `Sunset & panoramic views at ${eveningAttr.name}`,
          location: eveningAttr.name,
          estTravelTime: '20 mins transit',
          notes: eveningAttr.tips || 'Ideal time for photography and twilight city lights.'
        },
        dinner: {
          time: '08:00 PM - 09:30 PM',
          activity: `Dinner at ${eveningRest.name}`,
          location: eveningRest.name,
          notes: `Known for ${eveningRest.cuisine} cuisine with a rating of ${eveningRest.rating}★.`
        },
        backupPlan: `Bad Weather / Crowds Backup: Visit an indoor royal museum or traditional indoor handicraft center in ${matchedDest.name}.`
      });
    }

    return {
      id: `itn-${destId}-${Date.now()}`,
      title: `${numDays}-Day ${travelStyle} Escape to ${matchedDest.name}`,
      destination: matchedDest.name,
      destinationId: destId,
      startLocation,
      startDate: startDate || new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
      durationDays: numDays,
      travelers: numTravelers,
      travelStyle,
      preferredTransport: recommendedVehicle.name,
      accommodationPreference,
      specialInterests,
      budgetTotal: targetBudget,
      estimatedCost: {
        transport: estTransportCost,
        accommodation: estHotelCost,
        food: estFoodCost,
        activities: estActivityCost,
        total: calculatedTotal
      },
      weatherAdvice: `${matchedDest.weatherCondition} with an average temperature of ${matchedDest.avgTemp}. Best visited during ${matchedDest.bestTimeToVisit}.`,
      hotelRecommendation: {
        id: recommendedHotel.id,
        name: recommendedHotel.name,
        type: recommendedHotel.type,
        rate: `₹${actualNightlyRate.toLocaleString('en-IN')} / night`,
        area: recommendedHotel.address
      },
      guideRecommendation: {
        id: recommendedGuide.id,
        name: recommendedGuide.name,
        specialization: recommendedGuide.specialization,
        rating: recommendedGuide.rating
      },
      transportRecommendation: {
        id: recommendedVehicle.id,
        name: recommendedVehicle.name,
        tagline: recommendedVehicle.tagline
      },
      days,
      generatedAt: new Date().toISOString(),
      isAIGenerated: true,
      generatorMode: 'Rule-Based Smart Engine (Deterministic Demo)'
    };
  }
};
