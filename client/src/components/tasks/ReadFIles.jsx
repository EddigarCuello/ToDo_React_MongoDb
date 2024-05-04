import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
//import { db } from '../../api/firebase.js'; // Importa la instancia de Firestore desde tu archivo de configuración

export default function ListarArchivos({ taskId }) {
  const [archivos, setArchivos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArchivos = async () => {
      // Verificar si taskId es undefined y salir temprano si es el caso
      if (!taskId) {
        setError('El ID de la tarea no está definido');
        setCargando(false);
        return;
      }

      try {
        const archivosCollection = collection(db, `${taskId}/`);
        const querySnapshot = await getDocs(archivosCollection);

        const archivosData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setArchivos(archivosData);
      } catch (error) {
        console.error('Error al obtener archivos:', error, taskId);
        setError('Error al obtener archivos',taskId);
      } finally {
        setCargando(false);
      }
    };

    fetchArchivos();
  }, [taskId]);

  if (cargando) {
    return <p>Cargando archivos...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Archivos de la tarea: {console.log(archivos ,'{}')
}</h2>
      <ul>
        {archivos.map((archivo, index) => (
          <li key={index}>
            <a href={archivo.url} target="_blank" rel="noopener noreferrer">
              {archivo.nombre} (Tipo: {archivo.tipo})
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
