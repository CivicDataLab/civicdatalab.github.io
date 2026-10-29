// Per-cohort settings. scriptUrl is the Google Apps Script web app that appends
// submissions to that cohort's Sheet; setup: scripts/cohort-apps-script/README.md.
// An empty scriptUrl makes the forms show "Form not connected yet".

export const TECH4DEV = {
  // Applications close 7 Nov, 11:59 PM IST.
  deadline: new Date('2026-11-07T23:59:59+05:30'),
  scriptUrl: 'https://script.google.com/macros/s/AKfycbzlPWzrK_l7UFY0rDjD9QkyaalkmQNpuYOvu9683m5bHis-40JSJEfePRQRRtmRTEiS/exec'
};

export const UNDP = {
  deadline: null, // not announced yet; null hides the countdown
  scriptUrl: 'https://script.google.com/macros/s/AKfycbyQ-83ZwdLEPasHzTDaW9t1ig-tBH5fxXoPnPsMw1m7Lo200gG-ItCP9bo2f8mfwQ-D/exec'
};
