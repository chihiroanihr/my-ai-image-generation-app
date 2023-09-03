import { surpriseMePrompts } from "../constants";

/**
 * Get random prompt utility function used for input text for generating AI-image.
 *
 * @param {String} prompt - initial input text prompt
 * @returns {String} Randomly generated input text from the prompt.
 */
export function getRandomPrompt(prompt) {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
  const randomPrompt = surpriseMePrompts[randomIndex];

  // Check to avoid getting same random prompt more than 2 times.
  if (randomPrompt === prompt) return getRandomPrompt(prompt); // Re-call the function to re-do it.

  return randomPrompt;
}
