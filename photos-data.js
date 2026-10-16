/**
 * Photo Collection & Personal Love Notes
 * 
 * You can easily customize this file with her real photos!
 * Put her photos in the "images/" folder and update the "image" paths below
 * (e.g., "images/her-smile.jpg"), or use the on-page "Upload Photos" button.
 */

const PHOTO_GALLERY_DATA = [
  {
    id: 1,
    title: "The Smile That Lights My Whole World",
    category: "radiant",
    categoryLabel: "Radiant & Glam",
    subtitle: "Golden Hour Glow",
    date: "A Day I'll Never Forget",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80",
    note: "Every time you look this happy, the entire world fades into the background. Your smile is genuinely my favorite thing that exists.",
    thought: "The first thing that caught my breath was the effortless joy in your eyes. You have this quiet glow that makes everyone around you feel warm.",
    quote: "She has the kind of beauty that makes the stars jealous."
  },
  {
    id: 2,
    title: "Soft Mornings & Quiet Grace",
    category: "soft",
    categoryLabel: "Soft & Peaceful",
    subtitle: "Natural & Unfiltered",
    date: "Peaceful Moments",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80",
    note: "You don't need makeup, fancy lights, or perfection. In your quiet, sleepy, natural state, you are the most breathtaking woman alive.",
    thought: "Just sitting beside you in silence feels like finding home after a lifetime of searching.",
    quote: "In a world of noise, you are my favorite sanctuary."
  },
  {
    id: 3,
    title: "Uncontrollable Laughter",
    category: "playful",
    categoryLabel: "Cute & Silly",
    subtitle: "Pure Happiness",
    date: "An Inside Joke",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
    note: "When you laugh so hard your nose scrunches and your eyes turn into little crescents... that's the sound I want to hear for the rest of my life.",
    thought: "I love that you can be completely yourself around me. Your silliness is one of a million reasons I fell in love with you.",
    quote: "Your laughter is my favorite song."
  },
  {
    id: 4,
    title: "Eyes That Tell A Thousand Stories",
    category: "radiant",
    categoryLabel: "Radiant & Glam",
    subtitle: "Dressed to Stun",
    date: "Dinner Night",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",
    note: "I walked in, caught a glimpse of you, and forgot how to speak for a solid 5 seconds. You are simply out of this world.",
    thought: "How did I get this lucky? She chose me, and I will spend every single day making sure she never regrets it.",
    quote: "You don't just turn heads; you stop hearts."
  },
  {
    id: 5,
    title: "Lost in Her Dreams",
    category: "passionate",
    categoryLabel: "Passionate & Glowing",
    subtitle: "In Her Element",
    date: "Doing What She Loves",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=900&q=80",
    note: "Watching you speak passionately about what you love is magnetic. Your ambition, your curiosity, and your drive inspire me endlessly.",
    thought: "You are as brilliant and capable as you are beautiful. Never let anyone dim that fierce, passionate flame.",
    quote: "Grace in her soul, fire in her heart."
  },
  {
    id: 6,
    title: "Cute Little Pout",
    category: "playful",
    categoryLabel: "Cute & Silly",
    subtitle: "Adorable Moments",
    date: "A Silly Candid",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80",
    note: "Even when you're playfully annoyed or making funny faces, you're criminally adorable. I can never take you seriously when you pout like this!",
    thought: "This photo always brings the biggest grin to my face whenever I open my phone on a stressful day.",
    quote: "Cuteness overload in every single frame."
  },
  {
    id: 7,
    title: "Sun-Kissed & Carefree",
    category: "soft",
    categoryLabel: "Soft & Peaceful",
    subtitle: "Golden Breeze",
    date: "Summer Day",
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=900&q=80",
    note: "The sunlight hits your hair, the wind plays with your curls, and time stands completely still. Just pure poetry.",
    thought: "This moment captured everything I adore about your spirit: free, gentle, and utterly unforgettable.",
    quote: "You carry sunshine with you wherever you walk."
  },
  {
    id: 8,
    title: "The Girl Who Stole My Heart",
    category: "passionate",
    categoryLabel: "Passionate & Glowing",
    subtitle: "Confidence & Allure",
    date: "My Forever Favorite",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=900&q=80",
    note: "No words, no captions, no poems could ever do justice to how much you mean to me. You are my greatest blessing.",
    thought: "Out of 8 billion people on this planet, my heart picked you without a second of hesitation.",
    quote: "You are, and always will be, my masterpiece."
  }
];

// Romantic compliments bank for the interactive button
const SWEET_COMPLIMENTS = [
  "Your smile could easily end wars and light up dark skies.",
  "I don't think you realize how effortlessly gorgeous you are.",
  "You're not just beautiful on the outside; your heart is pure gold.",
  "Looking at your photos always gives me the sweetest butterflies.",
  "If beauty were a crime, you'd be serving a life sentence.",
  "My favorite view in the entire universe will always be you.",
  "You make the mundane moments feel like romantic movie scenes.",
  "Your laugh is my absolute favorite sound in existence.",
  "Thank you for being my dream girl every single day.",
  "You have this quiet confidence and grace that takes my breath away.",
  "Every picture of you deserves its own exhibition in Paris.",
  "I fall in love with you all over again every time I see your face."
];
