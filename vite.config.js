import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import hospitalsData from './src/data/hospitalsData.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'mock-hospital-api',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          try {
            const url = new URL(req.url, 'http://localhost');
            const acceptHeader = req.headers.accept || "";

            if (
              req.method === 'GET' &&
              url.pathname.startsWith('/hospitals/') &&
              acceptHeader.includes('application/json')
            ) {
              const id = Number(url.pathname.split('/').pop());
              if (Number.isNaN(id)) {
                next();
                return;
              }

              const hospital = hospitalsData.find((item) => item.id === id);
              res.setHeader('Content-Type', 'application/json');

              if (!hospital) {
                res.statusCode = 404;
                res.end(JSON.stringify({ error: 'Hospital not found' }));
                return;
              }

              res.end(JSON.stringify(hospital));
              return;
            }

            if (
              req.method === 'POST' &&
              url.pathname === '/hospitals' &&
              acceptHeader.includes('application/json')
            ) {
              let body = '';
              req.on('data', (chunk) => {
                body += chunk.toString();
              });

              req.on('end', () => {
                try {
                  const newHospital = JSON.parse(body);
                  const nextId = hospitalsData.reduce((max, item) => Math.max(max, item.id), 0) + 1;
                  const createdHospital = {
                    id: nextId,
                    status: newHospital.status || 'active',
                    accessId: newHospital.accessId || `MS-00${nextId}`,
                    date: newHospital.date || new Date().toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    }),
                    website: newHospital.website || '',
                    departments: newHospital.departments ?? 0,
                    staff: newHospital.staff ?? 0,
                    engagement: newHospital.engagement ?? 0,
                    ...newHospital
                  };

                  hospitalsData.push(createdHospital);
                  res.setHeader('Content-Type', 'application/json');
                  res.statusCode = 201;
                  res.end(JSON.stringify(createdHospital));
                } catch (err) {
                  res.statusCode = 400;
                  res.end(JSON.stringify({ error: 'Invalid hospital payload' }));
                }
              });
              return;
            }
          } catch (error) {
            // Allow other middlewares to handle non-API routes.
          }

          next();
        });
      }
    }
  ]
})
