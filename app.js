const path = require('path');
const express = require('express');
const ejs = require('ejs');
const compression = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const favicon = require('serve-favicon');

const landingRoutes = require('./src/routes/landingRoutes');
const notFound = require('./src/middlewares/notFound');

const app = express();

// trust proxy (so HTTPS + host redirects work behind Heroku’s proxy)
app.set('trust proxy', 1);

const isProd = process.env.NODE_ENV === 'production';

app.use(
  helmet({
    // Heroku + third-party iframes often need these disabled
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: 'cross-origin' },

    // Keep XSS, noSniff, HSTS, etc. (Helmet defaults)
    // Configure CSP explicitly so Zoho is allowed:
    contentSecurityPolicy: false
      ? {
          useDefaults: true,
          directives: {
            defaultSrc: ["'self'"],
            // Zoho loads scripts from zohopublic + zohocdn; may inject inline
            scriptSrc: [
              "'self'",
              "'unsafe-inline'",           // remove later if you add nonces
              "'unsafe-eval'",             // some widgets need this
              'https://forms.zohopublic.com',
              'https://*.zohocdn.com',
            ],
            styleSrc: [
              "'self'",
              "'unsafe-inline'",           // in case Zoho injects inline styles
              'https://*.zohocdn.com',
            ],
            imgSrc: ["'self'", 'data:', 'https:', 'blob:'],
            connectSrc: [
              "'self'",
              'https://forms.zohopublic.com',
              'https://*.zohocdn.com',
            ],
            frameSrc: [
              "'self'",
              'https://forms.zohopublic.com', // allow the Zoho iframe
            ],
            // Your site doesn’t need to be framed by others:
            frameAncestors: ["'self'"],
            objectSrc: ["'none'"],
            upgradeInsecureRequests: [],   // keep HTTPS everywhere
          },
        }
      : false, // turn off CSP in development for easier debugging
  })
);



// View engine (EJS) + layouts
app.set('views', path.join(__dirname,'src', 'views'));
app.engine('html', ejs.renderFile);   // allow .html as EJS
app.set('view engine', 'html');
app.use(expressLayouts);
app.set('layout', 'layouts/main');

// Static Assets
const publicDir = path.join(__dirname, 'assets');
app.use('/assets', express.static(publicDir, { maxAge: '30d', immutable: true }));

// 2.5 Favicon (served from /public/img/favicon.ico)
app.use(favicon(path.join(__dirname, 'favicon.ico')));

//for sitemap xml
app.use(express.static(path.join(__dirname)));

// Core middleware
app.use(compression());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// optional: force HTTPS
app.use((req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(301, `https://${req.hostname}${req.originalUrl}`);
  }
  next();
});

// optional: redirect www → apex
app.use((req, res, next) => {
  if (req.hostname && req.hostname.startsWith('www.')) {
    return res.redirect(301, `https://${req.hostname.replace(/^www\./, '')}${req.originalUrl}`);
  }
  next();
});


// Routes
app.use('/', landingRoutes);

// 404 -> next to error handler (optional but recommended)
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// 500/error handler
app.use((err, req, res, next) => {
  console.error(err);
  if (res.headersSent) return next(err);

  const isDev = process.env.NODE_ENV !== 'production';
  const status = err.status || 500;

  res.status(status).render('error', {
    layout: false,                 // keep layout off for the error page
    title: status === 404 ? 'Not Found' : 'Server Error',
    message: err.message || 'Something went wrong.',
    error: isDev ? err : null      // <-- only pass the error in dev
  });
});


module.exports = app;
