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
          className="rounded-lg border-2 border-[#99144d] bg-transparent px-4 py-2 font-semibold text-[#99144d] transition-colors hover:bg-[#99144d] hover:text-white"
        >
          Cerrar Sesión
        </button>
      </div>
    </>
  )
}

export default Welcome