import { Link } from "react-router-dom";

function HomePage() {
  return (
    <section className="flex justify-center items-center flex-col space-y-4">
      <header className="bg-zinc-800 h-[400px] rounded-2xl fondo_1">
        <div className="bg-[#00000070] h-full w-full rounded-2xl flex flex-col justify-center ">
          <div className="p-10">
            <h1 className="text-5xl py-2 font-bold text-white">Notes Pending</h1>
            <p className="text-md text-white font-medium">
              ¿Alguna vez has tenido una brillante idea o una importante tarea que necesitas recordar, pero te preocupa perderla o que alguien más la vea? Con Notes Pending, esos días de preocupación han quedado atrás.<br />

              Notes Pending es mucho más que una simple aplicación de notas. Es tu compañero confiable para capturar pensamientos, ideas, listas y recordatorios de forma segura y fácil. Con nuestra aplicación, tus notas estarán siempre a tu alcance, protegidas con contraseña y accesibles desde cualquier dispositivo que tengas a mano.
            </p>

            <Link
              className="bg-[#008cdd] text-white px-11 py-2 rounded-3xl mt-4 inline-block w-44 text-align:center font-medium hover:bg-[#add8e6] hover:shadow-lg hover:shadow-[0px 5px 10px rgba(0, 0, 0, 0.2)] transition duration-300 ease-in-out"
              to="/register"
            >
              Get Started
            </Link>


          </div>

        </div>
      </header>
      <div className="flex space-x-2">
        <header className="bg-zinc-800 h-[400px] rounded-2xl fondo_2">
          <div className="bg-[#00000091] h-full w-full rounded-2xl flex flex-col justify-center ">
            <div className="p-10">
              <h1 className="text-5xl py-2 font-bold text-white">¿Qué hace a Notes Pending diferente? </h1>
              <p className="text-md text-white font-medium">
                Nuestra prioridad es tu privacidad y seguridad. Con características avanzadas de cifrado y protección con contraseña, puedes estar seguro de que tus pensamientos más íntimos y proyectos más importantes están protegidos de miradas no deseadas.<br />
                Además, la accesibilidad es clave. No importa si estás en tu teléfono, tableta o computadora, tus notas están sincronizadas y listas para ser accedidas en cualquier momento y lugar. Ya sea que estés en movimiento o en la comodidad de tu hogar, Notes Pending te ofrece la tranquilidad de saber que tus ideas están siempre contigo.
              </p>
            </div>

          </div>
        </header>
        <header className="bg-zinc-800 h-[400px] rounded-2xl fondo_3">
          <div className="bg-[#00000070] h-full w-full rounded-2xl flex flex-col justify-center ">
            <div className="p-10">
              <h1 className="text-5xl py-2 font-bold text-white">¿Listo para llevar tus notas al siguiente nivel?</h1>
              <p className="text-md text-white font-medium">
                Únete a la comunidad de usuarios satisfechos de Notes Pending y descubre por qué nuestra aplicación es la elección número uno para aquellos que valoran la seguridad, la accesibilidad y la simplicidad.

                Descarga Notes Pending hoy mismo y haz que tus ideas brillen sin límites. ¡Tu creatividad te lo agradecerá!
              </p>
            </div>

          </div>
        </header>

      </div>

    </section >
  );
}

export default HomePage;
