import React from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'

export const SearchCountries = () => {

  const validateField = ( values ) => {
    let errors = {}
    if(!values.search){
      errors.search = 'Por favor ingresa un valor'
    } else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.search)){
      errors.search = 'El nombre solo puede contener letras y espacios'
    }
    return errors;
  }

  const handleSubmit = ({ search, continent }) => {
    console.log( search, !!continent )
  }

  return (
    <Formik
      initialValues={{
        search:'',
        continent:'',
      }}
      validate={ validateField }
      onSubmit={ handleSubmit }
    >
      {({ errors }) => (
        <Form className="flex p-4 w-full">
          <div className="flex-1 w-50">
            <div className="align-middle">
              <button type='submit' className="absolute m-4 text-neutral-500">
                <ion-icon name="search-sharp"></ion-icon>
              </button>
              <Field
                name='search'
                type="text"
                className="shadow-md mt-1 pl-11 py-4 bg-white shadow-md border-slate-300 placeholder-slate-400 w-3/5 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-sm sm:text-sm focus:ring-1"
                placeholder='Search for a country...'
                autoComplete='off'
                />
            </div>
            <ErrorMessage name="search" component={() => (<div>{errors.search}</div>)} />
          </div>

          <div className="flex-1 w-50 text-right p-2">
            <Field name="continent" component='select'>
            <option hidden className='border-none'>Filter by Region</option>
              <option value="Africa">Africa</option>
              <option value="Americas">America</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
            </Field>
          </div>
        </Form>
      )
      }
    </Formik>
  )
}
