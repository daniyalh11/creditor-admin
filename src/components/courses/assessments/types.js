/**
 * @typedef {'Quiz' | 'Essay' | 'Assignment' | 'Survey' | 'Debate'} AssessmentType
 * @typedef {'published' | 'draft'} AssessmentStatus
 * @typedef {'Easy' | 'Medium' | 'Hard'} AssessmentDifficulty
 */

/**
 * Describes the structure of an assessment object.
 * This object holds all the details for a single assessment like a quiz, essay, etc.
 *
 * @typedef {object} Assessment
 * @property {string} id - The unique identifier for the assessment.
 * @property {string} title - The title of the assessment.
 * @property {string} description - A brief description of the assessment.
 * @property {AssessmentType} type - The type of the assessment.
 * @property {number} duration - The duration of the assessment in minutes.
 * @property {AssessmentStatus} status - The current status of the assessment (e.g., published or draft).
 * @property {number} [maxScore] - The maximum possible score (optional, not applicable to all types).
 * @property {string} [format] - The format of the assessment (e.g., 'Multiple Choice', 'Practical').
 * @property {AssessmentDifficulty} [difficulty] - The difficulty level of the assessment.
 * @property {string} [topic] - The topic or subject matter of the assessment.
 * @property {number} [questions] - The total number of questions.
 * @property {string} [attempts] - The number of attempts allowed (e.g., 'Unlimited', '1').
 * @property {number} [wordLimit] - The word limit for essay or text-based assessments.
 * @property {string} [surveyType] - Specific type for surveys (e.g., 'Feedback', 'Poll').
 * @property {string} [responseLimit] - The limit on the number of responses for a survey.
 */

/**
 * Describes a category that groups multiple assessments.
 * For example, a "Week 1" category could contain a quiz and an assignment.
 *
 * @typedef {object} AssessmentCategory
 * @property {string} id - The unique identifier for the category.
 * @property {string} title - The title of the category (e.g., "Module 3: Advanced Topics").
 * @property {string} description - A brief description of the category.
 * @property {string} icon - A string representing the icon to be displayed (e.g., an emoji '📚' or an icon name 'BookOpen').
 * @property {Assessment[]} assessments - An array of Assessment objects belonging to this category.
 * @property {boolean} expanded - A flag to determine if this category is shown as expanded or collapsed in the UI.
 */

// This file defines data structures using JSDoc.
// Adding an empty export statement ensures it is treated as a module.
export {};