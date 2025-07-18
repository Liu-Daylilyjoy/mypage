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
db.getCollection('Photo').insertMany([
  {
    _id: '68560e5713733d71f1bdd9c1',
    title: "Benefits of Morning Meditation",
    description: "Spending ten minutes each morning meditating can significantly boost focus, reduce stress, and set a positive tone for the day. It not only helps with mental relaxation but also improves emotional regulation, allowing one to handle daily challenges more gracefully.",
    createdAt: new Date("2022-01-01"),
    path: "68560e5713733d71f1bdd9c1.jpg"
  },
  {
    _id: '68560e5713733d71f1bdd9c2',
    title: "Practicing Minimalist Living",
    description: "Try to declutter unnecessary possessions, tidy up your living space, and focus on what truly matters. Minimalism isn't just about material things; it's a mindset that encourages us to examine our consumption habits and find inner contentment.",
    createdAt: new Date("2022-01-02"),
    path: "68560e5713733d71f1bdd9c2.jpg"
  },
  {
    _id: '68560e5713733d71f1bdd9c3',
    title: "Exploring Future Work Models",
    description: "Remote work and flexible schedules are changing our perception of careers. Future work will increasingly emphasize collaboration, automation, and continuous learning. Adapting to these changes will be key for both individual and organizational success.",
    createdAt: new Date("2023-01-03"),
    path: "68560e5713733d71f1bdd9c3.png"
  },
  {
    _id: '68560e5713733d71f1bdd9c4',
    title: "Tips for Improving Reading Efficiency",
    description: "Active reading, note-taking, and regular review are effective methods for improving reading efficiency. Experiment with different genres, expand your knowledge, and share insights with others to deepen your understanding of the content.",
    createdAt: new Date("2025-01-04"),
    path: "68560e5713733d71f1bdd9c4.png"
  },
  {
    _id: '68560e5713733d71f1bdd9c5',
    title: "The Importance of Digital Detox",
    description: "Regularly disconnecting from social media and electronic devices helps reduce digital fatigue, improve sleep quality, and increase connection with the real world. Finding alternative activities, like outdoor walks or in-person conversations, can bring more fulfillment.",
    createdAt: new Date("2025-01-05"),
    path: "68560e5713733d71f1bdd9c5.png"
  },
  {
    _id: '68560e5713733d71f1bdd9c6',
    title: "Getting Started with Creative Writing",
    description: "Starting a creative writing project can seem daunting, but beginning small, practicing daily, and embracing imperfection are key. Recording inspirations, reading various styles, and seeking feedback from peers can all help you progress.",
    createdAt: new Date("2024-03-15"),
    path: "68560e5713733d71f1bdd9c6.png"
  },
  {
    _id: '68560e5713733d71f1bdd9c7',
    title: "New Approaches to Time Management",
    description: "The Pomodoro Technique, Eisenhower Matrix, and Pareto Principle are all effective time management tools. The key is to find what works best for you, prioritize important tasks, and learn to take breaks when needed to maintain efficiency and avoid burnout.",
    createdAt: new Date("2024-02-20"),
    path: "68560e5713733d71f1bdd9c7.png"
  },
  {
    _id: '68560e5713733d71f1bdd9c8',
    title: "The Power of Positive Thinking",
    description: "Positive thinking can significantly impact your life. By focusing on gratitude, optimism, and self-improvement, you can reduce stress, enhance relationships, and increase overall well-being. Cultivating a positive mindset is a powerful tool for personal growth and success.",
    createdAt: new Date("2024-02-20"),
    path: "68560e5713733d71f1bdd9c8.png"
  },
  {
    _id: '68560e5713733d71f1bdd9c9',
    title: "The Importance of Self-Care",
    description: "Self-care is essential for maintaining physical and mental health. Regular exercise, adequate sleep, and a balanced diet contribute to overall well-being. Taking time for relaxation and mindfulness can help reduce stress and improve emotional resilience.",
    createdAt: new Date("2024-02-20"),
    path: "68560e5713733d71f1bdd9c9.jpg"
  },
  {
    _id: '68560e5713733d71f1bdd9ca',
    title: "Reading One Hundred Years of Solitude",
    description: "One Hundred Years of Solitude is a masterpiece of Latin American literature, exploring themes of love, time, and the human condition. Reading it can provide a deep understanding of the complexities of human relationships and the passage of time.",
    createdAt: new Date("2026-12-10"),
    path: "68560e5713733d71f1bdd9ca.jpg"
  },
  {
    _id: '68560e5713733d71f1bdd9ce',
    title: "Exploring Urban Architecture",
    description: "Discover the beauty of city skylines and unique architectural styles from around the world. This collection captures the essence of urban landscapes, blending modernity with tradition.",
    createdAt: new Date("2023-05-12"),
    path: "68560e5713733d71f1bdd9ce.jpg"
  },
  {
    _id: '68560e5713733d71f1bdd9cf',
    title: "Serenity of Mountain Lakes",
    description: "Experience the tranquility of crystal-clear mountain lakes surrounded by lush forests and towering peaks. Perfect for nature lovers seeking peace and inspiration.",
    createdAt: new Date("2022-08-21"),
    path: "68560e5713733d71f1bdd9cf.jpg"
  },
  {
    _id: '68560e5713733d71f1bdd9d0',
    title: "Golden Hour in the Countryside",
    description: "Capture the magical moments of sunrise and sunset in the countryside, where golden light bathes fields and cottages in warmth and nostalgia.",
    createdAt: new Date("2023-09-14"),
    path: "68560e5713733d71f1bdd9d0.jpg"
  },
  {
    _id: '68560e5713733d71f1bdd9d1',
    title: "Wildlife Wonders",
    description: "A close-up look at the fascinating world of wildlife, from majestic eagles in flight to playful foxes in the snow. Each photo tells a story of nature's diversity.",
    createdAt: new Date("2022-11-03"),
    path: "68560e5713733d71f1bdd9d1.jpg"
  },
  {
    _id: '68560e5713733d71f1bdd9d2',
    title: "Blossoms in Spring",
    description: "Celebrate the arrival of spring with vibrant blossoms and colorful gardens. These photos capture the renewal and hope that comes with each new season.",
    createdAt: new Date("2024-03-22"),
    path: "68560e5713733d71f1bdd9d2.jpg"
  },
  {
    _id: '68560e5713733d71f1bdd9d3',
    title: "Winter Wonderland",
    description: "Step into a world of snow-covered trees, frozen lakes, and cozy cabins. This series brings out the quiet beauty and charm of winter landscapes.",
    createdAt: new Date("2023-12-18"),
    path: "68560e5713733d71f1bdd9d3.jpg"
  },
  {
    _id: '68560e5713733d71f1bdd9d4',
    title: "Street Life Stories",
    description: "Candid moments from bustling city streets, capturing the energy, diversity, and everyday life of people around the globe.",
    createdAt: new Date("2022-07-09"),
    path: "68560e5713733d71f1bdd9d4.jpg"
  },
  {
    _id: '68560e5713733d71f1bdd9d5',
    title: "Desert Dreams",
    description: "Explore the vastness and mystery of deserts, from rolling sand dunes to star-filled night skies. A tribute to the beauty of arid landscapes.",
    createdAt: new Date("2023-04-27"),
    path: "68560e5713733d71f1bdd9d5.jpg"
  },
  {
    _id: '68560e5713733d71f1bdd9d6',
    title: "Rainy Day Reflections",
    description: "Raindrops on windows, puddles on the street, and umbrellas in the crowd—these photos find beauty in the melancholy of rainy days.",
    createdAt: new Date("2022-10-15"),
    path: "68560e5713733d71f1bdd9d6.jpg"
  },
  {
    _id: '68560e5713733d71f1bdd9d7',
    title: "Night Lights",
    description: "A collection of cityscapes and landscapes illuminated by neon signs, street lamps, and the glow of the moon. Night photography at its finest.",
    createdAt: new Date("2023-06-30"),
    path: "68560e5713733d71f1bdd9d7.jpg"
  },
  {
    _id: '68560e5713733d71f1bdd9d8',
    title: "Seaside Serenity",
    description: "Gentle waves, sandy shores, and dramatic cliffs—these photos evoke the calm and majesty of the sea.",
    createdAt: new Date("2024-01-05"),
    path: "68560e5713733d71f1bdd9d8.jpg"
  },
  {
    _id: '68560e5713733d71f1bdd9d9',
    title: "Autumn Colors",
    description: "A celebration of fall foliage, with forests and parks ablaze in shades of red, orange, and gold.",
    createdAt: new Date("2023-10-11"),
    path: "68560e5713733d71f1bdd9d9.jpg"
  },
  {
    _id: '68560e5713733d71f1bdd9da',
    title: "Minimalist Moments",
    description: "Simplicity and elegance in photography—clean lines, open spaces, and subtle tones that invite contemplation.",
    createdAt: new Date("2022-09-19"),
    path: "68560e5713733d71f1bdd9da.jpg"
  },
  {
    _id: '68560e5713733d71f1bdd9db',
    title: "Festive Lights",
    description: "From lantern festivals to city holiday displays, these photos capture the joy and color of celebrations around the world.",
    createdAt: new Date("2023-12-24"),
    path: "68560e5713733d71f1bdd9db.jpg"
  },
  {
    _id: '68560e5713733d71f1bdd9dc',
    title: "Hidden Waterfalls",
    description: "Journey to secluded waterfalls tucked away in forests and mountains, where water cascades in breathtaking beauty.",
    createdAt: new Date("2022-06-17"),
    path: "68560e5713733d71f1bdd9dc.jpg"
  },
  {
    _id: '68560e5713733d71f1bdd9dd',
    title: "Portraits of Friendship",
    description: "Heartwarming portraits that celebrate the bonds of friendship, laughter, and shared adventures.",
    createdAt: new Date("2023-02-14"),
    path: "68560e5713733d71f1bdd9dd.jpg"
  },
  {
    _id: '68560e5713733d71f1bdd9de',
    title: "Vintage Vibes",
    description: "Photos with a retro feel, featuring classic cars, old buildings, and nostalgic color palettes.",
    createdAt: new Date("2022-04-08"),
    path: "68560e5713733d71f1bdd9de.jpg"
  },
  {
    _id: '68560e5713733d71f1bdd9df',
    title: "Cultural Festivals",
    description: "A vibrant look at traditional festivals, costumes, and performances from different cultures.",
    createdAt: new Date("2023-08-05"),
    path: "68560e5713733d71f1bdd9df.jpg"
  },
  {
    _id: '68560e5713733d71f1bdd9e0',
    title: "Majestic Mountains",
    description: "Towering peaks, misty valleys, and dramatic vistas—these photos showcase the awe-inspiring power of mountains.",
    createdAt: new Date("2024-02-01"),
    path: "68560e5713733d71f1bdd9e0.jpg"
  },
  {
    _id: '68560e5713733d71f1bdd9e1',
    title: "Sunflower Fields",
    description: "Endless fields of sunflowers basking in the summer sun, radiating warmth and happiness.",
    createdAt: new Date("2023-07-20"),
    path: "68560e5713733d71f1bdd9e1.jpg"
  }
]);