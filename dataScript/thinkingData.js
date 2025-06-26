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
db.getCollection('Thinking').insertMany([
  {
    _id: '68560e5713733d71f1bdd9c1',
    title: "Benefits of Morning Meditation",
    detail: "Spending ten minutes each morning meditating can significantly boost focus, reduce stress, and set a positive tone for the day. It not only helps with mental relaxation but also improves emotional regulation, allowing one to handle daily challenges more gracefully.",
    createdAt: new Date("2022-01-01"),
    updatedAt: new Date("2022-01-01")
  },
  {
    _id: '68560e5713733d71f1bdd9c2',
    title: "Practicing Minimalist Living",
    detail: "Try to declutter unnecessary possessions, tidy up your living space, and focus on what truly matters. Minimalism isn't just about material things; it's a mindset that encourages us to examine our consumption habits and find inner contentment.",
    createdAt: new Date("2022-01-02"),
    updatedAt: new Date("2022-01-02")
  },
  {
    _id: '68560e5713733d71f1bdd9c3',
    title: "Exploring Future Work Models",
    detail: "Remote work and flexible schedules are changing our perception of careers. Future work will increasingly emphasize collaboration, automation, and continuous learning. Adapting to these changes will be key for both individual and organizational success.",
    createdAt: new Date("2023-01-03"),
    updatedAt: new Date("2023-01-03")
  },
  {
    _id: '68560e5713733d71f1bdd9c4',
    title: "Tips for Improving Reading Efficiency",
    detail: "Active reading, note-taking, and regular review are effective methods for improving reading efficiency. Experiment with different genres, expand your knowledge, and share insights with others to deepen your understanding of the content.",
    createdAt: new Date("2025-01-04"),
    updatedAt: new Date("2025-01-04")
  },
  {
    _id: '68560e5713733d71f1bdd9c5',
    title: "The Importance of Digital Detox",
    detail: "Regularly disconnecting from social media and electronic devices helps reduce digital fatigue, improve sleep quality, and increase connection with the real world. Finding alternative activities, like outdoor walks or in-person conversations, can bring more fulfillment.",
    createdAt: new Date("2025-01-05"),
    updatedAt: new Date("2025-01-05")
  },
  {
    _id: '68560e5713733d71f1bdd9c6',
    title: "Getting Started with Creative Writing",
    detail: "Starting a creative writing project can seem daunting, but beginning small, practicing daily, and embracing imperfection are key. Recording inspirations, reading various styles, and seeking feedback from peers can all help you progress.",
    createdAt: new Date("2024-03-15"),
    updatedAt: new Date("2024-03-15")
  },
  {
    _id: '68560e5713733d71f1bdd9c7',
    title: "New Approaches to Time Management",
    detail: "The Pomodoro Technique, Eisenhower Matrix, and Pareto Principle are all effective time management tools. The key is to find what works best for you, prioritize important tasks, and learn to take breaks when needed to maintain efficiency and avoid burnout.",
    createdAt: new Date("2024-02-20"),
    updatedAt: new Date("2024-02-20")
  }
]);