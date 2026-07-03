import React from 'react'
import { logout } from '../services/auth'

function Welcome() {
  return (
    <>
      <div className="px-4 py-3">
        <h1 className="text-2xl font-bold text-[#111418]">¡Bienvenido al gestor de Laboratorio Massone!</h1>
      </div>    
      <div className="px-4 py-3">
          <button
            type="button"
            onClick={() => logout()}
            className="delete-button rounded-lg bg-[#99144d] px-2.5 py-2 font-semibold text-white transition"
          >
            Cerrar Sesión
          </button>
        </div>
    </>
  )
}

export default Welcome