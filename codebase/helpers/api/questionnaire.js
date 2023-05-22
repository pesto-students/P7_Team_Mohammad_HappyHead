import mongoose from 'mongoose';

const QuestionnaireSchema = mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
});

// Create the Questionnaire model using the schema
const Questionnaire = mongoose.model('Questionnaire', QuestionnaireSchema);

// Set the default questions and options
const defaultQuestionnaire = [
  {
    question: 'Do you experience any personal difficulties that cause you stress? (tick all that apply)',
    options: [
      'Conflict with loved ones',
      'Being alone',
      'Lack of income',
      'Problems providing for family',
      'Worries about the future',
      'Loss or sickness of loved ones',
      'Lifestyle issues (sleep, eating, etc)',
    ],
  },
  {
    question: 'Do you experience any problems at work that cause you stress? (tick all that apply)',
    options: [
      'Conflict with colleagues',
      'An extremely demanding or insecure job',
    ],
  },
  {
    question: 'Do you experience any major threats in your community that cause you stress? (tick all that apply)',
    options: [
      'Violence',
      'Disease',
      'Lack of economic opportunity',
      'Displacement from home',
    ],
  },
  {
    question: 'Do you experience any physical symptoms of stress? (tick all that apply)',
    options: [
      'Headaches',
      'Neck & shoulder pain',
      'Back pain',
      'Not feeling hungry',
      'Lump in throat',
      'Heavy chest',
      'Upset stomach',
      'Tight muscles',
      'Skin rashes',
      'Infections, illnesses or bowel problems',
      'Sudden weight gain/loss',
    ],
  },
  {
    question: 'Do you experience any emotional symptoms of stress? (tick all that apply)',
    options: [
      'Cannot focus',
      'Get angry easily',
      'Cannot sit still',
      'Have difficulty sleeping',
      'Feel sad or guilty',
      'Worry',
      'Cry',
      'Feel very tired',
      'Have changes in appetite',
    ],
  },
  {
    question: 'Do you experience any behavioural symptoms of stress? (tick all that apply)',
    options: [
      'Being hooked by difficult thoughts and feelings',
      'Being hooked by angry thoughts and feelings',
      'Withdrawing and staying away from people we love',
      'Spending a lot of time lying in bed',
      'Sleeping too much/little',
      'Having thoughts like "I give up!", "It is all too hard", "They/He/She should not have done that", "It is his fault", "I am weak", "And I am crazy"',
      'Having thoughts like "They/He/She should not have done that", "It is his fault"',
      'Having thoughts like "I am weak", "And I am crazy"',
      'Having memories, especially about difficult events',
      'Having thoughts about the future, especially about what we fear',
      'Having thoughts where we worry about others',
      'Yelling',
      'Trying not to think about it',
      'Avoiding people, places or situations',
      'Giving up',
      'Using alcohol',
      'Using tobacco',
      'Using illicit drugs',
      'Starting arguments',
      'Blaming or criticizing oneself',
    ],
  },
  {
    question: 'Do you have any financial concerns or stressors?',
    options: [
      'Yes',
      'No',
    ],
  },
  {
    question: 'Do you have any concerns about your lifestyle? (tick all that apply)',
    options: [
      'Sleeping habits',
      'Screen time',
      'Eating habits',
      'Exercise routine',
    ],
  },
  {
    question: 'Sleep: On average, how many hours of sleep do you get per night?',
    options: [
      'Less than 5 hours',
      '5-6 hours',
      '6-7 hours',
      '7-8 hours',
      'More than 8 hours',
    ],
  },
  {
    question: 'Exercise: How often do you engage in physical exercise or activity?',
    options: [
      'Never',
      'Rarely (once a month or less)',
      'Occasionally (1-2 times a week)',
      'Regularly (3-4 times a week)',
      'Daily',
    ],
  },
  {
    question: 'Screen time: On average, how many hours per day do you spend looking at screens (e.g. phone, computer, TV)?',
    options: [
      'Less than 1 hour',
      '1-2 hours',
      '2-3 hours',
      '3-4 hours',
      'More than 4 hours',
    ],
  },
  {
    question: 'Eating: On average, how many meals per day do you eat?',
    options: [
      '1 meal',
      '2 meals',
      '3 meals',
      'More than 3 meals',
    ],
  },
  {
    question: 'How often do you eat fruits and vegetables?',
    options: [
      'Never',
      'Rarely (once a week or less)',
      'Occasionally (2-3 times a week)',
      'Regularly (4-5 times a week)',
      'Daily',
    ],
  },
  {
    question: 'How often do you eat processed or fast food?',
    options: [
      'Never',
      'Rarely (once a month or less)',
      'Occasionally (1-2 times a week)',
      'Regularly (3-4 times a week)',
      'Daily',
    ],
  },
  {
    question: 'Do you smoke or use any tobacco products?',
    options: [
      'Yes',
      'No',
    ],
  },
  {
    question: 'Do you consume alcohol, and if so, how frequently?',
    options: [
      'Daily',
      'Several times a week',
      'Once a week',
      'Occasionally',
      'Rarely',
      'Never',
    ],
  },
  {
    question: 'How often do you engage in activities that you enjoy or find relaxing?',
    options: [
      'Multiple times a day',
      'Once a day',
      'Several times a week',
      'Once a week',
      'Rarely',
    ],
  },
  {
    question: 'How often do you socialize with friends or family?',
    options: [
      'Daily',
      'Several times a week',
      'Once a week',
      'Occasionally',
      'Rarely',
    ],
  },
  {
    question: 'Do you have any hobbies or interests that you enjoy?',
    options: [
      'Yes',
      'No',
    ],
  },
  {
    question: 'How often do you take breaks throughout the day to rest and recharge?',
    options: [
      'Multiple times a day',
      'Once a day',
      'Occasionally',
      'Rarely',
    ],
  },
  {
    question: 'How do you typically cope with stress or difficult situations?',
    options: [
      'Exercise',
      'Meditation or mindfulness practices',
      'Talking to friends or family',
      'Engaging in hobbies or interests',
      'Seeking professional help (therapy, counseling, etc.)',
      'Using relaxation techniques (deep breathing, visualization, etc.)',
      'Taking medication',
      'Engaging in self-care activities (taking a bath, listening to music, etc.)',
    ],
  },
  {
    question: 'Do you feel supported by your friends and family?',
    options: [
      'Yes',
      'No',
      'Not sure',
    ],
  },
  {
    question: 'Do you feel supported by your workplace or colleagues?',
    options: [
      'Yes',
      'No',
      'Not applicable',
    ],
  },
  {
    question: 'Have you ever sought professional help for your mental health?',
    options: [
      'Yes',
      'No',
    ],
  },
  {
    question: 'Do you have any concerns or questions about your mental health?',
    options: [
      'Yes',
      'No',
    ],
  },
  {
    question: 'Are you currently taking any medication for your mental health?',
    options: [
      'Yes',
      'No',
    ],
  },
  {
    question: 'Are there any additional comments or information you would like to share?',
    options: [
      'Yes',
      'No',
    ],
  },
];

// Initialize the default questionnaire data
Questionnaire.findOne().then((questionnaire) => {
  if (!questionnaire) {
    Questionnaire.insertMany(defaultQuestionnaire)
      .then(() => console.log('Default questionnaire data initialized.'))
      .catch((error) => console.log('Error initializing default questionnaire data:', error));
  }
});

export default Questionnaire;
