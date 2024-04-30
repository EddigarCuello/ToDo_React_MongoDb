import { useState } from 'react';
import { getStorage, ref, uploadBytes } from 'firebase/storage';

const SubirArchivo = () => {
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
      const archivoRef = ref(storage, `archivos/${archivo.name}`);

      // Cargar el archivo a Firebase Storage
      await uploadBytes(archivoRef, archivo);

      setCargando(false);
      setError(null);
      setArchivo(null);

      console.log('Archivo cargado exitosamente');
    } catch (error) {
      console.error('Error al cargar el archivo:', error);
      setError('Error al cargar el archivo');
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
        disabled={cargando}
      >
        {cargando ? 'Cargando...' : 'Subir Archivo'}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default SubirArchivo;
