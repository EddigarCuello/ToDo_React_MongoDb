import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Button, Card, Input, Label } from "../components/ui";
import { useTasks } from "../context/tasksContext";
import { Textarea } from "../components/ui/Textarea";
import { useForm } from "react-hook-form";
import {SubirArchivo} from "../api/firebase.js"
import { string } from "zod";
//import SubirArchivo from "../components/tasks/Files.jsx"; // Importa el componente SubirArchivo
dayjs.extend(utc);

export function TaskFormPage() {
  const { createTask, getTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams();
  const [urlArchivo, setUrlArchivo] = useState(""); 


  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    const urlArchivo = await SubirArchivo(file, params.id);
    setUrlArchivo(urlArchivo); // Establecer la URL del archivo en el estado
  };

const fechaActualString = dayjs().format('YYYY-MM-DD HH:mm:ss');
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log(params.id);
      if (params.id) {
        updateTask(params.id, {
          ...data,
          date: dayjs.utc(data.date).format(),
        });
      } else {
        createTask({
          ...data,
          date: dayjs.utc(data.date).format(),
        });
      }

      // navigate("/tasks");
    } catch (error) {
      console.log(error);
      // window.location.href = "/";
    }
  };

  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const task = await getTask(params.id);
        setValue("title", task.title);
        setValue("description", task.description);
        setValue(
          "date",
          task.date ? dayjs(task.date).utc().format("YYYY-MM-DD") : ""
        );
        setValue("completed", task.completed);
      }
    };
    loadTask();
  }, []);

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          name="title"
          placeholder="Title"
          {...register("title")}
          autoFocus
        />
        {errors.title && (
          <p className="text-red-500 text-xs italic">Please enter a title.</p>
        )}

        <Label htmlFor="description">Description</Label>
        <Textarea
          name="description"
          id="description"
          rows="3"
          placeholder="Description"
          {...register("description")}
        ></Textarea>

        <Label htmlFor="date">Date</Label>
        <Input type="date" name="date" {...register("date")} />

        {/* Componente SubirArchivo */}
        {/*<SubirArchivo taskId={params.id} />*/}
        {params.id && (
          <div>
            <Label htmlFor="text">file</Label>
            <label htmlFor="uploadFile2" class="bg-white text-gray-500 font-semibold text-base rounded max-w-md h-20 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto font-[sans-serif]">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-11 mb-2 fill-gray-500" viewBox="0 0 32 32">
                <path d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z" data-original="#000000" />
                <path d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z" data-original="#000000" />
              </svg>
              Upload file
              <input type="file" id="uploadFile2" class="hidden" onChange={handleFileInputChange} />
              <p class="text-xs font-medium text-gray-400 mt-2">PNG, JPG SVG, WEBP, and GIF are Allowed.</p>
            </label>
          </div>
        )}
        <div>
          <img src={urlArchivo} alt="" />
        </div>
        <Button>Save</Button>
      </form>
    </Card>
  );
}
