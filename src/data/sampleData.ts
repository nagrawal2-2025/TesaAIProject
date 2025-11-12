import { UseCase } from '../types';

export const sampleUseCases: UseCase[] = [
  {
    id: '1',
    title: 'AI-Powered Customer Sentiment Analysis',
    short_description: 'Automated analysis of customer feedback across multiple channels using natural language processing to identify trends and sentiment patterns.',
    full_description: 'This use case implements an advanced AI system that automatically analyzes customer feedback from various sources including emails, surveys, social media, and support tickets. The system uses state-of-the-art natural language processing to identify sentiment patterns, trending topics, and actionable insights. The solution provides real-time dashboards and automated alerts for negative sentiment spikes, enabling proactive customer service responses.',
    department: 'Marketing',
    status: 'Live',
    owner_name: 'Sarah Mueller',
    owner_email: 'sarah.mueller@tesa.com',
    image_url: 'https://images.pexels.com/photos/8439093/pexels-photo-8439093.jpeg?auto=compress&cs=tinysrgb&w=800',
    business_impact: 'Reduced response time to customer issues by 45%, improved customer satisfaction scores by 23%, and identified 3 major product improvement opportunities in the first quarter.',
    technology_stack: ['OpenAI', 'Azure', 'Python', 'Power BI'],
    internal_links: {
      sharepoint: 'https://sharepoint.tesa.com/sentiment-analysis',
      confluence: 'https://confluence.tesa.com/sentiment',
      demo: 'https://demo.tesa.com/sentiment'
    },
    tags: ['Marketing', 'NLP', 'GenAI', 'Customer Experience'],
    related_use_case_ids: ['2', '5'],
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-03-20T14:30:00Z',
    application_url: 'https://sentiment.tesa.com'
  },
  {
    id: '2',
    title: 'Intelligent Document Processing for Procurement',
    short_description: 'Automated extraction and processing of supplier invoices and contracts using computer vision and machine learning.',
    full_description: 'This procurement automation solution leverages advanced computer vision and machine learning to automatically process incoming supplier documents. The system extracts key information from invoices, purchase orders, and contracts, validates data against existing records, and routes documents for approval. It handles multiple languages and document formats, significantly reducing manual data entry and processing time.',
    department: 'Procurement',
    status: 'MVP',
    owner_name: 'Thomas Weber',
    owner_email: 'thomas.weber@tesa.com',
    image_url: 'https://images.pexels.com/photos/6476589/pexels-photo-6476589.jpeg?auto=compress&cs=tinysrgb&w=800',
    business_impact: 'Processing time reduced from 4 hours to 15 minutes per document, 98% accuracy rate, projected annual savings of €450,000.',
    technology_stack: ['Azure Document Intelligence', 'SAP', 'Python', 'Power Automate'],
    internal_links: {
      sharepoint: 'https://sharepoint.tesa.com/doc-processing',
      confluence: 'https://confluence.tesa.com/procurement-ai'
    },
    tags: ['Procurement', 'OCR', 'Automation', 'SAP'],
    related_use_case_ids: ['1', '4'],
    created_at: '2024-02-10T09:00:00Z',
    updated_at: '2024-04-15T16:45:00Z',
    application_url: 'https://docprocessing.tesa.com'
  },
  {
    id: '3',
    title: 'Smart Lab Assistant for R&D',
    short_description: 'AI-powered research assistant that helps scientists find relevant studies, analyze experimental data, and generate research hypotheses.',
    full_description: 'The Smart Lab Assistant is an innovative AI tool designed specifically for our R&D teams. It integrates with our laboratory information management system (LIMS) and provides intelligent assistance throughout the research process. The assistant can search through millions of scientific papers, analyze experimental results, suggest optimal test parameters, and even generate hypotheses based on historical data patterns. It uses advanced machine learning models trained on chemical and materials science data.',
    department: 'R&D',
    status: 'Evaluation',
    owner_name: 'Dr. Anna Schmidt',
    owner_email: 'anna.schmidt@tesa.com',
    image_url: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=800',
    business_impact: 'Early results show 30% faster literature review process, 25% reduction in failed experiments through better parameter selection.',
    technology_stack: ['OpenAI', 'Python', 'TensorFlow', 'LIMS Integration'],
    internal_links: {
      sharepoint: 'https://sharepoint.tesa.com/smart-lab',
      demo: 'https://demo.tesa.com/lab-assistant'
    },
    tags: ['R&D', 'GenAI', 'Research', 'Innovation'],
    related_use_case_ids: ['6'],
    created_at: '2024-03-05T11:00:00Z',
    updated_at: '2024-04-22T10:15:00Z'
  },
  {
    id: '4',
    title: 'Predictive Maintenance for Production Equipment',
    short_description: 'Machine learning models that predict equipment failures before they occur, enabling proactive maintenance scheduling.',
    full_description: 'This predictive maintenance system uses IoT sensors and machine learning to monitor production equipment in real-time. The system collects data on vibration, temperature, pressure, and other operational parameters, then uses predictive models to identify patterns that precede equipment failures. Maintenance teams receive automated alerts with failure probability scores and recommended actions, allowing them to schedule maintenance during planned downtime rather than experiencing unexpected breakdowns.',
    department: 'Operations',
    status: 'Live',
    owner_name: 'Michael Becker',
    owner_email: 'michael.becker@tesa.com',
    image_url: 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=800',
    business_impact: 'Unplanned downtime reduced by 62%, maintenance costs decreased by 28%, equipment lifespan increased by 15%.',
    technology_stack: ['Azure IoT', 'Machine Learning', 'Python', 'SAP'],
    internal_links: {
      sharepoint: 'https://sharepoint.tesa.com/predictive-maintenance',
      confluence: 'https://confluence.tesa.com/operations-ai'
    },
    tags: ['Operations', 'IoT', 'Predictive Analytics', 'Maintenance'],
    related_use_case_ids: ['2'],
    created_at: '2023-11-20T08:00:00Z',
    updated_at: '2024-04-10T13:20:00Z',
    application_url: 'https://maintenance.tesa.com'
  },
  {
    id: '5',
    title: 'Automated Content Generation for Marketing',
    short_description: 'AI system that generates marketing content, product descriptions, and social media posts in multiple languages.',
    full_description: 'This marketing automation tool uses large language models to generate high-quality marketing content across multiple channels and languages. The system can create product descriptions, blog posts, social media content, email campaigns, and advertising copy while maintaining brand voice and tone consistency. It includes a review workflow where marketing managers can approve, edit, or reject generated content. The tool has significantly accelerated our content creation process while maintaining quality standards.',
    department: 'Marketing',
    status: 'PoC',
    owner_name: 'Lisa Hoffmann',
    owner_email: 'lisa.hoffmann@tesa.com',
    image_url: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800',
    business_impact: 'Content creation time reduced by 60%, ability to produce content in 12 languages simultaneously, improved SEO rankings.',
    technology_stack: ['OpenAI GPT-4', 'Azure', 'Node.js', 'CMS Integration'],
    internal_links: {
      sharepoint: 'https://sharepoint.tesa.com/content-gen',
      demo: 'https://demo.tesa.com/content-ai'
    },
    tags: ['Marketing', 'GenAI', 'Content Creation', 'Automation'],
    related_use_case_ids: ['1'],
    created_at: '2024-02-28T14:00:00Z',
    updated_at: '2024-04-18T11:30:00Z'
  },
  {
    id: '6',
    title: 'AI-Enhanced Recruitment Screening',
    short_description: 'Intelligent system for screening job applications, matching candidates to positions, and scheduling interviews.',
    full_description: 'Our AI-Enhanced Recruitment system streamlines the hiring process by automatically screening resumes, matching candidates to job requirements, and identifying top talent. The system uses natural language processing to analyze CVs and cover letters, extracting relevant skills, experience, and qualifications. It ranks candidates based on job fit, flags potential concerns, and suggests interview questions tailored to each candidate. The system also handles initial communication with candidates and coordinates interview scheduling.',
    department: 'HR',
    status: 'Pre-Evaluation',
    owner_name: 'Julia Krause',
    owner_email: 'julia.krause@tesa.com',
    image_url: 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=800',
    business_impact: 'Expected to reduce time-to-hire by 40%, improve candidate quality scores, and free up 15 hours per week for HR team.',
    technology_stack: ['OpenAI', 'Python', 'Workday Integration'],
    internal_links: {
      confluence: 'https://confluence.tesa.com/hr-ai'
    },
    tags: ['HR', 'Recruitment', 'NLP', 'Automation'],
    related_use_case_ids: ['3'],
    created_at: '2024-04-01T09:00:00Z',
    updated_at: '2024-04-25T15:00:00Z'
  },
  {
    id: '7',
    title: 'Intelligent IT Service Desk Assistant',
    short_description: 'AI-powered chatbot that handles common IT support requests, troubleshoots issues, and routes complex problems to specialists.',
    full_description: 'The Intelligent IT Service Desk Assistant is a conversational AI system that serves as the first point of contact for all IT support requests. It can handle password resets, software installation requests, hardware troubleshooting, and answer common IT policy questions. The assistant uses machine learning to continuously improve its responses based on user interactions and feedback. For complex issues it cannot resolve, it creates detailed tickets and routes them to the appropriate IT specialists with all relevant diagnostic information already collected.',
    department: 'IT',
    status: 'MVP',
    owner_name: 'Stefan Richter',
    owner_email: 'stefan.richter@tesa.com',
    image_url: 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=800',
    business_impact: 'Resolves 65% of tickets automatically, average resolution time down from 4 hours to 12 minutes, IT team can focus on strategic projects.',
    technology_stack: ['Microsoft Bot Framework', 'Azure', 'ServiceNow', 'NLP'],
    internal_links: {
      sharepoint: 'https://sharepoint.tesa.com/it-assistant',
      confluence: 'https://confluence.tesa.com/service-desk-ai',
      demo: 'https://demo.tesa.com/it-bot'
    },
    tags: ['IT', 'Chatbot', 'Service Desk', 'Automation'],
    related_use_case_ids: [],
    created_at: '2024-01-10T10:00:00Z',
    updated_at: '2024-04-20T09:45:00Z',
    application_url: 'https://servicedesk.tesa.com'
  },
  {
    id: '8',
    title: 'Quality Control Vision System',
    short_description: 'Computer vision system that automatically detects defects in products during manufacturing with higher accuracy than manual inspection.',
    full_description: 'This advanced computer vision system uses deep learning to inspect products on the production line and identify defects with superhuman accuracy. High-resolution cameras capture images of products at multiple angles, and neural networks trained on millions of images analyze them for various defect types including surface imperfections, dimensional variations, and assembly errors. The system provides real-time feedback to production operators and automatically segregates defective products. It also generates detailed quality reports and identifies patterns that may indicate upstream process issues.',
    department: 'Operations',
    status: 'Live',
    owner_name: 'Robert Zimmermann',
    owner_email: 'robert.zimmermann@tesa.com',
    image_url: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
    business_impact: 'Defect detection accuracy improved from 87% to 99.2%, reduced customer complaints by 78%, saved €1.2M annually in waste and rework.',
    technology_stack: ['TensorFlow', 'Computer Vision', 'Python', 'Industrial Cameras'],
    internal_links: {
      sharepoint: 'https://sharepoint.tesa.com/quality-vision',
      confluence: 'https://confluence.tesa.com/qc-ai'
    },
    tags: ['Operations', 'Computer Vision', 'Quality Control', 'Manufacturing'],
    related_use_case_ids: ['4'],
    created_at: '2023-09-15T07:00:00Z',
    updated_at: '2024-04-12T14:00:00Z',
    application_url: 'https://qcvision.tesa.com'
  },
  {
    id: '9',
    title: 'Dynamic Pricing Optimization',
    short_description: 'Machine learning system that optimizes product pricing in real-time based on demand, competition, and market conditions.',
    full_description: 'The Dynamic Pricing Optimization system uses reinforcement learning and predictive analytics to determine optimal pricing strategies for our products across different markets and channels. The system analyzes historical sales data, competitor pricing, seasonal trends, inventory levels, and external market factors to recommend price adjustments that maximize revenue while maintaining competitive positioning. It can simulate different pricing scenarios and predict their impact before implementation. The system operates within predefined business rules and pricing boundaries set by the commercial team.',
    department: 'Marketing',
    status: 'Evaluation',
    owner_name: 'Marcus Braun',
    owner_email: 'marcus.braun@tesa.com',
    image_url: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=800',
    business_impact: 'Initial testing shows 8% revenue increase, improved inventory turnover, better competitive positioning in key markets.',
    technology_stack: ['Python', 'Machine Learning', 'SAP', 'Power BI'],
    internal_links: {
      confluence: 'https://confluence.tesa.com/pricing-ai'
    },
    tags: ['Marketing', 'Pricing', 'Machine Learning', 'Revenue Optimization'],
    related_use_case_ids: ['1', '5'],
    created_at: '2024-03-12T13:00:00Z',
    updated_at: '2024-04-24T16:20:00Z'
  },
  {
    id: '10',
    title: 'Supply Chain Demand Forecasting',
    short_description: 'Advanced forecasting system that predicts product demand across regions and channels to optimize inventory and reduce stockouts.',
    full_description: 'This comprehensive demand forecasting solution uses ensemble machine learning models to predict product demand with unprecedented accuracy. The system analyzes historical sales data, seasonal patterns, marketing campaigns, economic indicators, weather data, and numerous other factors to generate demand forecasts at SKU level across all regions and channels. It provides confidence intervals for predictions and automatically adjusts forecasts as new data becomes available. The forecasts integrate directly with our ERP system to drive automated inventory replenishment and production planning.',
    department: 'Procurement',
    status: 'Live',
    owner_name: 'Andrea Fischer',
    owner_email: 'andrea.fischer@tesa.com',
    image_url: 'https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg?auto=compress&cs=tinysrgb&w=800',
    business_impact: 'Forecast accuracy improved from 72% to 91%, inventory holding costs reduced by 18%, stockouts decreased by 43%, better production planning.',
    technology_stack: ['Python', 'Machine Learning', 'SAP', 'Azure'],
    internal_links: {
      sharepoint: 'https://sharepoint.tesa.com/demand-forecast',
      confluence: 'https://confluence.tesa.com/supply-chain-ai',
      demo: 'https://demo.tesa.com/forecasting'
    },
    tags: ['Procurement', 'Supply Chain', 'Forecasting', 'Machine Learning'],
    related_use_case_ids: ['2', '9'],
    created_at: '2023-10-05T08:00:00Z',
    updated_at: '2024-04-08T12:30:00Z',
    application_url: 'https://forecast.tesa.com'
  }
];
