"use client"
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead.bs5.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from "sweetalert2";
import "./page.css";

interface datos {
    dni: number,
    nombre: string,
    apellido: string,
    edad: number,
    provincia: string,
    linkedin: string
}

const provinciasArray = ["Misiones", "San Luis", "San Juan", "Entre Ríos", "Santa Cruz", "Río Negro", "Chubut", "Córdoba", "Mendoza", "La Rioja", "Catamarca", "La Pampa", "Santiago del Estero", "Corrientes", "Santa Fe", "Tucumán", "Neuquén", "Salta", "Chaco", "Jujuy", "Ciudad Autónoma de Buenos Aires", "Buenos Aires", "Tierra del Fuego"];

export default function Home() {
    const { register, handleSubmit, formState: { errors }, control } = useForm<datos>();
    const onSubmit: SubmitHandler<datos> = (datos) => {

        console.log(datos);

        Swal.fire({
            title: '¡Éxito!',
            text: 'Su registro se ha publicado.',
            icon: 'success',
            showConfirmButton: true,
            confirmButtonText: 'Listo'
        });

    };

    const validateEdad = (value: number) => {
        if (value < 18) {
            return 'Debe ser mayor de edad.';
        }
        return true;
    };

    const validateDNI = (value: number) => {
        if (value < 1000000 || value >= 100000000) {
            return 'Debe ingresar un DNI valido.';
        }
        return true;
    };

    const validateNombre = (value: string) => {
        if (value.length < 2) {
            return 'El contenido no puede ser menos de 2 caractéres.';
        } else {
            if (value.length >= 100)
                return 'El contenido no puede exceder los 100 caractéres.';
        }
        return true;
    };

    return (
        <main className="main">
            <div className='contenedor-form contenedor'>
                <div className='imagepc' >

                </div>
                <div className='form-registro'>

                    <form onSubmit={handleSubmit(onSubmit)} className="form">
                        <h3 className='title'> Registro de desarrolladores desempleados </h3>
                        <div>
                            <label className='form-label'>DNI</label>
                            <input className='form-control'
                                placeholder="(Sin puntos)"
                                {...register("dni", {
                                    required: 'Este campo es obligatorio',
                                    validate: validateDNI,
                                    pattern: {
                                        value: /^(0|[1-9]\d*)(\.\d+)?$/,
                                        message: 'DNI invalido.'
                                    }
                                })} />
                            <small className='texto-validaciones'>{errors.dni?.message}</small>
                        </div>
                        <div>
                            <label className='form-label'>Edad</label>
                            <input className='form-control' {...register("edad", {
                                required: 'Este campo es obligatorio',
                                validate: validateEdad,
                                pattern: {
                                    value: /^(0|[1-9]\d*)(\.\d+)?$/,
                                    message: 'Edad invalida.'
                                }
                            })} />
                            <small className='texto-validaciones'>{errors.edad?.message}</small>
                        </div>
                        <div>
                            <label className='form-label'>Nombre</label>
                            <input className='form-control'
                                {...register("nombre", {
                                    required: 'Este campo es obligatorio',
                                    validate: validateNombre,
                                    pattern: {
                                        value: /^([a-zA-Z]+\s?)+$/,
                                        message: 'El nombre debe contener solo letras.'
                                    },
                                })} />
                            <small className='texto-validaciones'>{errors.nombre?.message}</small>
                        </div>
                        <div>
                            <label className='form-label'>Apellido</label>
                            <input className='form-control'
                                {...register("apellido", {
                                    required: 'Este campo es obligatorio',
                                    validate: validateNombre,
                                    pattern: {
                                        value: /^([a-zA-Z]+\s?)+$/,
                                        message: 'El apellido debe contener solo letras.'
                                    },
                                })} />
                            <small className='texto-validaciones'>{errors.apellido?.message}</small>
                        </div>
                        <div>
                            <label className='form-label'>Provincia</label>
                            <Controller
                                control={control}
                                name="provincia"
                                rules={{ required: 'Este campo es obligatorio' }}
                                defaultValue=""
                                render={({ field }) => (
                                    <>
                                        <Typeahead
                                            {...field}
                                            id="basic-typeahead-single"
                                            labelKey="name"
                                            aria-describedby="typeaheadError"
                                            options={provinciasArray} />
                                    </>
                                )}
                            />
                            <small className='texto-validaciones'>{errors.provincia?.message}</small>
                        </div>
                        <div>
                            <label className='form-label'>LinkedIn</label>
                            <input className='form-control'
                                placeholder="Ej.: linkedin.com/SuPerfil"
                                {...register("linkedin", {
                                    required: 'Este campo es obligatorio',
                                    pattern: {
                                        value: /^(www\.)?linkedin\.com\/[a-zA-Z]+$/,
                                        message: 'El link es invalido.'
                                    },
                                })} />
                            <small className='texto-validaciones'>{errors.linkedin?.message}</small>
                        </div>

                        <input type="submit" className='btn btn-success' value="Enviar" />
                    </form>
                </div>
            </div>

        </main>
    )
}