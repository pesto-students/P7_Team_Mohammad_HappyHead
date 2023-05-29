// Set the default questions and options and recommendations
const defaultQuestionnaire = [
    {
      question: 'Do you experience any personal difficulties that cause you stress? (tick all that apply)',
      type: 'checkbox',
      options: [
        'Conflict with loved ones',
        'Being alone',
        'Lack of income',
        'Problems providing for family',
        'Worries about the future',
        'Loss or sickness of loved ones',
        'Lifestyle issues (sleep, eating, etc)',
      ],
      recommendation: 'Since you are experiencing personal difficulties, our reccomendation would be to connect with a therapist who specializes in family therapy or stress management.'
    },
    {
      question: 'Do you experience any problems at work that cause you stress? (tick all that apply)',
      type: 'checkbox',
      options: [
        'Conflict with colleagues',
        'An extremely demanding or insecure job',
      ],
      recommendation: 'Since you are experiencing work-related stress, our reccomendation would be to connect with a therapist who specializes in workplace stress management or career counseling.'
    },
    {
      question: 'Do you experience any major threats in your community that cause you stress? (tick all that apply)',
      type: 'checkbox',
      options: [
        'Violence',
        'Disease',
        'Lack of economic opportunity',
        'Displacement from home',
      ],
      recommendation: 'Since you are experiencing stress due to major threats in your community, our reccomendation would be to connect with a therapist who specializes in trauma counseling or community support services.'
    },
    {
      question: 'Do you experience any physical symptoms of stress? (tick all that apply)',
      type: 'checkbox',
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
      recommendation: 'Since you are experiencing physical symptoms of stress, our reccomendation would be to connect with a therapist who specializes in somatic therapy or stress reduction techniques.'
    },
    {
      question: 'Do you experience any emotional symptoms of stress? (tick all that apply)',
      type: 'checkbox',
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
      recommendation: 'Since you are experiencing emotional symptoms of stress, our reccomendation would be to connect with a therapist who specializes in cognitive-behavioral therapy or emotion-focused therapy.'
    },
    {
      question: 'Do you experience any behavioural symptoms of stress? (tick all that apply)',
      type: 'checkbox',
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
      recommendation: 'Since you are behavioural physical symptoms of stress, our reccomendation would be to connect with a therapist who specializes in addiction counseling or behavioral therapy.'
    },
    {
      question: 'Do you have any financial concerns or stressors?',
      type: 'radio',
      options: [
        'Yes',
        'No',
      ],
      recommendation: [
        `We understand that financial stress can be a heavy burden. You're not alone in this. It's important to seek out support and resources to help manage your financial concerns. Consider reaching out to a financial advisor, talking to a trusted friend or family member, or seeking help from a professional therapist.`,
        `Great to hear that you're not experiencing any financial stressors at the moment! Remember to continue practicing healthy financial habits, such as budgeting and saving, to maintain your financial well-being.`
      ]
    },
    {
      question: 'Do you have any concerns about your lifestyle? (tick all that apply)',
      type: 'checkbox',
      options: [
        'Sleeping habits',
        'Screen time',
        'Eating habits',
        'Exercise routine',
      ],
      recommendation: [
        `Here's our specific recommendations based on your responses concerning your liefestyle: `,
        `Here's our specific recommendations based on your responses concerning your liefestyle: `,
        `Here's our specific recommendations based on your responses concerning your liefestyle: `,
        `Here's our specific recommendations based on your responses concerning your liefestyle: `,
      ]
    },
    {
      question: 'Sleep: On average, how many hours of sleep do you get per night?',
      type: 'radio',
      options: [
        'Less than 5 hours',
        '5-6 hours',
        '6-7 hours',
        '7-8 hours',
        'More than 8 hours',
      ],
      recommendation: [
        `Aim for 7-8 hours of sleep per night. Establish a consistent sleep schedule and avoid screens before bedtime.`,
        `Aim for 7-8 hours of sleep per night. Establish a consistent sleep schedule and avoid screens before bedtime.`,
        `Aim for 7-8 hours of sleep per night. Establish a consistent sleep schedule and avoid screens before bedtime.`,
        `Great job! You are getting the recommended amount of sleep each night, which is essential for maintaining good mental health and overall well-being`,
        `It's great that you are getting plenty of sleep each night, but it's important to keep in mind that oversleeping can sometimes be a sign of underlying health issues or depression. If you have any concerns, we recommend talking to a healthcare provider.`,
      ]
    },
    {
      question: 'Exercise: How often do you engage in physical exercise or activity?',
      type: 'radio',
      options: [
        'Never',
        'Rarely (once a month or less)',
        'Occasionally (1-2 times a week)',
        'Regularly (3-4 times a week)',
        'Daily',
      ],
      recommendation: [
        `Aim for at least 30 minutes of physical activity or exercise per day. Start with activities you enjoy and gradually increase the intensity and frequency.`,
        `Aim for at least 30 minutes of physical activity or exercise per day. Start with activities you enjoy and gradually increase the intensity and frequency.`,
        `Aim for at least 30 minutes of physical activity or exercise per day. Start with activities you enjoy and gradually increase the intensity and frequency.`,
        `Great job! You are getting the recommended amount of sleep each night, which is essential for maintaining good mental health and overall well-Great job on maintaining a regular exercise routine! Regular physical activity has numerous mental health benefits, such as reducing stress and anxiety, improving mood, and boosting self-esteem. Keep up the good work and consider gradually increasing the intensity or duration of your workouts if you feel comfortable.`,
        `Wow, you're doing an amazing job staying physically active! Daily exercise can have numerous benefits for your mental health, such as reducing symptoms of depression and anxiety, improving sleep quality, and boosting overall mood. Keep up the great work and remember to listen to your body and take rest days when needed.`,
      ]
    },
    {
      question: 'Screen time: On average, how many hours per day do you spend looking at screens (e.g. phone, computer, TV)?',
      type: 'radio',
      options: [
        'Less than 1 hour',
        '1-2 hours',
        '2-3 hours',
        '3-4 hours',
        'More than 4 hours',
      ],
      recommendation: [
        `Great job! Limiting screen time can have many benefits for mental health and overall well-being. Keep up the good work.`,
        `That's a reasonable amount of screen time per day. Consider taking breaks and engaging in other activities to balance your screen time.`,
        `It's important to be mindful of how much time you spend looking at screens each day. Consider reducing screen time by engaging in other activities that don't involve screens.`,
        `Spending more than 3 hours per day looking at screens can have negative effects on mental health. Consider taking regular breaks and engaging in other activities that don't involve screens.`,
        `Spending more than 4 hours per day looking at screens can have negative effects on mental health. Consider reducing screen time and finding other activities to engage in. It can be helpful to take regular breaks and limit screen time before bed to promote better sleep.`,
      ]
    },
    {
      question: 'Eating: On average, how many meals per day do you eat?',
      type: 'radio',
      options: [
        '1 meal',
        '2 meals',
        '3 meals',
        'More than 3 meals',
      ],
      recommendation: [
        `It's important to ensure that you're getting all the necessary nutrients your body needs throughout the day. Consider speaking with a registered dietitian to create a healthy meal plan.`,
        `While it's good to have some structure in your eating habits, it's important to ensure that you're getting enough nutrients throughout the day. Consider adding a third meal or healthy snack to your routine.`,
        `This is a healthy number of meals to have per day. Be sure to focus on incorporating a variety of nutrient-dense foods into your diet to support overall health and wellness.`,
        `While it's important to eat enough to fuel your body, it's also important to be mindful of portion sizes and the quality of the food you're consuming. Consider speaking with a registered dietitian to create a healthy meal plan that meets your needs.`,
      ]
    },
    {
      question: 'How often do you eat fruits and vegetables?',
      type: 'radio',
      options: [
        'Never',
        'Rarely (once a week or less)',
        'Occasionally (2-3 times a week)',
        'Regularly (4-5 times a week)',
        'Daily',
      ],
      recommendation: [
        `It's important to incorporate fruits and vegetables into your diet, even in small amounts. You might want to consider adding some to your meals to ensure you're getting the nutrients your body needs.`,
        `It's great that you're eating fruits and vegetables at least once a week, but it's important to aim for more servings throughout the week. You might want to try incorporating them into more meals or as snacks to increase your intake.`,
        `Eating fruits and vegetables a few times a week is a good start, but it's important to aim for more servings throughout the week. Consider adding them to your meals or as snacks to increase your intake and get more nutrients.`,
        `Eating fruits and vegetables regularly is a great way to ensure you're getting the nutrients your body needs. Keep up the good work and consider trying new fruits and vegetables to keep things interesting.`,
        `Eating fruits and vegetables daily is an excellent way to support your overall health. Keep up the good work and consider trying new fruits and vegetables to keep things interesting.`,
      ]
    },
    {
      question: 'How often do you eat processed or fast food?',
      type: 'radio',
      options: [
        'Never',
        'Rarely (once a month or less)',
        'Occasionally (1-2 times a week)',
        'Regularly (3-4 times a week)',
        'Daily',
      ],
      recommendation: [
        `Great job! Avoiding processed and fast food is a healthy choice for your body. Keep it up!`,
        `That's good to hear! Consuming processed and fast food in moderation is a healthier option. Try to keep it limited to once in a while.`,
        `It's important to maintain a balance in your diet. However, consuming processed and fast food frequently can lead to negative health effects. Try to limit your intake to once a week or less.`,
        `Consuming processed and fast food regularly can have negative impacts on your health. Try to reduce your intake and opt for healthier food options.`,
        `It's important to reduce your intake of processed and fast food as consuming them frequently can have negative effects on your health. Consider incorporating more fruits, vegetables, and whole grains into your diet.`,
      ]
    },
    {
      question: 'Do you smoke or use any tobacco products?',
      type: 'radio',
      options: [
        'Yes',
        'No',
      ],
      recommendation: [
        `We highly encourage you to quit smoking or using tobacco products. There are many resources available to help you quit, such as nicotine replacement therapy and support groups. Smoking and tobacco use can have serious health consequences, including lung cancer, heart disease, and stroke.`,
        `Great news! Not smoking or using tobacco products is one of the best things you can do for your health. By avoiding tobacco, you're reducing your risk of a wide range of health problems, including lung cancer, heart disease, stroke, and respiratory illnesses. Keep up the good work!`,
      ]
    },
    {
      question: 'Do you consume alcohol, and if so, how frequently?',
      type: 'radio',
      options: [
        'Daily',
        'Several times a week',
        'Once a week',
        'Occasionally',
        'Rarely',
        'Never',
      ],
      recommendation: [
        `Drinking alcohol on a daily basis can be harmful to your health and may increase your risk of developing various health problems, including liver disease, high blood pressure, and certain types of cancer. We recommend that you cut back on your alcohol consumption or seek help if you have trouble doing so.`,
        `Drinking alcohol several times a week can increase your risk of developing health problems, such as liver disease and high blood pressure. We suggest that you limit your alcohol intake and drink in moderation to help reduce your risk of developing these health problems.`,
        `Drinking alcohol once a week is considered moderate drinking and is generally not harmful to your health. However, it's important to drink in moderation and avoid binge drinking to minimize any potential risks.`,
        `Consuming alcohol occasionally can be safe and is not associated with a higher risk of developing health problems. However, it's important to drink in moderation and avoid binge drinking to minimize any potential risks.`,
        `Drinking alcohol rarely is considered low-risk drinking and is not associated with a higher risk of developing health problems. However, it's important to drink in moderation and avoid binge drinking to minimize any potential risks.`,
        `Not consuming alcohol is the healthiest choice and can help reduce your risk of developing various health problems associated with alcohol consumption, such as liver disease, high blood pressure, and certain types of cancer.`,
      ]
    },
    {
      question: 'How often do you engage in activities that you enjoy or find relaxing?',
      type: 'radio',
      options: [
        'Multiple times a day',
        'Once a day',
        'Several times a week',
        'Once a week',
        'Rarely',
      ],
      recommendation: [
        `Great job! Engaging in activities that you enjoy or find relaxing multiple times a day is an excellent way to manage stress and improve your overall well-being.`,
        `That's a good start! Engaging in activities that you enjoy or find relaxing once a day can help you manage stress and improve your overall well-being. Consider adding a few more activities to your routine to reap even more benefits.`,
        `That's a good effort! Engaging in activities that you enjoy or find relaxing several times a week can help you manage stress and improve your overall well-being. Consider increasing the frequency of these activities to achieve even greater benefits`,
        `It's a good start, but you might want to consider engaging in activities that you enjoy or find relaxing more frequently. Doing so can help you manage stress and improve your overall well-being.`,
        `Engaging in activities that you enjoy or find relaxing can be an effective way to manage stress and improve your overall well-being. Consider trying to incorporate some of these activities into your routine more frequently to achieve the maximum benefits.`,
      ]
    },
    {
      question: 'How often do you socialize with friends or family?',
      type: 'radio',
      options: [
        'Daily',
        'Several times a week',
        'Once a week',
        'Occasionally',
        'Rarely',
      ],
      recommendation: [
        `It's great to hear that you socialize with friends or family on a daily basis! Maintaining close relationships with loved ones is an important aspect of overall well-being.`,
        `That's a good amount of socializing with friends or family! Connecting with others can help you feel more supported and improve your overall mood.`,
        `It's good to hear that you make time to socialize with friends or family at least once a week! Social connections are important for maintaining mental and emotional well-being.`,
        `While it's important to take time for yourself, it's also important to maintain social connections with others. You may want to consider making more time for socializing with friends or family to improve your overall well-being.`,
        `Maintaining social connections with others is an important aspect of overall well-being. You may want to consider reaching out to friends or family to make plans and spend more time together.`,
      ]
    },
    {
      question: 'Do you have any hobbies or interests that you enjoy?',
      type: 'radio',
      options: [
        'Yes',
        'No',
      ],
      recommendation: [
        `That's great! Engaging in hobbies and interests can help improve your overall well-being and mental health. It's important to make time for activities that bring you joy and fulfillment.`,
        `That's okay, but it's always good to try new things and explore your interests. Hobbies and interests can provide a sense of purpose and fulfillment in life. Maybe you can try something new that you've always been curious about or ask friends for recommendations.`,
      ]
    },
    {
      question: 'How often do you take breaks throughout the day to rest and recharge?',
      type: 'radio',
      options: [
        'Multiple times a day',
        'Once a day',
        'Occasionally',
        'Rarely',
      ],
      recommendation: [
        `Great job! Taking frequent breaks throughout the day can help you stay refreshed and energized.`,
        `It's good to take a break once a day to rest and recharge. Consider taking more breaks if you find yourself feeling fatigued.`,
        `Taking breaks throughout the day can help improve productivity and reduce stress. Consider scheduling breaks into your daily routine.`,
        `It's important to take breaks throughout the day to rest and recharge. Consider scheduling breaks into your daily routine to improve productivity and reduce stress.`,
      ]
    },
    {
      question: 'How do you typically cope with stress or difficult situations?',
      type: 'radio',
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
      recommendation: [
        `Great job! Exercise is a proven way to manage stress and improve your overall health.`,
        `Excellent choice! Practicing mindfulness can help reduce stress and promote mental wellbeing.`,
        `It's good to have a support system in place. Talking to loved ones can help you cope with stress and build resilience.`,
        `That's wonderful! Hobbies and interests can provide a healthy outlet for stress and promote relaxation.`,
        `Seeking professional help is a brave and important step in managing stress. There's no shame in seeking help when you need it.`,
        `It's important to find what works for you. If you have other ways of coping with stress, keep doing what works best for you.`,
        `It's important to have healthy ways to manage stress. If you're not currently doing anything to cope with stress, you may want to consider trying some of the options listed below.
        -Exercise
        -Meditate or practice mindfulness
        -Seek support from friends or family
        -Engage in hobbies or interests
        -Seek professional help (therapy, counseling)`,
      ]
    },
    {
      question: 'Have you ever sought professional help for your mental health?',
      type: 'radio',
      options: [
        'Yes',
        'No',
      ],
      recommendation: [
        `Thank you for sharing this information with us. It's important to recognize that physical health and mental health are closely linked, and that medical conditions can have an impact on mental health. We recommend that you speak with a healthcare provider to discuss any concerns you may have and to develop a plan to manage your mental health in the context of your medical condition.`,
        `Thank you for sharing this information with us. It's important to recognize that physical health and mental health are closely linked, and that medical conditions can have an impact on mental health. We recommend that you speak with a healthcare provider to discuss any concerns you may have and to develop a plan to manage your mental health in the context of your medical condition.`,
      ]
    },
    {
      question: 'Have you ever been diagnosed with a mental health condition? (Pick one)',
      type: 'radio',
      options: [
        'Yes',
        'No',
      ],
      recommendation: [
        `We appreciate you sharing this information. It's important to recognize that mental health conditions are common and treatable. We recommend that you speak with a healthcare provider to discuss any concerns you may have and to develop a plan to manage your mental health.`,
        ``,
      ]
    },
    {
      question: 'Have you ever received treatment for a mental health condition? (Pick one)',
      type: 'radio',
      options: [
        'Yes',
        'No',
      ],
      recommendation: [
        `Your willingness to share this information is greatly appreciated. Receiving treatment for mental health conditions can be an important step in improving overall health and well-being. We encourage you to continue to seek support and treatment as needed.`,
        ``,
      ]
    },
    {
      question: 'Are you currently taking any medication for your mental health?',
      type: 'radio',
      options: [
        'Yes',
        'No',
      ],
      recommendation: [
        `We are grateful for your openness in sharing this information with us. Medications can be an important tool in treating mental health conditions. We recommend that you continue to work with your healthcare provider to ensure that your treatment plan is effective and to discuss any concerns you may have.`,
        ``,
      ]
    },
  ];
  
  export default defaultQuestionnaire