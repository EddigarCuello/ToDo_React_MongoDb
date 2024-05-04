import React, { useState, useEffect } from "react";
import { useTasks } from "../../context/tasksContext";
import { Button, ButtonLink, Card } from "../ui";
import { bajarArchivo } from "../../api/firebase.js";
import ListarArchivos from "./ReadFIles.jsx"; // Importa el componente ListarArchivos

export function TaskCard({ task }) {
  const { deleteTask } = useTasks();
  const [urlArchivo, setUrlArchivo] = useState(""); // Estado para almacenar la URL del archivo

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
  }, []); // Ejecutar el efecto solo una vez cuando se monta el componente

  return (
    <Card className="flex flex-col gap-y-4 p-4">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{task.title}</h1>
        <div className="flex gap-x-2 items-center">
          <Button onClick={() => deleteTask(task._id)} variant="danger">Delete</Button>
          <ButtonLink to={`/tasks/${task._id}`} variant="primary">Edit</ButtonLink>
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
        <img src={urlArchivo} alt="" className="max-w-full h-auto" />
      </div>
    </Card>
  );
}
