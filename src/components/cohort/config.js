// Per-cohort settings. scriptUrl is the Google Apps Script web app that appends
// submissions to that cohort's Sheet; setup: scripts/cohort-apps-script/README.md.
// An empty scriptUrl makes the forms show "Form not connected yet".

export const TECH4DEV = {
  // Applications close 25 Nov, 11:59 PM IST.
  deadline: new Date('2026-11-25T23:59:59+05:30'),
  scriptUrl: 'https://script.google.com/macros/s/AKfycbw3dA1cYIHNbALkQ4oyFARyF1ro7clobXMl6ywXF_SRatJoT96wd1wC8Rq9hJAr7X2X/exec'
};

export const UNDP = {
  // Applications close 11 Dec, 11:59 PM IST.
  deadline: new Date('2026-12-11T23:59:59+05:30'),
  scriptUrl: 'https://script.google.com/macros/s/AKfycbyUKn1v-K69KEfbLhGeBRJ92HjzRVZXSltjtKGxbN19n7uPu7UsSHyqHBARUyxkj3C4/exec'
};
