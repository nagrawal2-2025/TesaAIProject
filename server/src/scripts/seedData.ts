import pool from '../config/database';

const sampleUseCases = [
  {
    title: "Predictive Maintenance System",
    shortDescription: "AI-powered system to predict equipment failures",
    fullDescription: "An advanced machine learning system that analyzes sensor data from production equipment to predict potential failures before they occur. This proactive approach reduces downtime by 40% and maintenance costs by 30%.",
    department: "Manufacturing",
    status: "active",
    ownerName: "Dr. Michael Schmidt",
    ownerEmail: "michael.schmidt@example.com",
    imageUrl: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800",
    businessImpact: "Reduced unplanned downtime by 40%, saving €2M annually in maintenance costs and lost production time.",
    applicationUrl: "https://maintenance.example.com",
    technologyStack: ["TensorFlow", "Python", "Azure ML", "IoT Hub"],
    tags: ["Predictive Analytics", "IoT", "Cost Reduction"],
    internalLinks: [
      { title: "Technical Documentation", url: "#" },
      { title: "Training Materials", url: "#" }
    ],
    relatedUseCaseIds: []
  },
  {
    title: "Intelligent Document Processing",
    shortDescription: "Automated extraction and classification of documents",
    fullDescription: "Uses OCR and NLP to automatically extract, classify, and process incoming documents. Handles invoices, contracts, and correspondence with 95% accuracy.",
    department: "Finance",
    status: "active",
    ownerName: "Sarah Weber",
    ownerEmail: "sarah.weber@example.com",
    imageUrl: "https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800",
    businessImpact: "Processes 10,000+ documents monthly, reducing processing time by 75% and error rates by 85%.",
    applicationUrl: "https://documents.example.com",
    technologyStack: ["Azure Cognitive Services", "Python", "React", "Node.js"],
    tags: ["Document Processing", "Automation", "OCR"],
    internalLinks: [
      { title: "User Guide", url: "#" },
      { title: "API Documentation", url: "#" }
    ],
    relatedUseCaseIds: []
  },
  {
    title: "Customer Sentiment Analysis",
    shortDescription: "Real-time analysis of customer feedback and reviews",
    fullDescription: "AI system that analyzes customer feedback from multiple channels (emails, reviews, social media) to identify trends, sentiment, and actionable insights in real-time.",
    department: "Marketing",
    status: "in_development",
    ownerName: "Lisa Müller",
    ownerEmail: "lisa.mueller@example.com",
    imageUrl: "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=800",
    businessImpact: "Expected to improve customer satisfaction scores by 20% and reduce response time to negative feedback by 60%.",
    technologyStack: ["OpenAI GPT", "Python", "Power BI", "Azure Synapse"],
    tags: ["NLP", "Customer Experience", "Analytics"],
    internalLinks: [
      { title: "Project Roadmap", url: "#" }
    ],
    relatedUseCaseIds: []
  },
  {
    title: "Supply Chain Optimization",
    shortDescription: "AI-driven logistics and inventory optimization",
    fullDescription: "Machine learning system that optimizes supply chain operations by predicting demand, optimizing routes, and managing inventory levels across multiple warehouses.",
    department: "Logistics",
    status: "planned",
    ownerName: "Thomas Becker",
    ownerEmail: "thomas.becker@example.com",
    imageUrl: "https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&w=800",
    businessImpact: "Projected to reduce logistics costs by 25% and improve delivery times by 30%.",
    technologyStack: ["Azure ML", "Python", "SAP Integration"],
    tags: ["Optimization", "Logistics", "Planning"],
    internalLinks: [
      { title: "Business Case", url: "#" }
    ],
    relatedUseCaseIds: []
  }
];

const seedData = async () => {
  const client = await pool.connect();

  try {
    console.log('Checking existing data...');

    const countResult = await client.query('SELECT COUNT(*) FROM use_cases');
    const count = parseInt(countResult.rows[0].count);

    if (count > 0) {
      console.log(`Database already contains ${count} use cases. Skipping seed.`);
      return;
    }

    console.log('Inserting sample data...');

    for (const useCase of sampleUseCases) {
      await client.query(`
        INSERT INTO use_cases (
          title, short_description, full_description, department, status,
          owner_name, owner_email, image_url, business_impact, application_url,
          technology_stack, tags, internal_links, related_use_case_ids
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      `, [
        useCase.title,
        useCase.shortDescription,
        useCase.fullDescription,
        useCase.department,
        useCase.status,
        useCase.ownerName,
        useCase.ownerEmail,
        useCase.imageUrl,
        useCase.businessImpact,
        useCase.applicationUrl,
        JSON.stringify(useCase.technologyStack),
        JSON.stringify(useCase.tags),
        JSON.stringify(useCase.internalLinks),
        JSON.stringify(useCase.relatedUseCaseIds)
      ]);
    }

    console.log(`✅ Successfully seeded ${sampleUseCases.length} use cases!`);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
};

seedData();
