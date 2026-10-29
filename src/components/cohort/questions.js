export const OTHER = 'Other: please specify';

// Field kinds: `options` = single choice, `checks` = required checkboxes
// ([name, text, short column label]), `words` = paragraph with a suggested
// word limit, otherwise a one-line input. The Sheet's column headers are the
// numbered questions ("Q1. Your full name"), in this order.
export const TECH4DEV_SECTIONS = [
  {
    title: 'Your details & organisation',
    fields: [
      { name: 'full_name', label: 'Your full name', autoComplete: 'name' },
      { name: 'role', label: 'Your role in the organisation', autoComplete: 'organization-title' },
      { name: 'email', label: 'Email address', type: 'email', autoComplete: 'email' },
      { name: 'phone', label: 'Phone number with country code', type: 'tel', autoComplete: 'tel' },
      { name: 'organisation', label: 'Organisation name', autoComplete: 'organization' },
      { name: 'registration_type', label: 'Registration type', options: ['Trust', 'Society', 'Section 8 company', OTHER] },
      { name: 'geography', label: 'Which states or districts do you currently work in?' },
      {
        name: 'annual_budget',
        label: 'What was your annual operating budget in the latest audited financial year?',
        options: [
          'Below ₹50 lakh',
          '₹50 lakh to below ₹1 crore',
          '₹1 crore to below ₹5 crore',
          '₹5 crore or above',
          'Audited figures are not yet available'
        ]
      },
      {
        name: 'domain',
        label: 'Which domain does your proposed AI use case address?',
        options: ['Health', 'Agriculture', 'Public services', 'More than one', OTHER]
      },
      {
        name: 'programmes',
        label: 'Briefly describe your programmes and whom they serve.',
        hint: 'Include your approximate annual reach among beneficiaries or frontline teams.',
        words: 50
      }
    ]
  },
  {
    title: 'Your AI / tech solution & language need',
    intro:
      'The cohort supports existing AI solutions and active development or pilots. It does not fund new solutions from the idea stage.',
    fields: [
      {
        name: 'solution_stage',
        label: 'What stage is your AI solution at?',
        options: [
          'Deployed and regularly used by intended users',
          'Being piloted with intended users',
          'Working prototype, not yet tested with intended users',
          'Under active development, with no working prototype yet',
          'Idea or planning stage only',
          'We do not currently have an AI solution'
        ]
      },
      {
        name: 'solution_description',
        label: 'Briefly describe your AI solution.',
        hint: 'What does it do, who uses it, and which platform and languages does it support? Add a demo link if available.',
        words: 75
      },
      { name: 'languages', label: 'Which languages or dialects do your users primarily speak?' },
      {
        name: 'language_gaps',
        label: 'What language or interface gaps have you identified?',
        hint: 'Consider local languages, dialects, voice access and ease of use.',
        options: [
          'Clear gaps, supported by user feedback or usage data',
          'Gaps observed by our team, but not yet tested with users',
          'Unsure—we need help assessing this',
          'No significant gaps identified'
        ]
      },
      {
        name: 'main_improvement',
        label: 'What is the main improvement you want to make through this cohort?',
        hint: 'Consider language or voice access, accuracy, trust, adoption, workflow fit or feedback. Share one example of the challenge.',
        words: 50
      }
    ]
  },
  {
    title: 'Field access, team & sustainability',
    fields: [
      {
        name: 'testing',
        label: 'Can you organise testing with beneficiaries or frontline teams during the cohort?',
        hint: 'The programme aims to build readiness for a pilot with 50–100 users.',
        options: [
          'Yes, through our existing field or community network',
          'Yes, through a partner organisation',
          'Likely, but arrangements need confirmation',
          'We would need support to organise this',
          'No, not currently'
        ]
      },
      {
        name: 'tech_lead',
        label: 'Can you assign a Tech Lead or Product Owner with approximately 50% availability over six months?',
        options: [
          'Yes, a lead and backup are identified, and availability is confirmed',
          'A lead is identified; backup or availability needs confirmation',
          'We can assign a lead before the cohort begins',
          'We cannot commit this staff time'
        ]
      },
      {
        name: 'leadership_approval',
        label:
          'Has leadership approved participation, including staff time, the ₹1 lakh programme fee and travel to Delhi for the kick-off?',
        options: [
          'Yes, approval is confirmed',
          'Leadership is supportive; formal approval is pending',
          'Not yet discussed internally',
          'We cannot commit at this stage'
        ]
      },
      {
        name: 'maintenance',
        label: 'What arrangements exist for maintaining the solution after the cohort?',
        options: [
          'An owner and maintenance budget or plan are in place',
          'An owner is identified; the maintenance plan needs work',
          'We have an initial plan but no confirmed owner',
          'We need support to develop these arrangements'
        ]
      }
    ]
  },
  {
    title: 'Consent',
    fields: [
      {
        name: 'declaration',
        label: 'Declaration and acknowledgment',
        checks: [
          [
            'declaration_accurate',
            'I confirm that the information provided is accurate to the best of my knowledge and that I am authorised to submit it on behalf of my organisation.',
            'Information is accurate and I am authorised'
          ],
          [
            'declaration_no_guarantee',
            'I understand that submitting this form does not guarantee selection, funding or any other commitment from the programme partners.',
            'Submission does not guarantee selection'
          ]
        ]
      },
      {
        name: 'consent',
        label: 'Consent to review your application',
        checks: [
          [
            'consent_review',
            'I consent to CivicDataLab, Gram Vaani and Tech4Dev accessing, reviewing and using the information submitted in this form to assess our application and contact us about the cohort.',
            'I consent'
          ]
        ]
      }
    ]
  }
];
