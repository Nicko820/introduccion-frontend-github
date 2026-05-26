function EstudianteCard({ nombre, generacion, comentario }) {
  return (
    <div style={{
      backgroundColor: '#ffffff',
      border: '1px solid #e2e8f0',
      borderTop: '4px solid #014898',
      borderRadius: '8px',
      padding: '24px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
      transition: 'transform 0.2s, boxShadow 0.2s',
      cursor: 'default',
    }}>
      {/* Nombre del estudiante */}
      <h3 style={{ 
        color: '#014898',
        margin: '0 0 5px 0', 
        fontSize: '1.25rem',
        fontWeight: '700' 
      }}>
        {nombre}
      </h3>
      
      {/* Generación / Año de ingreso */}
      <p style={{ 
        color: '#64748b',
        fontSize: '0.85rem', 
        margin: '0 0 15px 0',
        fontWeight: '500',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
      }}>
        Generación: {generacion}
      </p>
      
      {/* Comentario o saludo */}
      <p style={{ 
        color: '#334155',
        fontStyle: 'italic',
        margin: 0,
        lineHeight: '1.6'
      }}>
        "{comentario}"
      </p>
    </div>
  );
}

export default EstudianteCard;