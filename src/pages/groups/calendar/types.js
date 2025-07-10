/**
 * @typedef {'week' | 'month'} CalendarViewType
 */

/**
 * @typedef {Object} Event
 * @property {string} id
 * @property {string} title
 * @property {Date} startDate
 * @property {Date} endDate
 * @property {boolean} allDay
 * @property {string} [description]
 * @property {boolean} [postedToNewsFeed]
 * @property {boolean} [rsvp]
 * @property {'none' | 'zoom' | 'teams'} [webConferencing]
 * @property {boolean} [repeat]
 * @property {string} [repeatFrequency]
 * @property {number} [repeatInterval]
 * @property {'never' | 'after' | 'on'} [repeatEndType]
 * @property {Date|null} [repeatEndDate]
 * @property {number} [repeatEndCount]
 */

/**
 * @typedef {'create' | 'edit' | 'delete' | 'view' | 'event-list'} ModalMode
 */
