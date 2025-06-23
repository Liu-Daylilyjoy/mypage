/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use('mypage');

// Insert a few documents into the sales collection.
db.getCollection('Blog').insertMany([
  {
    title: "Basic Redstone Circuit Tutorial - [MC] Minecraft",
    description: "As a beginner, I've also learned from others' redstone tutorials. However, many tutorials are either too complex or too simple (just basic circuits without logic gates). This time, I decided to explain these amazing redstone circuits from my perspective, using the most straightforward language.",
    createdAt: new Date("2022-01-01"),
    updatedAt: new Date("2022-01-01")
  },
  {
    title: "Introduction to Home Flower Arranging",
    description: "Want to add a touch of nature and art to your home? This tutorial will guide you into the world of flower arranging, from selecting materials to color matching and styling techniques, teaching you how to decorate your living space with flowers and enhance your home's aesthetics. Even beginners can create stunning floral arrangements through this tutorial.",
    createdAt: new Date("2022-01-02"),
    updatedAt: new Date("2022-01-02")
  },
  {
    title: "Getting Started with Pixel Art",
    description: "Want to create retro-style pixel art yourself? This tutorial will guide you through the fascinating world of pixel art. Starting from basic concepts, we'll learn how to build unique digital images using simple blocks, master color usage and composition techniques, and unleash your unlimited creativity. Whether you're a drawing beginner or a digital artist seeking new challenges, you'll find joy in this tutorial and create your own pixel masterpieces.",
    createdAt: new Date("2023-01-03"),
    updatedAt: new Date("2023-01-03")
  },
  {
    _id: '68560e5713733d71f1bdd9c1',
    title: "Personal Blog Deployment for Beginners",
    description: "Want to have your own blog platform to share your thoughts, experiences, or creativity? This tutorial will guide you step by step on how to deploy a personal blog from scratch. We'll cover how to choose the right platform, configure domain names, and publish your first article, allowing you to easily build a professional and personalized online space without any programming background.",
    createdAt: new Date("2025-01-04"),
    updatedAt: new Date("2025-01-04")
  },
  {
    title: "Japanese Language Learning for Beginners",
    description: "Curious about Japanese language and culture? This tutorial will guide you from zero to start learning Japanese systematically. We'll cover basic pronunciation, common vocabulary, grammar structures, and incorporate Japanese cultural tidbits, allowing you to deeply understand this fascinating country while learning the language. Whether for travel, work, or interest, this tutorial will help you take your first steps in Japanese learning easily.",
    createdAt: new Date("2025-01-05"),
    updatedAt: new Date("2025-01-05")
  },
  {
    title: "AI Art Generation Guide",
    description: "Explore the unlimited possibilities of AI art! This tutorial will introduce you to mainstream AI art tools, from prompt writing to parameter adjustment and post-processing, teaching you step by step how to create stunning AI artworks. Whether you're an art enthusiast or professional designer, you'll find creative inspiration here.",
    createdAt: new Date("2024-03-15"),
    updatedAt: new Date("2024-03-15")
  },
  {
    title: "Coffee Appreciation and Brewing",
    description: "Step into the aromatic world of coffee! From coffee bean selection and roasting to brewing techniques, this tutorial will comprehensively introduce coffee appreciation and brewing methods. You'll learn to distinguish coffee flavors from different regions and master professional brewing techniques like hand drip and espresso, becoming a true coffee connoisseur.",
    createdAt: new Date("2024-02-20"),
    updatedAt: new Date("2024-02-20")
  },
  {
    title: "Photography Composition Techniques",
    description: "Elevate your photography skills! This tutorial will delve into core principles of photographic composition, from golden ratio to leading lines, from color matching to light and shadow usage, helping you master professional photographers' composition techniques to make your works more artistic and expressive.",
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-10")
  },
  {
    title: "Practical Python Data Analysis",
    description: "Master data analysis with Python! This tutorial will teach you how to process, analyze, and visualize data using Python. From basic library usage to practical project cases, helping you quickly grasp core data analysis skills and enhance your career competitiveness.",
    createdAt: new Date("2023-12-05"),
    updatedAt: new Date("2023-12-05")
  },
  {
    title: "Home Fitness Guide",
    description: "Get fit at home! This tutorial will provide you with a complete home workout plan, including bodyweight exercises, small equipment usage, and dietary recommendations. Whether you're a fitness beginner or experienced, you'll find a training plan that suits you.",
    createdAt: new Date("2023-11-18"),
    updatedAt: new Date("2023-11-18")
  },
  {
    title: "Digital Marketing Basics",
    description: "Master core digital marketing skills! This tutorial will introduce SEO optimization, social media marketing, content marketing, and other digital marketing strategies, helping you understand how to promote products and services through online channels and enhance brand influence.",
    createdAt: new Date("2023-10-22"),
    updatedAt: new Date("2023-10-22")
  },
  {
    title: "UI Design Principles",
    description: "Create excellent user interfaces! This tutorial will deeply explain core UI design principles, including visual hierarchy, color theory, typography techniques, helping you master essential skills of professional UI designers and create both beautiful and functional interface designs.",
    createdAt: new Date("2023-09-30"),
    updatedAt: new Date("2023-09-30")
  },
  {
    title: "Personal Finance Basics",
    description: "Start your financial journey! This tutorial will introduce basic concepts of personal finance, including savings, investments, insurance, and other aspects, helping you establish correct financial concepts and achieve financial freedom goals.",
    createdAt: new Date("2023-08-15"),
    updatedAt: new Date("2023-08-15")
  },
  {
    title: "Writing Skills Enhancement",
    description: "Improve your writing skills! This tutorial will share core writing techniques, from article structure to language expression, from content creation to editing and polishing, helping you master professional writing essentials and create engaging articles.",
    createdAt: new Date("2023-07-20"),
    updatedAt: new Date("2023-07-20")
  },
  {
    title: "Video Editing Basics",
    description: "Become a video editing expert! This tutorial will teach you basic knowledge and skills of video editing, from software usage to transition effects, from audio processing to special effects addition, helping you quickly master core video production skills.",
    createdAt: new Date("2023-06-25"),
    updatedAt: new Date("2023-06-25")
  },
  {
    title: "Basic Cooking Techniques",
    description: "Master basic cooking skills! This tutorial will introduce core cooking techniques, including knife skills, heat control, seasoning methods, helping you improve your culinary skills and create delicious home-cooked meals.",
    createdAt: new Date("2023-05-12"),
    updatedAt: new Date("2023-05-12")
  },
  {
    title: "Time Management Methods",
    description: "Improve your work efficiency! This tutorial will share practical time management techniques, including task planning, priority sorting, focus enhancement methods, helping you better balance work and life.",
    createdAt: new Date("2023-04-18"),
    updatedAt: new Date("2023-04-18")
  },
  {
    title: "Mental Health Guide",
    description: "Focus on your mental health! This tutorial will introduce practical techniques for stress management, emotional regulation, and psychological adjustment, helping you build a positive and healthy mindset and improve life quality.",
    createdAt: new Date("2023-03-22"),
    updatedAt: new Date("2023-03-22")
  },
  {
    title: "Travel Photography Tips",
    description: "Capture amazing moments during your travels! This tutorial will share practical travel photography tips, including equipment selection, composition methods, and light usage, helping you take memorable travel photos.",
    createdAt: new Date("2023-02-28"),
    updatedAt: new Date("2023-02-28")
  },
  {
    title: "Programming Mindset Development",
    description: "Develop your programming mindset! This tutorial will introduce core concepts of programming thinking, including algorithmic thinking, problem decomposition, logical reasoning, helping you build systematic programming thought patterns.",
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2023-01-15")
  },
  {
    title: "Music Production Basics",
    description: "Start your music creation journey! This tutorial will introduce you to basic knowledge of music production, including arrangement, mixing, recording techniques, helping you create your own musical works.",
    createdAt: new Date("2022-12-10"),
    updatedAt: new Date("2022-12-10")
  },
  {
    title: "Gardening Guide",
    description: "Create your green space! This tutorial will introduce basic gardening knowledge, including plant selection, soil management, watering and fertilizing techniques, helping you create a beautiful home garden.",
    createdAt: new Date("2022-11-05"),
    updatedAt: new Date("2022-11-05")
  },
  {
    title: "Public Speaking Enhancement",
    description: "Improve your public speaking ability! This tutorial will share core speaking techniques, including content organization, expression methods, body language, helping you become a confident speaker.",
    createdAt: new Date("2022-10-20"),
    updatedAt: new Date("2022-10-20")
  },
  {
    title: "Handicraft Tutorial",
    description: "Release your creativity! This tutorial will introduce various handicraft techniques, including paper art, fabric art, woodworking, helping you create unique handmade works.",
    createdAt: new Date("2022-09-15"),
    updatedAt: new Date("2022-09-15")
  }
]);