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

// UNDP baseline assessment questionnaire (Inception Report, Annex A).
// Extra kinds used here: `multi` = tick boxes (`max` caps how many; `exclusive`
// options must be chosen on their own), `optional`, and `mustAgree` = the error
// shown unless the first option is chosen.
export const UNDP_SECTIONS = [
  {
    title: 'About your organisation',
    fields: [
      { name: 'full_name', label: 'Your full name', autoComplete: 'name' },
      { name: 'role', label: 'Your role in the organisation', autoComplete: 'organization-title' },
      { name: 'email', label: 'Email address', type: 'email', autoComplete: 'email' },
      { name: 'phone', label: 'Phone number with country code', type: 'tel', autoComplete: 'tel' },
      { name: 'organisation', label: 'Organisation name', autoComplete: 'organization' },
      {
        name: 'registration_type',
        label: 'Registration type',
        options: ['Trust', 'Society', 'Section 8 company', 'Unregistered collective or community group', OTHER]
      },
      { name: 'geography', label: 'Which states or districts does your organisation work in?' },
      {
        name: 'areas_of_work',
        label: 'What are your organisation’s main areas of work?',
        multi: true,
        max: 2,
        options: [
          'Education',
          'Skill development',
          'Women’s economic empowerment',
          'Livelihoods',
          'Health',
          'Agriculture',
          'Disability inclusion',
          'Governance and rights',
          'Climate and environment',
          OTHER
        ]
      },
      {
        name: 'community_led',
        label: 'Is your organisation led by members of the communities it primarily serves?',
        optional: true,
        options: ['Yes', 'No', 'Unsure', 'Prefer not to say']
      }
    ]
  },
  {
    title: 'Current digital and AI use',
    fields: [
      {
        name: 'ai_uses',
        label: 'What does your organisation use AI tools for?',
        multi: true,
        hint: 'Select either of the last two options on its own.',
        exclusive: ['We do not currently use AI tools', 'Not sure whether the tools we use include AI'],
        options: [
          'Drafting proposals, reports or other documents',
          'Researching topics and summarising information',
          'Analysing data or creating charts',
          'Creating social media posts, presentations or outreach materials',
          'Translating content or working in local languages',
          'Managing routine tasks and team workflows',
          'Supporting communities through chatbots, advisory tools or other services',
          OTHER,
          'We do not currently use AI tools',
          'Not sure whether the tools we use include AI'
        ]
      },
      {
        name: 'barriers',
        label: 'What are the main barriers to using AI effectively?',
        multi: true,
        max: 3,
        hint: 'Select “No major barriers” or “Unsure” on its own.',
        exclusive: ['No major barriers', 'Unsure'],
        options: [
          'Limited skills or training',
          'Limited staff time',
          'Tool or subscription costs',
          'Unreliable internet or limited device access',
          'Limited local-language support',
          'Difficulty checking accuracy',
          'Privacy or consent concerns',
          'Bias or safety concerns',
          'Unsure where AI could help our work',
          'No major barriers',
          OTHER,
          'Unsure'
        ]
      },
      {
        name: 'checking_confidence',
        label: 'How confident are staff in checking AI output before using it?',
        options: ['Not at all', 'Slightly', 'Moderately', 'Very', 'Have not tried']
      },
      {
        name: 'useful_skills',
        label: 'Which skills would be most useful to your organisation?',
        multi: true,
        options: [
          'Writing proposals, reports and other documents',
          'Analysing data and creating charts',
          'Communication and storytelling',
          'Managing workflows and collaborating',
          'Using AI responsibly, including checking outputs and protecting data',
          OTHER
        ]
      },
      {
        name: 'learning_methods',
        label: 'Which learning methods would help you most?',
        multi: true,
        max: 2,
        options: [
          'Live demonstrations',
          'Guided hands-on practice',
          'Short recorded lessons',
          'Step-by-step written guides',
          'Troubleshooting clinics',
          'Learning with other CSOs'
        ]
      }
    ]
  },
  {
    title: 'Access and participation',
    fields: [
      {
        name: 'device_access',
        label: 'What device and internet access will the nominated learner have?',
        options: [
          'Regular access to a computer and reliable internet',
          'Regular access to a smartphone and reliable internet, but no computer',
          'Access to a shared device and internet at agreed times',
          'Limited or unreliable device or internet access',
          'Not yet confirmed'
        ]
      },
      {
        name: 'language',
        label: 'Which language would be most comfortable for learning?',
        options: ['English', 'Hindi', 'Another language: please specify']
      },
      {
        name: 'support',
        label: 'What support would help the learner participate?',
        multi: true,
        hint: 'Select “No additional support needed” on its own.',
        exclusive: ['No additional support needed'],
        options: [
          'Captions or transcripts',
          'Screen reader accessible materials',
          'Downloadable materials for low-bandwidth use',
          'Flexible session timings',
          'Translation or language support',
          'No additional support needed',
          OTHER
        ]
      },
      {
        name: 'same_person',
        label: 'Can the same person attend throughout the programme and practise between sessions?',
        options: ['Yes', 'Yes, with scheduling support', 'Not currently', 'Not yet confirmed']
      },
      {
        name: 'delhi_workshop',
        label:
          'If invited to the two-day Delhi/NCR workshop, could the learner attend with travel paid by their organisation or themselves?',
        hint: 'Your response will help us plan participation. The ability to pay for travel is not a measure of merit.',
        options: [
          'Yes',
          'Possibly, depending on dates and travel costs',
          'No, travel costs would prevent attendance',
          'Not yet confirmed',
          'We would prefer virtual participation'
        ]
      }
    ]
  },
  {
    title: 'Consent',
    fields: [
      {
        name: 'consent',
        label: 'Do you consent to the use of your responses for this assessment?',
        mustAgree: 'We can only use your responses with your consent. Please choose “Yes” to submit.',
        options: [
          'Yes, I consent to CivicDataLab and UNDP India accessing, reviewing and using the information submitted in this form to assess training needs, plan the programme and contact us about participation.',
          'No, I do not consent.'
        ]
      },
      {
        name: 'case_study',
        label: 'Would your organisation consider sharing a use case, blog or learning story from the programme?',
        hint: 'Case studies may appear in programme reports, websites and communication materials. Consent is voluntary and does not affect selection. Personal details, photographs and confidential information are not covered by this consent.',
        options: ['Yes, we would be interested', 'Maybe, after discussing the details', 'No, we would prefer not to']
      },
      {
        name: 'anything_else',
        label: 'Is there anything else we should know about your learning or participation needs?',
        optional: true,
        hint: 'Mention any need or barrier not covered above. Please do not include confidential information or personal details of beneficiaries.',
        paragraph: true
      }
    ]
  }
];
