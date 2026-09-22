import { ShoeProduct, Review } from '../types';

export const STORE_PHONE = "7828672746";
export const STORE_PHONE_DISPLAY = "+91 78286-72746";
export const STORE_LOCATION = "Main Market, Narayanpur, Chhattisgarh 494661";
export const STORE_UPI_ID = "7828672746@okbizaxis";

export const SAMPLE_PRODUCTS: ShoeProduct[] = [
  {
    id: "lama-air-phantom",
    name: "Lama Air Phantom Zoom",
    subtitle: "High-Responsive Nitrogen Foam Running Shoes",
    category: "running",
    retailPrice: 1399,
    mrp: 3499,
    wholesalePrice: 799,
    minWholesaleQty: 6,
    rating: 4.9,
    reviewCount: 148,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80", // Vibrant red athletic shoe
    gallery: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=900&q=80"
    ],
    colors: [
      { name: "Crimson Red / White", hex: "#dc2626", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80" },
      { name: "Royal Blue / Ice", hex: "#1d4ed8", image: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=900&q=80" },
      { name: "Midnight Black", hex: "#0f172a", image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=900&q=80" }
    ],
    sizes: [
      { ukSize: 6, inStock: true, stockCount: 14 },
      { ukSize: 7, inStock: true, stockCount: 22 },
      { ukSize: 8, inStock: true, stockCount: 19 },
      { ukSize: 9, inStock: true, stockCount: 11 },
      { ukSize: 10, inStock: true, stockCount: 8 },
      { ukSize: 11, inStock: true, stockCount: 4 }
    ],
    tags: ["Best Seller", "100% Quality 👟", "Super Soft Sole", "Marathon Ready"],
    description: "Built for speed and relentless road runs. Features an engineered breathable jacquard knit upper with a dual-density nitrogen infused midsole that delivers unmatched energy return. Ideal for daily jogging, 10K marathons, and army physical trials.",
    specs: {
      sole: "Nitrogen Infused Ultra-Bounce Rubber",
      upperMaterial: "Seamless Engineered Aero-Mesh",
      weight: "235g (UK 8 single shoe)",
      cushioning: "Max Plush Dual Cushion",
      closure: "Ergonomic Speed Lacing",
      bestFor: "Running, Morning Walk, Police/Army Ground Training"
    },
    isBestSeller: true,
    isFeatured: true,
    qualityBadge: "💯 100% Quality Graded"
  },
  {
    id: "hyperstrike-cricket-spikes",
    name: "HyperStrike Pro Cricket Spikes",
    subtitle: "Tournament Grade Metal Spike Cricket Shoes",
    category: "cricket",
    retailPrice: 1799,
    mrp: 4499,
    wholesalePrice: 1099,
    minWholesaleQty: 6,
    rating: 4.8,
    reviewCount: 92,
    image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=900&q=80"
    ],
    colors: [
      { name: "Royal White / Blue", hex: "#2563eb", image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=900&q=80" },
      { name: "Aggressive Red / White", hex: "#b91c1c", image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=900&q=80" }
    ],
    sizes: [
      { ukSize: 6, inStock: true, stockCount: 9 },
      { ukSize: 7, inStock: true, stockCount: 16 },
      { ukSize: 8, inStock: true, stockCount: 20 },
      { ukSize: 9, inStock: true, stockCount: 15 },
      { ukSize: 10, inStock: true, stockCount: 6 },
      { ukSize: 11, inStock: false, stockCount: 0 }
    ],
    tags: ["Tournament Choice", "Steel Spikes Included", "Reinforced Toe Guard"],
    description: "Engineered specifically for fast bowlers and aggressive batsmen. Comes with replaceable high-tensile steel spikes plus wrench, TPU heel stabilizer cage, and a reinforced rubber toe bumper to withstand high impact delivery strides.",
    specs: {
      sole: "Full TPU Plate with 11 Steel Spikes",
      upperMaterial: "Water-resistant PU Synthetic Leather",
      weight: "360g",
      cushioning: "High-impact EVA Heel Wedge",
      closure: "Power-strap & Lace lock",
      bestFor: "Grass Pitches, Turf Tournaments, Fast Bowling"
    },
    isFeatured: true,
    qualityBadge: "💯 Match Grade Tested"
  },
  {
    id: "predator-football-studs",
    name: "Predator Elite FG Football Studs",
    subtitle: "Precision Control Molded Cleats for Firm Ground",
    category: "football",
    retailPrice: 1499,
    mrp: 3899,
    wholesalePrice: 899,
    minWholesaleQty: 6,
    rating: 4.9,
    reviewCount: 110,
    image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?auto=format&fit=crop&w=900&q=80"
    ],
    colors: [
      { name: "Cobalt Blue / Volt", hex: "#1e40af", image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=900&q=80" },
      { name: "Fire Red / Jet Black", hex: "#dc2626", image: "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?auto=format&fit=crop&w=900&q=80" }
    ],
    sizes: [
      { ukSize: 6, inStock: true, stockCount: 10 },
      { ukSize: 7, inStock: true, stockCount: 14 },
      { ukSize: 8, inStock: true, stockCount: 18 },
      { ukSize: 9, inStock: true, stockCount: 12 },
      { ukSize: 10, inStock: true, stockCount: 7 }
    ],
    tags: ["14 Molded Studs", "Grip Strike Zone", "Ultra Lightweight"],
    description: "Dominate the pitch with 3D micro-textured strike zones for ball swerve and control. The dual-chevron molded stud configuration delivers lightning-quick deceleration and sprint bursts on natural and artificial grass.",
    specs: {
      sole: "Firm Ground Molded TPU Cleats (14 Studs)",
      upperMaterial: "Textured Hyperskin Synthetic",
      weight: "220g",
      cushioning: "Anatomical EVA Footbed",
      closure: "Off-center Strike Lace",
      bestFor: "Natural Grass, Football Ground, Club Matches"
    },
    isBestSeller: true,
    qualityBadge: "💯 Pro Player Choice"
  },
  {
    id: "retro-dunk-streetwear",
    name: "Retro Dunk High Street Sneaker",
    subtitle: "Iconic Basketball Heritage High-Top Sneakers",
    category: "sneakers",
    retailPrice: 1599,
    mrp: 4299,
    wholesalePrice: 950,
    minWholesaleQty: 6,
    rating: 4.9,
    reviewCount: 230,
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?auto=format&fit=crop&w=900&q=80"
    ],
    colors: [
      { name: "Chicago Red / White / Black", hex: "#b91c1c", image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=900&q=80" },
      { name: "Royal Blue / Pure White", hex: "#1d4ed8", image: "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?auto=format&fit=crop&w=900&q=80" },
      { name: "Panda Black & White", hex: "#000000", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80" }
    ],
    sizes: [
      { ukSize: 6, inStock: true, stockCount: 15 },
      { ukSize: 7, inStock: true, stockCount: 25 },
      { ukSize: 8, inStock: true, stockCount: 30 },
      { ukSize: 9, inStock: true, stockCount: 20 },
      { ukSize: 10, inStock: true, stockCount: 10 }
    ],
    tags: ["Viral Hype", "Padded High Collar", "Everyday Drip"],
    description: "The ultimate lifestyle sneaker. High-top padded ankle support, genuine double-stitched leather paneling, and a retro pivot-circle rubber cupsole make this the #1 casual and college shoe in Narayanpur and beyond.",
    specs: {
      sole: "Heavy-duty Solid Rubber Cupsole",
      upperMaterial: "Premium Vegan Action Leather",
      weight: "380g",
      cushioning: "Hidden Foam Air Pocket",
      closure: "Full 8-eyelet High Lace",
      bestFor: "College, Casual Wear, Streetwear, Parties"
    },
    isBestSeller: true,
    isFeatured: true,
    qualityBadge: "💯 1st Quality Masterpiece"
  },
  {
    id: "smashcourt-badminton-indoor",
    name: "SmashCourt Pro Badminton Shoes",
    subtitle: "Non-Marking Raw Gum Sole Indoor Court Shoes",
    category: "badminton",
    retailPrice: 1299,
    mrp: 2999,
    wholesalePrice: 750,
    minWholesaleQty: 6,
    rating: 4.7,
    reviewCount: 76,
    image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=900&q=80"
    ],
    colors: [
      { name: "Electric Blue / Orange", hex: "#2563eb", image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=900&q=80" },
      { name: "Scarlet Red / Neon", hex: "#dc2626", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80" }
    ],
    sizes: [
      { ukSize: 6, inStock: true, stockCount: 8 },
      { ukSize: 7, inStock: true, stockCount: 15 },
      { ukSize: 8, inStock: true, stockCount: 18 },
      { ukSize: 9, inStock: true, stockCount: 9 },
      { ukSize: 10, inStock: true, stockCount: 5 }
    ],
    tags: ["Non-Marking Gum Sole", "Anti-Slip Hex Grip", "Lateral Stability"],
    description: "Court approved 100% natural gum rubber sole that leaves zero marks on wooden and synthetic badminton courts. Lateral anti-roll TPU shank keeps your ankles locked during intense lunges and jump smashes.",
    specs: {
      sole: "Raw Hexagonal Gum Rubber (Non-Marking)",
      upperMaterial: "Breathable Micro-perforated PU & Mesh",
      weight: "270g",
      cushioning: "Power-Cushion Shock Dampening",
      closure: "Asymmetric Court Lacing",
      bestFor: "Badminton, Squash, Table Tennis, Volleyball"
    },
    qualityBadge: "💯 Tournament Certified"
  },
  {
    id: "ultrabounce-gym-trainers",
    name: "UltraBounce 5.0 Athletic Gym Trainers",
    subtitle: "Wide Base Cross-Training & Heavy Squat Shoes",
    category: "training",
    retailPrice: 1199,
    mrp: 2799,
    wholesalePrice: 680,
    minWholesaleQty: 6,
    rating: 4.8,
    reviewCount: 88,
    image: "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=900&q=80"
    ],
    colors: [
      { name: "Navy Blue / Fire Red", hex: "#1e3a8a", image: "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&w=900&q=80" },
      { name: "Stealth Black", hex: "#18181b", image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=900&q=80" }
    ],
    sizes: [
      { ukSize: 6, inStock: true, stockCount: 12 },
      { ukSize: 7, inStock: true, stockCount: 19 },
      { ukSize: 8, inStock: true, stockCount: 25 },
      { ukSize: 9, inStock: true, stockCount: 14 },
      { ukSize: 10, inStock: true, stockCount: 8 }
    ],
    tags: ["Gym Beast", "Flat Solid Heel", "Sweat Wicking"],
    description: "Designed for heavy gym workouts, deadlifts, and cross-functional conditioning. Flat grounded heel provides zero wobble under heavy barbell loads while the flexible forefoot allows jump ropes and box jumps.",
    specs: {
      sole: "High-density Flat Compound Rubber",
      upperMaterial: "Ripstop Flexible Ballistic Mesh",
      weight: "295g",
      cushioning: "Firm Responsive EVA Base",
      closure: "Midfoot Lockdown Strap + Laces",
      bestFor: "Gym, Weightlifting, CrossFit, Calisthenics"
    },
    qualityBadge: "💯 Heavy Duty Gym Tested"
  },
  {
    id: "trailmaster-outdoor-trekker",
    name: "TrailMaster All-Terrain Trekker",
    subtitle: "Deep Lug Waterproof Hiking & Army Physical Boots",
    category: "trekking",
    retailPrice: 1699,
    mrp: 3999,
    wholesalePrice: 1050,
    minWholesaleQty: 6,
    rating: 4.9,
    reviewCount: 64,
    image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=900&q=80"
    ],
    colors: [
      { name: "Camo Forest / Deep Blue", hex: "#1e3a5f", image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=900&q=80" },
      { name: "Rust Red / Earth", hex: "#991b1b", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80" }
    ],
    sizes: [
      { ukSize: 7, inStock: true, stockCount: 14 },
      { ukSize: 8, inStock: true, stockCount: 22 },
      { ukSize: 9, inStock: true, stockCount: 17 },
      { ukSize: 10, inStock: true, stockCount: 9 },
      { ukSize: 11, inStock: true, stockCount: 6 }
    ],
    tags: ["5mm Deep Lugs", "Water Splash Guard", "Tough Bastar Terrain"],
    description: "Built for tough outdoor terrains of Chhattisgarh forests, rocky trails, and army physical obstacle drills. Features deep 5mm multidirectional traction teeth that bite into mud, wet stones, and slopes.",
    specs: {
      sole: "Aggressive Mountain Lug Rubber (Oil Resistant)",
      upperMaterial: "Water-repellent Cordura & Nubuck",
      weight: "440g",
      cushioning: "High-density Dual Insole with Arch Support",
      closure: "Quick-lace Rust-proof Metal Eyelets",
      bestFor: "Bastar Hills Trekking, Monsoon Running, Rough Patrol"
    },
    qualityBadge: "💯 100% Rough & Tough"
  },
  {
    id: "hyperslide-recovery-sliders",
    name: "HyperSlide Pro Dual-Density Slides",
    subtitle: "Cloud Foam Post-Match Casual Sliders",
    category: "slides",
    retailPrice: 599,
    mrp: 1499,
    wholesalePrice: 299,
    minWholesaleQty: 12,
    rating: 4.8,
    reviewCount: 310,
    image: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=900&q=80"
    ],
    colors: [
      { name: "Royal Blue / White Bold", hex: "#1d4ed8", image: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=900&q=80" },
      { name: "Crimson Red / Black", hex: "#dc2626", image: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=900&q=80" }
    ],
    sizes: [
      { ukSize: 6, inStock: true, stockCount: 30 },
      { ukSize: 7, inStock: true, stockCount: 45 },
      { ukSize: 8, inStock: true, stockCount: 50 },
      { ukSize: 9, inStock: true, stockCount: 40 },
      { ukSize: 10, inStock: true, stockCount: 25 }
    ],
    tags: ["Wholesale Top Pick", "Waterproof", "Pillow Soft"],
    description: "Slip into pure cloud comfort. Thick contoured footbed relieves tired arch muscles after intense football and cricket matches. Waterproof, washable, and built to last.",
    specs: {
      sole: "One-piece Injection Molded EVA Foam",
      upperMaterial: "Padded Soft Lining Strap",
      weight: "140g",
      cushioning: "35mm Pillow Foam Sole",
      closure: "Slip-on Ergonomic Arch",
      bestFor: "Post-workout, Home, Shower, Travel"
    },
    isBestSeller: true,
    qualityBadge: "💯 Wholesale Favorite"
  },
  {
    id: "velocity-aero-cricket-turf",
    name: "Velocity Aero Cricket Turf Shoes",
    subtitle: "Multi-Stud Rubber Sole for Matting & Cement Pitches",
    category: "cricket",
    retailPrice: 1299,
    mrp: 2999,
    wholesalePrice: 750,
    minWholesaleQty: 6,
    rating: 4.8,
    reviewCount: 95,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=900&q=80"
    ],
    colors: [
      { name: "Team Blue / Crimson Red", hex: "#2563eb", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=900&q=80" },
      { name: "Clean White / Ice Blue", hex: "#0284c7", image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=900&q=80" }
    ],
    sizes: [
      { ukSize: 6, inStock: true, stockCount: 12 },
      { ukSize: 7, inStock: true, stockCount: 20 },
      { ukSize: 8, inStock: true, stockCount: 24 },
      { ukSize: 9, inStock: true, stockCount: 16 },
      { ukSize: 10, inStock: true, stockCount: 8 }
    ],
    tags: ["Turf / Matting Specialist", "High Shock Absorption"],
    description: "The most popular cricket shoe across Chhattisgarh village and city tournaments. Features 68 multidirectional rubber studs that bite into coir matting, cement wickets, and synthetic turf without slipping.",
    specs: {
      sole: "Multi-stud High Durability Rubber",
      upperMaterial: "Air-mesh with PU overlays",
      weight: "310g",
      cushioning: "Padded Tongue & Arch Cushion",
      closure: "Durable Braided Laces",
      bestFor: "Matting Cricket, Astro Turf, Concrete Pitches"
    },
    qualityBadge: "💯 Tournament Approved"
  },
  {
    id: "bladerunner-carbon-speed",
    name: "BladeRunner Carbon Speed Racer",
    subtitle: "Carbon Fiber Plate Ultra-Speed Racing Shoes",
    category: "running",
    retailPrice: 1899,
    mrp: 4999,
    wholesalePrice: 1199,
    minWholesaleQty: 6,
    rating: 5.0,
    reviewCount: 82,
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80"
    ],
    colors: [
      { name: "Solar Red / Hyper Blue", hex: "#ef4444", image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=900&q=80" },
      { name: "Deep Cobalt Blue", hex: "#1e40af", image: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=900&q=80" }
    ],
    sizes: [
      { ukSize: 6, inStock: true, stockCount: 6 },
      { ukSize: 7, inStock: true, stockCount: 14 },
      { ukSize: 8, inStock: true, stockCount: 18 },
      { ukSize: 9, inStock: true, stockCount: 12 },
      { ukSize: 10, inStock: true, stockCount: 4 }
    ],
    tags: ["Carbon Plate", "Sprint King", "Army Physical Top Pick"],
    description: "Embedded full-length composite carbon propulsion shank gives you 25% spring propulsion with every step. Thousands of Indian army aspirants in Bastar and Narayanpur train in this to clock sub-5:00 1600m timings.",
    specs: {
      sole: "Carbon Shank Embedded Pebax Superfoam",
      upperMaterial: "Monofilament Ultra-translucent Mesh",
      weight: "198g",
      cushioning: "Kinetic Return Superfoam",
      closure: "Racing Notch Laces",
      bestFor: "1600m Army Trial, Sprints, 5K/10K Marathons"
    },
    isFeatured: true,
    qualityBadge: "💯 1600m Army Trial Champion"
  },
  {
    id: "air-max-pulse-casual",
    name: "Pulse 270 Visible Air Street Sneakers",
    subtitle: "Massive 270-Degree Heel Air Cushion Sneaker",
    category: "sneakers",
    retailPrice: 1499,
    mrp: 3799,
    wholesalePrice: 890,
    minWholesaleQty: 6,
    rating: 4.8,
    reviewCount: 142,
    image: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=900&q=80"
    ],
    colors: [
      { name: "Electric Blue / Sunset Red Air", hex: "#2563eb", image: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=900&q=80" },
      { name: "Triple Black Out", hex: "#111827", image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=900&q=80" }
    ],
    sizes: [
      { ukSize: 6, inStock: true, stockCount: 10 },
      { ukSize: 7, inStock: true, stockCount: 15 },
      { ukSize: 8, inStock: true, stockCount: 22 },
      { ukSize: 9, inStock: true, stockCount: 14 },
      { ukSize: 10, inStock: true, stockCount: 8 }
    ],
    tags: ["Visible Air Pod", "Style Icon", "All-Day Comfort"],
    description: "Features a dramatic pressurized 270-degree visible air unit in the heel that cushions your step while looking fire. Perfect match for denim jeans, joggers, and athletic wear.",
    specs: {
      sole: "Pressurized Visible Air Bag + Rubber",
      upperMaterial: "Stretch Knit Bootie Construction",
      weight: "320g",
      cushioning: "Max Air Heel Suspension",
      closure: "Integrated Heel Pull & Quick Lace",
      bestFor: "College, Travel, Parties, Daily Walking"
    },
    qualityBadge: "💯 100% Best Selling Style"
  },
  {
    id: "cloudwalk-memory-slipon",
    name: "CloudWalk Easy Slip-On Active",
    subtitle: "Memory Foam Featherweight Walking Shoes",
    category: "running",
    retailPrice: 999,
    mrp: 2499,
    wholesalePrice: 580,
    minWholesaleQty: 12,
    rating: 4.7,
    reviewCount: 180,
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=900&q=80"
    ],
    colors: [
      { name: "Airforce Navy Blue", hex: "#1e3a8a", image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=900&q=80" },
      { name: "Ruby Red / Charcoal", hex: "#b91c1c", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80" }
    ],
    sizes: [
      { ukSize: 6, inStock: true, stockCount: 20 },
      { ukSize: 7, inStock: true, stockCount: 28 },
      { ukSize: 8, inStock: true, stockCount: 35 },
      { ukSize: 9, inStock: true, stockCount: 25 },
      { ukSize: 10, inStock: true, stockCount: 12 }
    ],
    tags: ["Zero Lace", "Senior Citizen Friendly", "Featherlight"],
    description: "Hands-free slip on shoes with ultra-thick memory foam insoles that adapt to your foot anatomy. Extremely light weight, soft on knees and ankles, perfect for daily morning walks and long shop standing hours.",
    specs: {
      sole: "Featherlight Phylon Sole",
      upperMaterial: "4-way Stretch Engineered Knit",
      weight: "185g",
      cushioning: "Slow Rebound Memory Insole",
      closure: "Laceless Stretch Collar",
      bestFor: "Elderly, Morning Walks, Office Standing, Daily Casual"
    },
    qualityBadge: "💯 Comfort Guaranteed"
  }
];

export const CUSTOMER_REVIEWS: Review[] = [
  {
    id: "rev-1",
    userName: "Rakesh Netam",
    city: "Narayanpur",
    state: "Chhattisgarh",
    rating: 5,
    date: "3 days ago",
    shoeName: "BladeRunner Carbon Speed Racer",
    comment: "Bhaiya Lama sports se BladeRunner shoe liya army physical preparation ke liye. Sole grip and bounce bilkul top class hai. Direct shop pe jakar try kiya tha, rate Raipur se bhi sasta mila! 💯",
    verifiedPurchase: true,
    orderType: "Retail"
  },
  {
    id: "rev-2",
    userName: "Mahendra Sahu (Sports World Footwear)",
    city: "Raipur",
    state: "Chhattisgarh",
    rating: 5,
    date: "1 week ago",
    shoeName: "Lama Air Phantom Zoom",
    comment: "Maine 24 pairs wholesale carton order kiya tha apni shop ke liye. Shuru me No COD dekh kar thoda socha, par 7828672746 pe baat karke advance payment kiya. Agle hi din tracking mil gayi aur parcel safely deliver ho gaya. Quality ek number!",
    verifiedPurchase: true,
    orderType: "Wholesale Bulk"
  },
  {
    id: "rev-3",
    userName: "Vikas Yadav",
    city: "Bilaspur",
    state: "Chhattisgarh",
    rating: 5,
    date: "2 weeks ago",
    shoeName: "HyperStrike Pro Cricket Spikes",
    comment: "Cricket tournament ke liye spikes chahiye the. Pure Bilaspur market me 3000 se kam me nahi mil rahe the. Lama Sports se sirf ₹1799 me mill gaye, spikes wrench bhi sath me tha. 3 din me delivery aa gayi.",
    verifiedPurchase: true,
    orderType: "Retail"
  },
  {
    id: "rev-4",
    userName: "Sunil Kashyap",
    city: "Jagdalpur / Bastar",
    state: "Chhattisgarh",
    rating: 5,
    date: "Just yesterday",
    shoeName: "Retro Dunk High Street Sneaker",
    comment: "Sneakers look awesome! Chicago red color way is exact as photos. No COD policy clear hai isliye price itna best hai. WhatsApp order process bahut easy tha.",
    verifiedPurchase: true,
    orderType: "Retail"
  },
  {
    id: "rev-5",
    userName: "Amit Kumar (FitZone Academy)",
    city: "Patna",
    state: "Bihar",
    rating: 5,
    date: "10 days ago",
    shoeName: "Predator Elite FG Football Studs",
    comment: "Ordered 18 pairs for our academy football squad from Bihar. Dispatched via DTDC express from Narayanpur. Kids loved the grip and lightweight feel. Truly best price in India!",
    verifiedPurchase: true,
    orderType: "Wholesale Bulk"
  },
  {
    id: "rev-6",
    userName: "Deepak Sharma",
    city: "Indore",
    state: "Madhya Pradesh",
    rating: 5,
    date: "5 days ago",
    shoeName: "HyperSlide Pro Dual-Density Slides",
    comment: "Slides quality is super soft like clouds! Great response on WhatsApp 7828672746. Trusted shop 100%.",
    verifiedPurchase: true,
    orderType: "Retail"
  }
];

export const PINCODE_DATABASE: Record<string, { city: string; state: string; days: string; courier: string }> = {
  "494661": { city: "Narayanpur", state: "Chhattisgarh", days: "Same Day / Pick from Store", courier: "Local Handover / Speed Post" },
  "492001": { city: "Raipur", state: "Chhattisgarh", days: "1-2 Days", courier: "DTDC Express / Royal Courier" },
  "495001": { city: "Bilaspur", state: "Chhattisgarh", days: "1-2 Days", courier: "DTDC Express" },
  "491001": { city: "Durg / Bhilai", state: "Chhattisgarh", days: "1-2 Days", courier: "Speed Post / DTDC" },
  "494001": { city: "Jagdalpur (Bastar)", state: "Chhattisgarh", days: "1 Day", courier: "Direct Bus Parcel / Speed Post" },
  "494111": { city: "Kondagaon", state: "Chhattisgarh", days: "1 Day", courier: "Direct Bus Parcel / Speed Post" },
  "494226": { city: "Dantewada", state: "Chhattisgarh", days: "1-2 Days", courier: "Speed Post" },
  "494444": { city: "Bijapur", state: "Chhattisgarh", days: "2 Days", courier: "Speed Post" },
  "110001": { city: "New Delhi", state: "Delhi", days: "3-4 Days", courier: "Delhivery Air Express" },
  "400001": { city: "Mumbai", state: "Maharashtra", days: "3-4 Days", courier: "DTDC Air" },
  "560001": { city: "Bengaluru", state: "Karnataka", days: "3-5 Days", courier: "DTDC / Delhivery" },
  "700001": { city: "Kolkata", state: "West Bengal", days: "3-4 Days", courier: "Speed Post / DTDC" },
  "600001": { city: "Chennai", state: "Tamil Nadu", days: "4-5 Days", courier: "DTDC Express" },
  "500001": { city: "Hyderabad", state: "Telangana", days: "2-3 Days", courier: "Delhivery Air" },
  "226001": { city: "Lucknow", state: "Uttar Pradesh", days: "3-4 Days", courier: "DTDC Express" },
  "462001": { city: "Bhopal", state: "Madhya Pradesh", days: "2-3 Days", courier: "Speed Post / DTDC" },
  "800001": { city: "Patna", state: "Bihar", days: "3-4 Days", courier: "Speed Post / DTDC" },
  "302001": { city: "Jaipur", state: "Rajasthan", days: "3-4 Days", courier: "Delhivery Surface" }
};
