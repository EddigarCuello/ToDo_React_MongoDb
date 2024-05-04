import { useState } from 'react';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../api/firebase.js'; // Importa la instancia de Firestore desde tu archivo firebase.js

export default function SubirArchivo({ taskId }) {
  const [archivo, setArchivo] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  // Función para manejar la carga de archivos
  const handleSubirArchivo = async () => {
    try {
      if (!archivo) {
        setError('Selecciona un archivo para cargar');
        return;
      }

      setCargando(true);

      // Obtener una instancia de Firebase Storage
      const storage = getStorage();

      // Crear una referencia de archivo en Firebase Storage
      const archivoRef = ref(storage, `archivos_tareas/${taskId}/${archivo.name}`);

      // Cargar el archivo a Firebase Storage
      await uploadBytes(archivoRef, archivo);

      // Guardar la referencia del archivo en Firestore
      const tareaRef = doc(db, 'tareas', taskId);
      await updateDoc(tareaRef, {
        archivoURL: archivoRef.fullPath // Guarda la ruta del archivo en Firebase Storage
      });

      // Limpiar el estado y mostrar mensaje de éxito
      setArchivo(null);
      setError(null);
      console.log('Archivo cargado exitosamente');
    } catch (error) {
      console.error('Error al cargar el archivo:', error);
      setError('Error al cargar el archivo');
    } finally {
      // Restablecer el estado de carga después de completar la operación
      setCargando(false);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Subir Archivo</h1>
      <input
        type="file"
        onChange={(e) => setArchivo(e.target.files[0])}
        className="mb-4"
      />
      <button
        onClick={handleSubirArchivo}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
      >
        Subir Archivo
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
