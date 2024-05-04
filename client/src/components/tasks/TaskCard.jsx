import React, { useState, useEffect } from "react";
import { useTasks } from "../../context/tasksContext";
import { Button, ButtonLink, Card } from "../ui";
import { bajarArchivo } from "../../api/firebase.js";

export function TaskCard({ task }) {
  const { deleteTask } = useTasks();
  const [urlArchivo, setUrlArchivo] = useState(""); // Estado para almacenar la URL del archivo
  const [showFullScreen, setShowFullScreen] = useState(false); // Estado para controlar si la imagen se muestra en pantalla completa

  useEffect(() => {
    const obtenerUrlArchivo = async () => {
      // Lógica para obtener la URL del archivo

      try {
        const url = await bajarArchivo(task._id);
        console.log(task._id);
        setUrlArchivo(url); // Asigna la URL del archivo al estado urlArchivo
      } catch (error) {
        console.error("Error al obtener la URL del archivo:", error);
      }
    };

    obtenerUrlArchivo(); // Llama a la función para obtener la URL del archivo solo una vez
  }, []);
  // Ejecutar el efecto solo una vez cuando se monta el componente

  // Función para cambiar el estado y mostrar la imagen en pantalla completa
  const toggleFullScreen = () => {
    setShowFullScreen(!showFullScreen);
  };

  return (
    <Card className="flex flex-col gap-y-4 p-4 max-w-[400px]">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{task.title}</h1>
        <div className="flex gap-x-2 items-center">
          <Button onClick={() => deleteTask(task._id)} variant="danger">
            Delete
          </Button>
          <ButtonLink to={`/tasks/${task._id}`} variant="primary">
            Edit
          </ButtonLink>
        </div>
      </header>
      <p className="text-gray-600">{task.description}</p>
      {/* Format date */}
      <p>
        {task.date &&
          new Date(task.date).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
      </p>
      <div className="flex justify-center">
        {/* Manejador de eventos para mostrar la imagen en pantalla completa */}
        <img
          src={urlArchivo}
          alt=""
          className="mt-7 h-auto max-w-[400px] max-h-[200px] rounded-lg shadow-xl dark:shadow-gray-400 cursor-pointer"
          onClick={toggleFullScreen}
        />
      </div>
      {/* Renderiza la imagen en pantalla completa si showFullScreen es true */}
      {showFullScreen && (
        <div
          className="fixed top-0 left-0 z-50 w-screen h-screen bg-black bg-opacity-90 flex justify-center items-center"
          onClick={toggleFullScreen}
        >
          <img src={urlArchivo} alt="" className="max-w-full max-h-full" />
        </div>
      )}
    </Card>
  );
}
