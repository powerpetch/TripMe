const { body } = require('express-validator');

const validateTrip = [
  body('country').notEmpty().withMessage('Country is required'),

  body('travelPeriod.startDate')
    .exists({ checkFalsy: true }).withMessage('Start date is required')
    .isISO8601().withMessage('Invalid start date format'),

  body('travelPeriod.endDate')
    .exists({ checkFalsy: true }).withMessage('End date is required')
    .isISO8601().withMessage('Invalid end date format'),

  body('visitedPlaces')
    .isArray({ min: 1 }).withMessage('At least one visited place is required'),

  body('accommodations')
    .isArray({ min: 1 }).withMessage('At least one accommodation is required'),

  body('transportations')
    .isArray({ min: 1 }).withMessage('At least one transportation method is required'),

  body('budgetItems')
    .isArray({ min: 1 }).withMessage('At least one budget item is required'),
];

module.exports = validateTrip;
