exports.home = (req, res) => {
  res.render('home/index.html', {
    nav: { active: 'home' },
    title: 'Prestigious Solutions - ICT Procurement, Support & ITAD.'
    
  });
};

exports.about = (req, res) => {
  res.render('about/about.html', {
    nav: { active: 'about' },
    title: 'Prestigious Solutions | Johannesburg ICT lifeCycle Partner'
  });
};

exports.contact = (req, res) => {
  res.render('contact/contact.html', {
    nav: { active: 'contact' },
    title: 'Contact Prestigious Solutions | Get a Quote or Support'
  });
};

//legal pages controllers

exports.legalLegal = (req, res) => {
  res.render('legal/legal.html', {
    nav: { active: 'legal' },
    title: 'Legal Information | Prestigious Solutions'
  });
};

exports.legalPrivacy = (req, res) => {
  res.render('legal/privacy.html', {
    nav: { active: 'legal' },
    title: 'Privacy Policy | Prestigious Solutions'
  });
};

exports.legalTerms = (req, res) => {
  res.render('legal/terms.html', {
    nav: { active: 'legal' },
    title: "Terms and Conditions | Prestigious Solutions"
  });
};

//services landing page controllers

exports.services = (req, res) => {
  res.render('services/services.html', {
    nav: { active: 'services' },
    title: 'ICT Services | Procurement, Deployment, Support & Repairs'
  });
};

exports.servicesICTprocurementsolutions = (req, res) => {
  res.render('services/ict-procurement-solutions.html', {
    nav: { active: 'services' },
    title: 'ICT Procurement & Digital Solutions | Prestigious Solutions'
  });
};

exports.servicesDeploymentImplementation = (req, res) => {
  res.render('services/it-deployment-implementation-services.html', {
    nav: { active: 'services' },
    title: 'IT Deployment & Implementation | Prestigious Solutions'
  });
};

exports.servicesItDisposal = (req, res) => {
  res.render('services/it-asset-disposal-recycling.html', {
    nav: { active: 'services' },
    title: 'IT Asset Disposal & Recycling | Prestigious Solution'
  });
};

exports.servicesOfficeEssentials = (req, res) => {
  res.render('services/office-supplies-equipment.html', {
    nav: { active: 'services' },
    title: 'Office Essentials & Supply Solutions | Prestigious Solutions'
  });
};

exports.servicesSupportServices = (req, res) => {
  res.render('services/managed-it-support-services.html', {
    nav: { active: 'services' },
    title: 'Managed IT Support Services | Prestigious Solutions'
  });
};

exports.servicesRepairsMaintenance = (req, res) => {
  res.render('services/it-repairs-maintenance-services.html', {
    nav: { active: 'services' },
    title: 'IT Repairs & Maintenance Services | Prestigious Solutions'
  });
};