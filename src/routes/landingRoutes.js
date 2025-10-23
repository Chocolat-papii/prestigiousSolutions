const express = require('express');
const { home, about, contact, legalLegal,  legalPrivacy, legalTerms, services, servicesICTprocurementsolutions, servicesItDisposal,
     servicesOfficeEssentials, servicesSupportServices, servicesRepairsMaintenance, servicesDeploymentImplementation,
     

} = require('../controllers/landingController');


const router = express.Router();

router.get('/', home);
router.get('/about', about);
router.get('/contact', contact);

router.get('/legal', legalLegal);
router.get('/legal/privacy', legalPrivacy);
router.get('/legal/terms', legalTerms);

router.get('/services', services);
router.get('/services/it-deployment-implementation-services', servicesDeploymentImplementation);
router.get('/services/ict-procurement-solutions', servicesICTprocurementsolutions);
router.get('/services/it-asset-disposal-recycling', servicesItDisposal);
router.get('/services/office-supplies-equipment', servicesOfficeEssentials);
router.get('/services/managed-it-support-services', servicesSupportServices);
router.get('/services/it-repairs-maintenance-services', servicesRepairsMaintenance);




module.exports = router;