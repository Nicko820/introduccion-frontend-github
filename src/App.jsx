import { useState, useEffect } from 'react';
import EstudianteCard from './components/EstudianteCard';

// Configuración de github
const OWNER = import.meta.env.VITE_GITHUBUSER;
const REPO = import.meta.env.VITE_GITHUBREPO;
const PATH = import.meta.env.VITE_GITHUBPATH;

function App() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function cargarEstudiantesDesdeGitHub() {
      try {
        const response = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${PATH}`);
        
        if (!response.ok) {
          throw new Error("Repositorio no configurado o carpeta vacía.");
        }
        
        const archivos = await response.json();
        const archivosJSON = archivos.filter(file => file.name.endsWith('.json') && file.name);
        
        const listaTemporal = [];
        
        for (const archivo of archivosJSON) {
          const resContenido = await fetch(archivo.download_url);
          const datosEstudiante = await resContenido.json();
          listaTemporal.push(datosEstudiante);
        }
        
        setEstudiantes(listaTemporal);
      } catch (error) {
        console.warn("API de GitHub no disponible o vacía. Cargando simulación local de estudiantes.");
      } finally {
        setLoading(false);
      }
    }

    cargarEstudiantesDesdeGitHub();
  }, []);

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* HEADER CON LOGO DE LA UBB */}
      <header style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '25px', 
        marginBottom: '40px', 
        borderBottom: '2px solid #e2e8f0', 
        paddingBottom: '20px' 
      }}>
        <img 
          src="logoubb.png" 
          alt="Logo UBB" 
          style={{ height: '70px', objectFit: 'contain' }}
        />
        <div>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '800', 
            margin: 0,
            color: '#014898' /* Azul Corporativo UBB */
          }}>
            Muro de la Fama UBB
          </h1>
          <p style={{ color: '#475569', margin: '5px 0 0 0', fontSize: '1.1rem' }}>
            Demostración Práctica: Frontend React & Control de Versiones con Git
          </p>
        </div>
      </header>

      {/* Renderizado de tarjetas */}
      {loading ? (
        <p style={{ color: '#64748b', textAlign: 'center', fontSize: '1.2rem', fontWeight: '500' }}>
          Conectando con la carpeta de estudiantes en GitHub...
        </p>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '24px' 
        }}>
          {estudiantes.map((estudiante, index) => (
            <EstudianteCard 
              key={index}
              nombre={estudiante.nombre}
              generacion={estudiante.generacion}
              comentario={estudiante.comentario}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;